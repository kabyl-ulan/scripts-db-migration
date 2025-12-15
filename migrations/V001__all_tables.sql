-- public."Session" definition

-- Drop table

-- DROP TABLE public."Session";

CREATE TABLE public."Session" (
	id_session int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	login text NOT NULL,
	id_role int4 NOT NULL,
	id_user int4 NOT NULL,
	last_action timestamptz(6) NOT NULL,
	cookie varchar DEFAULT '-1'::integer NOT NULL,
	offline bool DEFAULT false NOT NULL,
	is_mobile bool DEFAULT false NOT NULL,
	CONSTRAINT "Session_pkey" PRIMARY KEY (id_session)
);
CREATE INDEX "Session_cookiex" ON public."Session" USING btree (cookie);


-- public."Session_log" definition

-- Drop table

-- DROP TABLE public."Session_log";

CREATE TABLE public."Session_log" (
	id_session_log int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	login text NOT NULL,
	id_role int4 NOT NULL,
	id_user int4 NOT NULL,
	log_time timestamptz(6) NOT NULL,
	is_mobile bool DEFAULT false NOT NULL,
	ip varchar DEFAULT '-1'::integer NOT NULL,
	"action" varchar(20) DEFAULT 'login'::character varying NULL, -- Action type: login, logout, token_refresh
	user_agent text NULL,
	user_type varchar(10) DEFAULT 'user'::character varying NULL, -- User type: user (employee) or student
	CONSTRAINT "Session_log_pkey" PRIMARY KEY (id_session_log)
);

-- Column comments

COMMENT ON COLUMN public."Session_log"."action" IS 'Action type: login, logout, token_refresh';
COMMENT ON COLUMN public."Session_log".user_type IS 'User type: user (employee) or student';


-- public."_migrations" definition

-- Drop table

-- DROP TABLE public."_migrations";

CREATE TABLE public."_migrations" (
	"version" int4 NOT NULL,
	description varchar(255) NOT NULL,
	filename varchar(255) NOT NULL,
	checksum varchar(32) NOT NULL,
	applied_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	execution_time_ms int4 NULL,
	CONSTRAINT "_migrations_pkey" PRIMARY KEY (version)
);


-- public.academic_department definition

-- Drop table

-- DROP TABLE public.academic_department;

CREATE TABLE public.academic_department (
	id_academic_department serial4 NOT NULL,
	academic_department_ky text NULL,
	academic_department_ru text NULL,
	academic_department_en text NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT academic_department_academic_department_en_key UNIQUE (academic_department_en),
	CONSTRAINT academic_department_academic_department_ky_key UNIQUE (academic_department_ky),
	CONSTRAINT academic_department_academic_department_ru_key UNIQUE (academic_department_ru),
	CONSTRAINT academic_department_pkey PRIMARY KEY (id_academic_department)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_academic_department BEFORE
UPDATE
    ON
    public.academic_department FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.auth_group definition

-- Drop table

-- DROP TABLE public.auth_group;

CREATE TABLE public.auth_group (
	id serial4 NOT NULL,
	"name" varchar(150) NOT NULL,
	CONSTRAINT auth_group_name_key UNIQUE (name),
	CONSTRAINT auth_group_pkey PRIMARY KEY (id)
);
CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


-- public.budget_contract definition

-- Drop table

-- DROP TABLE public.budget_contract;

CREATE TABLE public.budget_contract (
	id_budget_contract int4 NOT NULL,
	budget_contract_ky varchar(25) NULL,
	budget_contract_ru varchar(25) NULL,
	budget_contract_en varchar(25) NULL,
	CONSTRAINT budget_contract_pkey PRIMARY KEY (id_budget_contract)
);


-- public.citizenship definition

-- Drop table

-- DROP TABLE public.citizenship;

CREATE TABLE public.citizenship (
	id_citizenship serial4 NOT NULL,
	citizenship_ky text NOT NULL,
	citizenship_ru text NOT NULL,
	citizenship_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	iso_code text NULL,
	CONSTRAINT citizenship_citizenship_ky_citizenship_ru_citizenship_en_key UNIQUE (citizenship_ky, citizenship_ru, citizenship_en),
	CONSTRAINT citizenship_pkey PRIMARY KEY (id_citizenship)
);
COMMENT ON TABLE public.citizenship IS 'Гражданство студента на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_citizenship BEFORE
UPDATE
    ON
    public.citizenship FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.country definition

-- Drop table

-- DROP TABLE public.country;

CREATE TABLE public.country (
	id_country serial4 NOT NULL,
	country_ky text NOT NULL,
	country_ru text NOT NULL,
	country_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	iso_code text NULL,
	CONSTRAINT country_country_ky_country_ru_country_en_key UNIQUE (country_ky, country_ru, country_en),
	CONSTRAINT country_pkey PRIMARY KEY (id_country)
);
COMMENT ON TABLE public.country IS 'Страны на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_country BEFORE
UPDATE
    ON
    public.country FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.course definition

-- Drop table

-- DROP TABLE public.course;

CREATE TABLE public.course (
	id_course serial4 NOT NULL,
	course_ky varchar(15) NULL,
	course_ru varchar(15) NULL,
	course_en varchar(15) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT course_pkey PRIMARY KEY (id_course)
);
CREATE INDEX course_id_course_idx ON public.course USING btree (id_course);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_course BEFORE
UPDATE
    ON
    public.course FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.discipline definition

-- Drop table

-- DROP TABLE public.discipline;

CREATE TABLE public.discipline (
	id_discipline bigserial NOT NULL,
	discipline_ky text NOT NULL,
	discipline_ru text NOT NULL,
	discipline_en text NULL,
	created_date timestamp(6) DEFAULT timezone('Asia/Bishkek'::text, now()) NULL,
	upd_date timestamp(6) NULL,
	course bool DEFAULT false NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT discipline_pkey PRIMARY KEY (id_discipline)
);
CREATE INDEX discipline_discipline_ru_idx ON public.discipline USING btree (discipline_ru);
CREATE INDEX discipline_id_discipline_idx ON public.discipline USING btree (id_discipline);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_discipline BEFORE
UPDATE
    ON
    public.discipline FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.discipline_control definition

-- Drop table

-- DROP TABLE public.discipline_control;

CREATE TABLE public.discipline_control (
	id_discipline_control serial4 NOT NULL,
	discipline_control_ky varchar(255) NULL,
	discipline_control_ru varchar(255) NULL,
	discipline_control_en varchar(255) NULL,
	sort int4 DEFAULT 100 NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT discipline_control_pkey PRIMARY KEY (id_discipline_control)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_discipline_control BEFORE
UPDATE
    ON
    public.discipline_control FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.django_content_type definition

-- Drop table

-- DROP TABLE public.django_content_type;

CREATE TABLE public.django_content_type (
	id serial4 NOT NULL,
	app_label varchar(100) NOT NULL,
	model varchar(100) NOT NULL,
	CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model),
	CONSTRAINT django_content_type_pkey PRIMARY KEY (id)
);


-- public.django_migrations definition

-- Drop table

-- DROP TABLE public.django_migrations;

CREATE TABLE public.django_migrations (
	id bigserial NOT NULL,
	app varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	applied timestamptz NOT NULL,
	CONSTRAINT django_migrations_pkey PRIMARY KEY (id)
);


-- public.django_session definition

-- Drop table

-- DROP TABLE public.django_session;

CREATE TABLE public.django_session (
	session_key varchar(40) NOT NULL,
	session_data text NOT NULL,
	expire_date timestamptz NOT NULL,
	CONSTRAINT django_session_pkey PRIMARY KEY (session_key)
);
CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);
CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


-- public.document_type definition

-- Drop table

-- DROP TABLE public.document_type;

CREATE TABLE public.document_type (
	id_document_type serial4 NOT NULL,
	document_type_ky text NOT NULL,
	document_type_ru text NOT NULL,
	document_type_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT document_type_document_type_ky_document_type_ru_document_ty_key UNIQUE (document_type_ky, document_type_ru, document_type_en),
	CONSTRAINT document_type_pkey PRIMARY KEY (id_document_type)
);
COMMENT ON TABLE public.document_type IS 'Тип документа личности (паспорт, ID) на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_document_type BEFORE
UPDATE
    ON
    public.document_type FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.education_document_type definition

-- Drop table

-- DROP TABLE public.education_document_type;

CREATE TABLE public.education_document_type (
	id_education_document_type serial4 NOT NULL,
	document_type_ky text NOT NULL,
	document_type_ru text NOT NULL,
	document_type_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT education_document_type_document_type_ky_document_type_ru_d_key UNIQUE (document_type_ky, document_type_ru, document_type_en),
	CONSTRAINT education_document_type_pkey PRIMARY KEY (id_education_document_type)
);
COMMENT ON TABLE public.education_document_type IS 'Тип документа образования (аттестат, диплом, сертификат) на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_education_document_type BEFORE
UPDATE
    ON
    public.education_document_type FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.education_level definition

-- Drop table

-- DROP TABLE public.education_level;

CREATE TABLE public.education_level (
	id_education_level serial4 NOT NULL,
	education_level_ky varchar(255) NULL,
	education_level_ru varchar(255) NULL,
	education_level_en varchar(255) NULL,
	sort int4 DEFAULT 100 NOT NULL,
	letter varchar(2) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT education_level_education_level_ru_key UNIQUE (education_level_ru),
	CONSTRAINT education_level_pkey PRIMARY KEY (id_education_level)
);
CREATE INDEX education_level_id_education_level_idx ON public.education_level USING btree (id_education_level);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_education_level BEFORE
UPDATE
    ON
    public.education_level FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.education_period_month definition

-- Drop table

-- DROP TABLE public.education_period_month;

CREATE TABLE public.education_period_month (
	id_education_period_month serial4 NOT NULL,
	education_period_month_ky varchar(20) NOT NULL,
	education_period_month_ru varchar(20) NOT NULL,
	education_period_month_en varchar(20) NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT education_period_month_education_period_month_ky_key UNIQUE (education_period_month_ky),
	CONSTRAINT education_period_month_pkey PRIMARY KEY (id_education_period_month)
);
CREATE INDEX education_period_month_id_education_period_month_idx ON public.education_period_month USING btree (id_education_period_month);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_education_period_month BEFORE
UPDATE
    ON
    public.education_period_month FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.education_period_year definition

-- Drop table

-- DROP TABLE public.education_period_year;

CREATE TABLE public.education_period_year (
	id_education_period_year serial4 NOT NULL,
	education_period_year_ky varchar(10) NOT NULL,
	education_period_year_ru varchar(10) NOT NULL,
	education_period_year_en varchar(10) NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT education_period_year_education_period_year_ky_key UNIQUE (education_period_year_ky),
	CONSTRAINT education_period_year_pkey PRIMARY KEY (id_education_period_year)
);
CREATE INDEX education_period_year_id_education_period_year_idx ON public.education_period_year USING btree (id_education_period_year);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_education_period_year BEFORE
UPDATE
    ON
    public.education_period_year FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.educational_plan_component definition

-- Drop table

-- DROP TABLE public.educational_plan_component;

