--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Debian 12.2-2.pgdg100+1)
-- Dumped by pg_dump version 12.2 (Debian 12.2-2.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: roletype; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.roletype AS ENUM (
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

CREATE TYPE public.scopetype AS ENUM (
    'article',
    'review',
    'user',
    'verdict'
);


--
-- Name: stancetype; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.stancetype AS ENUM (
    'ENDORSEMENT',
    'NEUTRAL',
    'REFUSAL'
);


--
-- Name: audit_table(regclass); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.audit_table(target_table regclass) RETURNS void
    LANGUAGE sql
    AS $$
SELECT audit_table(target_table, ARRAY[]::text[]);
$$;


--
-- Name: audit_table(regclass, text[]); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.audit_table(target_table regclass, ignored_cols text[]) RETURNS void
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

CREATE FUNCTION public.create_activity() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog', 'public'
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

CREATE FUNCTION public.jsonb_change_key_name(data jsonb, old_key text, new_key text) RETURNS jsonb
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

CREATE FUNCTION public.jsonb_subtract(arg1 jsonb, arg2 jsonb) RETURNS jsonb
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

CREATE OPERATOR public.- (
    FUNCTION = public.jsonb_subtract,
    LEFTARG = jsonb,
    RIGHTARG = jsonb
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: activity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activity (
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

CREATE SEQUENCE public.activity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.activity_id_seq OWNED BY public.activity.id;


--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


--
-- Name: appearance; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appearance (
    id bigint NOT NULL,
    "scienceFeedbackId" character varying(32),
    "quotedClaimId" bigint,
    "quotedContentId" bigint,
    "quotingClaimId" bigint,
    "quotingContentId" bigint,
    stance public.stancetype,
    "testifierId" bigint NOT NULL
);


--
-- Name: appearance_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.appearance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: appearance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.appearance_id_seq OWNED BY public.appearance.id;


--
-- Name: author_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.author_content (
    id bigint NOT NULL,
    "authorId" bigint NOT NULL,
    "contentId" bigint NOT NULL
);


--
-- Name: author_content_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.author_content_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: author_content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.author_content_id_seq OWNED BY public.author_content.id;


--
-- Name: claim; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.claim (
    id bigint NOT NULL,
    "scienceFeedbackId" character varying(32),
    source json,
    text text
);


--
-- Name: claim_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.claim_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: claim_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.claim_id_seq OWNED BY public.claim.id;


--
-- Name: content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.content (
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

CREATE SEQUENCE public.content_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.content_id_seq OWNED BY public.content.id;


--
-- Name: content_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.content_tag (
    id bigint NOT NULL,
    "contentId" bigint NOT NULL,
    "tagId" bigint NOT NULL
);


--
-- Name: content_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.content_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: content_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.content_tag_id_seq OWNED BY public.content_tag.id;


--
-- Name: evaluation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.evaluation (
    id bigint NOT NULL,
    info text,
    label character varying(50),
    type character varying(50),
    value integer
);


--
-- Name: evaluation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.evaluation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: evaluation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.evaluation_id_seq OWNED BY public.evaluation.id;


--
-- Name: image; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.image (
    id bigint NOT NULL,
    "thumbCount" integer NOT NULL,
    name character varying(140)
);


--
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.image_id_seq OWNED BY public.image.id;


--
-- Name: medium; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.medium (
    id bigint NOT NULL,
    "scienceFeedbackId" character varying(32),
    name character varying(256) NOT NULL,
    "organizationId" bigint,
    url character varying(300)
);


--
-- Name: medium_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.medium_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: medium_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.medium_id_seq OWNED BY public.medium.id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organization (
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

CREATE SEQUENCE public.organization_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.organization_id_seq OWNED BY public.organization.id;


--
-- Name: review; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.review (
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

CREATE SEQUENCE public.review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.review_id_seq OWNED BY public.review.id;


--
-- Name: review_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.review_tag (
    id bigint NOT NULL,
    "reviewId" bigint NOT NULL,
    "tagId" bigint NOT NULL
);


--
-- Name: review_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.review_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: review_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.review_tag_id_seq OWNED BY public.review_tag.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    type public.roletype
);


--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: scope; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scope (
    id bigint NOT NULL,
    "tagId" bigint NOT NULL,
    type public.scopetype
);


--
-- Name: scope_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.scope_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: scope_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.scope_id_seq OWNED BY public.scope.id;


--
-- Name: tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tag (
    id bigint NOT NULL,
    "isSoftDeleted" boolean NOT NULL,
    info text,
    positivity integer,
    text text
);


--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tag_id_seq OWNED BY public.tag.id;


--
-- Name: transaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transaction (
    id bigint NOT NULL,
    native_transaction_id bigint,
    issued_at timestamp without time zone,
    client_addr inet,
    actor_id bigint
);


--
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
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

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_session (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    uuid uuid NOT NULL
);


--
-- Name: user_session_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_session_id_seq OWNED BY public.user_session.id;


--
-- Name: user_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_tag (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    "tagId" bigint NOT NULL
);


--
-- Name: user_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_tag_id_seq OWNED BY public.user_tag.id;


--
-- Name: verdict; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.verdict (
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

CREATE SEQUENCE public.verdict_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: verdict_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.verdict_id_seq OWNED BY public.verdict.id;


--
-- Name: verdict_reviewer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.verdict_reviewer (
    id bigint NOT NULL,
    "verdictId" bigint NOT NULL,
    "reviewerId" bigint NOT NULL
);


--
-- Name: verdict_reviewer_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.verdict_reviewer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: verdict_reviewer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.verdict_reviewer_id_seq OWNED BY public.verdict_reviewer.id;


--
-- Name: verdict_tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.verdict_tag (
    id bigint NOT NULL,
    "verdictId" bigint NOT NULL,
    "tagId" bigint NOT NULL
);


--
-- Name: verdict_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.verdict_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: verdict_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.verdict_tag_id_seq OWNED BY public.verdict_tag.id;


--
-- Name: activity id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity ALTER COLUMN id SET DEFAULT nextval('public.activity_id_seq'::regclass);


--
-- Name: appearance id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appearance ALTER COLUMN id SET DEFAULT nextval('public.appearance_id_seq'::regclass);


--
-- Name: author_content id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author_content ALTER COLUMN id SET DEFAULT nextval('public.author_content_id_seq'::regclass);


--
-- Name: claim id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.claim ALTER COLUMN id SET DEFAULT nextval('public.claim_id_seq'::regclass);


--
-- Name: content id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content ALTER COLUMN id SET DEFAULT nextval('public.content_id_seq'::regclass);


--
-- Name: content_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content_tag ALTER COLUMN id SET DEFAULT nextval('public.content_tag_id_seq'::regclass);


--
-- Name: evaluation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation ALTER COLUMN id SET DEFAULT nextval('public.evaluation_id_seq'::regclass);


--
-- Name: image id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.image ALTER COLUMN id SET DEFAULT nextval('public.image_id_seq'::regclass);


--
-- Name: medium id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medium ALTER COLUMN id SET DEFAULT nextval('public.medium_id_seq'::regclass);


--
-- Name: organization id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization ALTER COLUMN id SET DEFAULT nextval('public.organization_id_seq'::regclass);


--
-- Name: review id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review ALTER COLUMN id SET DEFAULT nextval('public.review_id_seq'::regclass);


--
-- Name: review_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review_tag ALTER COLUMN id SET DEFAULT nextval('public.review_tag_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: scope id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scope ALTER COLUMN id SET DEFAULT nextval('public.scope_id_seq'::regclass);


--
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tag ALTER COLUMN id SET DEFAULT nextval('public.tag_id_seq'::regclass);


--
-- Name: transaction id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: user_session id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_session ALTER COLUMN id SET DEFAULT nextval('public.user_session_id_seq'::regclass);


--
-- Name: user_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_tag ALTER COLUMN id SET DEFAULT nextval('public.user_tag_id_seq'::regclass);


--
-- Name: verdict id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict ALTER COLUMN id SET DEFAULT nextval('public.verdict_id_seq'::regclass);


--
-- Name: verdict_reviewer id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict_reviewer ALTER COLUMN id SET DEFAULT nextval('public.verdict_reviewer_id_seq'::regclass);


--
-- Name: verdict_tag id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict_tag ALTER COLUMN id SET DEFAULT nextval('public.verdict_tag_id_seq'::regclass);


--
-- Name: activity activity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (id);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: appearance appearance_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appearance
    ADD CONSTRAINT appearance_pkey PRIMARY KEY (id);


--
-- Name: author_content author_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author_content
    ADD CONSTRAINT author_content_pkey PRIMARY KEY (id, "authorId", "contentId");


--
-- Name: claim claim_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.claim
    ADD CONSTRAINT claim_pkey PRIMARY KEY (id);


--
-- Name: content content_archiveUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT "content_archiveUrl_key" UNIQUE ("archiveUrl");


--
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (id);


--
-- Name: content_tag content_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content_tag
    ADD CONSTRAINT content_tag_pkey PRIMARY KEY (id, "contentId", "tagId");


--
-- Name: content content_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_url_key UNIQUE (url);


--
-- Name: evaluation evaluation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.evaluation
    ADD CONSTRAINT evaluation_pkey PRIMARY KEY (id);


--
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- Name: medium medium_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medium
    ADD CONSTRAINT medium_pkey PRIMARY KEY (id);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- Name: review_tag review_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review_tag
    ADD CONSTRAINT review_tag_pkey PRIMARY KEY (id, "reviewId", "tagId");


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: scope scope_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scope
    ADD CONSTRAINT scope_pkey PRIMARY KEY (id);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: tag tag_text_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_text_key UNIQUE (text);


--
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_session user_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_session
    ADD CONSTRAINT user_session_pkey PRIMARY KEY (id);


--
-- Name: user_session user_session_uuid_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_session
    ADD CONSTRAINT user_session_uuid_key UNIQUE (uuid);


--
-- Name: user_tag user_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_tag
    ADD CONSTRAINT user_tag_pkey PRIMARY KEY (id, "userId", "tagId");


--
-- Name: user user_validationToken_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "user_validationToken_key" UNIQUE ("validationToken");


--
-- Name: verdict verdict_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict
    ADD CONSTRAINT verdict_pkey PRIMARY KEY (id);


--
-- Name: verdict_reviewer verdict_reviewer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict_reviewer
    ADD CONSTRAINT verdict_reviewer_pkey PRIMARY KEY (id, "verdictId", "reviewerId");


--
-- Name: verdict_tag verdict_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict_tag
    ADD CONSTRAINT verdict_tag_pkey PRIMARY KEY (id, "verdictId", "tagId");


--
-- Name: idx_activity_objid; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_activity_objid ON public.activity USING btree ((((changed_data ->> 'id'::text))::integer));


--
-- Name: ix_appearance_quotedClaimId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_appearance_quotedClaimId" ON public.appearance USING btree ("quotedClaimId");


--
-- Name: ix_appearance_quotedContentId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_appearance_quotedContentId" ON public.appearance USING btree ("quotedContentId");


--
-- Name: ix_appearance_quotingClaimId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_appearance_quotingClaimId" ON public.appearance USING btree ("quotingClaimId");


--
-- Name: ix_appearance_quotingContentId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_appearance_quotingContentId" ON public.appearance USING btree ("quotingContentId");


--
-- Name: ix_appearance_testifierId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_appearance_testifierId" ON public.appearance USING btree ("testifierId");


--
-- Name: ix_medium_organizationId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_medium_organizationId" ON public.medium USING btree ("organizationId");


--
-- Name: ix_review_claimId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_review_claimId" ON public.review USING btree ("claimId");


--
-- Name: ix_review_contentId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_review_contentId" ON public.review USING btree ("contentId");


--
-- Name: ix_review_evaluationId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_review_evaluationId" ON public.review USING btree ("evaluationId");


--
-- Name: ix_review_reviewerId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_review_reviewerId" ON public.review USING btree ("reviewerId");


--
-- Name: ix_role_userId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_role_userId" ON public.role USING btree ("userId");


--
-- Name: ix_scope_tagId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_scope_tagId" ON public.scope USING btree ("tagId");


--
-- Name: ix_transaction_native_transaction_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_transaction_native_transaction_id ON public.transaction USING btree (native_transaction_id);


--
-- Name: ix_verdict_claimId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_verdict_claimId" ON public.verdict USING btree ("claimId");


--
-- Name: ix_verdict_contentId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_verdict_contentId" ON public.verdict USING btree ("contentId");


--
-- Name: ix_verdict_editorId; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ix_verdict_editorId" ON public.verdict USING btree ("editorId");


--
-- Name: content audit_trigger_delete; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_trigger_delete AFTER DELETE ON public.content REFERENCING OLD TABLE AS old_table FOR EACH STATEMENT WHEN ((current_setting('session_replication_role'::text) <> 'local'::text)) EXECUTE FUNCTION public.create_activity();


--
-- Name: content audit_trigger_insert; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_trigger_insert AFTER INSERT ON public.content REFERENCING NEW TABLE AS new_table FOR EACH STATEMENT WHEN ((current_setting('session_replication_role'::text) <> 'local'::text)) EXECUTE FUNCTION public.create_activity();


--
-- Name: content audit_trigger_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER audit_trigger_update AFTER UPDATE ON public.content REFERENCING OLD TABLE AS old_table NEW TABLE AS new_table FOR EACH STATEMENT WHEN ((current_setting('session_replication_role'::text) <> 'local'::text)) EXECUTE FUNCTION public.create_activity();


--
-- Name: activity activity_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity
    ADD CONSTRAINT activity_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transaction(id);


--
-- Name: appearance appearance_quotedClaimId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appearance
    ADD CONSTRAINT "appearance_quotedClaimId_fkey" FOREIGN KEY ("quotedClaimId") REFERENCES public.claim(id);


--
-- Name: appearance appearance_quotedContentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appearance
    ADD CONSTRAINT "appearance_quotedContentId_fkey" FOREIGN KEY ("quotedContentId") REFERENCES public.content(id);


--
-- Name: appearance appearance_quotingClaimId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appearance
    ADD CONSTRAINT "appearance_quotingClaimId_fkey" FOREIGN KEY ("quotingClaimId") REFERENCES public.claim(id);


--
-- Name: appearance appearance_quotingContentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appearance
    ADD CONSTRAINT "appearance_quotingContentId_fkey" FOREIGN KEY ("quotingContentId") REFERENCES public.content(id);


--
-- Name: appearance appearance_testifierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appearance
    ADD CONSTRAINT "appearance_testifierId_fkey" FOREIGN KEY ("testifierId") REFERENCES public."user"(id);


--
-- Name: author_content author_content_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author_content
    ADD CONSTRAINT "author_content_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."user"(id);


--
-- Name: author_content author_content_contentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.author_content
    ADD CONSTRAINT "author_content_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: content_tag content_tag_contentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content_tag
    ADD CONSTRAINT "content_tag_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: content_tag content_tag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content_tag
    ADD CONSTRAINT "content_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.tag(id);


--
-- Name: medium medium_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medium
    ADD CONSTRAINT "medium_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public.organization(id);


--
-- Name: review review_claimId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "review_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES public.claim(id);


--
-- Name: review review_contentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "review_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: review review_evaluationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "review_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES public.evaluation(id);


--
-- Name: review review_reviewerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES public."user"(id);


--
-- Name: review_tag review_tag_reviewId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review_tag
    ADD CONSTRAINT "review_tag_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES public.review(id);


--
-- Name: review_tag review_tag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review_tag
    ADD CONSTRAINT "review_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.tag(id);


--
-- Name: role role_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "role_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: scope scope_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scope
    ADD CONSTRAINT "scope_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.tag(id);


--
-- Name: user_tag user_tag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_tag
    ADD CONSTRAINT "user_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.tag(id);


--
-- Name: user_tag user_tag_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_tag
    ADD CONSTRAINT "user_tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: verdict verdict_claimId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict
    ADD CONSTRAINT "verdict_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES public.claim(id);


--
-- Name: verdict verdict_contentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict
    ADD CONSTRAINT "verdict_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES public.content(id);


--
-- Name: verdict verdict_editorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict
    ADD CONSTRAINT "verdict_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES public."user"(id);


--
-- Name: verdict_reviewer verdict_reviewer_reviewerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict_reviewer
    ADD CONSTRAINT "verdict_reviewer_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES public."user"(id);


--
-- Name: verdict_reviewer verdict_reviewer_verdictId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict_reviewer
    ADD CONSTRAINT "verdict_reviewer_verdictId_fkey" FOREIGN KEY ("verdictId") REFERENCES public.verdict(id);


--
-- Name: verdict_tag verdict_tag_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict_tag
    ADD CONSTRAINT "verdict_tag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public.tag(id);


--
-- Name: verdict_tag verdict_tag_verdictId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verdict_tag
    ADD CONSTRAINT "verdict_tag_verdictId_fkey" FOREIGN KEY ("verdictId") REFERENCES public.verdict(id);


--
-- PostgreSQL database dump complete
--

