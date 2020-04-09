--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4 (Debian 10.4-2.pgdg90+1)
-- Dumped by pg_dump version 10.5

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;


--
-- Name: activity; Type: TABLE; Schema: public; Owner: pass_culture
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
-- Name: activity_id_seq; Type: SEQUENCE; Schema: public; Owner: pass_culture
--

CREATE SEQUENCE activity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pass_culture
--

ALTER SEQUENCE activity_id_seq OWNED BY activity.id;


--
-- Name: article; Type: TABLE; Schema: public;
--

CREATE TABLE article (
    id bigint NOT NULL,
    "thumbCount" integer NOT NULL,
    summary text,
    title character varying(140) NOT NULL,
    url character varying(220) NOT NULL,
    authors text,
    tags text
);


--
-- Name: article_id_seq; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE article_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: article_id_seq; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE article_id_seq OWNED BY article.id;


--
-- Name: evaluation; Type: TABLE; Schema: public;
--

CREATE TABLE evaluation (
    id bigint NOT NULL,
    label character varying(50),
    info text,
    type character varying(50),
    value integer NOT NULL
);



--
-- Name: evaluation_id_seq; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE evaluation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: evaluation_id_seq; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE evaluation_id_seq OWNED BY evaluation.id;


--
-- Name: review; Type: TABLE; Schema: public;
--

CREATE TABLE review (
    id bigint NOT NULL,
    rating integer NOT NULL,
    "isApplicable" boolean NOT NULL,
    "articleId" bigint NOT NULL,
    comment text,
    "evaluationId" bigint NOT NULL,
    "userId" bigint NOT NULL,
    "verdictId" bigint
);


--
-- Name: review_id_seq; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: review_id_seq; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE review_id_seq OWNED BY review.id;


--
-- Name: role; Type: TABLE; Schema: public;
--

CREATE TABLE role (
    id bigint NOT NULL,
    "userId" bigint NOT NULL,
    type character varying(50)
);



--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE role_id_seq OWNED BY role.id;


--
-- Name: transaction; Type: TABLE; Schema: public;
--

CREATE TABLE transaction (
    id bigint NOT NULL,
    native_transaction_id bigint,
    issued_at timestamp without time zone,
    client_addr inet,
    actor_id bigint
);



--
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE transaction_id_seq OWNED BY transaction.id;


--
-- Name: user; Type: TABLE; Schema: public;
--

CREATE TABLE "user" (
    id bigint NOT NULL,
    "thumbCount" integer NOT NULL,
    "validationToken" character varying(27),
    email character varying(120) NOT NULL,
    password bytea NOT NULL,
    "publicName" character varying(30) NOT NULL
);


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- Name: verdict; Type: TABLE; Schema: public;
--

CREATE TABLE verdict (
    id bigint NOT NULL,
    rating integer NOT NULL,
    "isApplicable" boolean NOT NULL,
    "articleId" bigint NOT NULL,
    comment text
);


--
-- Name: verdict_id_seq; Type: SEQUENCE; Schema: public;
--

CREATE SEQUENCE verdict_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: verdict_id_seq; Type: SEQUENCE OWNED BY; Schema: public;
--

ALTER SEQUENCE verdict_id_seq OWNED BY verdict.id;


--
-- Name: article id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY article ALTER COLUMN id SET DEFAULT nextval('article_id_seq'::regclass);


--
-- Name: evaluation id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY evaluation ALTER COLUMN id SET DEFAULT nextval('evaluation_id_seq'::regclass);


--
-- Name: review id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY review ALTER COLUMN id SET DEFAULT nextval('review_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY role ALTER COLUMN id SET DEFAULT nextval('role_id_seq'::regclass);


--
-- Name: transaction id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY transaction ALTER COLUMN id SET DEFAULT nextval('transaction_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: verdict id; Type: DEFAULT; Schema: public;
--

ALTER TABLE ONLY verdict ALTER COLUMN id SET DEFAULT nextval('verdict_id_seq'::regclass);


--
-- Name: article article_pkey; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY article
    ADD CONSTRAINT article_pkey PRIMARY KEY (id);


--
-- Name: evaluation evaluation_pkey; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY evaluation
    ADD CONSTRAINT evaluation_pkey PRIMARY KEY (id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_validationToken_key; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT "user_validationToken_key" UNIQUE ("validationToken");


--
-- Name: verdict verdict_pkey; Type: CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY verdict
    ADD CONSTRAINT verdict_pkey PRIMARY KEY (id);


--
-- Name: idx_event_fts; Type: INDEX; Schema: public;
--

CREATE INDEX idx_event_fts ON article USING gin (to_tsvector('french'::regconfig, (((COALESCE(title, ''::character varying))::text || ' '::text) || COALESCE(summary, ''::text))));


--
-- Name: ix_review_articleId; Type: INDEX; Schema: public;
--

CREATE INDEX "ix_review_articleId" ON review USING btree ("articleId");


--
-- Name: ix_review_evaluationId; Type: INDEX; Schema: public;
--

CREATE INDEX "ix_review_evaluationId" ON review USING btree ("evaluationId");


--
-- Name: ix_review_userId; Type: INDEX; Schema: public;
--

CREATE INDEX "ix_review_userId" ON review USING btree ("userId");


--
-- Name: ix_review_verdictId; Type: INDEX; Schema: public;
--

CREATE INDEX "ix_review_verdictId" ON review USING btree ("verdictId");


--
-- Name: ix_role_userId; Type: INDEX; Schema: public;
--

CREATE INDEX "ix_role_userId" ON role USING btree ("userId");


--
-- Name: ix_transaction_native_transaction_id; Type: INDEX; Schema: public;
--

CREATE INDEX ix_transaction_native_transaction_id ON transaction USING btree (native_transaction_id);


--
-- Name: ix_verdict_articleId; Type: INDEX; Schema: public;
--

CREATE INDEX "ix_verdict_articleId" ON verdict USING btree ("articleId");


--
-- Name: review review_articleId_fkey; Type: FK CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY review
    ADD CONSTRAINT "review_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES article(id);


--
-- Name: review review_evaluationId_fkey; Type: FK CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY review
    ADD CONSTRAINT "review_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES evaluation(id);


--
-- Name: review review_userId_fkey; Type: FK CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY review
    ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id);


--
-- Name: review review_verdictId_fkey; Type: FK CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY review
    ADD CONSTRAINT "review_verdictId_fkey" FOREIGN KEY ("verdictId") REFERENCES verdict(id);


--
-- Name: role role_userId_fkey; Type: FK CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY role
    ADD CONSTRAINT "role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"(id);


--
-- Name: verdict verdict_articleId_fkey; Type: FK CONSTRAINT; Schema: public;
--

ALTER TABLE ONLY verdict
    ADD CONSTRAINT "verdict_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES article(id);

--
-- PostgreSQL database dump complete
--