CREATE TABLE public.educational_plan_component (
	id_educational_plan_component serial4 NOT NULL,
	educational_plan_component_ky varchar(255) NULL,
	educational_plan_component_ru varchar(255) NULL,
	educational_plan_component_en varchar(255) NULL,
	s_educational_plan_component_ky varchar(5) NULL,
	s_educational_plan_component_ru varchar(5) NULL,
	s_educational_plan_component_en varchar(5) NULL,
	"comment" text NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT educational_plan_component_educational_plan_component_en_key UNIQUE (educational_plan_component_en),
	CONSTRAINT educational_plan_component_educational_plan_component_ky_key UNIQUE (educational_plan_component_ky),
	CONSTRAINT educational_plan_component_educational_plan_component_ru_key UNIQUE (educational_plan_component_ru),
	CONSTRAINT educational_plan_component_pkey PRIMARY KEY (id_educational_plan_component)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_educational_plan_component BEFORE
UPDATE
    ON
    public.educational_plan_component FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.educational_plan_field_meta definition

-- Drop table

-- DROP TABLE public.educational_plan_field_meta;

CREATE TABLE public.educational_plan_field_meta (
	id_field serial4 NOT NULL,
	field_key varchar(50) NOT NULL,
	field_type varchar(20) DEFAULT 'number'::character varying NOT NULL,
	label_ru varchar(100) NOT NULL,
	label_ky varchar(100) NOT NULL,
	label_en varchar(100) NOT NULL,
	short_label_ru varchar(30) NOT NULL,
	short_label_ky varchar(30) NOT NULL,
	short_label_en varchar(30) NOT NULL,
	sort_order int4 DEFAULT 100 NOT NULL,
	is_active bool DEFAULT true NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT educational_plan_field_meta_field_key_key UNIQUE (field_key),
	CONSTRAINT educational_plan_field_meta_pkey PRIMARY KEY (id_field)
);


-- public.educational_plan_log definition

-- Drop table

-- DROP TABLE public.educational_plan_log;

CREATE TABLE public.educational_plan_log (
	id_log bigserial NOT NULL,
	id_educational_plan int8 NOT NULL,
	"action" varchar(10) NOT NULL,
	user_name varchar(100) DEFAULT CURRENT_USER NULL,
	log_date timestamp DEFAULT now() NOT NULL,
	changes jsonb NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT educational_plan_log_pkey PRIMARY KEY (id_log)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_educational_plan_log BEFORE
UPDATE
    ON
    public.educational_plan_log FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.educational_plan_status definition

-- Drop table

-- DROP TABLE public.educational_plan_status;

CREATE TABLE public.educational_plan_status (
	id_educational_plan_status int4 NOT NULL,
	educational_plan_status_ky varchar(50) NULL,
	educational_plan_status_ru varchar(50) NULL,
	educational_plan_status_en varchar(50) NULL,
	description text NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT educational_plan_status_pkey PRIMARY KEY (id_educational_plan_status)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_educational_plan_status BEFORE
UPDATE
    ON
    public.educational_plan_status FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.gender definition

-- Drop table

-- DROP TABLE public.gender;

CREATE TABLE public.gender (
	id_gender serial4 NOT NULL,
	gender_ky varchar(10) NULL,
	gender_ru varchar(10) NULL,
	gender_en varchar(10) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT gender_pkey PRIMARY KEY (id_gender)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_gender BEFORE
UPDATE
    ON
    public.gender FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.hitcount_blacklist_ip definition

-- Drop table

-- DROP TABLE public.hitcount_blacklist_ip;

CREATE TABLE public.hitcount_blacklist_ip (
	id bigserial NOT NULL,
	ip varchar(40) NOT NULL,
	CONSTRAINT hitcount_blacklist_ip_ip_key UNIQUE (ip),
	CONSTRAINT hitcount_blacklist_ip_pkey PRIMARY KEY (id)
);
CREATE INDEX hitcount_blacklist_ip_ip_b1955e95_like ON public.hitcount_blacklist_ip USING btree (ip varchar_pattern_ops);


-- public.hitcount_blacklist_user_agent definition

-- Drop table

-- DROP TABLE public.hitcount_blacklist_user_agent;

CREATE TABLE public.hitcount_blacklist_user_agent (
	id bigserial NOT NULL,
	user_agent varchar(255) NOT NULL,
	CONSTRAINT hitcount_blacklist_user_agent_pkey PRIMARY KEY (id),
	CONSTRAINT hitcount_blacklist_user_agent_user_agent_key UNIQUE (user_agent)
);
CREATE INDEX hitcount_blacklist_user_agent_user_agent_fbf2061c_like ON public.hitcount_blacklist_user_agent USING btree (user_agent varchar_pattern_ops);


-- public.industry definition

-- Drop table

-- DROP TABLE public.industry;

CREATE TABLE public.industry (
	id_industry serial4 NOT NULL,
	industry_ky varchar(255) NULL,
	industry_ru varchar(255) NULL,
	industry_en varchar(255) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT industry_industry_ru_key UNIQUE (industry_ru),
	CONSTRAINT industry_pkey PRIMARY KEY (id_industry)
);
CREATE INDEX industry_id_industry_idx ON public.industry USING btree (id_industry);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_industry BEFORE
UPDATE
    ON
    public.industry FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public."language" definition

-- Drop table

-- DROP TABLE public."language";

CREATE TABLE public."language" (
	id_language serial4 NOT NULL,
	language_ky varchar(100) NULL, -- Название языка на кыргызском
	language_ru varchar(100) NULL, -- Название языка на русском
	language_en varchar(100) NULL, -- Название языка на английском
	is_active bool DEFAULT true NULL, -- Флаг активности языка
	created_at timestamptz DEFAULT timezone('Asia/Bishkek'::text, now()) NULL,
	updated_at timestamptz NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT language_pkey PRIMARY KEY (id_language)
);
CREATE INDEX idx_language_is_active ON public.language USING btree (is_active);
CREATE UNIQUE INDEX idx_language_unique_names ON public.language USING btree (language_ky, language_ru, language_en);
COMMENT ON TABLE public."language" IS 'Справочник языков';

-- Column comments

COMMENT ON COLUMN public."language".language_ky IS 'Название языка на кыргызском';
COMMENT ON COLUMN public."language".language_ru IS 'Название языка на русском';
COMMENT ON COLUMN public."language".language_en IS 'Название языка на английском';
COMMENT ON COLUMN public."language".is_active IS 'Флаг активности языка';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_language BEFORE
UPDATE
    ON
    public.language FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.learning definition

-- Drop table

-- DROP TABLE public.learning;

CREATE TABLE public.learning (
	id_learning serial4 NOT NULL,
	learning_ky text NULL,
	learning_ru text NULL,
	learning_en text NULL,
	sort int4 DEFAULT 100 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT learning_id_learning_learning_ru_key UNIQUE (id_learning, learning_ru),
	CONSTRAINT learning_pkey PRIMARY KEY (id_learning)
);
CREATE INDEX learning_id_learning_idx ON public.learning USING btree (id_learning);
CREATE INDEX learning_sort_idx ON public.learning USING btree (sort);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_learning BEFORE
UPDATE
    ON
    public.learning FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.lesson_type definition

-- Drop table

-- DROP TABLE public.lesson_type;

CREATE TABLE public.lesson_type (
	id_lesson_type int4 NOT NULL, -- Тип урока
	lesson_type_ky varchar(50) NULL,
	lesson_type_ru varchar(50) NULL,
	lesson_type_en varchar(50) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT lesson_type_pkey PRIMARY KEY (id_lesson_type)
);

-- Column comments

COMMENT ON COLUMN public.lesson_type.id_lesson_type IS 'Тип урока';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_lesson_type BEFORE
UPDATE
    ON
    public.lesson_type FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.main_banner definition

-- Drop table

-- DROP TABLE public.main_banner;

CREATE TABLE public.main_banner (
	id bigserial NOT NULL,
	title varchar(255) NOT NULL,
	title_ky varchar(255) NULL,
	title_ru varchar(255) NULL,
	link varchar(200) NOT NULL,
	img varchar(100) NOT NULL,
	"order" int2 NOT NULL,
	CONSTRAINT main_banner_order_check CHECK (("order" >= 0)),
	CONSTRAINT main_banner_pkey PRIMARY KEY (id)
);


-- public.main_body definition

-- Drop table

-- DROP TABLE public.main_body;

CREATE TABLE public.main_body (
	id bigserial NOT NULL,
	"name" varchar(255) NOT NULL,
	name_ky varchar(255) NULL,
	name_ru varchar(255) NULL,
	link varchar(200) NOT NULL,
	img varchar(100) NOT NULL,
	"order" int2 NOT NULL,
	is_active bool NOT NULL,
	CONSTRAINT main_body_order_check CHECK (("order" >= 0)),
	CONSTRAINT main_body_pkey PRIMARY KEY (id)
);


-- public.main_contact definition

-- Drop table

-- DROP TABLE public.main_contact;

CREATE TABLE public.main_contact (
	id bigserial NOT NULL,
	"name" varchar(255) NOT NULL,
	name_ky varchar(255) NULL,
	name_ru varchar(255) NULL,
	phone varchar(20) NULL,
	fax varchar(20) NULL,
	email varchar(254) NULL,
	"order" int2 NOT NULL,
	CONSTRAINT main_contact_order_check CHECK (("order" >= 0)),
	CONSTRAINT main_contact_pkey PRIMARY KEY (id)
);


-- public.main_direction definition

-- Drop table

-- DROP TABLE public.main_direction;

CREATE TABLE public.main_direction (
	id bigserial NOT NULL,
	"name" varchar(255) NOT NULL,
	name_ky varchar(255) NULL,
	name_ru varchar(255) NULL,
	CONSTRAINT main_direction_name_key UNIQUE (name),
	CONSTRAINT main_direction_name_ky_key UNIQUE (name_ky),
	CONSTRAINT main_direction_name_ru_key UNIQUE (name_ru),
	CONSTRAINT main_direction_pkey PRIMARY KEY (id)
);
CREATE INDEX main_direction_name_3d921ec8_like ON public.main_direction USING btree (name varchar_pattern_ops);
CREATE INDEX main_direction_name_ky_f7162d94_like ON public.main_direction USING btree (name_ky varchar_pattern_ops);
CREATE INDEX main_direction_name_ru_a66b46ec_like ON public.main_direction USING btree (name_ru varchar_pattern_ops);


-- public.main_district definition

-- Drop table

-- DROP TABLE public.main_district;

CREATE TABLE public.main_district (
	id bigserial NOT NULL,
	region varchar(45) NOT NULL,
	"name" varchar(55) NOT NULL,
	CONSTRAINT main_district_pkey PRIMARY KEY (id)
);


-- public.main_emailreceiver definition

-- Drop table

-- DROP TABLE public.main_emailreceiver;

CREATE TABLE public.main_emailreceiver (
	id bigserial NOT NULL,
	email varchar(254) NOT NULL,
	"name" varchar(200) NULL,
	CONSTRAINT main_emailreceiver_email_key UNIQUE (email),
	CONSTRAINT main_emailreceiver_pkey PRIMARY KEY (id)
);
CREATE INDEX main_emailreceiver_email_d4970798_like ON public.main_emailreceiver USING btree (email varchar_pattern_ops);


-- public.main_faq definition

-- Drop table

-- DROP TABLE public.main_faq;

CREATE TABLE public.main_faq (
	id bigserial NOT NULL,
	question varchar(500) NOT NULL,
	question_ky varchar(500) NULL,
	question_ru varchar(500) NULL,
	answer text NOT NULL,
	answer_ky text NULL,
	answer_ru text NULL,
	"order" int2 NOT NULL,
	CONSTRAINT main_faq_order_check CHECK (("order" >= 0)),
	CONSTRAINT main_faq_pkey PRIMARY KEY (id)
);


-- public.main_gallerycategory definition

-- Drop table

-- DROP TABLE public.main_gallerycategory;

CREATE TABLE public.main_gallerycategory (
	id bigserial NOT NULL,
	"name" varchar(255) NOT NULL,
	slug varchar(50) NOT NULL,
	name_ky varchar(255) NULL,
	name_ru varchar(255) NULL,
	CONSTRAINT main_gallerycategory_pkey PRIMARY KEY (id),
	CONSTRAINT main_gallerycategory_slug_key UNIQUE (slug)
);
CREATE INDEX main_gallerycategory_slug_64761f64_like ON public.main_gallerycategory USING btree (slug varchar_pattern_ops);


-- public.main_kind definition

-- Drop table

-- DROP TABLE public.main_kind;

CREATE TABLE public.main_kind (
	id bigserial NOT NULL,
	"name" varchar(255) NOT NULL,
	name_ky varchar(255) NULL,
	name_ru varchar(255) NULL,
	CONSTRAINT main_kind_name_key UNIQUE (name),
	CONSTRAINT main_kind_name_ky_key UNIQUE (name_ky),
	CONSTRAINT main_kind_name_ru_key UNIQUE (name_ru),
	CONSTRAINT main_kind_pkey PRIMARY KEY (id)
);
CREATE INDEX main_kind_name_ba0a10c8_like ON public.main_kind USING btree (name varchar_pattern_ops);
CREATE INDEX main_kind_name_ky_d7b45c86_like ON public.main_kind USING btree (name_ky varchar_pattern_ops);
CREATE INDEX main_kind_name_ru_208d6182_like ON public.main_kind USING btree (name_ru varchar_pattern_ops);


-- public.main_kindoffeedback definition

-- Drop table

-- DROP TABLE public.main_kindoffeedback;

CREATE TABLE public.main_kindoffeedback (
	id bigserial NOT NULL,
	"name" varchar(255) NOT NULL,
	name_ky varchar(255) NULL,
	name_ru varchar(255) NULL,
	CONSTRAINT main_kindoffeedback_name_key UNIQUE (name),
	CONSTRAINT main_kindoffeedback_name_ky_key UNIQUE (name_ky),
	CONSTRAINT main_kindoffeedback_name_ru_key UNIQUE (name_ru),
	CONSTRAINT main_kindoffeedback_pkey PRIMARY KEY (id)
);
CREATE INDEX main_kindoffeedback_name_ce790f4e_like ON public.main_kindoffeedback USING btree (name varchar_pattern_ops);
CREATE INDEX main_kindoffeedback_name_ky_aafffdae_like ON public.main_kindoffeedback USING btree (name_ky varchar_pattern_ops);
CREATE INDEX main_kindoffeedback_name_ru_06a3e4d6_like ON public.main_kindoffeedback USING btree (name_ru varchar_pattern_ops);


-- public.main_monitoring definition

-- Drop table

-- DROP TABLE public.main_monitoring;

CREATE TABLE public.main_monitoring (
	id bigserial NOT NULL,
	title varchar(500) NOT NULL,
	title_ky varchar(500) NULL,
	title_ru varchar(500) NULL,
	attachment varchar(100) NOT NULL,
	attachment_ky varchar(100) NULL,
	attachment_ru varchar(100) NULL,
	CONSTRAINT main_monitoring_pkey PRIMARY KEY (id)
);


-- public.main_program definition

-- Drop table

-- DROP TABLE public.main_program;

CREATE TABLE public.main_program (
	id bigserial NOT NULL,
	title varchar(255) NOT NULL,
	title_ky varchar(255) NULL,
	title_ru varchar(255) NULL,
	img varchar(100) NOT NULL,
	annotation text NOT NULL,
	annotation_ky text NULL,
	annotation_ru text NULL,
	"content" text NOT NULL,
	content_ky text NULL,
	content_ru text NULL,
	"order" int2 NOT NULL,
	CONSTRAINT main_program_pkey PRIMARY KEY (id)
);


-- public.main_recommendation definition

-- Drop table

-- DROP TABLE public.main_recommendation;

CREATE TABLE public.main_recommendation (
	id bigserial NOT NULL,
	title varchar(255) NOT NULL,
	title_ky varchar(255) NULL,
	title_ru varchar(255) NULL,
	link varchar(200) NOT NULL,
	img varchar(100) NOT NULL,
	"order" int2 NOT NULL,
	is_active bool NOT NULL,
	CONSTRAINT main_recommendation_order_check CHECK (("order" >= 0)),
	CONSTRAINT main_recommendation_pkey PRIMARY KEY (id)
);


-- public.main_user definition

-- Drop table

-- DROP TABLE public.main_user;

CREATE TABLE public.main_user (
	id bigserial NOT NULL,
	"password" varchar(128) NOT NULL,
	last_login timestamptz NULL,
	is_superuser bool NOT NULL,
	username varchar(150) NOT NULL,
	first_name varchar(150) NOT NULL,
	last_name varchar(150) NOT NULL,
	email varchar(254) NOT NULL,
	is_staff bool NOT NULL,
	is_active bool NOT NULL,
	date_joined timestamptz NOT NULL,
	CONSTRAINT main_user_pkey PRIMARY KEY (id),
	CONSTRAINT main_user_username_key UNIQUE (username)
);
CREATE INDEX main_user_username_6330637b_like ON public.main_user USING btree (username varchar_pattern_ops);


-- public.marital_status definition

-- Drop table

-- DROP TABLE public.marital_status;

CREATE TABLE public.marital_status (
	id_marital_status serial4 NOT NULL,
	status_ky text NOT NULL,
	status_ru text NOT NULL,
	status_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT marital_status_pkey PRIMARY KEY (id_marital_status),
	CONSTRAINT marital_status_status_ky_status_ru_status_en_key UNIQUE (status_ky, status_ru, status_en)
);
COMMENT ON TABLE public.marital_status IS 'Семейное положение студента на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_marital_status BEFORE
UPDATE
    ON
    public.marital_status FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.medical_certificate_type definition

-- Drop table

-- DROP TABLE public.medical_certificate_type;

CREATE TABLE public.medical_certificate_type (
	id_medical_certificate_type serial4 NOT NULL, -- Уникальный идентификатор типа медицинской справки
	medical_certificate_type_ky text NULL, -- Название типа медицинской справки на кыргызском языке
	medical_certificate_type_ru text NULL, -- Название типа медицинской справки на русском языке (уникальное)
	medical_certificate_type_en text NULL, -- Название типа медицинской справки на английском языке
	CONSTRAINT medical_certificate_type_medical_certificate_type_ru_key UNIQUE (medical_certificate_type_ru),
	CONSTRAINT medical_certificate_type_pkey PRIMARY KEY (id_medical_certificate_type)
);
COMMENT ON TABLE public.medical_certificate_type IS 'Справочные данные о типах медицинских справок';

-- Column comments

COMMENT ON COLUMN public.medical_certificate_type.id_medical_certificate_type IS 'Уникальный идентификатор типа медицинской справки';
COMMENT ON COLUMN public.medical_certificate_type.medical_certificate_type_ky IS 'Название типа медицинской справки на кыргызском языке';
COMMENT ON COLUMN public.medical_certificate_type.medical_certificate_type_ru IS 'Название типа медицинской справки на русском языке (уникальное)';
COMMENT ON COLUMN public.medical_certificate_type.medical_certificate_type_en IS 'Название типа медицинской справки на английском языке';


-- public.military_document_type definition

-- Drop table

-- DROP TABLE public.military_document_type;

CREATE TABLE public.military_document_type (
	id_military_document_type serial4 NOT NULL,
	document_type_ky text NOT NULL,
	document_type_ru text NOT NULL,
	document_type_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT military_document_type_document_type_ky_document_type_ru_do_key UNIQUE (document_type_ky, document_type_ru, document_type_en),
	CONSTRAINT military_document_type_pkey PRIMARY KEY (id_military_document_type)
);
COMMENT ON TABLE public.military_document_type IS 'Тип военного документа на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_military_document_type BEFORE
UPDATE
    ON
    public.military_document_type FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.military_office definition

-- Drop table

-- DROP TABLE public.military_office;

CREATE TABLE public.military_office (
	id_military_office serial4 NOT NULL,
	office_name_ky text NOT NULL,
	office_name_ru text NOT NULL,
	office_name_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT military_office_office_name_ky_office_name_ru_office_name_e_key UNIQUE (office_name_ky, office_name_ru, office_name_en),
	CONSTRAINT military_office_pkey PRIMARY KEY (id_military_office)
);
COMMENT ON TABLE public.military_office IS 'Военные офисы / отделы на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_military_office BEFORE
UPDATE
    ON
    public.military_office FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.module_fields_name definition

-- Drop table

-- DROP TABLE public.module_fields_name;

CREATE TABLE public.module_fields_name (
	id_module_fields_name bigserial NOT NULL,
	module_fields_name_ky varchar(100) NULL,
	module_fields_name_ru varchar(100) NULL,
	module_fields_name_en varchar(100) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT module_fields_name_module_fields_name_ru_key UNIQUE (module_fields_name_ru),
	CONSTRAINT module_fields_name_pkey PRIMARY KEY (id_module_fields_name)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_module_fields_name BEFORE
UPDATE
    ON
    public.module_fields_name FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.module_name definition

-- Drop table

-- DROP TABLE public.module_name;

CREATE TABLE public.module_name (
	id_module_name serial4 NOT NULL,
	module_name_ky varchar(100) DEFAULT ''::character varying NULL,
	module_name_ru varchar(100) DEFAULT ''::character varying NULL,
	module_name_en varchar(100) DEFAULT ''::character varying NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT module_name_pkey PRIMARY KEY (id_module_name)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_module_name BEFORE
UPDATE
    ON
    public.module_name FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.movement_category definition

-- Drop table

-- DROP TABLE public.movement_category;

CREATE TABLE public.movement_category (
	id_movement_category int4 NOT NULL,
	movement_category_ky varchar(25) NULL,
	movement_category_ru varchar(25) NULL,
	movement_category_en varchar(25) NULL,
	CONSTRAINT movement_category_pkey PRIMARY KEY (id_movement_category)
);


-- public.nationality definition

-- Drop table

-- DROP TABLE public.nationality;

CREATE TABLE public.nationality (
	id_nationality serial4 NOT NULL,
	nationality_ky text NOT NULL,
	nationality_ru text NOT NULL,
	nationality_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT nationality_nationality_ky_nationality_ru_nationality_en_key UNIQUE (nationality_ky, nationality_ru, nationality_en),
	CONSTRAINT nationality_pkey PRIMARY KEY (id_nationality)
);
COMMENT ON TABLE public.nationality IS 'Национальность студента на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_nationality BEFORE
UPDATE
    ON
    public.nationality FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.org_manager_status definition

-- Drop table

-- DROP TABLE public.org_manager_status;

CREATE TABLE public.org_manager_status (
	id_org_manager_status serial4 NOT NULL,
	org_manager_status_ky varchar(50) NULL,
	org_manager_status_ru varchar(50) NULL,
	org_manager_status_en varchar(50) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT org_manager_status_pkey PRIMARY KEY (id_org_manager_status)
);
CREATE INDEX org_manager_status_id_org_manager_status_idx ON public.org_manager_status USING btree (id_org_manager_status);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_org_manager_status BEFORE
UPDATE
    ON
    public.org_manager_status FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.org_type definition

-- Drop table

-- DROP TABLE public.org_type;

CREATE TABLE public.org_type (
	id_org_type serial4 NOT NULL,
	org_type_ky varchar(10) NOT NULL,
	org_type_ru varchar(10) NOT NULL,
	org_type_en varchar(10) NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT org_type_org_type_ru_key UNIQUE (org_type_ru),
	CONSTRAINT org_type_pkey PRIMARY KEY (id_org_type)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_org_type BEFORE
UPDATE
    ON
    public.org_type FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.ownership definition

-- Drop table

-- DROP TABLE public.ownership;

CREATE TABLE public.ownership (
	id_ownership serial4 NOT NULL, -- Форма собственности
	ownership_ky varchar(50) NULL,
	ownership_ru varchar(50) NULL,
	ownership_en varchar(50) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT ownership_ownership_ru_key UNIQUE (ownership_ru),
	CONSTRAINT ownership_pkey PRIMARY KEY (id_ownership)
);
CREATE INDEX ownership_id_ownership_idx ON public.ownership USING btree (id_ownership);

-- Column comments

COMMENT ON COLUMN public.ownership.id_ownership IS 'Форма собственности';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_ownership BEFORE
UPDATE
    ON
    public.ownership FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public."position" definition

-- Drop table

-- DROP TABLE public."position";

CREATE TABLE public."position" (
	id_position serial4 NOT NULL,
	position_ky varchar(255) NOT NULL,
	position_ru varchar(255) NOT NULL,
	position_en varchar(255) NOT NULL,
	sort int4 DEFAULT 1000 NULL,
	CONSTRAINT position_pkey PRIMARY KEY (id_position),
	CONSTRAINT position_position_ru_key UNIQUE (position_ru)
);
CREATE INDEX position_sort_idx ON public."position" USING btree (sort);
COMMENT ON TABLE public."position" IS 'Справочник должностей';


-- public."role" definition

-- Drop table

-- DROP TABLE public."role";

CREATE TABLE public."role" (
	id_role serial4 NOT NULL,
	"role" varchar(20) NULL,
	description_ru varchar(50) NULL,
	description_kg varchar(255) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT role_pkey PRIMARY KEY (id_role),
	CONSTRAINT role_role_key UNIQUE (role)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_role BEFORE
UPDATE
    ON
    public.role FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.semester definition

-- Drop table

-- DROP TABLE public.semester;

CREATE TABLE public.semester (
	id_semester serial4 NOT NULL,
	semester_ky varchar(15) NULL,
	semester_ru varchar(15) NULL,
	semester_en varchar(15) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT semester_pkey PRIMARY KEY (id_semester)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_semester BEFORE
UPDATE
    ON
    public.semester FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.special_status definition

-- Drop table

-- DROP TABLE public.special_status;

CREATE TABLE public.special_status (
	id_special_status serial4 NOT NULL,
	status_ky text NULL,
	status_ru text NOT NULL,
	status_en text NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	description text NULL,
	CONSTRAINT special_status_pkey PRIMARY KEY (id_special_status),
	CONSTRAINT special_status_status_ky_status_ru_status_en_key UNIQUE (status_ky, status_ru, status_en)
);
COMMENT ON TABLE public.special_status IS 'Особый статус студента (обычный, инвалид, сирота) на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_special_status BEFORE
UPDATE
    ON
    public.special_status FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.staff_category definition

-- Drop table

-- DROP TABLE public.staff_category;

CREATE TABLE public.staff_category (
	id_staff_category serial4 NOT NULL,
	staff_category_ky text NULL,
	staff_category_ru text NULL,
	staff_category_en text NULL,
	note text NULL,
	CONSTRAINT staff_category_pkey PRIMARY KEY (id_staff_category),
	CONSTRAINT staff_category_staff_category_ru_key UNIQUE (staff_category_ru)
);
COMMENT ON TABLE public.staff_category IS 'Категории персонала: ТОП, МОП, ППС, вспомогательный, хозчасть и т.д.';


-- public."structure" definition

-- Drop table

-- DROP TABLE public."structure";

CREATE TABLE public."structure" (
	id_structure serial4 NOT NULL,
	structure_ky text NULL,
	structure_ru text NULL,
	structure_en text NULL,
	sort int4 DEFAULT 0 NULL, -- Порядок сортировки
	CONSTRAINT structure_pkey PRIMARY KEY (id_structure),
	CONSTRAINT structure_structure_ru_key UNIQUE (structure_ru)
);
COMMENT ON TABLE public."structure" IS 'Иерархическая структура университета (ректорат, деканат, отделы)';

-- Column comments

COMMENT ON COLUMN public."structure".sort IS 'Порядок сортировки';


-- public.user_table definition

-- Drop table

-- DROP TABLE public.user_table;

CREATE TABLE public.user_table (
	id_user_table int4 DEFAULT nextval('user_object_type_id_object_type_seq'::regclass) NOT NULL,
	user_table varchar(50) NOT NULL,
	note text NULL,
	CONSTRAINT user_object_type_pkey PRIMARY KEY (id_user_table),
	CONSTRAINT user_table_user_table_key UNIQUE (user_table)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id_users serial4 NOT NULL,
	surname varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	patronymic varchar(100) NULL,
	pin int8 NOT NULL,
	"password" varchar(255) NULL,
	active bool DEFAULT true NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT users_pin_key UNIQUE (pin),
	CONSTRAINT users_pkey PRIMARY KEY (id_users)
);
CREATE INDEX users_active_idx ON public.users USING btree (active);
CREATE INDEX users_pin_idx ON public.users USING btree (pin, password);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_users BEFORE
UPDATE
    ON
    public.users FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.year_half definition

-- Drop table

-- DROP TABLE public.year_half;

CREATE TABLE public.year_half (
	id_year_half serial4 NOT NULL,
	year_half_ky varchar(50) NULL,
	year_half_ru varchar(50) NULL,
	year_half_en varchar(50) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT year_half_en_uniq UNIQUE (year_half_en),
	CONSTRAINT year_half_ky_uniq UNIQUE (year_half_ky),
	CONSTRAINT year_half_pkey PRIMARY KEY (id_year_half),
	CONSTRAINT year_half_ru_uniq UNIQUE (year_half_ru)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_year_half BEFORE
UPDATE
    ON
    public.year_half FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.years definition

-- Drop table

-- DROP TABLE public.years;

CREATE TABLE public.years (
	id_years serial4 NOT NULL,
	sh_years int4 NULL,
	study_year varchar(9) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT years_pkey PRIMARY KEY (id_years),
	CONSTRAINT years_sh_years_key UNIQUE (sh_years),
	CONSTRAINT years_years_key UNIQUE (study_year)
);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_years BEFORE
UPDATE
    ON
    public.years FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.auth_permission definition

-- Drop table

-- DROP TABLE public.auth_permission;

CREATE TABLE public.auth_permission (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	content_type_id int4 NOT NULL,
	codename varchar(100) NOT NULL,
	CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename),
	CONSTRAINT auth_permission_pkey PRIMARY KEY (id),
	CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


-- public.course_year_half_semester definition

-- Drop table

-- DROP TABLE public.course_year_half_semester;

CREATE TABLE public.course_year_half_semester (
	id_course int4 NOT NULL,
	id_year_half int4 NOT NULL,
	id_semester int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT pk_rate_year_half_semester PRIMARY KEY (id_course, id_year_half, id_semester),
	CONSTRAINT rate_year_half_semester_id_course_id_year_half_id_semester_key UNIQUE (id_course, id_year_half, id_semester),
	CONSTRAINT fk_rate FOREIGN KEY (id_course) REFERENCES public.course(id_course),
	CONSTRAINT fk_semester FOREIGN KEY (id_semester) REFERENCES public.semester(id_semester),
	CONSTRAINT fk_year_half FOREIGN KEY (id_year_half) REFERENCES public.year_half(id_year_half)
);
CREATE INDEX course_year_half_semester_id_course_id_year_half_id_semeste_idx ON public.course_year_half_semester USING btree (id_course, id_year_half, id_semester);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_course_year_half_semester BEFORE
UPDATE
    ON
    public.course_year_half_semester FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.discipline_academic_department definition

-- Drop table

-- DROP TABLE public.discipline_academic_department;

CREATE TABLE public.discipline_academic_department (
	id_discipline_academic_department int8 DEFAULT nextval('discipline_academic_departmen_id_discipline_academic_depart_seq'::regclass) NOT NULL,
	id_discipline int8 NOT NULL,
	id_academic_department int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT discipline_academic_department_pkey PRIMARY KEY (id_discipline_academic_department),
	CONSTRAINT discipline_academic_department_unique UNIQUE (id_discipline, id_academic_department),
	CONSTRAINT discipline_academic_department_department_fk FOREIGN KEY (id_academic_department) REFERENCES public.academic_department(id_academic_department) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT discipline_academic_department_discipline_fk FOREIGN KEY (id_discipline) REFERENCES public.discipline(id_discipline) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX idx_discipline_academic_department_pair ON public.discipline_academic_department USING btree (id_discipline, id_academic_department);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_discipline_academic_department BEFORE
UPDATE
    ON
    public.discipline_academic_department FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.discipline_topic definition

-- Drop table

-- DROP TABLE public.discipline_topic;

CREATE TABLE public.discipline_topic (
	id_discipline_topic bigserial NOT NULL, -- Уникальный идентификатор темы
	id_discipline int4 NOT NULL, -- Ссылка на дисциплину
	id_educational_plan int8 NULL, -- Опционально: ссылка на учебный план
	topic_number int4 NOT NULL, -- Номер темы (порядок в курсе)
	topic_name varchar(500) NOT NULL, -- Название темы
	description text NULL, -- Краткое содержание темы
	hours float4 DEFAULT 0 NULL, -- Всего часов
	lecture_hours float4 DEFAULT 0 NULL, -- Лекции
	practice_hours float4 DEFAULT 0 NULL, -- Практика
	lab_hours float4 DEFAULT 0 NULL, -- Лабораторные
	seminar_hours float4 DEFAULT 0 NULL, -- Семинары
	selfstudy_hours float4 DEFAULT 0 NULL, -- Самостоятельная работа
	is_controlled bool DEFAULT false NULL, -- Проверяется ли тема (тест/контрольная)
	control_type varchar(100) NULL, -- Тип контроля (тест, проект, эссе и т.п.)
	files jsonb NULL, -- Прикреплённые материалы (методички, презентации)
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT chk_discipline_topic_hours CHECK ((hours >= ((((COALESCE(lecture_hours, (0)::real) + COALESCE(practice_hours, (0)::real)) + COALESCE(lab_hours, (0)::real)) + COALESCE(seminar_hours, (0)::real)) + COALESCE(selfstudy_hours, (0)::real)))),
	CONSTRAINT discipline_topic_pkey PRIMARY KEY (id_discipline_topic),
	CONSTRAINT unq_discipline_topic_number UNIQUE (id_discipline, topic_number),
	CONSTRAINT fk_discipline_topic_discipline FOREIGN KEY (id_discipline) REFERENCES public.discipline(id_discipline) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX idx_discipline_topic_discipline_plan ON public.discipline_topic USING btree (id_discipline, id_educational_plan);
CREATE INDEX idx_discipline_topic_topic_number ON public.discipline_topic USING btree (topic_number);

-- Column comments

COMMENT ON COLUMN public.discipline_topic.id_discipline_topic IS 'Уникальный идентификатор темы';
COMMENT ON COLUMN public.discipline_topic.id_discipline IS 'Ссылка на дисциплину';
COMMENT ON COLUMN public.discipline_topic.id_educational_plan IS 'Опционально: ссылка на учебный план';
COMMENT ON COLUMN public.discipline_topic.topic_number IS 'Номер темы (порядок в курсе)';
COMMENT ON COLUMN public.discipline_topic.topic_name IS 'Название темы';
COMMENT ON COLUMN public.discipline_topic.description IS 'Краткое содержание темы';
COMMENT ON COLUMN public.discipline_topic.hours IS 'Всего часов';
COMMENT ON COLUMN public.discipline_topic.lecture_hours IS 'Лекции';
COMMENT ON COLUMN public.discipline_topic.practice_hours IS 'Практика';
COMMENT ON COLUMN public.discipline_topic.lab_hours IS 'Лабораторные';
COMMENT ON COLUMN public.discipline_topic.seminar_hours IS 'Семинары';
COMMENT ON COLUMN public.discipline_topic.selfstudy_hours IS 'Самостоятельная работа';
COMMENT ON COLUMN public.discipline_topic.is_controlled IS 'Проверяется ли тема (тест/контрольная)';
COMMENT ON COLUMN public.discipline_topic.control_type IS 'Тип контроля (тест, проект, эссе и т.п.)';
COMMENT ON COLUMN public.discipline_topic.files IS 'Прикреплённые материалы (методички, презентации)';

-- Table Triggers

CREATE TRIGGER trg_discipline_topic_hours BEFORE
INSERT
    OR
UPDATE
    OF lecture_hours,
    practice_hours,
    lab_hours,
    seminar_hours,
    selfstudy_hours ON
    public.discipline_topic FOR EACH ROW EXECUTE FUNCTION "111trg_discipline_topic_hours_calc"();
CREATE TRIGGER update_system_updated_at_discipline_topic BEFORE
UPDATE
    ON
    public.discipline_topic FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.django_admin_log definition

-- Drop table

-- DROP TABLE public.django_admin_log;

CREATE TABLE public.django_admin_log (
	id serial4 NOT NULL,
	action_time timestamptz NOT NULL,
	object_id text NULL,
	object_repr varchar(200) NOT NULL,
	action_flag int2 NOT NULL,
	change_message text NOT NULL,
	content_type_id int4 NULL,
	user_id int8 NOT NULL,
	CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0)),
	CONSTRAINT django_admin_log_pkey PRIMARY KEY (id),
	CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT django_admin_log_user_id_c564eba6_fk_main_user_id FOREIGN KEY (user_id) REFERENCES public.main_user(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);
CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


-- public.educational_plan_fields definition

-- Drop table

-- DROP TABLE public.educational_plan_fields;

CREATE TABLE public.educational_plan_fields (
	id_educational_plan_fields serial4 NOT NULL,
	educational_plan_shifr int8 NOT NULL,
	field_key varchar(50) NOT NULL,
	is_visible bool DEFAULT true NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT educational_plan_fields_pkey1 PRIMARY KEY (id_educational_plan_fields),
	CONSTRAINT uq_epf_shifr_field UNIQUE (educational_plan_shifr, field_key),
	CONSTRAINT fk_epf_field_key FOREIGN KEY (field_key) REFERENCES public.educational_plan_field_meta(field_key)
);
CREATE INDEX idx_epf_field_key ON public.educational_plan_fields USING btree (field_key);
CREATE INDEX idx_epf_shifr ON public.educational_plan_fields USING btree (educational_plan_shifr);


-- public.employee definition

-- Drop table

-- DROP TABLE public.employee;

CREATE TABLE public.employee (
	id_employee bigserial NOT NULL,
	pin int8 NULL, -- Идентификационный номер (ПИН/ИИН).
	surname varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	patronymic varchar(100) NULL,
	date_birth date NULL,
	id_gender int4 NULL,
	surname_en varchar(100) NULL,
	name_en varchar(100) NULL,
	patronymic_en varchar(100) NULL,
	is_active bool DEFAULT true NOT NULL, -- Флаг активности сотрудника. TRUE = работает.
	system_created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT employee_pin_key UNIQUE (pin),
	CONSTRAINT employee_pkey PRIMARY KEY (id_employee),
	CONSTRAINT employee_id_gender_fkey FOREIGN KEY (id_gender) REFERENCES public.gender(id_gender)
);
CREATE INDEX idx_employee_is_active ON public.employee USING btree (is_active);
COMMENT ON TABLE public.employee IS 'Базовая информация о сотрудниках.';

-- Column comments

COMMENT ON COLUMN public.employee.pin IS 'Идентификационный номер (ПИН/ИИН).';
COMMENT ON COLUMN public.employee.is_active IS 'Флаг активности сотрудника. TRUE = работает.';


-- public.employee_info definition

-- Drop table

-- DROP TABLE public.employee_info;

CREATE TABLE public.employee_info (
	id_employee_info serial4 NOT NULL,
	id_employee int8 NOT NULL, -- Связь с базовой таблицей employee.
	id_document_type int4 NULL,
	passport_series varchar(20) NULL,
	passport_number varchar(20) NULL,
	id_citizenship int4 NULL,
	id_nationality int4 NULL,
	id_marital_status int4 NULL,
	id_special_status int4 DEFAULT 1 NULL,
	phone varchar(30) NULL,
	id_military_document_type int4 NULL,
	military_serial_number varchar(50) NULL,
	id_military_office int4 NULL,
	military_registration_date date NULL,
	email varchar(255) NULL, -- Электронная почта сотрудника.
	system_created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamptz NULL,
	CONSTRAINT employee_info_pkey PRIMARY KEY (id_employee_info),
	CONSTRAINT employee_info_id_employee_fkey FOREIGN KEY (id_employee) REFERENCES public.employee(id_employee) ON DELETE CASCADE
);
CREATE INDEX idx_employee_info_id_employee ON public.employee_info USING btree (id_employee);
COMMENT ON TABLE public.employee_info IS 'Дополнительная персональная информация о сотруднике.';

-- Column comments

COMMENT ON COLUMN public.employee_info.id_employee IS 'Связь с базовой таблицей employee.';
COMMENT ON COLUMN public.employee_info.email IS 'Электронная почта сотрудника.';


-- public.grade_scale definition

-- Drop table

-- DROP TABLE public.grade_scale;

CREATE TABLE public.grade_scale (
	id_grade_scale serial4 NOT NULL,
	grade_group int4 NOT NULL, -- Группа шкалы: 1=5-балльная, 2=ECTS, 3=Pass/Fail
	id_discipline_control int4 NOT NULL, -- Ссылка на справочник типов контроля (экзамен, зачёт, лабораторная и т.д.)
	beg_score numeric(5, 2) NOT NULL, -- Нижняя граница диапазона баллов
	end_score numeric(5, 2) NOT NULL, -- Верхняя граница диапазона баллов
	grade_numeric int4 NOT NULL, -- Цифровая оценка: 2–5, 0=н/я, -1=ошибка, 6=зачёт, 7=незачёт
	grade_text_ky varchar(25) NULL, -- Текстовое описание оценки
	grade_text_ru varchar(20) NULL, -- Текстовое описание оценки
	grade_text_en varchar(20) NULL, -- Текстовое описание оценки
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT grade_scale_pkey PRIMARY KEY (id_grade_scale),
	CONSTRAINT fk_grade_discipline_control FOREIGN KEY (id_discipline_control) REFERENCES public.discipline_control(id_discipline_control) ON DELETE CASCADE
);
CREATE INDEX idx_grade_scale_discipline ON public.grade_scale USING btree (id_discipline_control);
CREATE INDEX idx_grade_scale_group ON public.grade_scale USING btree (grade_group);
CREATE INDEX idx_grade_scale_range ON public.grade_scale USING btree (beg_score, end_score);

-- Column comments

COMMENT ON COLUMN public.grade_scale.grade_group IS 'Группа шкалы: 1=5-балльная, 2=ECTS, 3=Pass/Fail';
COMMENT ON COLUMN public.grade_scale.id_discipline_control IS 'Ссылка на справочник типов контроля (экзамен, зачёт, лабораторная и т.д.)';
COMMENT ON COLUMN public.grade_scale.beg_score IS 'Нижняя граница диапазона баллов';
COMMENT ON COLUMN public.grade_scale.end_score IS 'Верхняя граница диапазона баллов';
COMMENT ON COLUMN public.grade_scale.grade_numeric IS 'Цифровая оценка: 2–5, 0=н/я, -1=ошибка, 6=зачёт, 7=незачёт';
COMMENT ON COLUMN public.grade_scale.grade_text_ky IS 'Текстовое описание оценки';
COMMENT ON COLUMN public.grade_scale.grade_text_ru IS 'Текстовое описание оценки';
COMMENT ON COLUMN public.grade_scale.grade_text_en IS 'Текстовое описание оценки';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_grade_scale BEFORE
UPDATE
    ON
    public.grade_scale FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.hitcount_hit_count definition

-- Drop table

-- DROP TABLE public.hitcount_hit_count;

CREATE TABLE public.hitcount_hit_count (
	id bigserial NOT NULL,
	hits int4 NOT NULL,
	modified timestamptz NOT NULL,
	object_pk int4 NOT NULL,
	content_type_id int4 NOT NULL,
	CONSTRAINT hitcount_hit_count_content_type_id_object_pk_4dacb610_uniq UNIQUE (content_type_id, object_pk),
	CONSTRAINT hitcount_hit_count_hits_check CHECK ((hits >= 0)),
	CONSTRAINT hitcount_hit_count_object_pk_53e9c38f_check CHECK ((object_pk >= 0)),
	CONSTRAINT hitcount_hit_count_pkey PRIMARY KEY (id),
	CONSTRAINT hitcount_hit_count_content_type_id_4a734fe1_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX hitcount_hit_count_content_type_id_4a734fe1 ON public.hitcount_hit_count USING btree (content_type_id);


-- public.main_feedback definition

-- Drop table

-- DROP TABLE public.main_feedback;

CREATE TABLE public.main_feedback (
	id bigserial NOT NULL,
	fullname varchar(255) NOT NULL,
	region varchar(45) NULL,
	address varchar(255) NOT NULL,
	phone varchar(20) NOT NULL,
	email varchar(254) NOT NULL,
	organization varchar(255) NULL,
	subject varchar(255) NOT NULL,
	question text NOT NULL,
	attachment varchar(100) NULL,
	district_id int8 NULL,
	is_checked bool NOT NULL,
	created timestamptz NOT NULL,
	kind_id int8 NULL,
	CONSTRAINT main_feedback_pkey PRIMARY KEY (id),
	CONSTRAINT main_feedback_district_id_7b6d1100_fk_main_district_id FOREIGN KEY (district_id) REFERENCES public.main_district(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_feedback_kind_id_3013b14d_fk_main_kindoffeedback_id FOREIGN KEY (kind_id) REFERENCES public.main_kindoffeedback(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_feedback_district_id_7b6d1100 ON public.main_feedback USING btree (district_id);
CREATE INDEX main_feedback_kind_id_3013b14d ON public.main_feedback USING btree (kind_id);


-- public.main_gallery definition

-- Drop table

-- DROP TABLE public.main_gallery;

CREATE TABLE public.main_gallery (
	id bigserial NOT NULL,
	title varchar(255) NULL,
	description text NULL,
	"order" int2 NULL,
	description_ky text NULL,
	description_ru text NULL,
	title_ky varchar(255) NULL,
	title_ru varchar(255) NULL,
	category_id int8 NOT NULL,
	CONSTRAINT main_gallery_order_check CHECK (("order" >= 0)),
	CONSTRAINT main_gallery_pkey PRIMARY KEY (id),
	CONSTRAINT main_gallery_category_id_8e31da7f_fk_main_gallerycategory_id FOREIGN KEY (category_id) REFERENCES public.main_gallerycategory(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_gallery_category_id_8e31da7f ON public.main_gallery USING btree (category_id);


-- public.main_galleryimage definition

-- Drop table

-- DROP TABLE public.main_galleryimage;

CREATE TABLE public.main_galleryimage (
	id bigserial NOT NULL,
	image varchar(100) NOT NULL,
	gallery_id int8 NOT NULL,
	image_ky varchar(100) NULL,
	image_ru varchar(100) NULL,
	CONSTRAINT main_galleryimage_pkey PRIMARY KEY (id),
	CONSTRAINT main_galleryimage_gallery_id_1cb3d125_fk_main_gallery_id FOREIGN KEY (gallery_id) REFERENCES public.main_gallery(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_galleryimage_gallery_id_1cb3d125 ON public.main_galleryimage USING btree (gallery_id);


-- public.main_organization definition

-- Drop table

-- DROP TABLE public.main_organization;

CREATE TABLE public.main_organization (
	id bigserial NOT NULL,
	"name" varchar(255) NOT NULL,
	name_ky varchar(255) NULL,
	name_ru varchar(255) NULL,
	img varchar(100) NULL,
	"order" int2 NOT NULL,
	responsible_id int8 NULL,
	kind varchar(255) NOT NULL,
	is_active bool NOT NULL,
	CONSTRAINT main_organization_order_check CHECK (("order" >= 0)),
	CONSTRAINT main_organization_pkey PRIMARY KEY (id),
	CONSTRAINT main_organization_responsible_id_key UNIQUE (responsible_id),
	CONSTRAINT main_organization_responsible_id_97121a82_fk_main_user_id FOREIGN KEY (responsible_id) REFERENCES public.main_user(id) DEFERRABLE INITIALLY DEFERRED
);


-- public.main_page definition

-- Drop table

-- DROP TABLE public.main_page;

CREATE TABLE public.main_page (
	id bigserial NOT NULL,
	title varchar(255) NOT NULL,
	title_ky varchar(255) NULL,
	title_ru varchar(255) NULL,
	"content" text NOT NULL,
	content_ky text NULL,
	content_ru text NULL,
	"order" int4 NOT NULL,
	organization_id int8 NOT NULL,
	created timestamptz NOT NULL,
	CONSTRAINT main_page_order_check CHECK (("order" >= 0)),
	CONSTRAINT main_page_pkey PRIMARY KEY (id),
	CONSTRAINT main_page_organization_id_f09df463_fk_main_organization_id FOREIGN KEY (organization_id) REFERENCES public.main_organization(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_page_organization_id_f09df463 ON public.main_page USING btree (organization_id);


-- public.main_post definition

-- Drop table

-- DROP TABLE public.main_post;

CREATE TABLE public.main_post (
	id bigserial NOT NULL,
	title varchar(255) NOT NULL,
	title_ky varchar(255) NULL,
	title_ru varchar(255) NULL,
	annotation text NOT NULL,
	annotation_ky text NULL,
	annotation_ru text NULL,
	"content" text NOT NULL,
	content_ky text NULL,
	content_ru text NULL,
	img varchar(100) NOT NULL,
	created timestamptz NOT NULL,
	status varchar(45) NOT NULL,
	kind varchar(45) NOT NULL,
	last_changed timestamptz NOT NULL,
	attachment varchar(100) NULL,
	organization_id int8 NULL,
	CONSTRAINT main_post_pkey PRIMARY KEY (id),
	CONSTRAINT main_post_organization_id_74016676_fk_main_organization_id FOREIGN KEY (organization_id) REFERENCES public.main_organization(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_post_organization_id_74016676 ON public.main_post USING btree (organization_id);


-- public.main_research definition

-- Drop table

-- DROP TABLE public.main_research;

CREATE TABLE public.main_research (
	id bigserial NOT NULL,
	title varchar(255) NOT NULL,
	title_ky varchar(255) NULL,
	title_ru varchar(255) NULL,
	attachment varchar(100) NOT NULL,
	organization_id int8 NOT NULL,
	created timestamptz NOT NULL,
	CONSTRAINT main_research_pkey PRIMARY KEY (id),
	CONSTRAINT main_research_organization_id_68f8b7a9_fk_main_organization_id FOREIGN KEY (organization_id) REFERENCES public.main_organization(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_research_organization_id_68f8b7a9 ON public.main_research USING btree (organization_id);


-- public.main_user_groups definition

-- Drop table

-- DROP TABLE public.main_user_groups;

CREATE TABLE public.main_user_groups (
	id bigserial NOT NULL,
	user_id int8 NOT NULL,
	group_id int4 NOT NULL,
	CONSTRAINT main_user_groups_pkey PRIMARY KEY (id),
	CONSTRAINT main_user_groups_user_id_group_id_ae195797_uniq UNIQUE (user_id, group_id),
	CONSTRAINT main_user_groups_group_id_a337ba62_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_user_groups_user_id_df502602_fk_main_user_id FOREIGN KEY (user_id) REFERENCES public.main_user(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_user_groups_group_id_a337ba62 ON public.main_user_groups USING btree (group_id);
CREATE INDEX main_user_groups_user_id_df502602 ON public.main_user_groups USING btree (user_id);


-- public.main_user_user_permissions definition

-- Drop table

-- DROP TABLE public.main_user_user_permissions;

CREATE TABLE public.main_user_user_permissions (
	id bigserial NOT NULL,
	user_id int8 NOT NULL,
	permission_id int4 NOT NULL,
	CONSTRAINT main_user_user_permissions_pkey PRIMARY KEY (id),
	CONSTRAINT main_user_user_permissions_user_id_permission_id_96b9fadf_uniq UNIQUE (user_id, permission_id),
	CONSTRAINT main_user_user_permi_permission_id_cd2b56a3_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_user_user_permissions_user_id_451ce57f_fk_main_user_id FOREIGN KEY (user_id) REFERENCES public.main_user(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_user_user_permissions_permission_id_cd2b56a3 ON public.main_user_user_permissions USING btree (permission_id);
CREATE INDEX main_user_user_permissions_user_id_451ce57f ON public.main_user_user_permissions USING btree (user_id);


-- public.module_fields definition

-- Drop table

-- DROP TABLE public.module_fields;

CREATE TABLE public.module_fields (
	id_module_fields serial4 NOT NULL,
	id_educational_plan int8 NOT NULL,
	id_module_name int4 NOT NULL,
	id_module_fields_name int8 NOT NULL,
	max_score numeric(5, 2) DEFAULT 0 NOT NULL,
	component_weight numeric(5, 2) DEFAULT 1 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT module_fields_id_educational_plan_id_module_name_id_module__key UNIQUE (id_educational_plan, id_module_name, id_module_fields_name),
	CONSTRAINT module_fields_pkey PRIMARY KEY (id_module_fields),
	CONSTRAINT module_fields_id_module_fields_name_fkey FOREIGN KEY (id_module_fields_name) REFERENCES public.module_fields_name(id_module_fields_name),
	CONSTRAINT module_fields_id_module_name_fkey FOREIGN KEY (id_module_name) REFERENCES public.module_name(id_module_name)
);
CREATE INDEX module_fields_id_module_fields_id_educational_plan_id_modul_idx ON public.module_fields USING btree (id_module_fields, id_educational_plan, id_module_name, id_module_fields_name);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_module_fields BEFORE
UPDATE
    ON
    public.module_fields FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.movement_type definition

-- Drop table

-- DROP TABLE public.movement_type;

CREATE TABLE public.movement_type (
	id_movement_type serial4 NOT NULL,
	id_movement_category int4 NULL,
	movement_type_ky varchar(50) NULL,
	movement_type_ru varchar(50) NULL,
	movement_type_en varchar(50) NULL,
	note text NULL,
	CONSTRAINT movement_type_id_movement_category_movement_type_ru_key UNIQUE (id_movement_category, movement_type_ru),
	CONSTRAINT movement_type_pkey PRIMARY KEY (id_movement_type),
	CONSTRAINT movement_type_id_movement_category_fkey FOREIGN KEY (id_movement_category) REFERENCES public.movement_category(id_movement_category)
);
CREATE INDEX movement_type_id_movement_category_idx ON public.movement_type USING btree (id_movement_category);


-- public.organization definition

-- Drop table

-- DROP TABLE public.organization;

CREATE TABLE public.organization (
	id_org serial4 NOT NULL,
	id_org_type int4 NULL,
	okpo varchar(15) NULL,
	s_org text NULL,
	org_ky text NULL,
	org_ru text NULL,
	org_en text NULL,
	tin varchar(50) NULL,
	entered_org_ky text NULL, -- Поступил в университет
	entered_org_ru text NULL,
	entered_org_en text NULL,
	finish_org_ky text NULL, -- Окончил
	finish_org_ru text NULL,
	finish_org_en text NULL,
	id_org_manager_status int4 NULL, -- Статус руководитель первого
	created_date timestamp(6) DEFAULT timezone('Asia/Bishkek'::text, now()) NULL,
	org_full_name_ky text NULL,
	org_full_name_ru text NULL,
	id_ownership int4 NULL, -- Форма собственности
	sort int4 NULL,
	visible_faculty bool DEFAULT true NOT NULL,
	visible_direction bool DEFAULT true NOT NULL,
	reg_org text DEFAULT '0' NOT NULL,
	id_org_manager_second int4 NULL, -- Статус руководитель второго
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT organization_okpo_key UNIQUE (okpo),
	CONSTRAINT organization_pkey PRIMARY KEY (id_org),
	CONSTRAINT organization_reg_org_id_org_type_key UNIQUE (reg_org, id_org_type),
	CONSTRAINT organization_id_org_manager_status_fkey FOREIGN KEY (id_org_manager_status) REFERENCES public.org_manager_status(id_org_manager_status),
	CONSTRAINT organization_id_org_type_fkey FOREIGN KEY (id_org_type) REFERENCES public.org_type(id_org_type),
	CONSTRAINT organization_id_ownership_fkey FOREIGN KEY (id_ownership) REFERENCES public.ownership(id_ownership)
);
CREATE INDEX organization_id_org_idx ON public.organization USING btree (id_org);
CREATE INDEX organization_id_org_manager_status_idx ON public.organization USING btree (id_org_manager_status);
CREATE INDEX organization_id_org_manager_status_idx1 ON public.organization USING btree (id_org_manager_status);
CREATE INDEX organization_id_org_type_idx ON public.organization USING btree (id_org_type);
CREATE INDEX organization_id_ownership_idx ON public.organization USING btree (id_ownership);
CREATE INDEX organization_okpo_idx ON public.organization USING btree (okpo);

-- Column comments

COMMENT ON COLUMN public.organization.entered_org_ky IS 'Поступил в университет';
COMMENT ON COLUMN public.organization.finish_org_ky IS 'Окончил';
COMMENT ON COLUMN public.organization.id_org_manager_status IS 'Статус руководитель первого';
COMMENT ON COLUMN public.organization.id_ownership IS 'Форма собственности';
COMMENT ON COLUMN public.organization.id_org_manager_second IS 'Статус руководитель второго';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_organization BEFORE
UPDATE
    ON
    public.organization FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.qualification definition

-- Drop table

-- DROP TABLE public.qualification;

CREATE TABLE public.qualification (
	id_qualification serial4 NOT NULL,
	qualification_ky varchar(300) NULL,
	qualification_ru varchar(300) NULL,
	qualification_en varchar(300) NULL,
	id_org_type int4 NULL,
	id_org int4 NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT qualification_pkey PRIMARY KEY (id_qualification),
	CONSTRAINT qualification_qualification_ru_id_org_type_key UNIQUE (id_org_type, id_org, qualification_en, qualification_ru),
	CONSTRAINT qualification_id_org_fkey FOREIGN KEY (id_org) REFERENCES public.organization(id_org),
	CONSTRAINT qualification_id_org_type_fkey FOREIGN KEY (id_org_type) REFERENCES public.org_type(id_org_type)
);
CREATE INDEX qualification_id_org_idx ON public.qualification USING btree (id_org);
CREATE INDEX qualification_id_org_type_idx ON public.qualification USING btree (id_org_type);
CREATE INDEX qualification_id_qualification_idx ON public.qualification USING btree (id_qualification);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_qualification BEFORE
UPDATE
    ON
    public.qualification FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.region definition

-- Drop table

-- DROP TABLE public.region;

CREATE TABLE public.region (
	id_region serial4 NOT NULL,
	region_ky text NOT NULL,
	region_ru text NOT NULL,
	region_en text NOT NULL,
	id_country int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	id_address_register int4 NULL,
	code int8 NULL,
	CONSTRAINT region_id_country_region_ky_region_ru_region_en_key UNIQUE (id_country, region_ky, region_ru, region_en),
	CONSTRAINT region_pkey PRIMARY KEY (id_region),
	CONSTRAINT region_id_country_fkey FOREIGN KEY (id_country) REFERENCES public.country(id_country) ON DELETE CASCADE
);
COMMENT ON TABLE public.region IS 'Области / регионы стран на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_region BEFORE
UPDATE
    ON
    public.region FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.staff_schedule definition

-- Drop table

-- DROP TABLE public.staff_schedule;

CREATE TABLE public.staff_schedule (
	id_staff_schedule serial4 NOT NULL,
	id_year int4 NOT NULL,
	id_structure int4 NULL,
	id_academic_department int4 DEFAULT '-1'::integer NULL,
	id_staff_category int4 NULL,
	id_position int4 NOT NULL,
	id_budget_contract int4 NULL, -- Тип финансирования (бюджет/контракт)
	count_stavka numeric(5, 2) NOT NULL, -- Количество ставок
	is_active bool DEFAULT true NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT staff_schedule_count_stavka_check CHECK ((count_stavka > (0)::numeric)),
	CONSTRAINT staff_schedule_pkey PRIMARY KEY (id_staff_schedule),
	CONSTRAINT staff_schedule_id_academic_department_fkey FOREIGN KEY (id_academic_department) REFERENCES public.academic_department(id_academic_department),
	CONSTRAINT staff_schedule_id_budget_contract_fkey FOREIGN KEY (id_budget_contract) REFERENCES public.budget_contract(id_budget_contract),
	CONSTRAINT staff_schedule_id_position_fkey FOREIGN KEY (id_position) REFERENCES public."position"(id_position),
	CONSTRAINT staff_schedule_id_staff_category_fkey FOREIGN KEY (id_staff_category) REFERENCES public.staff_category(id_staff_category),
	CONSTRAINT staff_schedule_id_structure_fkey FOREIGN KEY (id_structure) REFERENCES public."structure"(id_structure)
);
COMMENT ON TABLE public.staff_schedule IS 'Штатное расписание: структура/кафедра, должность, категории, ставки, финансирование, год';

-- Column comments

COMMENT ON COLUMN public.staff_schedule.id_budget_contract IS 'Тип финансирования (бюджет/контракт)';
COMMENT ON COLUMN public.staff_schedule.count_stavka IS 'Количество ставок';


-- public.student definition

-- Drop table

-- DROP TABLE public.student;

CREATE TABLE public.student (
	id_student bigserial NOT NULL,
	pin int8 NULL, -- ПИН
	surname varchar(50) NOT NULL, -- Фамилия
	"name" varchar(50) NULL, -- Имя
	patronymic varchar(50) NULL, -- Отчество
	id_gender int4 NULL, -- Пол
	date_birth date NULL, -- Дата рождение
	created_at timestamptz DEFAULT timezone('Asia/Bishkek'::text, now()) NULL,
	updated_at timestamptz NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	"password" varchar NULL,
	surname_en varchar(50) NULL,
	name_en varchar(50) NULL,
	patronymic_en varchar(50) NULL,
	CONSTRAINT student_pin_key UNIQUE (pin),
	CONSTRAINT student_pkey PRIMARY KEY (id_student),
	CONSTRAINT fk_student_gender FOREIGN KEY (id_gender) REFERENCES public.gender(id_gender)
);
CREATE INDEX idx_student_pin ON public.student USING btree (pin);
CREATE INDEX idx_student_surname ON public.student USING btree (surname);
CREATE INDEX student_created_at_idx ON public.student USING btree (created_at);

-- Column comments

COMMENT ON COLUMN public.student.pin IS 'ПИН';
COMMENT ON COLUMN public.student.surname IS 'Фамилия';
COMMENT ON COLUMN public.student."name" IS 'Имя';
COMMENT ON COLUMN public.student.patronymic IS 'Отчество';
COMMENT ON COLUMN public.student.id_gender IS 'Пол';
COMMENT ON COLUMN public.student.date_birth IS 'Дата рождение';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_student BEFORE
UPDATE
    ON
    public.student FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.student_info definition

-- Drop table

-- DROP TABLE public.student_info;

CREATE TABLE public.student_info (
	id_student_info serial4 NOT NULL,
	id_student int4 NOT NULL, -- ID студента
	id_document_type int4 NULL, -- Тип документа личности
	passport_series varchar(20) NULL, -- Серия паспорта
	passport_number varchar(20) NULL, -- Номер паспорта
	id_citizenship int4 NULL, -- Гражданство студента
	id_nationality int4 NULL, -- Национальность студента
	id_marital_status int4 NULL, -- Семейное положение
	id_special_status int4 DEFAULT 1 NULL, -- Особый статус (обычный, инвалид, сирота)
	phone varchar(30) NULL, -- Телефон студента
	id_military_document_type int4 NULL, -- Военного документ
	military_serial_number varchar(50) NULL, -- Серия военного документа
	id_military_office int4 NULL, -- Воинский учет
	military_registration_date date NULL, -- Дата воинского учета
	created_at timestamptz DEFAULT timezone('Asia/Bishkek'::text, now()) NOT NULL, -- Дата создания записи
	updated_at timestamptz NULL, -- Дата последнего обновления записи
	email varchar(255) NULL, -- Почта
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp NULL,
	CONSTRAINT student_info_id_student_key UNIQUE (id_student),
	CONSTRAINT student_info_pkey PRIMARY KEY (id_student_info),
	CONSTRAINT student_info_citizenship_fkey FOREIGN KEY (id_citizenship) REFERENCES public.citizenship(id_citizenship),
	CONSTRAINT student_info_document_type_fkey FOREIGN KEY (id_document_type) REFERENCES public.document_type(id_document_type),
	CONSTRAINT student_info_id_military_document_type_fkey FOREIGN KEY (id_military_document_type) REFERENCES public.military_document_type(id_military_document_type),
	CONSTRAINT student_info_id_military_office_fkey FOREIGN KEY (id_military_office) REFERENCES public.military_office(id_military_office),
	CONSTRAINT student_info_id_student_fkey FOREIGN KEY (id_student) REFERENCES public.student(id_student) ON DELETE CASCADE,
	CONSTRAINT student_info_marital_status_fkey FOREIGN KEY (id_marital_status) REFERENCES public.marital_status(id_marital_status),
	CONSTRAINT student_info_nationality_fkey FOREIGN KEY (id_nationality) REFERENCES public.nationality(id_nationality),
	CONSTRAINT student_info_special_status_fkey FOREIGN KEY (id_special_status) REFERENCES public.special_status(id_special_status)
);
CREATE INDEX idx_student_info_citizenship ON public.student_info USING btree (id_citizenship);
CREATE INDEX idx_student_info_id_student ON public.student_info USING btree (id_student);
CREATE INDEX idx_student_info_phone ON public.student_info USING btree (phone);
CREATE INDEX idx_student_info_special_status ON public.student_info USING btree (id_special_status);
COMMENT ON TABLE public.student_info IS 'Основная информация о студенте';

-- Column comments

COMMENT ON COLUMN public.student_info.id_student IS 'ID студента';
COMMENT ON COLUMN public.student_info.id_document_type IS 'Тип документа личности';
COMMENT ON COLUMN public.student_info.passport_series IS 'Серия паспорта';
COMMENT ON COLUMN public.student_info.passport_number IS 'Номер паспорта';
COMMENT ON COLUMN public.student_info.id_citizenship IS 'Гражданство студента';
COMMENT ON COLUMN public.student_info.id_nationality IS 'Национальность студента';
COMMENT ON COLUMN public.student_info.id_marital_status IS 'Семейное положение';
COMMENT ON COLUMN public.student_info.id_special_status IS 'Особый статус (обычный, инвалид, сирота)';
COMMENT ON COLUMN public.student_info.phone IS 'Телефон студента';
COMMENT ON COLUMN public.student_info.id_military_document_type IS 'Военного документ';
COMMENT ON COLUMN public.student_info.military_serial_number IS 'Серия военного документа';
COMMENT ON COLUMN public.student_info.id_military_office IS 'Воинский учет';
COMMENT ON COLUMN public.student_info.military_registration_date IS 'Дата воинского учета';
COMMENT ON COLUMN public.student_info.created_at IS 'Дата создания записи';
COMMENT ON COLUMN public.student_info.updated_at IS 'Дата последнего обновления записи';
COMMENT ON COLUMN public.student_info.email IS 'Почта';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_student_info BEFORE
UPDATE
    ON
    public.student_info FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.student_parents definition

-- Drop table

-- DROP TABLE public.student_parents;

CREATE TABLE public.student_parents (
	id_student_parent serial4 NOT NULL, -- Уникальный идентификатор записи родителя студента
	id_student int4 NOT NULL, -- Ссылка на студента (foreign key)
	father_fullname varchar(150) NULL, -- ФИО отца
	father_email varchar(100) NULL, -- Email отца
	father_phone varchar(30) NULL, -- Телефон отца
	mother_fullname varchar(150) NULL, -- ФИО матери
	mother_email varchar(100) NULL, -- Email матери
	mother_phone varchar(30) NULL, -- Телефон матери
	created_at timestamptz DEFAULT timezone('Asia/Bishkek'::text, now()) NOT NULL, -- Дата и время создания записи
	updated_at timestamptz NULL, -- Дата и время последнего обновления записи
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL, -- Дата и время системного создания записи
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL, -- Дата и время системного обновления записи
	CONSTRAINT student_parents_id_student_key UNIQUE (id_student),
	CONSTRAINT student_parents_pkey PRIMARY KEY (id_student_parent),
	CONSTRAINT student_parents_id_student_fkey FOREIGN KEY (id_student) REFERENCES public.student(id_student) ON DELETE CASCADE
);
CREATE INDEX idx_student_parents_id_student ON public.student_parents USING btree (id_student);
COMMENT ON TABLE public.student_parents IS 'Информация о родителях студента (отец и мать)';

-- Column comments

COMMENT ON COLUMN public.student_parents.id_student_parent IS 'Уникальный идентификатор записи родителя студента';
COMMENT ON COLUMN public.student_parents.id_student IS 'Ссылка на студента (foreign key)';
COMMENT ON COLUMN public.student_parents.father_fullname IS 'ФИО отца';
COMMENT ON COLUMN public.student_parents.father_email IS 'Email отца';
COMMENT ON COLUMN public.student_parents.father_phone IS 'Телефон отца';
COMMENT ON COLUMN public.student_parents.mother_fullname IS 'ФИО матери';
COMMENT ON COLUMN public.student_parents.mother_email IS 'Email матери';
COMMENT ON COLUMN public.student_parents.mother_phone IS 'Телефон матери';
COMMENT ON COLUMN public.student_parents.created_at IS 'Дата и время создания записи';
COMMENT ON COLUMN public.student_parents.updated_at IS 'Дата и время последнего обновления записи';
COMMENT ON COLUMN public.student_parents.system_created_at IS 'Дата и время системного создания записи';
COMMENT ON COLUMN public.student_parents.system_updated_at IS 'Дата и время системного обновления записи';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_student_parents BEFORE
UPDATE
    ON
    public.student_parents FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.student_photo definition

-- Drop table

-- DROP TABLE public.student_photo;

CREATE TABLE public.student_photo (
	id_student_photo serial4 NOT NULL,
	id_student int4 NOT NULL,
	photo bytea NULL,
	photo_url varchar(50) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT student_photo_pkey PRIMARY KEY (id_student_photo),
	CONSTRAINT student_photo_id_student_fkey FOREIGN KEY (id_student) REFERENCES public.student(id_student) ON DELETE CASCADE
);
CREATE INDEX idx_student_photo_id_student ON public.student_photo USING btree (id_student);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_student_photo BEFORE
UPDATE
    ON
    public.student_photo FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.teacher definition

-- Drop table

-- DROP TABLE public.teacher;

CREATE TABLE public.teacher (
	id_teacher serial4 NOT NULL,
	id_users int4 NULL,
	id_academic_department int4 NULL,
	system_created_at timestamp(6) DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT teacher_id_users_id_academic_department_key UNIQUE (id_users, id_academic_department),
	CONSTRAINT teacher_pkey PRIMARY KEY (id_teacher),
	CONSTRAINT teacher_id_academic_department_fkey FOREIGN KEY (id_academic_department) REFERENCES public.academic_department(id_academic_department),
	CONSTRAINT teacher_id_users_fkey FOREIGN KEY (id_users) REFERENCES public.users(id_users)
);
CREATE INDEX teacher_id_users_id_academic_department_idx ON public.teacher USING btree (id_users, id_academic_department);


-- public.user_education definition

-- Drop table

-- DROP TABLE public.user_education;

CREATE TABLE public.user_education (
	id_user_education serial4 NOT NULL, -- Первичный ключ таблицы user_education.
	id_user int4 NOT NULL, -- Связь с пользователем (users.id_users).
	id_education_document_type int4 NOT NULL, -- Тип документа об образовании.
	document_series varchar(20) NOT NULL, -- Серия документа об образовании.
	document_number varchar(20) NULL, -- Номер документа об образовании.
	graduation_year int4 NULL, -- Год окончания учебного заведения.
	institution text NULL, -- Название учебного заведения.
	speciality text NULL, -- Специальность, по которой обучался пользователь.
	qualification text NULL, -- Присвоенная квалификация.
	CONSTRAINT user_education_pkey PRIMARY KEY (id_user_education),
	CONSTRAINT fk_user_education_document_type FOREIGN KEY (id_education_document_type) REFERENCES public.education_document_type(id_education_document_type),
	CONSTRAINT fk_user_education_user FOREIGN KEY (id_user) REFERENCES public.users(id_users) ON DELETE CASCADE
);
CREATE INDEX idx_user_education_id_document_type ON public.user_education USING btree (id_education_document_type);
CREATE INDEX idx_user_education_id_user ON public.user_education USING btree (id_user);
COMMENT ON TABLE public.user_education IS 'Образование пользователя: дипломы, сертификаты, квалификации.';

-- Column comments

COMMENT ON COLUMN public.user_education.id_user_education IS 'Первичный ключ таблицы user_education.';
COMMENT ON COLUMN public.user_education.id_user IS 'Связь с пользователем (users.id_users).';
COMMENT ON COLUMN public.user_education.id_education_document_type IS 'Тип документа об образовании.';
COMMENT ON COLUMN public.user_education.document_series IS 'Серия документа об образовании.';
COMMENT ON COLUMN public.user_education.document_number IS 'Номер документа об образовании.';
COMMENT ON COLUMN public.user_education.graduation_year IS 'Год окончания учебного заведения.';
COMMENT ON COLUMN public.user_education.institution IS 'Название учебного заведения.';
COMMENT ON COLUMN public.user_education.speciality IS 'Специальность, по которой обучался пользователь.';
COMMENT ON COLUMN public.user_education.qualification IS 'Присвоенная квалификация.';


-- public.user_info definition

-- Drop table

-- DROP TABLE public.user_info;

CREATE TABLE public.user_info (
	id_user_info serial4 NOT NULL, -- Первичный ключ таблицы user_info.
	id_user int4 NOT NULL, -- Связь с основной таблицей пользователей users.id_users.
	date_birth date NULL, -- Дата рождения пользователя.
	id_gender int4 NULL, -- Пол пользователя, связь с таблицей gender.
	id_document_type int4 NULL, -- Тип документа (паспорт, удостоверение и т.д.), связь с таблицей document_type.
	passport_series varchar(20) NULL, -- Серия паспорта.
	passport_number varchar(20) NULL, -- Номер паспорта.
	id_citizenship int4 NULL, -- Гражданство пользователя, связь с таблицей citizenship.
	id_nationality int4 NULL, -- Национальность пользователя, связь с таблицей nationality.
	id_marital_status int4 NULL, -- Семейное положение, связь с таблицей marital_status.
	id_special_status int4 DEFAULT 1 NULL, -- Особый статус (например, инвалидность), связь с таблицей special_status.
	phone varchar(30) NULL, -- Телефон пользователя.
	email varchar(255) NULL, -- Электронная почта пользователя.
	id_military_document_type int4 NULL, -- Тип военного документа, связь с таблицей military_document_type.
	military_serial_number varchar(50) NULL, -- Серия и номер военного документа.
	id_military_office int4 NULL, -- Военкомат, где зарегистрирован, связь с таблицей military_office.
	military_registration_date date NULL, -- Дата военной регистрации.
	system_created_at timestamp(6) DEFAULT CURRENT_TIMESTAMP NULL, -- Дата и время создания записи.
	system_updated_at timestamp(6) NULL, -- Дата и время последнего обновления записи.
	CONSTRAINT pk_user_info PRIMARY KEY (id_user_info),
	CONSTRAINT user_info_id_user_key UNIQUE (id_user),
	CONSTRAINT fk_user_info_citizenship FOREIGN KEY (id_citizenship) REFERENCES public.citizenship(id_citizenship),
	CONSTRAINT fk_user_info_document_type FOREIGN KEY (id_document_type) REFERENCES public.document_type(id_document_type),
	CONSTRAINT fk_user_info_gender FOREIGN KEY (id_gender) REFERENCES public.gender(id_gender),
	CONSTRAINT fk_user_info_marital_status FOREIGN KEY (id_marital_status) REFERENCES public.marital_status(id_marital_status),
	CONSTRAINT fk_user_info_military_document_type FOREIGN KEY (id_military_document_type) REFERENCES public.military_document_type(id_military_document_type),
	CONSTRAINT fk_user_info_military_office FOREIGN KEY (id_military_office) REFERENCES public.military_office(id_military_office),
	CONSTRAINT fk_user_info_nationality FOREIGN KEY (id_nationality) REFERENCES public.nationality(id_nationality),
	CONSTRAINT fk_user_info_special_status FOREIGN KEY (id_special_status) REFERENCES public.special_status(id_special_status),
	CONSTRAINT fk_user_info_user FOREIGN KEY (id_user) REFERENCES public.users(id_users) ON DELETE CASCADE
);
CREATE INDEX idx_user_info_email ON public.user_info USING btree (email);
CREATE INDEX idx_user_info_id_user ON public.user_info USING btree (id_user);
CREATE INDEX idx_user_info_passport ON public.user_info USING btree (passport_series, passport_number);
CREATE INDEX idx_user_info_phone ON public.user_info USING btree (phone);
COMMENT ON TABLE public.user_info IS 'Дополнительная информация о пользователях: документы, контакты, гражданство, военные данные и т.д.';

-- Column comments

COMMENT ON COLUMN public.user_info.id_user_info IS 'Первичный ключ таблицы user_info.';
COMMENT ON COLUMN public.user_info.id_user IS 'Связь с основной таблицей пользователей users.id_users.';
COMMENT ON COLUMN public.user_info.date_birth IS 'Дата рождения пользователя.';
COMMENT ON COLUMN public.user_info.id_gender IS 'Пол пользователя, связь с таблицей gender.';
COMMENT ON COLUMN public.user_info.id_document_type IS 'Тип документа (паспорт, удостоверение и т.д.), связь с таблицей document_type.';
COMMENT ON COLUMN public.user_info.passport_series IS 'Серия паспорта.';
COMMENT ON COLUMN public.user_info.passport_number IS 'Номер паспорта.';
COMMENT ON COLUMN public.user_info.id_citizenship IS 'Гражданство пользователя, связь с таблицей citizenship.';
COMMENT ON COLUMN public.user_info.id_nationality IS 'Национальность пользователя, связь с таблицей nationality.';
COMMENT ON COLUMN public.user_info.id_marital_status IS 'Семейное положение, связь с таблицей marital_status.';
COMMENT ON COLUMN public.user_info.id_special_status IS 'Особый статус (например, инвалидность), связь с таблицей special_status.';
COMMENT ON COLUMN public.user_info.phone IS 'Телефон пользователя.';
COMMENT ON COLUMN public.user_info.email IS 'Электронная почта пользователя.';
COMMENT ON COLUMN public.user_info.id_military_document_type IS 'Тип военного документа, связь с таблицей military_document_type.';
COMMENT ON COLUMN public.user_info.military_serial_number IS 'Серия и номер военного документа.';
COMMENT ON COLUMN public.user_info.id_military_office IS 'Военкомат, где зарегистрирован, связь с таблицей military_office.';
COMMENT ON COLUMN public.user_info.military_registration_date IS 'Дата военной регистрации.';
COMMENT ON COLUMN public.user_info.system_created_at IS 'Дата и время создания записи.';
COMMENT ON COLUMN public.user_info.system_updated_at IS 'Дата и время последнего обновления записи.';


-- public.user_photo definition

-- Drop table

-- DROP TABLE public.user_photo;

CREATE TABLE public.user_photo (
	id_user_photo serial4 NOT NULL, -- Первичный ключ таблицы user_photo.
	id_user int4 NOT NULL, -- Связь с пользователем (users.id_users).
	photo bytea NULL, -- Бинарное фото пользователя.
	photo_url varchar(255) NULL, -- URL или путь к фото, если хранится отдельно.
	system_created_at timestamp(6) DEFAULT CURRENT_TIMESTAMP NULL, -- Дата и время создания записи в базе.
	system_updated_at timestamp(6) DEFAULT CURRENT_TIMESTAMP NULL, -- Дата и время последнего обновления записи.
	CONSTRAINT user_photo_id_user_key UNIQUE (id_user),
	CONSTRAINT user_photo_pkey PRIMARY KEY (id_user_photo),
	CONSTRAINT fk_user_photo_user FOREIGN KEY (id_user) REFERENCES public.users(id_users) ON DELETE CASCADE
);
CREATE INDEX idx_user_photo_id_user ON public.user_photo USING btree (id_user);
COMMENT ON TABLE public.user_photo IS 'Фотографии пользователей системы. Можно хранить в виде bytea или ссылки на файл.';

-- Column comments

COMMENT ON COLUMN public.user_photo.id_user_photo IS 'Первичный ключ таблицы user_photo.';
COMMENT ON COLUMN public.user_photo.id_user IS 'Связь с пользователем (users.id_users).';
COMMENT ON COLUMN public.user_photo.photo IS 'Бинарное фото пользователя.';
COMMENT ON COLUMN public.user_photo.photo_url IS 'URL или путь к фото, если хранится отдельно.';
COMMENT ON COLUMN public.user_photo.system_created_at IS 'Дата и время создания записи в базе.';
COMMENT ON COLUMN public.user_photo.system_updated_at IS 'Дата и время последнего обновления записи.';


-- public.user_security definition

-- Drop table

-- DROP TABLE public.user_security;

CREATE TABLE public.user_security (
	id_user_security bigserial NOT NULL,
	id_user int4 NOT NULL,
	id_role int4 NULL, -- Роль
	id_user_table int4 NOT NULL, -- Тип объекта (faculty, department, и т.д.)
	id_object int4 NOT NULL, -- ID конкретного объекта (faculty_id, id_academic_department и т.д.)
	"permission" varchar(50) DEFAULT 'read'::character varying NOT NULL, -- read, write, update, delete, full
	note text NULL, -- Примечание
	system_created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT user_security_permission_check CHECK (((permission)::text = ANY (ARRAY[('read'::character varying)::text, ('write'::character varying)::text, ('update'::character varying)::text, ('delete'::character varying)::text, ('full'::character varying)::text]))),
	CONSTRAINT user_security_pkey PRIMARY KEY (id_user_security),
	CONSTRAINT user_security_user_table_object_user_key UNIQUE (id_user, id_user_table, id_object),
	CONSTRAINT user_security_id_role_fkey FOREIGN KEY (id_role) REFERENCES public."role"(id_role),
	CONSTRAINT user_security_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_users) ON DELETE CASCADE,
	CONSTRAINT user_security_id_user_table_fkey FOREIGN KEY (id_user_table) REFERENCES public.user_table(id_user_table)
);
CREATE INDEX idx_user_security_user_role ON public.user_security USING btree (id_user, id_role);
CREATE INDEX user_security_id_user_table_idx ON public.user_security USING btree (id_user_table);

-- Column comments

COMMENT ON COLUMN public.user_security.id_role IS 'Роль';
COMMENT ON COLUMN public.user_security.id_user_table IS 'Тип объекта (faculty, department, и т.д.)';
COMMENT ON COLUMN public.user_security.id_object IS 'ID конкретного объекта (faculty_id, id_academic_department и т.д.)';
COMMENT ON COLUMN public.user_security."permission" IS 'read, write, update, delete, full';
COMMENT ON COLUMN public.user_security.note IS 'Примечание';


-- public.auth_group_permissions definition

-- Drop table

-- DROP TABLE public.auth_group_permissions;

CREATE TABLE public.auth_group_permissions (
	id bigserial NOT NULL,
	group_id int4 NOT NULL,
	permission_id int4 NOT NULL,
	CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id),
	CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id),
	CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);
CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


-- public.city definition

-- Drop table

-- DROP TABLE public.city;

CREATE TABLE public.city (
	id_city serial4 NOT NULL,
	city_ky text NOT NULL,
	city_ru text NOT NULL,
	city_en text NOT NULL,
	id_region int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT city_id_region_city_ky_city_ru_city_en_key UNIQUE (id_region, city_ky, city_ru, city_en),
	CONSTRAINT city_pkey PRIMARY KEY (id_city),
	CONSTRAINT city_id_region_fkey FOREIGN KEY (id_region) REFERENCES public.region(id_region) ON DELETE CASCADE
);
COMMENT ON TABLE public.city IS 'Города на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_city BEFORE
UPDATE
    ON
    public.city FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.district definition

-- Drop table

-- DROP TABLE public.district;

CREATE TABLE public.district (
	id_district serial4 NOT NULL,
	district_ky text NOT NULL,
	district_ru text NOT NULL,
	district_en text NOT NULL,
	id_region int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT district_id_region_district_ky_district_ru_district_en_key UNIQUE (id_region, district_ky, district_ru, district_en),
	CONSTRAINT district_pkey PRIMARY KEY (id_district),
	CONSTRAINT district_id_region_fkey FOREIGN KEY (id_region) REFERENCES public.region(id_region) ON DELETE CASCADE
);
COMMENT ON TABLE public.district IS 'Районы областей на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_district BEFORE
UPDATE
    ON
    public.district FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.faculty definition

-- Drop table

-- DROP TABLE public.faculty;

CREATE TABLE public.faculty (
	id_faculty serial4 NOT NULL,
	id_org int4 NOT NULL,
	faculty_ky text NOT NULL,
	faculty_ru text NOT NULL,
	faculty_en text NULL,
	s_faculty varchar(300) NULL,
	id_org_manager_faculty int4 NULL,
	is_active bool DEFAULT true NOT NULL,
	course bool DEFAULT false NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT faculty_id_org_faculty_ru_key UNIQUE (id_org, faculty_ru, id_org_manager_faculty),
	CONSTRAINT faculty_pkey PRIMARY KEY (id_faculty),
	CONSTRAINT faculty_id_org_fkey FOREIGN KEY (id_org) REFERENCES public.organization(id_org),
	CONSTRAINT faculty_id_org_manager_faculty_fkey FOREIGN KEY (id_org_manager_faculty) REFERENCES public.org_manager_status(id_org_manager_status)
);
CREATE INDEX idx_faculty_faculty_ru ON public.faculty USING btree (faculty_ru);
CREATE INDEX idx_faculty_id_org_manager_faculty ON public.faculty USING btree (id_org_manager_faculty);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_faculty BEFORE
UPDATE
    ON
    public.faculty FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.grade_letter definition

-- Drop table

-- DROP TABLE public.grade_letter;

CREATE TABLE public.grade_letter (
	id_grade_letter serial4 NOT NULL,
	id_grade_scale int4 NOT NULL,
	beg_score numeric(5, 2) NOT NULL,
	end_score numeric(5, 2) NOT NULL,
	grade_letter varchar(5) NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT grade_letter_pkey PRIMARY KEY (id_grade_letter),
	CONSTRAINT uq_grade_letter UNIQUE (id_grade_scale, grade_letter),
	CONSTRAINT uq_grade_letter_range UNIQUE (id_grade_scale, beg_score, end_score),
	CONSTRAINT fk_grade_letter_scale FOREIGN KEY (id_grade_scale) REFERENCES public.grade_scale(id_grade_scale) ON DELETE CASCADE
);
CREATE INDEX idx_grade_letter_range ON public.grade_letter USING btree (beg_score, end_score);
CREATE INDEX idx_grade_letter_scale ON public.grade_letter USING btree (id_grade_scale);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_grade_letter BEFORE
UPDATE
    ON
    public.grade_letter FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.hitcount_hit definition

-- Drop table

-- DROP TABLE public.hitcount_hit;

CREATE TABLE public.hitcount_hit (
	id bigserial NOT NULL,
	created timestamptz NOT NULL,
	ip varchar(40) NOT NULL,
	"session" varchar(40) NOT NULL,
	user_agent varchar(255) NOT NULL,
	hitcount_id int8 NOT NULL,
	user_id int8 NULL,
	CONSTRAINT hitcount_hit_pkey PRIMARY KEY (id),
	CONSTRAINT hitcount_hit_hitcount_id_b7971910_fk FOREIGN KEY (hitcount_id) REFERENCES public.hitcount_hit_count(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT hitcount_hit_user_id_f7067f66_fk_main_user_id FOREIGN KEY (user_id) REFERENCES public.main_user(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX hitcount_hit_created_79adf7bc ON public.hitcount_hit USING btree (created);
CREATE INDEX hitcount_hit_hitcount_id_b7971910 ON public.hitcount_hit USING btree (hitcount_id);
CREATE INDEX hitcount_hit_ip_a52a62aa ON public.hitcount_hit USING btree (ip);
CREATE INDEX hitcount_hit_ip_a52a62aa_like ON public.hitcount_hit USING btree (ip varchar_pattern_ops);
CREATE INDEX hitcount_hit_session_5be83758 ON public.hitcount_hit USING btree (session);
CREATE INDEX hitcount_hit_session_5be83758_like ON public.hitcount_hit USING btree (session varchar_pattern_ops);
CREATE INDEX hitcount_hit_user_id_f7067f66 ON public.hitcount_hit USING btree (user_id);


-- public.main_announcement definition

-- Drop table

-- DROP TABLE public.main_announcement;

CREATE TABLE public.main_announcement (
	id bigserial NOT NULL,
	title varchar(255) NOT NULL,
	title_ky varchar(255) NULL,
	title_ru varchar(255) NULL,
	kind varchar(255) NOT NULL,
	"content" text NOT NULL,
	content_ky text NULL,
	content_ru text NULL,
	created timestamptz NOT NULL,
	organization_id int8 NOT NULL,
	CONSTRAINT main_announcement_pkey PRIMARY KEY (id),
	CONSTRAINT main_announcement_organization_id_496cfd8e_fk_main_orga FOREIGN KEY (organization_id) REFERENCES public.main_organization(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_announcement_organization_id_496cfd8e ON public.main_announcement USING btree (organization_id);


-- public.main_employee definition

-- Drop table

-- DROP TABLE public.main_employee;

CREATE TABLE public.main_employee (
	id bigserial NOT NULL,
	fullname varchar(500) NOT NULL,
	fullname_ky varchar(500) NULL,
	fullname_ru varchar(500) NULL,
	img varchar(100) NULL,
	"order" int2 NOT NULL,
	"position" varchar(500) NOT NULL,
	position_ky varchar(500) NULL,
	position_ru varchar(500) NULL,
	phone varchar(50) NULL,
	fax varchar(20) NULL,
	email varchar(254) NULL,
	biography text NULL,
	biography_ky text NULL,
	biography_ru text NULL,
	organization_id int8 NOT NULL,
	CONSTRAINT main_employee_order_check CHECK (("order" >= 0)),
	CONSTRAINT main_employee_pkey PRIMARY KEY (id),
	CONSTRAINT main_employee_organization_id_af8aa811_fk_main_organization_id FOREIGN KEY (organization_id) REFERENCES public.main_organization(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_employee_organization_id_af8aa811 ON public.main_employee USING btree (organization_id);


-- public.main_event definition

-- Drop table

-- DROP TABLE public.main_event;

CREATE TABLE public.main_event (
	id bigserial NOT NULL,
	title varchar(255) NOT NULL,
	title_ky varchar(255) NULL,
	title_ru varchar(255) NULL,
	annotation text NOT NULL,
	annotation_ky text NULL,
	annotation_ru text NULL,
	"content" text NOT NULL,
	content_ky text NULL,
	content_ru text NULL,
	img varchar(100) NULL,
	created timestamptz NOT NULL,
	attachment varchar(100) NULL,
	"time" timestamptz NOT NULL,
	organization_id int8 NOT NULL,
	CONSTRAINT main_event_pkey PRIMARY KEY (id),
	CONSTRAINT main_event_organization_id_cf3a56ec_fk_main_organization_id FOREIGN KEY (organization_id) REFERENCES public.main_organization(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_event_organization_id_cf3a56ec ON public.main_event USING btree (organization_id);


-- public.main_legislation definition

-- Drop table

-- DROP TABLE public.main_legislation;

CREATE TABLE public.main_legislation (
	id bigserial NOT NULL,
	status varchar(45) NOT NULL,
	title varchar(1000) NOT NULL,
	title_ky varchar(1000) NULL,
	title_ru varchar(1000) NULL,
	short_description text NULL,
	"number" varchar(45) NULL,
	"period" daterange NOT NULL,
	created timestamptz NOT NULL,
	"content" text NOT NULL,
	content_ky text NULL,
	content_ru text NULL,
	doc varchar(100) NULL,
	pdf varchar(100) NULL,
	direction_id int8 NULL,
	kind_id int8 NOT NULL,
	organization_id int8 NULL,
	CONSTRAINT main_legislation_pkey PRIMARY KEY (id),
	CONSTRAINT main_legislation_direction_id_c7193ab6_fk_main_direction_id FOREIGN KEY (direction_id) REFERENCES public.main_direction(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_legislation_kind_id_209f8b99_fk_main_kind_id FOREIGN KEY (kind_id) REFERENCES public.main_kind(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_legislation_organization_id_21db1e9c_fk_main_orga FOREIGN KEY (organization_id) REFERENCES public.main_organization(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE INDEX main_legislation_direction_id_c7193ab6 ON public.main_legislation USING btree (direction_id);
CREATE INDEX main_legislation_kind_id_209f8b99 ON public.main_legislation USING btree (kind_id);
CREATE INDEX main_legislation_organization_id_21db1e9c ON public.main_legislation USING btree (organization_id);


-- public.users_faculty definition

-- Drop table

-- DROP TABLE public.users_faculty;

CREATE TABLE public.users_faculty (
	id_users_faculty serial4 NOT NULL,
	id_users int4 NOT NULL,
	id_faculty int4 NOT NULL,
	"insDate" timestamp(6) DEFAULT timezone('Asia/Bishkek'::text, now()) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT users_faculty_id_users_id_faculty_key UNIQUE (id_users, id_faculty),
	CONSTRAINT users_faculty_pkey PRIMARY KEY (id_users_faculty),
	CONSTRAINT users_faculty_id_faculty_fkey FOREIGN KEY (id_faculty) REFERENCES public.faculty(id_faculty),
	CONSTRAINT users_faculty_id_users_fkey FOREIGN KEY (id_users) REFERENCES public.users(id_users)
);
CREATE INDEX users_faculty_id_users_id_faculty_idx ON public.users_faculty USING btree (id_users, id_faculty);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_users_faculty BEFORE
UPDATE
    ON
    public.users_faculty FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.village definition

-- Drop table

-- DROP TABLE public.village;

CREATE TABLE public.village (
	id_village serial4 NOT NULL,
	village_ky text NOT NULL,
	village_ru text NOT NULL,
	village_en text NOT NULL,
	id_district int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT village_id_district_village_ky_village_ru_village_en_key UNIQUE (id_district, village_ky, village_ru, village_en),
	CONSTRAINT village_pkey PRIMARY KEY (id_village),
	CONSTRAINT village_id_district_fkey FOREIGN KEY (id_district) REFERENCES public.district(id_district) ON DELETE CASCADE
);
COMMENT ON TABLE public.village IS 'Села / поселки на трех языках';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_village BEFORE
UPDATE
    ON
    public.village FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.direction definition

-- Drop table

-- DROP TABLE public.direction;

CREATE TABLE public.direction (
	id_direction serial4 NOT NULL,
	id_faculty int4 NOT NULL,
	direction_ky text NOT NULL,
	direction_ru text NOT NULL,
	direction_en text NULL,
	direction_cipher varchar(50) NULL,
	created_date timestamp(6) DEFAULT timezone('Asia/Bishkek'::text, now()) NULL,
	upd_date timestamp(6) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT direction_id_faculty_direction_ru_key UNIQUE (id_faculty, direction_ru, direction_cipher),
	CONSTRAINT direction_pkey PRIMARY KEY (id_direction),
	CONSTRAINT direction_id_faculty_fkey FOREIGN KEY (id_faculty) REFERENCES public.faculty(id_faculty) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX direction_id_faculty_idx ON public.direction USING btree (id_faculty);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_direction BEFORE
UPDATE
    ON
    public.direction FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.specialty definition

-- Drop table

-- DROP TABLE public.specialty;

CREATE TABLE public.specialty (
	id_specialty serial4 NOT NULL,
	id_direction int4 NOT NULL,
	id_learning int4 NOT NULL,
	id_industry int4 NULL,
	specialty_cipher varchar(255) NULL,
	specialty_ky text NULL,
	specialty_ru text NOT NULL,
	specialty_en text NULL,
	id_qualification int4 NULL,
	id_education_period_year int4 NULL,
	id_education_period_month int4 NULL,
	created_date timestamp(6) DEFAULT timezone('Asia/Bishkek'::text, now()) NULL,
	upd_date timestamp(6) NULL,
	is_active bool DEFAULT true NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT specialty_id_direction_id_learning_specialty_cipher_special_key UNIQUE (id_direction, id_learning, specialty_cipher, specialty_ru, id_education_period_year, id_education_period_month),
	CONSTRAINT specialty_pkey PRIMARY KEY (id_specialty),
	CONSTRAINT specialty_id_direction_fkey FOREIGN KEY (id_direction) REFERENCES public.direction(id_direction),
	CONSTRAINT specialty_id_education_period_month_fkey FOREIGN KEY (id_education_period_month) REFERENCES public.education_period_month(id_education_period_month),
	CONSTRAINT specialty_id_education_period_year_fkey FOREIGN KEY (id_education_period_year) REFERENCES public.education_period_year(id_education_period_year),
	CONSTRAINT specialty_id_industry_fkey FOREIGN KEY (id_industry) REFERENCES public.industry(id_industry),
	CONSTRAINT specialty_id_learning_fkey FOREIGN KEY (id_learning) REFERENCES public.learning(id_learning),
	CONSTRAINT specialty_id_qualification_fkey FOREIGN KEY (id_qualification) REFERENCES public.qualification(id_qualification)
);
CREATE INDEX idx_specialty_id_direction ON public.specialty USING btree (id_direction);
CREATE INDEX idx_specialty_id_education_period_month ON public.specialty USING btree (id_education_period_month);
CREATE INDEX idx_specialty_id_education_period_year ON public.specialty USING btree (id_education_period_year);
CREATE INDEX idx_specialty_id_industry ON public.specialty USING btree (id_industry);
CREATE INDEX idx_specialty_id_learning ON public.specialty USING btree (id_learning);
CREATE INDEX idx_specialty_id_qualification ON public.specialty USING btree (id_qualification);
CREATE INDEX idx_specialty_learning_ru ON public.specialty USING btree (id_learning, specialty_ru);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_specialty BEFORE
UPDATE
    ON
    public.specialty FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.student_education definition

-- Drop table

-- DROP TABLE public.student_education;

CREATE TABLE public.student_education (
	id_student_education serial4 NOT NULL,
	id_student int4 NOT NULL,
	id_country int4 NULL,
	id_region int4 NULL,
	id_district int4 NULL,
	id_city int4 NULL,
	id_village int4 NULL,
	institution text NOT NULL, -- Учебное заведение
	id_education_document_type int4 NOT NULL, -- Тип документа образования
	document_series varchar(20) NOT NULL, -- Серия документа
	document_number varchar(20) NULL, -- Номер документа
	graduation_year int4 NULL, -- Год окончания учебного заведения
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT student_education_id_student_key UNIQUE (id_student),
	CONSTRAINT student_education_pkey PRIMARY KEY (id_student_education),
	CONSTRAINT student_education_id_city_fkey FOREIGN KEY (id_city) REFERENCES public.city(id_city),
	CONSTRAINT student_education_id_country_fkey FOREIGN KEY (id_country) REFERENCES public.country(id_country),
	CONSTRAINT student_education_id_district_fkey FOREIGN KEY (id_district) REFERENCES public.district(id_district),
	CONSTRAINT student_education_id_education_document_type_fkey FOREIGN KEY (id_education_document_type) REFERENCES public.education_document_type(id_education_document_type),
	CONSTRAINT student_education_id_region_fkey FOREIGN KEY (id_region) REFERENCES public.region(id_region),
	CONSTRAINT student_education_id_student_fkey FOREIGN KEY (id_student) REFERENCES public.student(id_student) ON DELETE CASCADE,
	CONSTRAINT student_education_id_village_fkey FOREIGN KEY (id_village) REFERENCES public.village(id_village)
);
CREATE INDEX idx_student_education_graduation_year ON public.student_education USING btree (graduation_year);
CREATE INDEX idx_student_education_id_student ON public.student_education USING btree (id_student);
COMMENT ON TABLE public.student_education IS 'Образование студента с привязкой к типу документа и месту обучения';

-- Column comments

COMMENT ON COLUMN public.student_education.institution IS 'Учебное заведение';
COMMENT ON COLUMN public.student_education.id_education_document_type IS 'Тип документа образования';
COMMENT ON COLUMN public.student_education.document_series IS 'Серия документа';
COMMENT ON COLUMN public.student_education.document_number IS 'Номер документа';
COMMENT ON COLUMN public.student_education.graduation_year IS 'Год окончания учебного заведения';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_student_education BEFORE
UPDATE
    ON
    public.student_education FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.academic_group definition

-- Drop table

-- DROP TABLE public.academic_group;

CREATE TABLE public.academic_group (
	id_academic_group serial4 NOT NULL,
	id_specialty int4 NOT NULL,
	id_years int4 NOT NULL, -- Год поступления (ссылка на таблицу years)
	group_name text NOT NULL, -- Название учебной группы (например, 1A, 2Б, ИСТ-25)
	duration int4 DEFAULT 6 NOT NULL, -- Длительность обучения (в годах)
	is_active bool DEFAULT true NOT NULL,
	created_at timestamptz(6) DEFAULT timezone('Asia/Bishkek'::text, now()) NOT NULL,
	updated_at timestamptz(6) NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT academic_group_pkey PRIMARY KEY (id_academic_group),
	CONSTRAINT academic_group_unique UNIQUE (id_specialty, id_years, group_name),
	CONSTRAINT academic_group_id_specialty_fkey FOREIGN KEY (id_specialty) REFERENCES public.specialty(id_specialty),
	CONSTRAINT academic_group_id_years_fkey FOREIGN KEY (id_years) REFERENCES public.years(id_years)
);
CREATE INDEX idx_academic_group_id_specialty ON public.academic_group USING btree (id_specialty);
CREATE INDEX idx_academic_group_id_years ON public.academic_group USING btree (id_years);
CREATE INDEX idx_academic_group_is_active ON public.academic_group USING btree (is_active);
COMMENT ON TABLE public.academic_group IS 'Учебные группы по специальностям';

-- Column comments

COMMENT ON COLUMN public.academic_group.id_years IS 'Год поступления (ссылка на таблицу years)';
COMMENT ON COLUMN public.academic_group.group_name IS 'Название учебной группы (например, 1A, 2Б, ИСТ-25)';
COMMENT ON COLUMN public.academic_group.duration IS 'Длительность обучения (в годах)';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_academic_group BEFORE
UPDATE
    ON
    public.academic_group FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.academic_group_name definition

-- Drop table

-- DROP TABLE public.academic_group_name;

CREATE TABLE public.academic_group_name (
	id_academic_group_name serial4 NOT NULL,
	id_specialty int4 NULL,
	group_name text NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT academic_group_name_id_specialty_group_name_key UNIQUE (id_specialty, group_name),
	CONSTRAINT academic_group_name_pkey PRIMARY KEY (id_academic_group_name),
	CONSTRAINT academic_group_name_id_specialty_fkey FOREIGN KEY (id_specialty) REFERENCES public.specialty(id_specialty)
);
CREATE INDEX academic_group_name_id_specialty_idx ON public.academic_group_name USING btree (id_specialty);

-- Table Triggers

CREATE TRIGGER update_system_updated_at_academic_group_name BEFORE
UPDATE
    ON
    public.academic_group_name FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.academic_group_year definition

-- Drop table

-- DROP TABLE public.academic_group_year;

CREATE TABLE public.academic_group_year (
	id_academic_group_year serial4 NOT NULL,
	id_academic_group int4 NOT NULL, -- ID группы
	id_years int4 NOT NULL, -- ID учебного года (из таблицы years)
	course int4 NOT NULL, -- Курс обучения (1–6)
	is_active bool DEFAULT true NOT NULL, -- Флаг активности записи (текущий курс)
	created_at timestamptz(6) DEFAULT timezone('Asia/Bishkek'::text, now()) NOT NULL, -- Дата создания записи
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT academic_group_year_course_check CHECK (((course >= 1) AND (course <= 6))),
	CONSTRAINT academic_group_year_pkey PRIMARY KEY (id_academic_group_year),
	CONSTRAINT academic_group_year_unique UNIQUE (id_academic_group, id_years),
	CONSTRAINT academic_group_year_id_academic_group_fkey FOREIGN KEY (id_academic_group) REFERENCES public.academic_group(id_academic_group),
	CONSTRAINT academic_group_year_id_years_fkey FOREIGN KEY (id_years) REFERENCES public.years(id_years)
);
CREATE INDEX idx_agy_course ON public.academic_group_year USING btree (course);
CREATE INDEX idx_agy_id_academic_group ON public.academic_group_year USING btree (id_academic_group);
CREATE INDEX idx_agy_id_years ON public.academic_group_year USING btree (id_years);
CREATE INDEX idx_agy_is_active ON public.academic_group_year USING btree (is_active);
COMMENT ON TABLE public.academic_group_year IS 'Связь между учебной группой и годами обучения (по курсам)';

-- Column comments

COMMENT ON COLUMN public.academic_group_year.id_academic_group IS 'ID группы';
COMMENT ON COLUMN public.academic_group_year.id_years IS 'ID учебного года (из таблицы years)';
COMMENT ON COLUMN public.academic_group_year.course IS 'Курс обучения (1–6)';
COMMENT ON COLUMN public.academic_group_year.is_active IS 'Флаг активности записи (текущий курс)';
COMMENT ON COLUMN public.academic_group_year.created_at IS 'Дата создания записи';

-- Table Triggers

CREATE TRIGGER update_system_updated_at_academic_group_year BEFORE
UPDATE
    ON
    public.academic_group_year FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.educational_plan definition

-- Drop table

-- DROP TABLE public.educational_plan;

CREATE TABLE public.educational_plan (
	id_educational_plan bigserial NOT NULL, -- Серийный ключ
	educational_plan_shifr int8 NULL, -- Шифр плана
	id_years int4 NOT NULL, -- Учебный год
	id_specialty int4 NOT NULL, -- Специальность
	id_education_level int4 NOT NULL, -- Уровень образования
	id_course int4 NOT NULL, -- Курс
	id_year_half int4 NOT NULL, -- Полугодие
	id_semester int4 NOT NULL, -- Семестр
	id_educational_plan_component int4 DEFAULT 1 NOT NULL, -- Компоненты учебного плана
	id_discipline int4 NOT NULL, -- Дисциплина
	ects float4 DEFAULT 0 NOT NULL, -- Кредиты (ECTS)
	id_discipline_control int4 DEFAULT 1 NOT NULL, -- Форма контроля (экзамен, зачёт, тест и т.д.)
	id_academic_department int4 NOT NULL, -- Кафедра
	is_fixed bool DEFAULT true NOT NULL, -- Дисциплина обязательная, фиксированная
	sort_plan int4 DEFAULT 100 NOT NULL, -- Нумерация плана
	elective bool DEFAULT false NOT NULL, -- Курсы по выбору
	id_lesson_type int4 DEFAULT 1 NOT NULL, -- Тип урока (Оффлайн, Онлайн, Смешанный)
	id_educational_plan_status int4 DEFAULT 1 NOT NULL, -- Статус плана
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT educational_plan_pkey PRIMARY KEY (id_educational_plan),
	CONSTRAINT unq_educational_plan UNIQUE (id_years, id_specialty, id_education_level, id_course, id_year_half, id_semester, id_discipline, id_discipline_control, ects, id_educational_plan_component, id_academic_department, id_lesson_type),
	CONSTRAINT educational_plan_id_educational_plan_status_fkey FOREIGN KEY (id_educational_plan_status) REFERENCES public.educational_plan_status(id_educational_plan_status),
	CONSTRAINT fk_educational_plan_academic_department FOREIGN KEY (id_academic_department) REFERENCES public.academic_department(id_academic_department),
	CONSTRAINT fk_educational_plan_component FOREIGN KEY (id_educational_plan_component) REFERENCES public.educational_plan_component(id_educational_plan_component),
	CONSTRAINT fk_educational_plan_control FOREIGN KEY (id_discipline_control) REFERENCES public.discipline_control(id_discipline_control),
	CONSTRAINT fk_educational_plan_course FOREIGN KEY (id_course) REFERENCES public.course(id_course),
	CONSTRAINT fk_educational_plan_discipline FOREIGN KEY (id_discipline) REFERENCES public.discipline(id_discipline),
	CONSTRAINT fk_educational_plan_lesson_type FOREIGN KEY (id_lesson_type) REFERENCES public.lesson_type(id_lesson_type),
	CONSTRAINT fk_educational_plan_level FOREIGN KEY (id_education_level) REFERENCES public.education_level(id_education_level),
	CONSTRAINT fk_educational_plan_semester FOREIGN KEY (id_semester) REFERENCES public.semester(id_semester),
	CONSTRAINT fk_educational_plan_specialty FOREIGN KEY (id_specialty) REFERENCES public.specialty(id_specialty),
	CONSTRAINT fk_educational_plan_term FOREIGN KEY (id_year_half) REFERENCES public.year_half(id_year_half),
	CONSTRAINT fk_educational_plan_years FOREIGN KEY (id_years) REFERENCES public.years(id_years)
);
CREATE INDEX idx_ep_academic_department ON public.educational_plan USING btree (id_academic_department);
CREATE INDEX idx_ep_component ON public.educational_plan USING btree (id_educational_plan_component);
CREATE INDEX idx_ep_discipline ON public.educational_plan USING btree (id_discipline);
CREATE INDEX idx_ep_discipline_control ON public.educational_plan USING btree (id_discipline_control);
CREATE INDEX idx_ep_filter ON public.educational_plan USING btree (id_years, id_course, id_year_half, id_semester, id_specialty, id_education_level);
CREATE INDEX idx_ep_status ON public.educational_plan USING btree (id_educational_plan_status);
COMMENT ON TABLE public.educational_plan IS 'Учебный план (детализация по дисциплинам)';

-- Column comments

COMMENT ON COLUMN public.educational_plan.id_educational_plan IS 'Серийный ключ';
COMMENT ON COLUMN public.educational_plan.educational_plan_shifr IS 'Шифр плана';
COMMENT ON COLUMN public.educational_plan.id_years IS 'Учебный год';
COMMENT ON COLUMN public.educational_plan.id_specialty IS 'Специальность';
COMMENT ON COLUMN public.educational_plan.id_education_level IS 'Уровень образования';
COMMENT ON COLUMN public.educational_plan.id_course IS 'Курс';
COMMENT ON COLUMN public.educational_plan.id_year_half IS 'Полугодие';
COMMENT ON COLUMN public.educational_plan.id_semester IS 'Семестр';
COMMENT ON COLUMN public.educational_plan.id_educational_plan_component IS 'Компоненты учебного плана';
COMMENT ON COLUMN public.educational_plan.id_discipline IS 'Дисциплина';
COMMENT ON COLUMN public.educational_plan.ects IS 'Кредиты (ECTS)';
COMMENT ON COLUMN public.educational_plan.id_discipline_control IS 'Форма контроля (экзамен, зачёт, тест и т.д.)';
COMMENT ON COLUMN public.educational_plan.id_academic_department IS 'Кафедра';
COMMENT ON COLUMN public.educational_plan.is_fixed IS 'Дисциплина обязательная, фиксированная';
COMMENT ON COLUMN public.educational_plan.sort_plan IS 'Нумерация плана';
COMMENT ON COLUMN public.educational_plan.elective IS 'Курсы по выбору';
COMMENT ON COLUMN public.educational_plan.id_lesson_type IS 'Тип урока (Оффлайн, Онлайн, Смешанный)';
COMMENT ON COLUMN public.educational_plan.id_educational_plan_status IS 'Статус плана';

-- Table Triggers

CREATE TRIGGER trg_after_delete_educational_plan AFTER
DELETE
    ON
    public.educational_plan FOR EACH ROW EXECUTE FUNCTION trg_cleanup_educational_plan_fields();
CREATE TRIGGER trg_insert_educational_plan_shifr BEFORE
INSERT
    ON
    public.educational_plan FOR EACH ROW EXECUTE FUNCTION trg_educational_plan_shifr();
CREATE TRIGGER update_system_updated_at_educational_plan BEFORE
UPDATE
    ON
    public.educational_plan FOR EACH ROW EXECUTE FUNCTION update_system_updated_at_column();


-- public.educational_plan_hours definition

-- Drop table

-- DROP TABLE public.educational_plan_hours;

CREATE TABLE public.educational_plan_hours (
	id_educational_plan_hours serial4 NOT NULL,
	id_educational_plan int8 NOT NULL,
	field_key varchar(50) NOT NULL,
	hours_value float4 DEFAULT 0 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT educational_plan_hours_pkey PRIMARY KEY (id_educational_plan_hours),
	CONSTRAINT uq_eph_plan_field UNIQUE (id_educational_plan, field_key),
	CONSTRAINT fk_eph_educational_plan FOREIGN KEY (id_educational_plan) REFERENCES public.educational_plan(id_educational_plan) ON DELETE CASCADE,
	CONSTRAINT fk_eph_field_key FOREIGN KEY (field_key) REFERENCES public.educational_plan_field_meta(field_key)
);
CREATE INDEX idx_eph_educational_plan ON public.educational_plan_hours USING btree (id_educational_plan);
CREATE INDEX idx_eph_field_key ON public.educational_plan_hours USING btree (field_key);


-- public.student_movement definition

-- Drop table

-- DROP TABLE public.student_movement;

CREATE TABLE public.student_movement (
	id_student_movement bigserial NOT NULL,
	id_student int8 NOT NULL, -- Студент
	id_movement_type int4 NOT NULL, -- Тип движения внутри приказа
	id_years int4 NOT NULL, -- Учебный год
	id_year_half int4 NOT NULL, -- Полугодие
	id_course int4 NOT NULL, -- Курс
	id_semester int4 NOT NULL, -- Семестр
	id_academic_group int4 NOT NULL, -- Группа
	id_budget_contract int4 NOT NULL, -- 1 бюджет / 2 контрак
	order_num varchar(50) NULL, -- Номер приказа
	order_date date NULL, -- Дата приказа
	note text NULL, -- Примечание
	is_active bool DEFAULT true NOT NULL, -- только 1 активная запись на студента
	system_created_at timestamptz(6) DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamptz(6) DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT student_movement_id_student_is_active_key UNIQUE (id_student, is_active),
	CONSTRAINT student_movement_pkey PRIMARY KEY (id_student_movement),
	CONSTRAINT uq_student_movement_unique_movement UNIQUE (id_student, id_movement_type, id_years, id_year_half, id_course, id_semester, id_academic_group),
	CONSTRAINT student_movement_id_academic_group_fkey FOREIGN KEY (id_academic_group) REFERENCES public.academic_group(id_academic_group),
	CONSTRAINT student_movement_id_budget_contract_fkey FOREIGN KEY (id_budget_contract) REFERENCES public.budget_contract(id_budget_contract),
	CONSTRAINT student_movement_id_course_fkey FOREIGN KEY (id_course) REFERENCES public.course(id_course),
	CONSTRAINT student_movement_id_movement_type_fkey FOREIGN KEY (id_movement_type) REFERENCES public.movement_type(id_movement_type),
	CONSTRAINT student_movement_id_semester_fkey FOREIGN KEY (id_semester) REFERENCES public.semester(id_semester),
	CONSTRAINT student_movement_id_student_fkey FOREIGN KEY (id_student) REFERENCES public.student(id_student),
	CONSTRAINT student_movement_id_year_half_fkey FOREIGN KEY (id_year_half) REFERENCES public.year_half(id_year_half),
	CONSTRAINT student_movement_id_years_fkey FOREIGN KEY (id_years) REFERENCES public.years(id_years)
);
CREATE INDEX idx_student_movement_active ON public.student_movement USING btree (is_active);
CREATE INDEX idx_student_movement_group_year_course ON public.student_movement USING btree (id_academic_group, id_years, id_course);
CREATE INDEX idx_student_movement_group_year_half_type ON public.student_movement USING btree (id_academic_group, id_years, id_year_half, id_movement_type);
CREATE INDEX idx_student_movement_order_num_date ON public.student_movement USING btree (order_num, order_date);
CREATE INDEX idx_student_movement_student ON public.student_movement USING btree (id_student);
CREATE INDEX idx_student_movement_student_active ON public.student_movement USING btree (id_student, is_active);
CREATE INDEX idx_student_movement_student_year_half_course ON public.student_movement USING btree (id_student, id_years, id_year_half, id_course);
CREATE INDEX idx_student_movement_type ON public.student_movement USING btree (id_movement_type);
CREATE UNIQUE INDEX idx_student_movement_unique_active ON public.student_movement USING btree (id_student, id_years, id_year_half, id_course, id_academic_group) WHERE (is_active = true);
CREATE INDEX idx_student_movement_year_half ON public.student_movement USING btree (id_years, id_year_half);
CREATE UNIQUE INDEX uq_student_movement_combo ON public.student_movement USING btree (id_student, id_movement_type, id_years, id_semester);

-- Column comments

COMMENT ON COLUMN public.student_movement.id_student IS 'Студент';
COMMENT ON COLUMN public.student_movement.id_movement_type IS 'Тип движения внутри приказа';
COMMENT ON COLUMN public.student_movement.id_years IS 'Учебный год';
COMMENT ON COLUMN public.student_movement.id_year_half IS 'Полугодие';
COMMENT ON COLUMN public.student_movement.id_course IS 'Курс';
COMMENT ON COLUMN public.student_movement.id_semester IS 'Семестр';
COMMENT ON COLUMN public.student_movement.id_academic_group IS 'Группа';
COMMENT ON COLUMN public.student_movement.id_budget_contract IS '1 бюджет / 2 контрак';
COMMENT ON COLUMN public.student_movement.order_num IS 'Номер приказа';
COMMENT ON COLUMN public.student_movement.order_date IS 'Дата приказа';
COMMENT ON COLUMN public.student_movement.note IS 'Примечание';
COMMENT ON COLUMN public.student_movement.is_active IS 'только 1 активная запись на студента';

-- Table Triggers

CREATE TRIGGER student_movement_update_timestamp BEFORE
UPDATE
    ON
    public.student_movement FOR EACH ROW EXECUTE FUNCTION trg_update_timestamp();
CREATE TRIGGER trg_student_movement_to_history BEFORE
INSERT
    OR
DELETE
    OR
UPDATE
    ON
    public.student_movement FOR EACH ROW EXECUTE FUNCTION fn_student_movement_to_history();


-- public.student_movement_history definition

-- Drop table

-- DROP TABLE public.student_movement_history;

CREATE TABLE public.student_movement_history (
	id_student_movement_history bigserial NOT NULL, -- Первичный ключ истории движения.
	id_student_movement int8 NULL, -- Идентификатор оригинальной записи в student_movement. Может быть NULL при удалении.
	id_student int8 NOT NULL, -- Идентификатор студента, к которому относится запись.
	id_movement_type int4 NOT NULL, -- Тип движения: зачисление, перевод, отчисление и т.д.
	id_years int4 NOT NULL, -- Учебный год, связанный с движением.
	id_year_half int4 NOT NULL, -- Полугодие, связанное с движением.
	id_course int4 NOT NULL, -- Курс обучения на момент движения.
	id_semester int4 NOT NULL, -- Семестр обучения.
	id_academic_group int4 NOT NULL, -- Академическая группа, в которой студент находился.
	id_budget_contract int4 NOT NULL, -- Форма обучения: бюджет / контракт.
	order_num varchar(50) NULL, -- Номер приказа, по которому происходило движение.
	order_date date NULL, -- Дата приказа, связанного с движением.
	note text NULL, -- Примечание к движению.
	is_active bool NOT NULL, -- Флаг активности записи в момент события. TRUE = запись была активной.
	"action" varchar(30) NOT NULL, -- Тип действия: INSERT, UPDATE, DELETE, MOVE, CHANGE_GROUP и т.д.
	id_user int4 NULL, -- Пользователь, выполнивший действие.
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL, -- Дата и время создания записи в истории.
	CONSTRAINT chk_smh_action CHECK (((action)::text = ANY (ARRAY[('INSERT'::character varying)::text, ('UPDATE'::character varying)::text, ('DELETE'::character varying)::text, ('MOVE'::character varying)::text, ('CHANGE_GROUP'::character varying)::text, ('GRADUATE'::character varying)::text, ('RESTORE'::character varying)::text, ('TRANSFER'::character varying)::text]))),
	CONSTRAINT chk_smh_is_active_boolean CHECK ((is_active = ANY (ARRAY[true, false]))),
	CONSTRAINT chk_smh_note_not_empty CHECK (((note IS NULL) OR (length(TRIM(BOTH FROM note)) > 0))),
	CONSTRAINT chk_smh_order_date_not_future CHECK (((order_date IS NULL) OR (order_date <= CURRENT_DATE))),
	CONSTRAINT chk_smh_order_num_not_empty CHECK (((order_num IS NULL) OR (length(TRIM(BOTH FROM order_num)) > 0))),
	CONSTRAINT student_movement_history_id_student_movement_id_student_id__key UNIQUE (id_student_movement, id_student, id_movement_type, id_years, id_year_half, id_course, id_semester, id_academic_group, id_budget_contract),
	CONSTRAINT student_movement_history_pkey PRIMARY KEY (id_student_movement_history),
	CONSTRAINT fk_smh_academic_group FOREIGN KEY (id_academic_group) REFERENCES public.academic_group(id_academic_group),
	CONSTRAINT fk_smh_budget_contract FOREIGN KEY (id_budget_contract) REFERENCES public.budget_contract(id_budget_contract),
	CONSTRAINT fk_smh_course FOREIGN KEY (id_course) REFERENCES public.course(id_course),
	CONSTRAINT fk_smh_movement_type FOREIGN KEY (id_movement_type) REFERENCES public.movement_type(id_movement_type),
	CONSTRAINT fk_smh_semester FOREIGN KEY (id_semester) REFERENCES public.semester(id_semester),
	CONSTRAINT fk_smh_student FOREIGN KEY (id_student) REFERENCES public.student(id_student) ON DELETE CASCADE,
	CONSTRAINT fk_smh_student_movement FOREIGN KEY (id_student_movement) REFERENCES public.student_movement(id_student_movement) ON DELETE SET NULL,
	CONSTRAINT fk_smh_year_half FOREIGN KEY (id_year_half) REFERENCES public.year_half(id_year_half),
	CONSTRAINT fk_smh_years FOREIGN KEY (id_years) REFERENCES public.years(id_years)
);
CREATE INDEX idx_smh_action ON public.student_movement_history USING btree (action);
CREATE INDEX idx_smh_created_at ON public.student_movement_history USING btree (created_at);
CREATE INDEX idx_smh_id_academic_group ON public.student_movement_history USING btree (id_academic_group);
CREATE INDEX idx_smh_id_movement_type ON public.student_movement_history USING btree (id_movement_type);
CREATE INDEX idx_smh_id_student ON public.student_movement_history USING btree (id_student);
CREATE INDEX idx_smh_id_student_movement ON public.student_movement_history USING btree (id_student_movement);
CREATE INDEX idx_smh_movement_time ON public.student_movement_history USING btree (id_student_movement, created_at DESC);
COMMENT ON TABLE public.student_movement_history IS 'История изменений записей движения студентов. 
Содержит полные слепки данных из student_movement.';

-- Column comments

COMMENT ON COLUMN public.student_movement_history.id_student_movement_history IS 'Первичный ключ истории движения.';
COMMENT ON COLUMN public.student_movement_history.id_student_movement IS 'Идентификатор оригинальной записи в student_movement. Может быть NULL при удалении.';
COMMENT ON COLUMN public.student_movement_history.id_student IS 'Идентификатор студента, к которому относится запись.';
COMMENT ON COLUMN public.student_movement_history.id_movement_type IS 'Тип движения: зачисление, перевод, отчисление и т.д.';
COMMENT ON COLUMN public.student_movement_history.id_years IS 'Учебный год, связанный с движением.';
COMMENT ON COLUMN public.student_movement_history.id_year_half IS 'Полугодие, связанное с движением.';
COMMENT ON COLUMN public.student_movement_history.id_course IS 'Курс обучения на момент движения.';
COMMENT ON COLUMN public.student_movement_history.id_semester IS 'Семестр обучения.';
COMMENT ON COLUMN public.student_movement_history.id_academic_group IS 'Академическая группа, в которой студент находился.';
COMMENT ON COLUMN public.student_movement_history.id_budget_contract IS 'Форма обучения: бюджет / контракт.';
COMMENT ON COLUMN public.student_movement_history.order_num IS 'Номер приказа, по которому происходило движение.';
COMMENT ON COLUMN public.student_movement_history.order_date IS 'Дата приказа, связанного с движением.';
COMMENT ON COLUMN public.student_movement_history.note IS 'Примечание к движению.';
COMMENT ON COLUMN public.student_movement_history.is_active IS 'Флаг активности записи в момент события. TRUE = запись была активной.';
COMMENT ON COLUMN public.student_movement_history."action" IS 'Тип действия: INSERT, UPDATE, DELETE, MOVE, CHANGE_GROUP и т.д.';
COMMENT ON COLUMN public.student_movement_history.id_user IS 'Пользователь, выполнивший действие.';
COMMENT ON COLUMN public.student_movement_history.created_at IS 'Дата и время создания записи в истории.';


-- public.student_movement_log definition

-- Drop table

-- DROP TABLE public.student_movement_log;

CREATE TABLE public.student_movement_log (
	id_log bigserial NOT NULL, -- Первичный ключ лога
	id_user int4 NOT NULL, -- Пользователь, который выполнил действие
	id_student_movement int8 NULL, -- ID записи в таблице student_movement
	id_student int8 NULL, -- ID студента
	"action" varchar(20) NOT NULL, -- Тип действия: insert/update/delete
	old_data jsonb NULL, -- Данные до изменения
	new_data jsonb NULL, -- Данные после изменения
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL, -- Дата/время записи
	CONSTRAINT chk_student_movement_log_action CHECK (((action)::text = ANY (ARRAY[('insert'::character varying)::text, ('update'::character varying)::text, ('delete'::character varying)::text]))),
	CONSTRAINT student_movement_log_pkey PRIMARY KEY (id_log),
	CONSTRAINT fk_student_movement_log_student FOREIGN KEY (id_student) REFERENCES public.student(id_student) ON DELETE SET NULL,
	CONSTRAINT fk_student_movement_log_student_movement FOREIGN KEY (id_student_movement) REFERENCES public.student_movement(id_student_movement) ON DELETE SET NULL
);
CREATE INDEX idx_student_movement_log_created_at ON public.student_movement_log USING btree (created_at DESC);
CREATE INDEX idx_student_movement_log_id_student ON public.student_movement_log USING btree (id_student);
CREATE INDEX idx_student_movement_log_id_student_movement ON public.student_movement_log USING btree (id_student_movement);
COMMENT ON TABLE public.student_movement_log IS 'История изменений записей движения студентов';

-- Column comments

COMMENT ON COLUMN public.student_movement_log.id_log IS 'Первичный ключ лога';
COMMENT ON COLUMN public.student_movement_log.id_user IS 'Пользователь, который выполнил действие';
COMMENT ON COLUMN public.student_movement_log.id_student_movement IS 'ID записи в таблице student_movement';
COMMENT ON COLUMN public.student_movement_log.id_student IS 'ID студента';
COMMENT ON COLUMN public.student_movement_log."action" IS 'Тип действия: insert/update/delete';
COMMENT ON COLUMN public.student_movement_log.old_data IS 'Данные до изменения';
COMMENT ON COLUMN public.student_movement_log.new_data IS 'Данные после изменения';
COMMENT ON COLUMN public.student_movement_log.created_at IS 'Дата/время записи';


-- public.teacher_load definition

-- Drop table

-- DROP TABLE public.teacher_load;

CREATE TABLE public.teacher_load (
	id_teacher_load bigserial NOT NULL,
	id_educational_plan int8 NOT NULL,
	id_academic_group int4 NULL,
	id_academic_department int4 NOT NULL,
	id_discipline int8 NOT NULL,
	id_discipline_control int4 NULL,
	id_user int4 NOT NULL,
	total_hours float4 DEFAULT 0 NOT NULL, -- Суммарные часы преподавателя
	id_rule int4 NULL, -- Ссылка на правило расчёта оценок
	mark_sheet bool DEFAULT false NOT NULL, -- Флаг для формирования ведомости
	note text NULL,
	system_created_at timestamp(6) DEFAULT CURRENT_TIMESTAMP NULL,
	system_updated_at timestamp(6) DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT teacher_load_pkey PRIMARY KEY (id_teacher_load),
	CONSTRAINT teacher_load_total_hours_check CHECK ((total_hours >= (0)::double precision)),
	CONSTRAINT teacher_load_unique UNIQUE (id_user, id_discipline, id_educational_plan, id_academic_group),
	CONSTRAINT teacher_load_id_academic_department_fkey FOREIGN KEY (id_academic_department) REFERENCES public.academic_department(id_academic_department) ON DELETE RESTRICT,
	CONSTRAINT teacher_load_id_discipline_fkey FOREIGN KEY (id_discipline) REFERENCES public.discipline(id_discipline) ON DELETE RESTRICT,
	CONSTRAINT teacher_load_id_educational_plan_fkey FOREIGN KEY (id_educational_plan) REFERENCES public.educational_plan(id_educational_plan) ON DELETE CASCADE,
	CONSTRAINT teacher_load_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_users) ON DELETE RESTRICT
);
CREATE INDEX idx_teacher_load_department ON public.teacher_load USING btree (id_academic_department);
CREATE INDEX idx_teacher_load_discipline ON public.teacher_load USING btree (id_discipline);
CREATE INDEX idx_teacher_load_plan ON public.teacher_load USING btree (id_educational_plan);
CREATE INDEX idx_teacher_load_user ON public.teacher_load USING btree (id_user);
COMMENT ON TABLE public.teacher_load IS 'Расчет распределение нагрузки';

-- Column comments

COMMENT ON COLUMN public.teacher_load.total_hours IS 'Суммарные часы преподавателя';
COMMENT ON COLUMN public.teacher_load.id_rule IS 'Ссылка на правило расчёта оценок';
COMMENT ON COLUMN public.teacher_load.mark_sheet IS 'Флаг для формирования ведомости';


-- public.teacher_load_hours definition

-- Drop table

-- DROP TABLE public.teacher_load_hours;

CREATE TABLE public.teacher_load_hours (
	id_teacher_load_hours bigserial NOT NULL,
	id_teacher_load int8 NOT NULL,
	field_key varchar(50) NOT NULL,
	hours float4 DEFAULT 0 NOT NULL, -- Количество часов по типу
	CONSTRAINT teacher_load_hours_hours_check CHECK ((hours >= (0)::double precision)),
	CONSTRAINT teacher_load_hours_pkey PRIMARY KEY (id_teacher_load_hours),
	CONSTRAINT teacher_load_hours_unique UNIQUE (id_teacher_load, field_key),
	CONSTRAINT teacher_load_hours_field_key_fkey FOREIGN KEY (field_key) REFERENCES public.educational_plan_field_meta(field_key),
	CONSTRAINT teacher_load_hours_id_teacher_load_fkey FOREIGN KEY (id_teacher_load) REFERENCES public.teacher_load(id_teacher_load) ON DELETE CASCADE
);
CREATE INDEX idx_teacher_load_hours_field ON public.teacher_load_hours USING btree (field_key);
CREATE INDEX idx_teacher_load_hours_load ON public.teacher_load_hours USING btree (id_teacher_load);

-- Column comments

COMMENT ON COLUMN public.teacher_load_hours.hours IS 'Количество часов по типу';


-- public.mv_academic_department source

CREATE MATERIALIZED VIEW public.mv_academic_department
TABLESPACE pg_default
AS SELECT id_academic_department,
    academic_department_ky,
    academic_department_ru,
    academic_department_en
   FROM academic_department
  ORDER BY id_academic_department
WITH DATA;


-- public.mv_bk source

CREATE MATERIALIZED VIEW public.mv_bk
TABLESPACE pg_default
AS SELECT id_budget_contract,
    budget_contract_ky,
    budget_contract_ru,
    budget_contract_en
   FROM budget_contract
  ORDER BY id_budget_contract
WITH DATA;


-- public.mv_citizenship source

CREATE MATERIALIZED VIEW public.mv_citizenship
TABLESPACE pg_default
AS SELECT id_citizenship,
    citizenship_ky,
    citizenship_ru,
    citizenship_en
   FROM citizenship
  ORDER BY id_citizenship
WITH DATA;


-- public.mv_component source

CREATE MATERIALIZED VIEW public.mv_component
TABLESPACE pg_default
AS SELECT id_educational_plan_component,
    educational_plan_component_ky,
    educational_plan_component_ru,
    educational_plan_component_en,
    s_educational_plan_component_ky,
    s_educational_plan_component_ru,
    s_educational_plan_component_en
   FROM educational_plan_component
  ORDER BY id_educational_plan_component
WITH DATA;


-- public.mv_country source

CREATE MATERIALIZED VIEW public.mv_country
TABLESPACE pg_default
AS SELECT id_country,
    country_ky,
    country_ru,
    country_en
   FROM country
  ORDER BY id_country
WITH DATA;


-- public.mv_course source

CREATE MATERIALIZED VIEW public.mv_course
TABLESPACE pg_default
AS SELECT id_course,
    course_ky,
    course_ru,
    course_en
   FROM course
  ORDER BY id_course
WITH DATA;

-- View indexes:
CREATE INDEX idx_course_id_course ON public.mv_course USING btree (id_course);


-- public.mv_course_year_half_semester source

CREATE MATERIALIZED VIEW public.mv_course_year_half_semester
TABLESPACE pg_default
AS WITH course_year_half AS (
         SELECT c.id_course,
            y.id_year_half
           FROM course c
             CROSS JOIN year_half y
        ), calculated_semester AS (
         SELECT cyh.id_course,
            cyh.id_year_half,
                CASE cyh.id_year_half
                    WHEN 1 THEN 1
                    WHEN 2 THEN 2
                    WHEN 3 THEN 1
                    WHEN 4 THEN 2
                    ELSE NULL::integer
                END + (cyh.id_course - 1) * 2 AS id_semester
           FROM course_year_half cyh
        )
 SELECT cs.id_semester,
    s.semester_ky,
    s.semester_ru,
    s.semester_en,
    cs.id_course,
    cs.id_year_half
   FROM calculated_semester cs
     JOIN semester s ON s.id_semester = cs.id_semester
  ORDER BY cs.id_course, cs.id_year_half
WITH DATA;

-- View indexes:
CREATE INDEX idx_mv_course_year_half_semester_semester ON public.mv_course_year_half_semester USING btree (id_year_half, id_course);


-- public.mv_direction source

CREATE MATERIALIZED VIEW public.mv_direction
TABLESPACE pg_default
AS SELECT id_direction,
    id_faculty,
    direction_cipher,
    direction_ky,
    direction_ru,
    direction_en
   FROM direction
  ORDER BY direction_ru
WITH DATA;

-- View indexes:
CREATE INDEX idx_mv_direction ON public.mv_direction USING btree (id_direction, id_faculty);


-- public.mv_discipline_control source

CREATE MATERIALIZED VIEW public.mv_discipline_control
TABLESPACE pg_default
AS SELECT id_discipline_control,
    discipline_control_ky,
    discipline_control_ru,
    discipline_control_en
   FROM discipline_control
  ORDER BY sort
WITH DATA;


-- public.mv_discipline_elective source

CREATE MATERIALIZED VIEW public.mv_discipline_elective
TABLESPACE pg_default
AS SELECT 0 AS id,
    false AS elective,
    'Пландуу'::text AS discipline_elective_ky,
    'Плановые'::text AS discipline_elective_ru,
    'Planned'::text AS discipline_elective_en
UNION
 SELECT 1 AS id,
    true AS elective,
    'Тандоо курстары'::text AS discipline_elective_ky,
    'Курсы по выбору '::text AS discipline_elective_ru,
    'Elective courses'::text AS discipline_elective_en
WITH DATA;


-- public.mv_discipline_type source

CREATE MATERIALIZED VIEW public.mv_discipline_type
TABLESPACE pg_default
AS SELECT 1 AS id,
    true AS is_fixed,
    'Милдеттүү'::text AS discipline_type_ky,
    'Фиксированные'::text AS discipline_type_ru,
    'Fixed'::text AS discipline_type_en
UNION
 SELECT 0 AS id,
    false AS is_fixed,
    'Катталуучу'::text AS discipline_type_ky,
    'Регистрируемые '::text AS discipline_type_ru,
    'Registered'::text AS discipline_type_en
  ORDER BY 1 DESC
WITH DATA;


-- public.mv_document_type source

CREATE MATERIALIZED VIEW public.mv_document_type
TABLESPACE pg_default
AS SELECT id_document_type,
    document_type_ky,
    document_type_ru,
    document_type_en
   FROM document_type
  ORDER BY id_document_type
WITH DATA;


-- public.mv_education_document_type source

CREATE MATERIALIZED VIEW public.mv_education_document_type
TABLESPACE pg_default
AS SELECT id_education_document_type,
    document_type_ky,
    document_type_ru,
    document_type_en
   FROM education_document_type
  ORDER BY id_education_document_type
WITH DATA;


-- public.mv_education_level source

CREATE MATERIALIZED VIEW public.mv_education_level
TABLESPACE pg_default
AS SELECT id_education_level,
    education_level_ky,
    education_level_ru,
    education_level_en
   FROM education_level e
  ORDER BY sort
WITH DATA;


-- public.mv_ep_fields source

CREATE MATERIALIZED VIEW public.mv_ep_fields
TABLESPACE pg_default
AS SELECT f.educational_plan_shifr,
    f.field_key,
    f.is_visible,
    m.label_ru,
    m.label_ky,
    m.short_label_ru,
    m.short_label_ky,
    m.sort_order
   FROM educational_plan_fields f
     JOIN educational_plan_field_meta m ON m.field_key::text = f.field_key::text
  WHERE m.is_active = true
WITH DATA;


-- public.mv_faculty source

CREATE MATERIALIZED VIEW public.mv_faculty
TABLESPACE pg_default
AS SELECT id_faculty,
    s_faculty,
    faculty_ky,
    faculty_ru,
    faculty_en,
    course,
    is_active
   FROM faculty
  ORDER BY s_faculty
WITH DATA;

-- View indexes:
CREATE INDEX idx_mv_faculty_faculty_copy1 ON public.mv_faculty USING btree (id_faculty);


-- public.mv_faculty_user source

CREATE MATERIALIZED VIEW public.mv_faculty_user
TABLESPACE pg_default
AS SELECT faculty.id_faculty,
    faculty.s_faculty,
    users_faculty.id_users,
    faculty.faculty_ky,
    faculty.faculty_ru,
    faculty.faculty_en,
    faculty.course
   FROM users_faculty
     JOIN faculty ON users_faculty.id_faculty = faculty.id_faculty
  WHERE faculty.is_active = true
  ORDER BY faculty.s_faculty
WITH DATA;

-- View indexes:
CREATE INDEX idx_mv_faculty_faculty ON public.mv_faculty_user USING btree (id_faculty);


-- public.mv_gender source

CREATE MATERIALIZED VIEW public.mv_gender
TABLESPACE pg_default
AS SELECT id_gender,
    gender_ky,
    gender_ru,
    gender_en
   FROM gender
  ORDER BY id_gender
WITH DATA;


-- public.mv_group source

CREATE MATERIALIZED VIEW public.mv_group
TABLESPACE pg_default
AS SELECT id_academic_group,
    id_specialty,
    id_years,
    group_name,
    duration,
    is_active
   FROM academic_group ag
  ORDER BY group_name
WITH DATA;

-- View indexes:
CREATE INDEX idx_mv_academic_group_id_specialty ON public.mv_group USING btree (id_specialty);
CREATE INDEX idx_mv_academic_group_id_years ON public.mv_group USING btree (id_years);
CREATE INDEX idx_mv_academic_group_is_active ON public.mv_group USING btree (is_active);
CREATE UNIQUE INDEX mv_academic_group_pkey ON public.mv_group USING btree (id_academic_group);


COMMENT ON MATERIALIZED VIEW public.mv_group IS 'Материализованное представление данных об учебных группах';
COMMENT ON COLUMN public.mv_group.id_specialty IS 'ID специальности';
COMMENT ON COLUMN public.mv_group.id_years IS 'ID года поступления';
COMMENT ON COLUMN public.mv_group.group_name IS 'Название учебной группы';
COMMENT ON COLUMN public.mv_group.duration IS 'Длительность обучения (в годах)';
COMMENT ON COLUMN public.mv_group.is_active IS 'Флаг активности группы';


-- public.mv_industry source

CREATE MATERIALIZED VIEW public.mv_industry
TABLESPACE pg_default
AS SELECT id_industry,
    industry_ky,
    industry_ru,
    industry_en
   FROM industry i
WITH DATA;

-- View indexes:
CREATE UNIQUE INDEX mv_industry_id_idx ON public.mv_industry USING btree (id_industry);
CREATE UNIQUE INDEX mv_industry_industry_ru_idx ON public.mv_industry USING btree (industry_ru);


-- public.mv_learning source

CREATE MATERIALIZED VIEW public.mv_learning
TABLESPACE pg_default
AS SELECT id_learning,
    learning_ky,
    learning_ru,
    learning_en
   FROM learning l
  ORDER BY sort
WITH DATA;


-- public.mv_learning_direction source

CREATE MATERIALIZED VIEW public.mv_learning_direction
TABLESPACE pg_default
AS SELECT s.id_direction,
    l.id_learning,
    l.learning_ky,
    l.learning_ru,
    l.learning_en
   FROM learning l
     JOIN specialty s ON l.id_learning = s.id_learning
  GROUP BY s.id_direction, l.id_learning, l.learning_ky, l.learning_ru, l.learning_en, l.sort
  ORDER BY l.sort
WITH DATA;

-- View indexes:
CREATE INDEX idx_mv_learning_direction_learning_direction ON public.mv_learning_direction USING btree (id_direction, id_learning);


-- public.mv_lesson_type source

CREATE MATERIALIZED VIEW public.mv_lesson_type
TABLESPACE pg_default
AS SELECT id_lesson_type,
    lesson_type_ky,
    lesson_type_ru,
    lesson_type_en
   FROM lesson_type
  ORDER BY id_lesson_type
WITH DATA;


-- public.mv_marital_status source

CREATE MATERIALIZED VIEW public.mv_marital_status
TABLESPACE pg_default
AS SELECT id_marital_status,
    status_ky,
    status_ru,
    status_en
   FROM marital_status
  ORDER BY id_marital_status
WITH DATA;


-- public.mv_military_document_type source

CREATE MATERIALIZED VIEW public.mv_military_document_type
TABLESPACE pg_default
AS SELECT id_military_document_type,
    document_type_ky,
    document_type_ru,
    document_type_en
   FROM military_document_type
  ORDER BY id_military_document_type
WITH DATA;


-- public.mv_military_office source

CREATE MATERIALIZED VIEW public.mv_military_office
TABLESPACE pg_default
AS SELECT id_military_office,
    office_name_ky,
    office_name_ru,
    office_name_en
   FROM military_office
  ORDER BY office_name_ru
WITH DATA;


-- public.mv_movement_category source

CREATE MATERIALIZED VIEW public.mv_movement_category
TABLESPACE pg_default
AS SELECT id_movement_category,
    movement_category_ky,
    movement_category_ru,
    movement_category_en
   FROM movement_category
  ORDER BY id_movement_category
WITH DATA;


-- public.mv_nationality source

CREATE MATERIALIZED VIEW public.mv_nationality
TABLESPACE pg_default
AS SELECT id_nationality,
    nationality_ky,
    nationality_ru,
    nationality_en
   FROM nationality
  ORDER BY id_nationality
WITH DATA;


-- public.mv_org_manager_status source

CREATE MATERIALIZED VIEW public.mv_org_manager_status
TABLESPACE pg_default
AS SELECT id_org_manager_status,
    org_manager_status_ky,
    org_manager_status_ru,
    org_manager_status_en
   FROM org_manager_status
  ORDER BY id_org_manager_status
WITH DATA;


-- public.mv_position source

CREATE MATERIALIZED VIEW public.mv_position
TABLESPACE pg_default
AS SELECT id_position,
    position_ky,
    position_ru,
    position_en
   FROM "position"
  ORDER BY position_ru
WITH DATA;


-- public.mv_region source

CREATE MATERIALIZED VIEW public.mv_region
TABLESPACE pg_default
AS SELECT id_region,
    region_ky,
    region_ru,
    region_en,
    id_country
   FROM region
  ORDER BY id_region
WITH DATA;

-- View indexes:
CREATE UNIQUE INDEX mv_region_id_region_idx ON public.mv_region USING btree (id_region);


-- public.mv_special_status source

CREATE MATERIALIZED VIEW public.mv_special_status
TABLESPACE pg_default
AS SELECT id_special_status,
    status_ky,
    status_ru,
    status_en
   FROM special_status
  ORDER BY id_special_status
WITH DATA;


-- public.mv_specialty source

CREATE MATERIALIZED VIEW public.mv_specialty
TABLESPACE pg_default
AS SELECT id_specialty,
    id_direction,
    id_learning,
    specialty_cipher,
    specialty_ky,
    specialty_ru,
    specialty_en
   FROM specialty
  ORDER BY specialty_ru
WITH DATA;

-- View indexes:
CREATE INDEX idx_mv_specialty ON public.mv_specialty USING btree (id_direction, id_learning);


-- public.mv_staff_category source

CREATE MATERIALIZED VIEW public.mv_staff_category
TABLESPACE pg_default
AS SELECT id_staff_category,
    staff_category_ky,
    staff_category_ru,
    staff_category_en
   FROM staff_category
  ORDER BY id_staff_category
WITH DATA;


-- public.mv_year_half source

CREATE MATERIALIZED VIEW public.mv_year_half
TABLESPACE pg_default
AS SELECT id_year_half,
    year_half_ky,
    year_half_ru,
    year_half_en
   FROM year_half
  ORDER BY id_year_half
WITH DATA;

-- View indexes:
CREATE INDEX idx_mv_year_half_year_half ON public.mv_year_half USING btree (id_year_half);


-- public.mv_years source

CREATE MATERIALIZED VIEW public.mv_years
TABLESPACE pg_default
AS SELECT id_years,
    sh_years,
    study_year
   FROM years
  ORDER BY id_years
WITH DATA;

-- View indexes:
CREATE INDEX idx_mv_years_id_years ON public.mv_years USING btree (id_years);


-- public.q_student_movement source

CREATE MATERIALIZED VIEW public.q_student_movement
TABLESPACE pg_default
AS SELECT student_movement.id_student_movement,
    student_movement.id_student,
    student_movement.id_movement_type,
    student_movement.id_years,
    student_movement.id_year_half,
    student_movement.id_course,
    student_movement.id_semester,
    student_movement.id_academic_group,
    student_movement.id_budget_contract,
    student_movement.order_num,
    student_movement.order_date,
    student_movement.note,
    student_movement.is_active,
    student_movement.system_created_at,
    student_movement.system_updated_at
   FROM movement_category
     JOIN movement_type ON movement_category.id_movement_category = movement_type.id_movement_category
     JOIN student_movement ON movement_type.id_movement_type = student_movement.id_movement_type
     JOIN student ON student_movement.id_student = student.id_student
     JOIN year_half ON student_movement.id_year_half = year_half.id_year_half
     JOIN years ON student_movement.id_years = years.id_years
     JOIN semester ON student_movement.id_semester = semester.id_semester
     JOIN budget_contract ON student_movement.id_budget_contract = budget_contract.id_budget_contract
WITH DATA;