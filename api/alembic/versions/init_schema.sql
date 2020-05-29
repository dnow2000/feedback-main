--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: roletype; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE roletype AS ENUM (
    'admin',
    'author',
    'editor',
    'guest',
    'reviewer',
    'testifier'
);


--
-- Name: scopetype; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE scopetype AS ENUM (
    'article',
    'review',
    'user',
    'verdict'
);


--
-- Name: stancetype; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE stancetype AS ENUM (
    'ENDORSEMENT',
    'NEUTRAL',
    'REFUSAL'
);


--
-- Name: audit_table(regclass); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION audit_table(target_table regclass) RETURNS void
    LANGUAGE sql
    AS $$
SELECT audit_table(target_table, ARRAY[]::text[]);
$$;


--
-- Name: audit_table(regclass, text[]); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION audit_table(target_table regclass, ignored_cols text[]) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    query text;
    excluded_columns_text text = '';
BEGIN
    EXECUTE 'DROP TRIGGER IF EXISTS audit_trigger_insert ON ' || target_table;
    EXECUTE 'DROP TRIGGER IF EXISTS audit_trigger_update ON ' || target_table;
    EXECUTE 'DROP TRIGGER IF EXISTS audit_trigger_delete ON ' || target_table;

    IF array_length(ignored_cols, 1) > 0 THEN
        excluded_columns_text = ', ' || quote_literal(ignored_cols);
    END IF;
    query = 'CREATE TRIGGER audit_trigger_insert AFTER INSERT ON ' ||
             target_table || ' REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT ' ||
             E'WHEN (current_setting(\'session_replication_role\') ' ||
             E'<> \'local\')' ||
             ' EXECUTE PROCEDURE create_activity(' ||
             excluded_columns_text ||
             ');';
    RAISE NOTICE '%', query;
    EXECUTE query;
    query = 'CREATE TRIGGER audit_trigger_update AFTER UPDATE ON ' ||
             target_table || ' REFERENCING NEW TABLE AS new_table OLD TABLE AS old_table FOR EACH STATEMENT ' ||
             E'WHEN (current_setting(\'session_replication_role\') ' ||
             E'<> \'local\')' ||
             ' EXECUTE PROCEDURE create_activity(' ||
             excluded_columns_text ||
             ');';
    RAISE NOTICE '%', query;
    EXECUTE query;
    query = 'CREATE TRIGGER audit_trigger_delete AFTER DELETE ON ' ||
             target_table || ' REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT ' ||
             E'WHEN (current_setting(\'session_replication_role\') ' ||
             E'<> \'local\')' ||
             ' EXECUTE PROCEDURE create_activity(' ||
             excluded_columns_text ||
             ');';
    RAISE NOTICE '%', query;
    EXECUTE query;
END;
$$;


--
-- Name: create_activity(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION create_activity() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO pg_catalog, public
    AS $$
DECLARE
    audit_row activity;
    excluded_cols text[] = ARRAY[]::text[];
    _transaction_id BIGINT;
BEGIN
    _transaction_id := (
        SELECT id
        FROM transaction
        WHERE
            native_transaction_id = txid_current() AND
            issued_at >= (NOW() - INTERVAL '1 day')
        ORDER BY issued_at DESC
        LIMIT 1
    );

    IF TG_ARGV[0] IS NOT NULL THEN
        excluded_cols = TG_ARGV[0]::text[];
    END IF;

    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO activity
        SELECT
            nextval('activity_id_seq') as id,
            TG_TABLE_SCHEMA::text AS schema_name,
            TG_TABLE_NAME::text AS table_name,
            TG_RELID AS relid,
            statement_timestamp() AT TIME ZONE 'UTC' AS issued_at,
            txid_current() AS native_transaction_id,
            LOWER(TG_OP) AS verb,
            old_data - excluded_cols AS old_data,
            new_data - old_data - excluded_cols AS changed_data,
            _transaction_id AS transaction_id
        FROM (
            SELECT *
            FROM (
                SELECT
                    row_to_json(old_table.*)::jsonb AS old_data,
                    row_number() OVER ()
                FROM old_table
            ) AS old_table
            JOIN (
                SELECT
                    row_to_json(new_table.*)::jsonb AS new_data,
                    row_number() OVER ()
                FROM new_table
            ) AS new_table
            USING(row_number)
        ) as sub
        WHERE new_data - old_data - excluded_cols != '{}'::jsonb;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO activity
        SELECT
            nextval('activity_id_seq') as id,
            TG_TABLE_SCHEMA::text AS schema_name,
            TG_TABLE_NAME::text AS table_name,
            TG_RELID AS relid,
            statement_timestamp() AT TIME ZONE 'UTC' AS issued_at,
            txid_current() AS native_transaction_id,
            LOWER(TG_OP) AS verb,
            '{}'::jsonb AS old_data,
            row_to_json(new_table.*)::jsonb - excluded_cols,
            _transaction_id AS transaction_id
        FROM new_table;
    ELSEIF TG_OP = 'DELETE' THEN
        INSERT INTO activity
        SELECT
            nextval('activity_id_seq') as id,
            TG_TABLE_SCHEMA::text AS schema_name,
            TG_TABLE_NAME::text AS table_name,
            TG_RELID AS relid,
            statement_timestamp() AT TIME ZONE 'UTC' AS issued_at,
            txid_current() AS native_transaction_id,
            LOWER(TG_OP) AS verb,
            row_to_json(old_table.*)::jsonb - excluded_cols AS old_data,
            '{}'::jsonb AS changed_data,
            _transaction_id AS transaction_id
        FROM old_table;
    END IF;
    RETURN NULL;
END;
$$;


--
-- Name: jsonb_change_key_name(jsonb, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION jsonb_change_key_name(data jsonb, old_key text, new_key text) RETURNS jsonb
    LANGUAGE sql IMMUTABLE
    AS $$
    SELECT ('{'||string_agg(to_json(CASE WHEN key = old_key THEN new_key ELSE key END)||':'||value, ',')||'}')::jsonb
    FROM (
        SELECT *
        FROM jsonb_each(data)
    ) t;
$$;


--
-- Name: jsonb_subtract(jsonb, jsonb); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION jsonb_subtract(arg1 jsonb, arg2 jsonb) RETURNS jsonb
    LANGUAGE sql
    AS $$
SELECT
  COALESCE(json_object_agg(key, value), '{}')::jsonb
FROM
  jsonb_each(arg1)
WHERE
  (arg1 -> key) <> (arg2 -> key) OR (arg2 -> key) IS NULL
$$;


--
-- Name: -; Type: OPERATOR; Schema: public; Owner: -
--

CREATE OPERATOR - (
    PROCEDURE = jsonb_subtract,
    LEFTARG = jsonb,
    RIGHTARG = jsonb
);


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: activity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE activity (
    id bigint NOT NULL,
    schema_name text,
    table_name text,
    relid integer,
    issued_at timestamp without time zone,
    native_transaction_id bigint,
    verb text,
    old_data jsonb DEFAULT '{}'::jsonb,
    changed_data jsonb DEFAULT '{}'::jsonb,
    transaction_id bigint
);


--
-- Name: activity_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE activity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE activity_id_seq OWNED BY activity.id;


--
-- Name: appearance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE appearance (
    id bigint NOT NULL,
    "scienceFeedbackId" character varying(32),
    "quotedClaimId" bigint,
    "quotedContentId" bigint,
    "quotingClaimId" bigint,
    "quotingContentId" bigint,
    stance stancetype,
    "testifierId" bigint NOT NULL
);


--
-- Name: appearance_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE appearance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: appearance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE appearance_id_seq OWNED BY appearance.id;


--
-- Name: author_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE author_content (
    id bigint NOT NULL,
    "authorId" bigint NOT NULL,
    "contentId" bigint NOT NULL
);


--
-- Name: author_content_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE author_content_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: author_content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE author_content_id_seq OWNED BY author_content.id;


--
-- Name: claim; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE claim (
    id bigint NOT NULL,
    "scienceFeedbackId" character varying(32),
    source json,
    text text
);


--
-- Name: claim_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE claim_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: claim_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE claim_id_seq OWNED BY claim.id;


--
-- Name: content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE content (
    id bigint NOT NULL,
    "isSoftDeleted" boolean NOT NULL,
    "externalThumbUrl" character varying(220),
    "scienceFeedbackId" character varying(32),
    "facebookShares" bigint,
    "redditShares" bigint,
    "totalShares" bigint,
    "twitterShares" bigint,
    "thumbCount" integer NOT NULL,
    "archiveUrl" character varying(220),
    authors text,
    "isReviewable" boolean,
    "isValidatedAsPeerPublication" boolean NOT NULL,
    "publishedDate" timestamp without time zone,
    source json,
    summary text,
    tags text,
    theme character varying(140),
    title character varying(140),
    url character varying(300) NOT NULL
);


--
-- Name: content_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE content_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE content_id_seq OWNED BY content.id;


--
-- Name: content_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE content_tag (
    id bigint NOT NULL,
    "contentId" bigint NOT NULL,
    "tagId" bigint NOT NULL
);


--
-- Name: content_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE content_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: content_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE content_tag_id_seq OWNED BY content_tag.id;


--
-- Name: evaluation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE evaluation (
    id bigint NOT NULL,
    info text,
    label character varying(50),
    type character varying(50),
    value integer
);


--
-- Name: evaluation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE evaluation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: evaluation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE evaluation_id_seq OWNED BY evaluation.id;


--
-- Name: image; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE image (
    id bigint NOT NULL,
    "thumbCount" integer NOT NULL,
    name character varying(140)
);


--
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE image_id_seq OWNED BY image.id;


--
-- Name: medium; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE medium (
    id bigint NOT NULL,
    "scienceFeedbackId" character varying(32),
    name character varying(256) NOT NULL,
    "organizationId" bigint,
    url character varying(300)
);


--
-- Name: medium_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE medium_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: medium_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE medium_id_seq OWNED BY medium.id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE organization (
    id bigint NOT NULL,
    "scienceFeedbackId" character varying(32),
    entity character varying(16),
    label character varying(64),
    description character varying(128),
    name character varying(256) NOT NULL
);


--
-- Name: organization_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE organization_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE organization_id_seq OWNED BY organization.id;


--
-- Name: review; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE review (
    id bigint NOT NULL,
    "isSoftDeleted" boolean NOT NULL,
    rating double precision,
    "scienceFeedbackId" character varying(32),
    "claimId" bigint,
    comment text,
    "contentId" bigint,
    "evaluationId" bigint,
    "reviewerId" bigint NOT NULL
);


--
-- Name: review_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE review_id_seq OWNED BY review.id;


--
-- Name: review_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE review_tag (
    id bigint NOT NULL,
    "reviewId" bigint NOT NULL,
    "tagId" bigint NOT NULL
);


--
-- Name: review_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE review_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: review_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE review_tag_id_seq OWNED BY review_tag.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE role (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    type roletype
);


--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE role_id_seq OWNED BY role.id;


--
-- Name: scope; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE scope (
    id bigint NOT NULL,
    "tagId" bigint NOT NULL,
    type scopetype
);


--
-- Name: scope_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE scope_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: scope_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE scope_id_seq OWNED BY scope.id;


--
-- Name: tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tag (
    id bigint NOT NULL,
    "isSoftDeleted" boolean NOT NULL,
    info text,
    positivity integer,
    text text
);


--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tag_id_seq OWNED BY tag.id;


--
-- Name: transaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE transaction (
    id bigint NOT NULL,
    native_transaction_id bigint,
    issued_at timestamp without time zone,
    client_addr inet,
    actor_id bigint
);


--
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE transaction_id_seq OWNED BY transaction.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "user" (
    id bigint NOT NULL,
    "externalThumbUrl" character varying(220),
    "academicWebsite" character varying(220),
    affiliation character varying(220),
    expertise text,
    "orcidId" character varying(220),
    title character varying(220),
    "scienceFeedbackId" character varying(32),
    "thumbCount" integer NOT NULL,
    "validationToken" character varying(27),
    email character varying(120) NOT NULL,
    password bytea NOT NULL,
    "firstName" character varying(30),
    "lastName" character varying(30)
);


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- Name: user_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_session (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    uuid uuid NOT NULL
);


--
-- Name: user_session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_session_id_seq OWNED BY user_session.id;


--
-- Name: user_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE user_tag (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    "tagId" bigint NOT NULL
);


--
-- Name: user_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE user_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE user_tag_id_seq OWNED BY user_tag.id;


--
-- Name: verdict; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE verdict (
    id bigint NOT NULL,
    "isSoftDeleted" boolean NOT NULL,
    rating double precision,
    comment text,
    "claimId" bigint,
    "contentId" bigint,
    "editorId" bigint NOT NULL
);


--
-- Name: verdict_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE verdict_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: verdict_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE verdict_id_seq OWNED BY verdict.id;


--
-- Name: verdict_reviewer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE verdict_reviewer (
    id bigint NOT NULL,
    "verdictId" bigint NOT NULL,
    "reviewerId" bigint NOT NULL
);


--
-- Name: verdict_reviewer_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE verdict_reviewer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: verdict_reviewer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE verdict_reviewer_id_seq OWNED BY verdict_reviewer.id;


--
-- Name: verdict_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE verdict_tag (
    id bigint NOT NULL,
    "verdictId" bigint NOT NULL,
    "tagId" bigint NOT NULL
);


--
-- Name: verdict_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE verdict_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: verdict_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE verdict_tag_id_seq OWNED BY verdict_tag.id;


--
-- Name: activity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY activity ALTER COLUMN id SET DEFAULT nextval('activity_id_seq'::regclass);


--
-- Name: appearance id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY appearance ALTER COLUMN id SET DEFAULT nextval('appearance_id_seq'::regclass);


--
-- Name: author_content id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY author_content ALTER COLUMN id SET DEFAULT nextval('author_content_id_seq'::regclass);


--
-- Name: claim id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim ALTER COLUMN id SET DEFAULT nextval('claim_id_seq'::regclass);


--
-- Name: content id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY content ALTER COLUMN id SET DEFAULT nextval('content_id_seq'::regclass);


--
-- Name: content_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY content_tag ALTER COLUMN id SET DEFAULT nextval('content_tag_id_seq'::regclass);


--
-- Name: evaluation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY evaluation ALTER COLUMN id SET DEFAULT nextval('evaluation_id_seq'::regclass);


--
-- Name: image id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY image ALTER COLUMN id SET DEFAULT nextval('image_id_seq'::regclass);


--
-- Name: medium id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY medium ALTER COLUMN id SET DEFAULT nextval('medium_id_seq'::regclass);


--
-- Name: organization id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY organization ALTER COLUMN id SET DEFAULT nextval('organization_id_seq'::regclass);


--
-- Name: review id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY review ALTER COLUMN id SET DEFAULT nextval('review_id_seq'::regclass);


--
-- Name: review_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY review_tag ALTER COLUMN id SET DEFAULT nextval('review_tag_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY role ALTER COLUMN id SET DEFAULT nextval('role_id_seq'::regclass);


--
-- Name: scope id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY scope ALTER COLUMN id SET DEFAULT nextval('scope_id_seq'::regclass);


--
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tag ALTER COLUMN id SET DEFAULT nextval('tag_id_seq'::regclass);


--
-- Name: transaction id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY transaction ALTER COLUMN id SET DEFAULT nextval('transaction_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: user_session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_session ALTER COLUMN id SET DEFAULT nextval('user_session_id_seq'::regclass);


--
-- Name: user_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_tag ALTER COLUMN id SET DEFAULT nextval('user_tag_id_seq'::regclass);


--
-- Name: verdict id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict ALTER COLUMN id SET DEFAULT nextval('verdict_id_seq'::regclass);


--
-- Name: verdict_reviewer id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict_reviewer ALTER COLUMN id SET DEFAULT nextval('verdict_reviewer_id_seq'::regclass);


--
-- Name: verdict_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict_tag ALTER COLUMN id SET DEFAULT nextval('verdict_tag_id_seq'::regclass);


--
-- Name: activity activity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);


--
-- Name: appearance appearance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY appearance
    ADD CONSTRAINT appearance_pkey PRIMARY KEY (id);


--
-- Name: author_content author_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY author_content
    ADD CONSTRAINT author_content_pkey PRIMARY KEY (id, "authorId", "contentId");


--
-- Name: claim claim_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY claim
    ADD CONSTRAINT claim_pkey PRIMARY KEY (id);


--
-- Name: content content_archiveUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY content
    ADD CONSTRAINT "content_archiveUrl_key" UNIQUE ("archiveUrl");


--
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY content
    ADD CONSTRAINT content_pkey PRIMARY KEY (id);


--
-- Name: content_tag content_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY content_tag
    ADD CONSTRAINT content_tag_pkey PRIMARY KEY (id, "contentId", "tagId");


--
-- Name: content content_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY content
    ADD CONSTRAINT content_url_key UNIQUE (url);


--
-- Name: evaluation evaluation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY evaluation
    ADD CONSTRAINT evaluation_pkey PRIMARY KEY (id);


--
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- Name: medium medium_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY medium
    ADD CONSTRAINT medium_pkey PRIMARY KEY (id);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- Name: review_tag review_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY review_tag
    ADD CONSTRAINT review_tag_pkey PRIMARY KEY (id, "reviewId", "tagId");


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: scope scope_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY scope
    ADD CONSTRAINT scope_pkey PRIMARY KEY (id);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: tag tag_text_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tag
    ADD CONSTRAINT tag_text_key UNIQUE (text);


--
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_session user_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_session
    ADD CONSTRAINT user_session_pkey PRIMARY KEY (id);


--
-- Name: user_session user_session_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_session
    ADD CONSTRAINT user_session_uuid_key UNIQUE (uuid);


--
-- Name: user_tag user_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_tag
    ADD CONSTRAINT user_tag_pkey PRIMARY KEY (id, "userId", "tagId");


--
-- Name: user user_validationToken_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT "user_validationToken_key" UNIQUE ("validationToken");


--
-- Name: verdict verdict_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict
    ADD CONSTRAINT verdict_pkey PRIMARY KEY (id);


--
-- Name: verdict_reviewer verdict_reviewer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict_reviewer
    ADD CONSTRAINT verdict_reviewer_pkey PRIMARY KEY (id, "verdictId", "reviewerId");


--
-- Name: verdict_tag verdict_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict_tag
    ADD CONSTRAINT verdict_tag_pkey PRIMARY KEY (id, "verdictId", "tagId");


--
-- Name: idx_activity_objid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_objid ON activity USING btree ((((changed_data ->> 'id'::text))::integer));


--
-- Name: ix_appearance_quotedClaimId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_appearance_quotedClaimId" ON appearance USING btree ("quotedClaimId");


--
-- Name: ix_appearance_quotedContentId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_appearance_quotedContentId" ON appearance USING btree ("quotedContentId");


--
-- Name: ix_appearance_quotingClaimId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_appearance_quotingClaimId" ON appearance USING btree ("quotingClaimId");


--
-- Name: ix_appearance_quotingContentId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_appearance_quotingContentId" ON appearance USING btree ("quotingContentId");


--
-- Name: ix_appearance_testifierId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_appearance_testifierId" ON appearance USING btree ("testifierId");


--
-- Name: ix_medium_organizationId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_medium_organizationId" ON medium USING btree ("organizationId");


--
-- Name: ix_review_claimId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_review_claimId" ON review USING btree ("claimId");


--
-- Name: ix_review_contentId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_review_contentId" ON review USING btree ("contentId");


--
-- Name: ix_review_evaluationId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_review_evaluationId" ON review USING btree ("evaluationId");


--
-- Name: ix_review_reviewerId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_review_reviewerId" ON review USING btree ("reviewerId");


--
-- Name: ix_role_userId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_role_userId" ON role USING btree ("userId");


--
-- Name: ix_scope_tagId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_scope_tagId" ON scope USING btree ("tagId");


--
-- Name: ix_transaction_native_transaction_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_transaction_native_transaction_id ON transaction USING btree (native_transaction_id);


--
-- Name: ix_verdict_claimId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_verdict_claimId" ON verdict USING btree ("claimId");


--
-- Name: ix_verdict_contentId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_verdict_contentId" ON verdict USING btree ("contentId");


--
-- Name: ix_verdict_editorId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_verdict_editorId" ON verdict USING btree ("editorId");


--
-- Name: content audit_trigger_delete; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_trigger_delete AFTER DELETE ON content REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT WHEN ((current_setting('session_replication_role'::text) <> 'local'::text)) EXECUTE PROCEDURE create_activity();


--
-- Name: content audit_trigger_insert; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_trigger_insert AFTER INSERT ON content REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT WHEN ((current_setting('session_replication_role'::text) <> 'local'::text)) EXECUTE PROCEDURE create_activity();


--
-- Name: content audit_trigger_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_trigger_update AFTER UPDATE ON content REFERENCING OLD TABLE AS old_table NEW TABLE AS new_table FOR EACH STATEMENT WHEN ((current_setting('session_replication_role'::text) <> 'local'::text)) EXECUTE PROCEDURE create_activity();


--
-- Name: activity activity_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY activity
    ADD CONSTRAINT activity_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES transaction(id);


--
-- Name: appearance appearance_quotedClaimId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY appearance
    ADD CONSTRAINT "appearance_quotedClaimId_fkey" FOREIGN KEY ("quotedClaimId") REFERENCES claim(id);


--
-- Name: appearance appearance_quotedContentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY appearance
    ADD CONSTRAINT "appearance_quotedContentId_fkey" FOREIGN KEY ("quotedContentId") REFERENCES content(id);


--
-- Name: appearance appearance_quotingClaimId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY appearance
    ADD CONSTRAINT "appearance_quotingClaimId_fkey" FOREIGN KEY ("quotingClaimId") REFERENCES claim(id);


--
-- Name: appearance appearance_quotingContentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY appearance
    ADD CONSTRAINT "appearance_quotingContentId_fkey" FOREIGN KEY ("quotingContentId") REFERENCES content(id);


--
-- Name: appearance appearance_testifierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY appearance
    ADD CONSTRAINT "appearance_testifierId_fkey" FOREIGN KEY ("testifierId") REFERENCES "user"(id);


--
-- Name: author_content author_content_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY author_content
    ADD CONSTRAINT "author_content_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"(id);


--
-- Name: author_content author_content_contentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY author_content
    ADD CONSTRAINT "author_content_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES content(id);


--
-- Name: content_tag content_tag_contentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY content_tag
    ADD CONSTRAINT "content_tag_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES content(id);


--
-- Name: content_tag content_tag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY content_tag
    ADD CONSTRAINT "content_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES tag(id);


--
-- Name: medium medium_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY medium
    ADD CONSTRAINT "medium_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES organization(id);


--
-- Name: review review_claimId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY review
    ADD CONSTRAINT "review_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES claim(id);


--
-- Name: review review_contentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY review
    ADD CONSTRAINT "review_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES content(id);


--
-- Name: review review_evaluationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY review
    ADD CONSTRAINT "review_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES evaluation(id);


--
-- Name: review review_reviewerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY review
    ADD CONSTRAINT "review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "user"(id);


--
-- Name: review_tag review_tag_reviewId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY review_tag
    ADD CONSTRAINT "review_tag_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES review(id);


--
-- Name: review_tag review_tag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY review_tag
    ADD CONSTRAINT "review_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES tag(id);


--
-- Name: role role_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY role
    ADD CONSTRAINT "role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id);


--
-- Name: scope scope_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY scope
    ADD CONSTRAINT "scope_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES tag(id);


--
-- Name: user_tag user_tag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_tag
    ADD CONSTRAINT "user_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES tag(id);


--
-- Name: user_tag user_tag_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY user_tag
    ADD CONSTRAINT "user_tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id);


--
-- Name: verdict verdict_claimId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict
    ADD CONSTRAINT "verdict_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES claim(id);


--
-- Name: verdict verdict_contentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict
    ADD CONSTRAINT "verdict_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES content(id);


--
-- Name: verdict verdict_editorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict
    ADD CONSTRAINT "verdict_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "user"(id);


--
-- Name: verdict_reviewer verdict_reviewer_reviewerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict_reviewer
    ADD CONSTRAINT "verdict_reviewer_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "user"(id);


--
-- Name: verdict_reviewer verdict_reviewer_verdictId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict_reviewer
    ADD CONSTRAINT "verdict_reviewer_verdictId_fkey" FOREIGN KEY ("verdictId") REFERENCES verdict(id);


--
-- Name: verdict_tag verdict_tag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict_tag
    ADD CONSTRAINT "verdict_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES tag(id);


--
-- Name: verdict_tag verdict_tag_verdictId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY verdict_tag
    ADD CONSTRAINT "verdict_tag_verdictId_fkey" FOREIGN KEY ("verdictId") REFERENCES verdict(id);


--
-- PostgreSQL database dump complete
--
