-- Migration: add all tables
-- Source: master/edu
-- Created: 2025-12-18T11:57:46.391Z

-- Tables (121)

-- public.academic_department definition

CREATE TABLE public.academic_department (
	id_academic_department int4 DEFAULT nextval('academic_department_id_academic_department_seq'::regclass) NOT NULL,
	academic_department_ky text,
	academic_department_ru text,
	academic_department_en text,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT academic_department_academic_department_en_key UNIQUE (academic_department_en),
	CONSTRAINT academic_department_academic_department_ky_key UNIQUE (academic_department_ky),
	CONSTRAINT academic_department_academic_department_ru_key UNIQUE (academic_department_ru),
	CONSTRAINT academic_department_pkey PRIMARY KEY (id_academic_department)
);


-- public.academic_group definition

CREATE TABLE public.academic_group (
	id_academic_group int4 DEFAULT nextval('academic_group_id_academic_group_seq'::regclass) NOT NULL,
	id_specialty int4 NOT NULL,
	id_years int4 NOT NULL,
	group_name text NOT NULL,
	duration int4 DEFAULT 6 NOT NULL,
	is_active bool DEFAULT true NOT NULL,
	created_at timestamptz DEFAULT timezone('Asia/Bishkek'::text, now()) NOT NULL,
	updated_at timestamptz,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT academic_group_unique UNIQUE (id_specialty, id_years, group_name),
	CONSTRAINT academic_group_pkey PRIMARY KEY (id_academic_group),
	CONSTRAINT academic_group_id_specialty_fkey FOREIGN KEY (id_specialty) REFERENCES specialty(id_specialty),
	CONSTRAINT academic_group_id_years_fkey FOREIGN KEY (id_years) REFERENCES years(id_years)
);

CREATE INDEX idx_academic_group_id_specialty ON public.academic_group USING btree (id_specialty);
CREATE INDEX idx_academic_group_id_years ON public.academic_group USING btree (id_years);
CREATE INDEX idx_academic_group_is_active ON public.academic_group USING btree (is_active);


-- public.academic_group_name definition

CREATE TABLE public.academic_group_name (
	id_academic_group_name int4 DEFAULT nextval('academic_group_name_id_academic_group_name_seq'::regclass) NOT NULL,
	id_specialty int4,
	group_name text,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT academic_group_name_id_specialty_group_name_key UNIQUE (id_specialty, group_name),
	CONSTRAINT academic_group_name_pkey PRIMARY KEY (id_academic_group_name),
	CONSTRAINT academic_group_name_id_specialty_fkey FOREIGN KEY (id_specialty) REFERENCES specialty(id_specialty)
);

CREATE INDEX academic_group_name_id_specialty_idx ON public.academic_group_name USING btree (id_specialty);


-- public.academic_group_year definition

CREATE TABLE public.academic_group_year (
	id_academic_group_year int4 DEFAULT nextval('academic_group_year_id_academic_group_year_seq'::regclass) NOT NULL,
	id_academic_group int4 NOT NULL,
	id_years int4 NOT NULL,
	course int4 NOT NULL,
	is_active bool DEFAULT true NOT NULL,
	created_at timestamptz DEFAULT timezone('Asia/Bishkek'::text, now()) NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT academic_group_year_unique UNIQUE (id_academic_group, id_years),
	CONSTRAINT academic_group_year_pkey PRIMARY KEY (id_academic_group_year),
	CONSTRAINT academic_group_year_id_academic_group_fkey FOREIGN KEY (id_academic_group) REFERENCES academic_group(id_academic_group),
	CONSTRAINT academic_group_year_id_years_fkey FOREIGN KEY (id_years) REFERENCES years(id_years),
	CONSTRAINT academic_group_year_course_check CHECK (((course >= 1) AND (course <= 6)))
);

CREATE INDEX idx_agy_course ON public.academic_group_year USING btree (course);
CREATE INDEX idx_agy_id_academic_group ON public.academic_group_year USING btree (id_academic_group);
CREATE INDEX idx_agy_id_years ON public.academic_group_year USING btree (id_years);
CREATE INDEX idx_agy_is_active ON public.academic_group_year USING btree (is_active);


-- public.auth_group definition

CREATE TABLE public.auth_group (
	id int4 DEFAULT nextval('auth_group_id_seq'::regclass) NOT NULL,
	name character varying(150) NOT NULL,
	CONSTRAINT auth_group_name_key UNIQUE (name),
	CONSTRAINT auth_group_pkey PRIMARY KEY (id)
);

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


-- public.auth_group_permissions definition

CREATE TABLE public.auth_group_permissions (
	id int8 DEFAULT nextval('auth_group_permissions_id_seq'::regclass) NOT NULL,
	group_id int4 NOT NULL,
	permission_id int4 NOT NULL,
	CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id),
	CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id),
	CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);
CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


-- public.auth_permission definition

CREATE TABLE public.auth_permission (
	id int4 DEFAULT nextval('auth_permission_id_seq'::regclass) NOT NULL,
	name character varying(255) NOT NULL,
	content_type_id int4 NOT NULL,
	codename character varying(100) NOT NULL,
	CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename),
	CONSTRAINT auth_permission_pkey PRIMARY KEY (id),
	CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


-- public.budget_contract definition

CREATE TABLE public.budget_contract (
	id_budget_contract int4 NOT NULL,
	budget_contract_ky character varying(25),
	budget_contract_ru character varying(25),
	budget_contract_en character varying(25),
	CONSTRAINT budget_contract_pkey PRIMARY KEY (id_budget_contract)
);


-- public.citizenship definition

CREATE TABLE public.citizenship (
	id_citizenship int4 DEFAULT nextval('citizenship_id_citizenship_seq'::regclass) NOT NULL,
	citizenship_ky text NOT NULL,
	citizenship_ru text NOT NULL,
	citizenship_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	iso_code text,
	CONSTRAINT citizenship_citizenship_ky_citizenship_ru_citizenship_en_key UNIQUE (citizenship_ky, citizenship_ru, citizenship_en),
	CONSTRAINT citizenship_pkey PRIMARY KEY (id_citizenship)
);


-- public.city definition

CREATE TABLE public.city (
	id_city int4 DEFAULT nextval('city_id_city_seq'::regclass) NOT NULL,
	city_ky text NOT NULL,
	city_ru text NOT NULL,
	city_en text NOT NULL,
	id_region int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT city_id_region_city_ky_city_ru_city_en_key UNIQUE (id_region, city_ky, city_ru, city_en),
	CONSTRAINT city_pkey PRIMARY KEY (id_city),
	CONSTRAINT city_id_region_fkey FOREIGN KEY (id_region) REFERENCES region(id_region) ON DELETE CASCADE
);


-- public.country definition

CREATE TABLE public.country (
	id_country int4 DEFAULT nextval('country_id_country_seq'::regclass) NOT NULL,
	country_ky text NOT NULL,
	country_ru text NOT NULL,
	country_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	iso_code text,
	CONSTRAINT country_country_ky_country_ru_country_en_key UNIQUE (country_ky, country_ru, country_en),
	CONSTRAINT country_pkey PRIMARY KEY (id_country)
);


-- public.course definition

CREATE TABLE public.course (
	id_course int4 DEFAULT nextval('course_id_course_seq'::regclass) NOT NULL,
	course_ky character varying(15),
	course_ru character varying(15),
	course_en character varying(15),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT course_pkey PRIMARY KEY (id_course)
);

CREATE INDEX course_id_course_idx ON public.course USING btree (id_course);


-- public.course_year_half_semester definition

CREATE TABLE public.course_year_half_semester (
	id_course int4 NOT NULL,
	id_year_half int4 NOT NULL,
	id_semester int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT rate_year_half_semester_id_course_id_year_half_id_semester_key UNIQUE (id_course, id_year_half, id_semester),
	CONSTRAINT pk_rate_year_half_semester PRIMARY KEY (id_course, id_year_half, id_semester),
	CONSTRAINT fk_rate FOREIGN KEY (id_course) REFERENCES course(id_course),
	CONSTRAINT fk_semester FOREIGN KEY (id_semester) REFERENCES semester(id_semester),
	CONSTRAINT fk_year_half FOREIGN KEY (id_year_half) REFERENCES year_half(id_year_half)
);

CREATE INDEX course_year_half_semester_id_course_id_year_half_id_semeste_idx ON public.course_year_half_semester USING btree (id_course, id_year_half, id_semester);


-- public.direction definition

CREATE TABLE public.direction (
	id_direction int4 DEFAULT nextval('direction_id_direction_seq'::regclass) NOT NULL,
	id_faculty int4 NOT NULL,
	direction_ky text NOT NULL,
	direction_ru text NOT NULL,
	direction_en text,
	direction_cipher character varying(50),
	created_date timestamp DEFAULT timezone('Asia/Bishkek'::text, now()),
	upd_date timestamp,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT direction_id_faculty_direction_ru_key UNIQUE (id_faculty, direction_ru, direction_cipher),
	CONSTRAINT direction_pkey PRIMARY KEY (id_direction),
	CONSTRAINT direction_id_faculty_fkey FOREIGN KEY (id_faculty) REFERENCES faculty(id_faculty) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX direction_id_faculty_idx ON public.direction USING btree (id_faculty);


-- public.discipline definition

CREATE TABLE public.discipline (
	id_discipline int8 DEFAULT nextval('discipline_id_discipline_seq'::regclass) NOT NULL,
	discipline_ky text NOT NULL,
	discipline_ru text NOT NULL,
	discipline_en text,
	created_date timestamp DEFAULT timezone('Asia/Bishkek'::text, now()),
	upd_date timestamp,
	course bool DEFAULT false NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT discipline_pkey PRIMARY KEY (id_discipline)
);

CREATE INDEX discipline_discipline_ru_idx ON public.discipline USING btree (discipline_ru);
CREATE INDEX discipline_id_discipline_idx ON public.discipline USING btree (id_discipline);


-- public.discipline_academic_department definition

CREATE TABLE public.discipline_academic_department (
	id_discipline_academic_department int8 DEFAULT nextval('discipline_academic_departmen_id_discipline_academic_depart_seq'::regclass) NOT NULL,
	id_discipline int8 NOT NULL,
	id_academic_department int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT discipline_academic_department_unique UNIQUE (id_discipline, id_academic_department),
	CONSTRAINT discipline_academic_department_pkey PRIMARY KEY (id_discipline_academic_department),
	CONSTRAINT discipline_academic_department_department_fk FOREIGN KEY (id_academic_department) REFERENCES academic_department(id_academic_department) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT discipline_academic_department_discipline_fk FOREIGN KEY (id_discipline) REFERENCES discipline(id_discipline) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idx_discipline_academic_department_pair ON public.discipline_academic_department USING btree (id_discipline, id_academic_department);


-- public.discipline_control definition

CREATE TABLE public.discipline_control (
	id_discipline_control int4 DEFAULT nextval('discipline_control_id_discipline_control_seq'::regclass) NOT NULL,
	discipline_control_ky character varying(255),
	discipline_control_ru character varying(255),
	discipline_control_en character varying(255),
	sort int4 DEFAULT 100,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT discipline_control_pkey PRIMARY KEY (id_discipline_control)
);


-- public.discipline_topic definition

CREATE TABLE public.discipline_topic (
	id_discipline_topic int8 DEFAULT nextval('discipline_topic_id_discipline_topic_seq'::regclass) NOT NULL,
	id_discipline int4 NOT NULL,
	id_educational_plan int8,
	topic_number int4 NOT NULL,
	topic_name character varying(500) NOT NULL,
	description text,
	hours float4 DEFAULT 0,
	lecture_hours float4 DEFAULT 0,
	practice_hours float4 DEFAULT 0,
	lab_hours float4 DEFAULT 0,
	seminar_hours float4 DEFAULT 0,
	selfstudy_hours float4 DEFAULT 0,
	is_controlled bool DEFAULT false,
	control_type character varying(100),
	files jsonb,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT unq_discipline_topic_number UNIQUE (id_discipline, topic_number),
	CONSTRAINT discipline_topic_pkey PRIMARY KEY (id_discipline_topic),
	CONSTRAINT fk_discipline_topic_discipline FOREIGN KEY (id_discipline) REFERENCES discipline(id_discipline) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT chk_discipline_topic_hours CHECK ((hours >= ((((COALESCE(lecture_hours, (0)::real) + COALESCE(practice_hours, (0)::real)) + COALESCE(lab_hours, (0)::real)) + COALESCE(seminar_hours, (0)::real)) + COALESCE(selfstudy_hours, (0)::real))))
);

CREATE INDEX idx_discipline_topic_discipline_plan ON public.discipline_topic USING btree (id_discipline, id_educational_plan);
CREATE INDEX idx_discipline_topic_topic_number ON public.discipline_topic USING btree (topic_number);


-- public.district definition

CREATE TABLE public.district (
	id_district int4 DEFAULT nextval('district_id_district_seq'::regclass) NOT NULL,
	district_ky text NOT NULL,
	district_ru text NOT NULL,
	district_en text NOT NULL,
	id_region int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT district_id_region_district_ky_district_ru_district_en_key UNIQUE (id_region, district_ky, district_ru, district_en),
	CONSTRAINT district_pkey PRIMARY KEY (id_district),
	CONSTRAINT district_id_region_fkey FOREIGN KEY (id_region) REFERENCES region(id_region) ON DELETE CASCADE
);


-- public.django_admin_log definition

CREATE TABLE public.django_admin_log (
	id int4 DEFAULT nextval('django_admin_log_id_seq'::regclass) NOT NULL,
	action_time timestamptz NOT NULL,
	object_id text,
	object_repr character varying(200) NOT NULL,
	action_flag int2 NOT NULL,
	change_message text NOT NULL,
	content_type_id int4,
	user_id int8 NOT NULL,
	CONSTRAINT django_admin_log_pkey PRIMARY KEY (id),
	CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT django_admin_log_user_id_c564eba6_fk_main_user_id FOREIGN KEY (user_id) REFERENCES main_user(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);
CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


-- public.django_content_type definition

CREATE TABLE public.django_content_type (
	id int4 DEFAULT nextval('django_content_type_id_seq'::regclass) NOT NULL,
	app_label character varying(100) NOT NULL,
	model character varying(100) NOT NULL,
	CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model),
	CONSTRAINT django_content_type_pkey PRIMARY KEY (id)
);


-- public.django_migrations definition

CREATE TABLE public.django_migrations (
	id int8 DEFAULT nextval('django_migrations_id_seq'::regclass) NOT NULL,
	app character varying(255) NOT NULL,
	name character varying(255) NOT NULL,
	applied timestamptz NOT NULL,
	CONSTRAINT django_migrations_pkey PRIMARY KEY (id)
);


-- public.django_session definition

CREATE TABLE public.django_session (
	session_key character varying(40) NOT NULL,
	session_data text NOT NULL,
	expire_date timestamptz NOT NULL,
	CONSTRAINT django_session_pkey PRIMARY KEY (session_key)
);

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);
CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


-- public.document_type definition

CREATE TABLE public.document_type (
	id_document_type int4 DEFAULT nextval('document_type_id_document_type_seq'::regclass) NOT NULL,
	document_type_ky text NOT NULL,
	document_type_ru text NOT NULL,
	document_type_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT document_type_document_type_ky_document_type_ru_document_ty_key UNIQUE (document_type_ky, document_type_ru, document_type_en),
	CONSTRAINT document_type_pkey PRIMARY KEY (id_document_type)
);


-- public.education_document_type definition

CREATE TABLE public.education_document_type (
	id_education_document_type int4 DEFAULT nextval('education_document_type_id_education_document_type_seq'::regclass) NOT NULL,
	document_type_ky text NOT NULL,
	document_type_ru text NOT NULL,
	document_type_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT education_document_type_document_type_ky_document_type_ru_d_key UNIQUE (document_type_ky, document_type_ru, document_type_en),
	CONSTRAINT education_document_type_pkey PRIMARY KEY (id_education_document_type)
);


-- public.education_level definition

CREATE TABLE public.education_level (
	id_education_level int4 DEFAULT nextval('education_level_id_education_level_seq'::regclass) NOT NULL,
	education_level_ky character varying(255),
	education_level_ru character varying(255),
	education_level_en character varying(255),
	sort int4 DEFAULT 100 NOT NULL,
	letter character varying(2),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT education_level_education_level_ru_key UNIQUE (education_level_ru),
	CONSTRAINT education_level_pkey PRIMARY KEY (id_education_level)
);

CREATE INDEX education_level_id_education_level_idx ON public.education_level USING btree (id_education_level);


-- public.education_period_month definition

CREATE TABLE public.education_period_month (
	id_education_period_month int4 DEFAULT nextval('education_period_month_id_education_period_month_seq'::regclass) NOT NULL,
	education_period_month_ky character varying(20) NOT NULL,
	education_period_month_ru character varying(20) NOT NULL,
	education_period_month_en character varying(20) NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT education_period_month_education_period_month_ky_key UNIQUE (education_period_month_ky),
	CONSTRAINT education_period_month_pkey PRIMARY KEY (id_education_period_month)
);

CREATE INDEX education_period_month_id_education_period_month_idx ON public.education_period_month USING btree (id_education_period_month);


-- public.education_period_year definition

CREATE TABLE public.education_period_year (
	id_education_period_year int4 DEFAULT nextval('education_period_year_id_education_period_year_seq'::regclass) NOT NULL,
	education_period_year_ky character varying(10) NOT NULL,
	education_period_year_ru character varying(10) NOT NULL,
	education_period_year_en character varying(10) NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT education_period_year_education_period_year_ky_key UNIQUE (education_period_year_ky),
	CONSTRAINT education_period_year_pkey PRIMARY KEY (id_education_period_year)
);

CREATE INDEX education_period_year_id_education_period_year_idx ON public.education_period_year USING btree (id_education_period_year);


-- public.educational_plan definition

CREATE TABLE public.educational_plan (
	id_educational_plan int8 DEFAULT nextval('educational_plan_id_educational_plan_seq'::regclass) NOT NULL,
	educational_plan_shifr int8,
	id_years int4 NOT NULL,
	id_specialty int4 NOT NULL,
	id_education_level int4 NOT NULL,
	id_course int4 NOT NULL,
	id_year_half int4 NOT NULL,
	id_semester int4 NOT NULL,
	id_educational_plan_component int4 DEFAULT 1 NOT NULL,
	id_discipline int4 NOT NULL,
	ects float4 DEFAULT 0 NOT NULL,
	id_discipline_control int4 DEFAULT 1 NOT NULL,
	id_academic_department int4 NOT NULL,
	is_fixed bool DEFAULT true NOT NULL,
	sort_plan int4 DEFAULT 100 NOT NULL,
	elective bool DEFAULT false NOT NULL,
	id_lesson_type int4 DEFAULT 1 NOT NULL,
	id_educational_plan_status int4 DEFAULT 1 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT unq_educational_plan UNIQUE (id_years, id_specialty, id_education_level, id_course, id_year_half, id_semester, id_discipline, id_discipline_control, ects, id_educational_plan_component, id_academic_department, id_lesson_type),
	CONSTRAINT educational_plan_pkey PRIMARY KEY (id_educational_plan),
	CONSTRAINT fk_educational_plan_academic_department FOREIGN KEY (id_academic_department) REFERENCES academic_department(id_academic_department),
	CONSTRAINT fk_educational_plan_component FOREIGN KEY (id_educational_plan_component) REFERENCES educational_plan_component(id_educational_plan_component),
	CONSTRAINT fk_educational_plan_control FOREIGN KEY (id_discipline_control) REFERENCES discipline_control(id_discipline_control),
	CONSTRAINT fk_educational_plan_course FOREIGN KEY (id_course) REFERENCES course(id_course),
	CONSTRAINT fk_educational_plan_discipline FOREIGN KEY (id_discipline) REFERENCES discipline(id_discipline),
	CONSTRAINT fk_educational_plan_lesson_type FOREIGN KEY (id_lesson_type) REFERENCES lesson_type(id_lesson_type),
	CONSTRAINT fk_educational_plan_level FOREIGN KEY (id_education_level) REFERENCES education_level(id_education_level),
	CONSTRAINT fk_educational_plan_semester FOREIGN KEY (id_semester) REFERENCES semester(id_semester),
	CONSTRAINT fk_educational_plan_specialty FOREIGN KEY (id_specialty) REFERENCES specialty(id_specialty),
	CONSTRAINT fk_educational_plan_term FOREIGN KEY (id_year_half) REFERENCES year_half(id_year_half),
	CONSTRAINT fk_educational_plan_years FOREIGN KEY (id_years) REFERENCES years(id_years),
	CONSTRAINT educational_plan_id_educational_plan_status_fkey FOREIGN KEY (id_educational_plan_status) REFERENCES educational_plan_status(id_educational_plan_status)
);

CREATE INDEX idx_ep_academic_department ON public.educational_plan USING btree (id_academic_department);
CREATE INDEX idx_ep_component ON public.educational_plan USING btree (id_educational_plan_component);
CREATE INDEX idx_ep_discipline ON public.educational_plan USING btree (id_discipline);
CREATE INDEX idx_ep_discipline_control ON public.educational_plan USING btree (id_discipline_control);
CREATE INDEX idx_ep_filter ON public.educational_plan USING btree (id_years, id_course, id_year_half, id_semester, id_specialty, id_education_level);
CREATE INDEX idx_ep_status ON public.educational_plan USING btree (id_educational_plan_status);


-- public.educational_plan_component definition

CREATE TABLE public.educational_plan_component (
	id_educational_plan_component int4 DEFAULT nextval('educational_plan_component_id_educational_plan_component_seq'::regclass) NOT NULL,
	educational_plan_component_ky character varying(255),
	educational_plan_component_ru character varying(255),
	educational_plan_component_en character varying(255),
	s_educational_plan_component_ky character varying(5),
	s_educational_plan_component_ru character varying(5),
	s_educational_plan_component_en character varying(5),
	comment text,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT educational_plan_component_educational_plan_component_en_key UNIQUE (educational_plan_component_en),
	CONSTRAINT educational_plan_component_educational_plan_component_ky_key UNIQUE (educational_plan_component_ky),
	CONSTRAINT educational_plan_component_educational_plan_component_ru_key UNIQUE (educational_plan_component_ru),
	CONSTRAINT educational_plan_component_pkey PRIMARY KEY (id_educational_plan_component)
);


-- public.educational_plan_field_meta definition

CREATE TABLE public.educational_plan_field_meta (
	id_field int4 DEFAULT nextval('educational_plan_field_meta_id_field_seq'::regclass) NOT NULL,
	field_key character varying(50) NOT NULL,
	field_type character varying(20) DEFAULT 'number'::character varying NOT NULL,
	label_ru character varying(100) NOT NULL,
	label_ky character varying(100) NOT NULL,
	label_en character varying(100) NOT NULL,
	short_label_ru character varying(30) NOT NULL,
	short_label_ky character varying(30) NOT NULL,
	short_label_en character varying(30) NOT NULL,
	sort_order int4 DEFAULT 100 NOT NULL,
	is_active bool DEFAULT true NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT educational_plan_field_meta_field_key_key UNIQUE (field_key),
	CONSTRAINT educational_plan_field_meta_pkey PRIMARY KEY (id_field)
);


-- public.educational_plan_fields definition

CREATE TABLE public.educational_plan_fields (
	id_educational_plan_fields int4 DEFAULT nextval('educational_plan_fields_id_educational_plan_fields_seq1'::regclass) NOT NULL,
	educational_plan_shifr int8 NOT NULL,
	field_key character varying(50) NOT NULL,
	is_visible bool DEFAULT true NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT uq_epf_shifr_field UNIQUE (educational_plan_shifr, field_key),
	CONSTRAINT educational_plan_fields_pkey1 PRIMARY KEY (id_educational_plan_fields),
	CONSTRAINT fk_epf_field_key FOREIGN KEY (field_key) REFERENCES educational_plan_field_meta(field_key)
);

CREATE INDEX idx_epf_field_key ON public.educational_plan_fields USING btree (field_key);
CREATE INDEX idx_epf_shifr ON public.educational_plan_fields USING btree (educational_plan_shifr);


-- public.educational_plan_hours definition

CREATE TABLE public.educational_plan_hours (
	id_educational_plan_hours int4 DEFAULT nextval('educational_plan_hours_id_educational_plan_hours_seq'::regclass) NOT NULL,
	id_educational_plan int8 NOT NULL,
	field_key character varying(50) NOT NULL,
	hours_value float4 DEFAULT 0 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT uq_eph_plan_field UNIQUE (id_educational_plan, field_key),
	CONSTRAINT educational_plan_hours_pkey PRIMARY KEY (id_educational_plan_hours),
	CONSTRAINT fk_eph_educational_plan FOREIGN KEY (id_educational_plan) REFERENCES educational_plan(id_educational_plan) ON DELETE CASCADE,
	CONSTRAINT fk_eph_field_key FOREIGN KEY (field_key) REFERENCES educational_plan_field_meta(field_key)
);

CREATE INDEX idx_eph_educational_plan ON public.educational_plan_hours USING btree (id_educational_plan);
CREATE INDEX idx_eph_field_key ON public.educational_plan_hours USING btree (field_key);


-- public.educational_plan_log definition

CREATE TABLE public.educational_plan_log (
	id_log int8 DEFAULT nextval('educational_plan_log_id_log_seq'::regclass) NOT NULL,
	id_educational_plan int8 NOT NULL,
	action character varying(10) NOT NULL,
	user_name character varying(100) DEFAULT CURRENT_USER,
	log_date timestamp DEFAULT now() NOT NULL,
	changes jsonb,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT educational_plan_log_pkey PRIMARY KEY (id_log)
);


-- public.educational_plan_status definition

CREATE TABLE public.educational_plan_status (
	id_educational_plan_status int4 NOT NULL,
	educational_plan_status_ky character varying(50),
	educational_plan_status_ru character varying(50),
	educational_plan_status_en character varying(50),
	description text,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT educational_plan_status_pkey PRIMARY KEY (id_educational_plan_status)
);


-- public.employee definition

CREATE TABLE public.employee (
	id_employee int8 DEFAULT nextval('employee_id_employee_seq'::regclass) NOT NULL,
	pin int8,
	surname character varying(100) NOT NULL,
	name character varying(100) NOT NULL,
	patronymic character varying(100),
	date_birth date,
	id_gender int4,
	surname_en character varying(100),
	name_en character varying(100),
	patronymic_en character varying(100),
	is_active bool DEFAULT true NOT NULL,
	system_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT employee_pin_key UNIQUE (pin),
	CONSTRAINT employee_pkey PRIMARY KEY (id_employee),
	CONSTRAINT employee_id_gender_fkey FOREIGN KEY (id_gender) REFERENCES gender(id_gender)
);

CREATE INDEX idx_employee_is_active ON public.employee USING btree (is_active);


-- public.employee_info definition

CREATE TABLE public.employee_info (
	id_employee_info int4 DEFAULT nextval('employee_info_id_employee_info_seq'::regclass) NOT NULL,
	id_employee int8 NOT NULL,
	id_document_type int4,
	passport_series character varying(20),
	passport_number character varying(20),
	id_citizenship int4,
	id_nationality int4,
	id_marital_status int4,
	id_special_status int4 DEFAULT 1,
	phone character varying(30),
	id_military_document_type int4,
	military_serial_number character varying(50),
	id_military_office int4,
	military_registration_date date,
	email character varying(255),
	system_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamptz,
	CONSTRAINT employee_info_pkey PRIMARY KEY (id_employee_info),
	CONSTRAINT employee_info_id_employee_fkey FOREIGN KEY (id_employee) REFERENCES employee(id_employee) ON DELETE CASCADE
);

CREATE INDEX idx_employee_info_id_employee ON public.employee_info USING btree (id_employee);


-- public.faculty definition

CREATE TABLE public.faculty (
	id_faculty int4 DEFAULT nextval('faculty_id_faculty_seq'::regclass) NOT NULL,
	id_org int4 NOT NULL,
	faculty_ky text NOT NULL,
	faculty_ru text NOT NULL,
	faculty_en text,
	s_faculty character varying(300),
	id_org_manager_faculty int4,
	is_active bool DEFAULT true NOT NULL,
	course bool DEFAULT false NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT faculty_id_org_faculty_ru_key UNIQUE (id_org, faculty_ru, id_org_manager_faculty),
	CONSTRAINT faculty_pkey PRIMARY KEY (id_faculty),
	CONSTRAINT faculty_id_org_fkey FOREIGN KEY (id_org) REFERENCES organization(id_org),
	CONSTRAINT faculty_id_org_manager_faculty_fkey FOREIGN KEY (id_org_manager_faculty) REFERENCES org_manager_status(id_org_manager_status)
);

CREATE INDEX idx_faculty_faculty_ru ON public.faculty USING btree (faculty_ru);
CREATE INDEX idx_faculty_id_org_manager_faculty ON public.faculty USING btree (id_org_manager_faculty);


-- public.gender definition

CREATE TABLE public.gender (
	id_gender int4 DEFAULT nextval('gender_id_gender_seq'::regclass) NOT NULL,
	gender_ky character varying(10),
	gender_ru character varying(10),
	gender_en character varying(10),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT gender_pkey PRIMARY KEY (id_gender)
);


-- public.grade_letter definition

CREATE TABLE public.grade_letter (
	id_grade_letter int4 DEFAULT nextval('grade_letter_id_grade_letter_seq'::regclass) NOT NULL,
	id_grade_scale int4 NOT NULL,
	beg_score numeric NOT NULL,
	end_score numeric NOT NULL,
	grade_letter character varying(5) NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT uq_grade_letter UNIQUE (id_grade_scale, grade_letter),
	CONSTRAINT uq_grade_letter_range UNIQUE (id_grade_scale, beg_score, end_score),
	CONSTRAINT grade_letter_pkey PRIMARY KEY (id_grade_letter),
	CONSTRAINT fk_grade_letter_scale FOREIGN KEY (id_grade_scale) REFERENCES grade_scale(id_grade_scale) ON DELETE CASCADE
);

CREATE INDEX idx_grade_letter_range ON public.grade_letter USING btree (beg_score, end_score);
CREATE INDEX idx_grade_letter_scale ON public.grade_letter USING btree (id_grade_scale);


-- public.grade_scale definition

CREATE TABLE public.grade_scale (
	id_grade_scale int4 DEFAULT nextval('grade_scale_id_grade_scale_seq'::regclass) NOT NULL,
	grade_group int4 NOT NULL,
	id_discipline_control int4 NOT NULL,
	beg_score numeric NOT NULL,
	end_score numeric NOT NULL,
	grade_numeric int4 NOT NULL,
	grade_text_ky character varying(25),
	grade_text_ru character varying(20),
	grade_text_en character varying(20),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT grade_scale_pkey PRIMARY KEY (id_grade_scale),
	CONSTRAINT fk_grade_discipline_control FOREIGN KEY (id_discipline_control) REFERENCES discipline_control(id_discipline_control) ON DELETE CASCADE
);

CREATE INDEX idx_grade_scale_discipline ON public.grade_scale USING btree (id_discipline_control);
CREATE INDEX idx_grade_scale_group ON public.grade_scale USING btree (grade_group);
CREATE INDEX idx_grade_scale_range ON public.grade_scale USING btree (beg_score, end_score);


-- public.hitcount_blacklist_ip definition

CREATE TABLE public.hitcount_blacklist_ip (
	id int8 DEFAULT nextval('hitcount_blacklist_ip_id_seq'::regclass) NOT NULL,
	ip character varying(40) NOT NULL,
	CONSTRAINT hitcount_blacklist_ip_ip_key UNIQUE (ip),
	CONSTRAINT hitcount_blacklist_ip_pkey PRIMARY KEY (id)
);

CREATE INDEX hitcount_blacklist_ip_ip_b1955e95_like ON public.hitcount_blacklist_ip USING btree (ip varchar_pattern_ops);


-- public.hitcount_blacklist_user_agent definition

CREATE TABLE public.hitcount_blacklist_user_agent (
	id int8 DEFAULT nextval('hitcount_blacklist_user_agent_id_seq'::regclass) NOT NULL,
	user_agent character varying(255) NOT NULL,
	CONSTRAINT hitcount_blacklist_user_agent_user_agent_key UNIQUE (user_agent),
	CONSTRAINT hitcount_blacklist_user_agent_pkey PRIMARY KEY (id)
);

CREATE INDEX hitcount_blacklist_user_agent_user_agent_fbf2061c_like ON public.hitcount_blacklist_user_agent USING btree (user_agent varchar_pattern_ops);


-- public.hitcount_hit definition

CREATE TABLE public.hitcount_hit (
	id int8 DEFAULT nextval('hitcount_hit_id_seq'::regclass) NOT NULL,
	created timestamptz NOT NULL,
	ip character varying(40) NOT NULL,
	session character varying(40) NOT NULL,
	user_agent character varying(255) NOT NULL,
	hitcount_id int8 NOT NULL,
	user_id int8,
	CONSTRAINT hitcount_hit_pkey PRIMARY KEY (id),
	CONSTRAINT hitcount_hit_hitcount_id_b7971910_fk FOREIGN KEY (hitcount_id) REFERENCES hitcount_hit_count(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT hitcount_hit_user_id_f7067f66_fk_main_user_id FOREIGN KEY (user_id) REFERENCES main_user(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX hitcount_hit_created_79adf7bc ON public.hitcount_hit USING btree (created);
CREATE INDEX hitcount_hit_hitcount_id_b7971910 ON public.hitcount_hit USING btree (hitcount_id);
CREATE INDEX hitcount_hit_ip_a52a62aa ON public.hitcount_hit USING btree (ip);
CREATE INDEX hitcount_hit_ip_a52a62aa_like ON public.hitcount_hit USING btree (ip varchar_pattern_ops);
CREATE INDEX hitcount_hit_session_5be83758 ON public.hitcount_hit USING btree (session);
CREATE INDEX hitcount_hit_session_5be83758_like ON public.hitcount_hit USING btree (session varchar_pattern_ops);
CREATE INDEX hitcount_hit_user_id_f7067f66 ON public.hitcount_hit USING btree (user_id);


-- public.hitcount_hit_count definition

CREATE TABLE public.hitcount_hit_count (
	id int8 DEFAULT nextval('hitcount_hit_count_id_seq'::regclass) NOT NULL,
	hits int4 NOT NULL,
	modified timestamptz NOT NULL,
	object_pk int4 NOT NULL,
	content_type_id int4 NOT NULL,
	CONSTRAINT hitcount_hit_count_content_type_id_object_pk_4dacb610_uniq UNIQUE (content_type_id, object_pk),
	CONSTRAINT hitcount_hit_count_pkey PRIMARY KEY (id),
	CONSTRAINT hitcount_hit_count_content_type_id_4a734fe1_fk_django_co FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT hitcount_hit_count_hits_check CHECK ((hits >= 0)),
	CONSTRAINT hitcount_hit_count_object_pk_53e9c38f_check CHECK ((object_pk >= 0))
);

CREATE INDEX hitcount_hit_count_content_type_id_4a734fe1 ON public.hitcount_hit_count USING btree (content_type_id);


-- public.industry definition

CREATE TABLE public.industry (
	id_industry int4 DEFAULT nextval('industry_id_industry_seq'::regclass) NOT NULL,
	industry_ky character varying(255),
	industry_ru character varying(255),
	industry_en character varying(255),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT industry_industry_ru_key UNIQUE (industry_ru),
	CONSTRAINT industry_pkey PRIMARY KEY (id_industry)
);

CREATE INDEX industry_id_industry_idx ON public.industry USING btree (id_industry);


-- public.language definition

CREATE TABLE public.language (
	id_language int4 DEFAULT nextval('language_id_language_seq'::regclass) NOT NULL,
	language_ky character varying(100),
	language_ru character varying(100),
	language_en character varying(100),
	is_active bool DEFAULT true,
	created_at timestamptz DEFAULT timezone('Asia/Bishkek'::text, now()),
	updated_at timestamptz,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT language_pkey PRIMARY KEY (id_language)
);

CREATE INDEX idx_language_is_active ON public.language USING btree (is_active);
CREATE UNIQUE INDEX idx_language_unique_names ON public.language USING btree (language_ky, language_ru, language_en);


-- public.learning definition

CREATE TABLE public.learning (
	id_learning int4 DEFAULT nextval('learning_id_learning_seq'::regclass) NOT NULL,
	learning_ky text,
	learning_ru text,
	learning_en text,
	sort int4 DEFAULT 100 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT learning_id_learning_learning_ru_key UNIQUE (id_learning, learning_ru),
	CONSTRAINT learning_pkey PRIMARY KEY (id_learning)
);

CREATE INDEX learning_id_learning_idx ON public.learning USING btree (id_learning);
CREATE INDEX learning_sort_idx ON public.learning USING btree (sort);


-- public.lesson_type definition

CREATE TABLE public.lesson_type (
	id_lesson_type int4 NOT NULL,
	lesson_type_ky character varying(50),
	lesson_type_ru character varying(50),
	lesson_type_en character varying(50),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT lesson_type_pkey PRIMARY KEY (id_lesson_type)
);


-- public.main_announcement definition

CREATE TABLE public.main_announcement (
	id int8 DEFAULT nextval('main_announcement_id_seq'::regclass) NOT NULL,
	title character varying(255) NOT NULL,
	title_ky character varying(255),
	title_ru character varying(255),
	kind character varying(255) NOT NULL,
	content text NOT NULL,
	content_ky text,
	content_ru text,
	created timestamptz NOT NULL,
	organization_id int8 NOT NULL,
	CONSTRAINT main_announcement_pkey PRIMARY KEY (id),
	CONSTRAINT main_announcement_organization_id_496cfd8e_fk_main_orga FOREIGN KEY (organization_id) REFERENCES main_organization(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX main_announcement_organization_id_496cfd8e ON public.main_announcement USING btree (organization_id);


-- public.main_banner definition

CREATE TABLE public.main_banner (
	id int8 DEFAULT nextval('main_banner_id_seq'::regclass) NOT NULL,
	title character varying(255) NOT NULL,
	title_ky character varying(255),
	title_ru character varying(255),
	link character varying(200) NOT NULL,
	img character varying(100) NOT NULL,
	order int2 NOT NULL,
	CONSTRAINT main_banner_pkey PRIMARY KEY (id),
	CONSTRAINT main_banner_order_check CHECK (("order" >= 0))
);


-- public.main_body definition

CREATE TABLE public.main_body (
	id int8 DEFAULT nextval('main_body_id_seq'::regclass) NOT NULL,
	name character varying(255) NOT NULL,
	name_ky character varying(255),
	name_ru character varying(255),
	link character varying(200) NOT NULL,
	img character varying(100) NOT NULL,
	order int2 NOT NULL,
	is_active bool NOT NULL,
	CONSTRAINT main_body_pkey PRIMARY KEY (id),
	CONSTRAINT main_body_order_check CHECK (("order" >= 0))
);


-- public.main_contact definition

CREATE TABLE public.main_contact (
	id int8 DEFAULT nextval('main_contact_id_seq'::regclass) NOT NULL,
	name character varying(255) NOT NULL,
	name_ky character varying(255),
	name_ru character varying(255),
	phone character varying(20),
	fax character varying(20),
	email character varying(254),
	order int2 NOT NULL,
	CONSTRAINT main_contact_pkey PRIMARY KEY (id),
	CONSTRAINT main_contact_order_check CHECK (("order" >= 0))
);


-- public.main_direction definition

CREATE TABLE public.main_direction (
	id int8 DEFAULT nextval('main_direction_id_seq'::regclass) NOT NULL,
	name character varying(255) NOT NULL,
	name_ky character varying(255),
	name_ru character varying(255),
	CONSTRAINT main_direction_name_key UNIQUE (name),
	CONSTRAINT main_direction_name_ky_key UNIQUE (name_ky),
	CONSTRAINT main_direction_name_ru_key UNIQUE (name_ru),
	CONSTRAINT main_direction_pkey PRIMARY KEY (id)
);

CREATE INDEX main_direction_name_3d921ec8_like ON public.main_direction USING btree (name varchar_pattern_ops);
CREATE INDEX main_direction_name_ky_f7162d94_like ON public.main_direction USING btree (name_ky varchar_pattern_ops);
CREATE INDEX main_direction_name_ru_a66b46ec_like ON public.main_direction USING btree (name_ru varchar_pattern_ops);


-- public.main_district definition

CREATE TABLE public.main_district (
	id int8 DEFAULT nextval('main_district_id_seq'::regclass) NOT NULL,
	region character varying(45) NOT NULL,
	name character varying(55) NOT NULL,
	CONSTRAINT main_district_pkey PRIMARY KEY (id)
);


-- public.main_emailreceiver definition

CREATE TABLE public.main_emailreceiver (
	id int8 DEFAULT nextval('main_emailreceiver_id_seq'::regclass) NOT NULL,
	email character varying(254) NOT NULL,
	name character varying(200),
	CONSTRAINT main_emailreceiver_email_key UNIQUE (email),
	CONSTRAINT main_emailreceiver_pkey PRIMARY KEY (id)
);

CREATE INDEX main_emailreceiver_email_d4970798_like ON public.main_emailreceiver USING btree (email varchar_pattern_ops);


-- public.main_employee definition

CREATE TABLE public.main_employee (
	id int8 DEFAULT nextval('main_employee_id_seq'::regclass) NOT NULL,
	fullname character varying(500) NOT NULL,
	fullname_ky character varying(500),
	fullname_ru character varying(500),
	img character varying(100),
	order int2 NOT NULL,
	position character varying(500) NOT NULL,
	position_ky character varying(500),
	position_ru character varying(500),
	phone character varying(50),
	fax character varying(20),
	email character varying(254),
	biography text,
	biography_ky text,
	biography_ru text,
	organization_id int8 NOT NULL,
	CONSTRAINT main_employee_pkey PRIMARY KEY (id),
	CONSTRAINT main_employee_organization_id_af8aa811_fk_main_organization_id FOREIGN KEY (organization_id) REFERENCES main_organization(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_employee_order_check CHECK (("order" >= 0))
);

CREATE INDEX main_employee_organization_id_af8aa811 ON public.main_employee USING btree (organization_id);


-- public.main_event definition

CREATE TABLE public.main_event (
	id int8 DEFAULT nextval('main_event_id_seq'::regclass) NOT NULL,
	title character varying(255) NOT NULL,
	title_ky character varying(255),
	title_ru character varying(255),
	annotation text NOT NULL,
	annotation_ky text,
	annotation_ru text,
	content text NOT NULL,
	content_ky text,
	content_ru text,
	img character varying(100),
	created timestamptz NOT NULL,
	attachment character varying(100),
	time timestamptz NOT NULL,
	organization_id int8 NOT NULL,
	CONSTRAINT main_event_pkey PRIMARY KEY (id),
	CONSTRAINT main_event_organization_id_cf3a56ec_fk_main_organization_id FOREIGN KEY (organization_id) REFERENCES main_organization(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX main_event_organization_id_cf3a56ec ON public.main_event USING btree (organization_id);


-- public.main_faq definition

CREATE TABLE public.main_faq (
	id int8 DEFAULT nextval('main_faq_id_seq'::regclass) NOT NULL,
	question character varying(500) NOT NULL,
	question_ky character varying(500),
	question_ru character varying(500),
	answer text NOT NULL,
	answer_ky text,
	answer_ru text,
	order int2 NOT NULL,
	CONSTRAINT main_faq_pkey PRIMARY KEY (id),
	CONSTRAINT main_faq_order_check CHECK (("order" >= 0))
);


-- public.main_feedback definition

CREATE TABLE public.main_feedback (
	id int8 DEFAULT nextval('main_feedback_id_seq'::regclass) NOT NULL,
	fullname character varying(255) NOT NULL,
	region character varying(45),
	address character varying(255) NOT NULL,
	phone character varying(20) NOT NULL,
	email character varying(254) NOT NULL,
	organization character varying(255),
	subject character varying(255) NOT NULL,
	question text NOT NULL,
	attachment character varying(100),
	district_id int8,
	is_checked bool NOT NULL,
	created timestamptz NOT NULL,
	kind_id int8,
	CONSTRAINT main_feedback_pkey PRIMARY KEY (id),
	CONSTRAINT main_feedback_district_id_7b6d1100_fk_main_district_id FOREIGN KEY (district_id) REFERENCES main_district(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_feedback_kind_id_3013b14d_fk_main_kindoffeedback_id FOREIGN KEY (kind_id) REFERENCES main_kindoffeedback(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX main_feedback_district_id_7b6d1100 ON public.main_feedback USING btree (district_id);
CREATE INDEX main_feedback_kind_id_3013b14d ON public.main_feedback USING btree (kind_id);


-- public.main_gallery definition

CREATE TABLE public.main_gallery (
	id int8 DEFAULT nextval('main_gallery_id_seq'::regclass) NOT NULL,
	title character varying(255),
	description text,
	order int2,
	description_ky text,
	description_ru text,
	title_ky character varying(255),
	title_ru character varying(255),
	category_id int8 NOT NULL,
	CONSTRAINT main_gallery_pkey PRIMARY KEY (id),
	CONSTRAINT main_gallery_category_id_8e31da7f_fk_main_gallerycategory_id FOREIGN KEY (category_id) REFERENCES main_gallerycategory(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_gallery_order_check CHECK (("order" >= 0))
);

CREATE INDEX main_gallery_category_id_8e31da7f ON public.main_gallery USING btree (category_id);


-- public.main_gallerycategory definition

CREATE TABLE public.main_gallerycategory (
	id int8 DEFAULT nextval('main_gallerycategory_id_seq'::regclass) NOT NULL,
	name character varying(255) NOT NULL,
	slug character varying(50) NOT NULL,
	name_ky character varying(255),
	name_ru character varying(255),
	CONSTRAINT main_gallerycategory_slug_key UNIQUE (slug),
	CONSTRAINT main_gallerycategory_pkey PRIMARY KEY (id)
);

CREATE INDEX main_gallerycategory_slug_64761f64_like ON public.main_gallerycategory USING btree (slug varchar_pattern_ops);


-- public.main_galleryimage definition

CREATE TABLE public.main_galleryimage (
	id int8 DEFAULT nextval('main_galleryimage_id_seq'::regclass) NOT NULL,
	image character varying(100) NOT NULL,
	gallery_id int8 NOT NULL,
	image_ky character varying(100),
	image_ru character varying(100),
	CONSTRAINT main_galleryimage_pkey PRIMARY KEY (id),
	CONSTRAINT main_galleryimage_gallery_id_1cb3d125_fk_main_gallery_id FOREIGN KEY (gallery_id) REFERENCES main_gallery(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX main_galleryimage_gallery_id_1cb3d125 ON public.main_galleryimage USING btree (gallery_id);


-- public.main_kind definition

CREATE TABLE public.main_kind (
	id int8 DEFAULT nextval('main_kind_id_seq'::regclass) NOT NULL,
	name character varying(255) NOT NULL,
	name_ky character varying(255),
	name_ru character varying(255),
	CONSTRAINT main_kind_name_key UNIQUE (name),
	CONSTRAINT main_kind_name_ky_key UNIQUE (name_ky),
	CONSTRAINT main_kind_name_ru_key UNIQUE (name_ru),
	CONSTRAINT main_kind_pkey PRIMARY KEY (id)
);

CREATE INDEX main_kind_name_ba0a10c8_like ON public.main_kind USING btree (name varchar_pattern_ops);
CREATE INDEX main_kind_name_ky_d7b45c86_like ON public.main_kind USING btree (name_ky varchar_pattern_ops);
CREATE INDEX main_kind_name_ru_208d6182_like ON public.main_kind USING btree (name_ru varchar_pattern_ops);


-- public.main_kindoffeedback definition

CREATE TABLE public.main_kindoffeedback (
	id int8 DEFAULT nextval('main_kindoffeedback_id_seq'::regclass) NOT NULL,
	name character varying(255) NOT NULL,
	name_ky character varying(255),
	name_ru character varying(255),
	CONSTRAINT main_kindoffeedback_name_key UNIQUE (name),
	CONSTRAINT main_kindoffeedback_name_ky_key UNIQUE (name_ky),
	CONSTRAINT main_kindoffeedback_name_ru_key UNIQUE (name_ru),
	CONSTRAINT main_kindoffeedback_pkey PRIMARY KEY (id)
);

CREATE INDEX main_kindoffeedback_name_ce790f4e_like ON public.main_kindoffeedback USING btree (name varchar_pattern_ops);
CREATE INDEX main_kindoffeedback_name_ky_aafffdae_like ON public.main_kindoffeedback USING btree (name_ky varchar_pattern_ops);
CREATE INDEX main_kindoffeedback_name_ru_06a3e4d6_like ON public.main_kindoffeedback USING btree (name_ru varchar_pattern_ops);


-- public.main_legislation definition

CREATE TABLE public.main_legislation (
	id int8 DEFAULT nextval('main_legislation_id_seq'::regclass) NOT NULL,
	status character varying(45) NOT NULL,
	title character varying(1000) NOT NULL,
	title_ky character varying(1000),
	title_ru character varying(1000),
	short_description text,
	number character varying(45),
	period daterange NOT NULL,
	created timestamptz NOT NULL,
	content text NOT NULL,
	content_ky text,
	content_ru text,
	doc character varying(100),
	pdf character varying(100),
	direction_id int8,
	kind_id int8 NOT NULL,
	organization_id int8,
	CONSTRAINT main_legislation_pkey PRIMARY KEY (id),
	CONSTRAINT main_legislation_direction_id_c7193ab6_fk_main_direction_id FOREIGN KEY (direction_id) REFERENCES main_direction(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_legislation_kind_id_209f8b99_fk_main_kind_id FOREIGN KEY (kind_id) REFERENCES main_kind(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_legislation_organization_id_21db1e9c_fk_main_orga FOREIGN KEY (organization_id) REFERENCES main_organization(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX main_legislation_direction_id_c7193ab6 ON public.main_legislation USING btree (direction_id);
CREATE INDEX main_legislation_kind_id_209f8b99 ON public.main_legislation USING btree (kind_id);
CREATE INDEX main_legislation_organization_id_21db1e9c ON public.main_legislation USING btree (organization_id);


-- public.main_monitoring definition

CREATE TABLE public.main_monitoring (
	id int8 DEFAULT nextval('main_monitoring_id_seq'::regclass) NOT NULL,
	title character varying(500) NOT NULL,
	title_ky character varying(500),
	title_ru character varying(500),
	attachment character varying(100) NOT NULL,
	attachment_ky character varying(100),
	attachment_ru character varying(100),
	CONSTRAINT main_monitoring_pkey PRIMARY KEY (id)
);


-- public.main_organization definition

CREATE TABLE public.main_organization (
	id int8 DEFAULT nextval('main_organization_id_seq'::regclass) NOT NULL,
	name character varying(255) NOT NULL,
	name_ky character varying(255),
	name_ru character varying(255),
	img character varying(100),
	order int2 NOT NULL,
	responsible_id int8,
	kind character varying(255) NOT NULL,
	is_active bool NOT NULL,
	CONSTRAINT main_organization_responsible_id_key UNIQUE (responsible_id),
	CONSTRAINT main_organization_pkey PRIMARY KEY (id),
	CONSTRAINT main_organization_responsible_id_97121a82_fk_main_user_id FOREIGN KEY (responsible_id) REFERENCES main_user(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_organization_order_check CHECK (("order" >= 0))
);


-- public.main_page definition

CREATE TABLE public.main_page (
	id int8 DEFAULT nextval('main_page_id_seq'::regclass) NOT NULL,
	title character varying(255) NOT NULL,
	title_ky character varying(255),
	title_ru character varying(255),
	content text NOT NULL,
	content_ky text,
	content_ru text,
	order int4 NOT NULL,
	organization_id int8 NOT NULL,
	created timestamptz NOT NULL,
	CONSTRAINT main_page_pkey PRIMARY KEY (id),
	CONSTRAINT main_page_organization_id_f09df463_fk_main_organization_id FOREIGN KEY (organization_id) REFERENCES main_organization(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_page_order_check CHECK (("order" >= 0))
);

CREATE INDEX main_page_organization_id_f09df463 ON public.main_page USING btree (organization_id);


-- public.main_post definition

CREATE TABLE public.main_post (
	id int8 DEFAULT nextval('main_post_id_seq'::regclass) NOT NULL,
	title character varying(255) NOT NULL,
	title_ky character varying(255),
	title_ru character varying(255),
	annotation text NOT NULL,
	annotation_ky text,
	annotation_ru text,
	content text NOT NULL,
	content_ky text,
	content_ru text,
	img character varying(100) NOT NULL,
	created timestamptz NOT NULL,
	status character varying(45) NOT NULL,
	kind character varying(45) NOT NULL,
	last_changed timestamptz NOT NULL,
	attachment character varying(100),
	organization_id int8,
	CONSTRAINT main_post_pkey PRIMARY KEY (id),
	CONSTRAINT main_post_organization_id_74016676_fk_main_organization_id FOREIGN KEY (organization_id) REFERENCES main_organization(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX main_post_organization_id_74016676 ON public.main_post USING btree (organization_id);


-- public.main_program definition

CREATE TABLE public.main_program (
	id int8 DEFAULT nextval('main_program_id_seq'::regclass) NOT NULL,
	title character varying(255) NOT NULL,
	title_ky character varying(255),
	title_ru character varying(255),
	img character varying(100) NOT NULL,
	annotation text NOT NULL,
	annotation_ky text,
	annotation_ru text,
	content text NOT NULL,
	content_ky text,
	content_ru text,
	order int2 NOT NULL,
	CONSTRAINT main_program_pkey PRIMARY KEY (id)
);


-- public.main_recommendation definition

CREATE TABLE public.main_recommendation (
	id int8 DEFAULT nextval('main_recommendation_id_seq'::regclass) NOT NULL,
	title character varying(255) NOT NULL,
	title_ky character varying(255),
	title_ru character varying(255),
	link character varying(200) NOT NULL,
	img character varying(100) NOT NULL,
	order int2 NOT NULL,
	is_active bool NOT NULL,
	CONSTRAINT main_recommendation_pkey PRIMARY KEY (id),
	CONSTRAINT main_recommendation_order_check CHECK (("order" >= 0))
);


-- public.main_research definition

CREATE TABLE public.main_research (
	id int8 DEFAULT nextval('main_research_id_seq'::regclass) NOT NULL,
	title character varying(255) NOT NULL,
	title_ky character varying(255),
	title_ru character varying(255),
	attachment character varying(100) NOT NULL,
	organization_id int8 NOT NULL,
	created timestamptz NOT NULL,
	CONSTRAINT main_research_pkey PRIMARY KEY (id),
	CONSTRAINT main_research_organization_id_68f8b7a9_fk_main_organization_id FOREIGN KEY (organization_id) REFERENCES main_organization(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX main_research_organization_id_68f8b7a9 ON public.main_research USING btree (organization_id);


-- public.main_user definition

CREATE TABLE public.main_user (
	id int8 DEFAULT nextval('main_user_id_seq'::regclass) NOT NULL,
	password character varying(128) NOT NULL,
	last_login timestamptz,
	is_superuser bool NOT NULL,
	username character varying(150) NOT NULL,
	first_name character varying(150) NOT NULL,
	last_name character varying(150) NOT NULL,
	email character varying(254) NOT NULL,
	is_staff bool NOT NULL,
	is_active bool NOT NULL,
	date_joined timestamptz NOT NULL,
	CONSTRAINT main_user_username_key UNIQUE (username),
	CONSTRAINT main_user_pkey PRIMARY KEY (id)
);

CREATE INDEX main_user_username_6330637b_like ON public.main_user USING btree (username varchar_pattern_ops);


-- public.main_user_groups definition

CREATE TABLE public.main_user_groups (
	id int8 DEFAULT nextval('main_user_groups_id_seq'::regclass) NOT NULL,
	user_id int8 NOT NULL,
	group_id int4 NOT NULL,
	CONSTRAINT main_user_groups_user_id_group_id_ae195797_uniq UNIQUE (user_id, group_id),
	CONSTRAINT main_user_groups_pkey PRIMARY KEY (id),
	CONSTRAINT main_user_groups_group_id_a337ba62_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_user_groups_user_id_df502602_fk_main_user_id FOREIGN KEY (user_id) REFERENCES main_user(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX main_user_groups_group_id_a337ba62 ON public.main_user_groups USING btree (group_id);
CREATE INDEX main_user_groups_user_id_df502602 ON public.main_user_groups USING btree (user_id);


-- public.main_user_user_permissions definition

CREATE TABLE public.main_user_user_permissions (
	id int8 DEFAULT nextval('main_user_user_permissions_id_seq'::regclass) NOT NULL,
	user_id int8 NOT NULL,
	permission_id int4 NOT NULL,
	CONSTRAINT main_user_user_permissions_user_id_permission_id_96b9fadf_uniq UNIQUE (user_id, permission_id),
	CONSTRAINT main_user_user_permissions_pkey PRIMARY KEY (id),
	CONSTRAINT main_user_user_permi_permission_id_cd2b56a3_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED,
	CONSTRAINT main_user_user_permissions_user_id_451ce57f_fk_main_user_id FOREIGN KEY (user_id) REFERENCES main_user(id) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX main_user_user_permissions_permission_id_cd2b56a3 ON public.main_user_user_permissions USING btree (permission_id);
CREATE INDEX main_user_user_permissions_user_id_451ce57f ON public.main_user_user_permissions USING btree (user_id);


-- public.marital_status definition

CREATE TABLE public.marital_status (
	id_marital_status int4 DEFAULT nextval('marital_status_id_marital_status_seq'::regclass) NOT NULL,
	status_ky text NOT NULL,
	status_ru text NOT NULL,
	status_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT marital_status_status_ky_status_ru_status_en_key UNIQUE (status_ky, status_ru, status_en),
	CONSTRAINT marital_status_pkey PRIMARY KEY (id_marital_status)
);


-- public.medical_certificate_type definition

CREATE TABLE public.medical_certificate_type (
	id_medical_certificate_type int4 DEFAULT nextval('medical_certificate_type_id_medical_certificate_type_seq'::regclass) NOT NULL,
	medical_certificate_type_ky text,
	medical_certificate_type_ru text,
	medical_certificate_type_en text,
	CONSTRAINT medical_certificate_type_medical_certificate_type_ru_key UNIQUE (medical_certificate_type_ru),
	CONSTRAINT medical_certificate_type_pkey PRIMARY KEY (id_medical_certificate_type)
);


-- public.military_document_type definition

CREATE TABLE public.military_document_type (
	id_military_document_type int4 DEFAULT nextval('military_document_type_id_military_document_type_seq'::regclass) NOT NULL,
	document_type_ky text NOT NULL,
	document_type_ru text NOT NULL,
	document_type_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT military_document_type_document_type_ky_document_type_ru_do_key UNIQUE (document_type_ky, document_type_ru, document_type_en),
	CONSTRAINT military_document_type_pkey PRIMARY KEY (id_military_document_type)
);


-- public.military_office definition

CREATE TABLE public.military_office (
	id_military_office int4 DEFAULT nextval('military_office_id_military_office_seq'::regclass) NOT NULL,
	office_name_ky text NOT NULL,
	office_name_ru text NOT NULL,
	office_name_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT military_office_office_name_ky_office_name_ru_office_name_e_key UNIQUE (office_name_ky, office_name_ru, office_name_en),
	CONSTRAINT military_office_pkey PRIMARY KEY (id_military_office)
);


-- public.module_fields definition

CREATE TABLE public.module_fields (
	id_module_fields int4 DEFAULT nextval('module_fields_id_module_fields_seq'::regclass) NOT NULL,
	id_educational_plan int8 NOT NULL,
	id_module_name int4 NOT NULL,
	id_module_fields_name int8 NOT NULL,
	max_score numeric DEFAULT 0 NOT NULL,
	component_weight numeric DEFAULT 1 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT module_fields_id_educational_plan_id_module_name_id_module__key UNIQUE (id_educational_plan, id_module_name, id_module_fields_name),
	CONSTRAINT module_fields_pkey PRIMARY KEY (id_module_fields),
	CONSTRAINT module_fields_id_module_fields_name_fkey FOREIGN KEY (id_module_fields_name) REFERENCES module_fields_name(id_module_fields_name),
	CONSTRAINT module_fields_id_module_name_fkey FOREIGN KEY (id_module_name) REFERENCES module_name(id_module_name)
);

CREATE INDEX module_fields_id_module_fields_id_educational_plan_id_modul_idx ON public.module_fields USING btree (id_module_fields, id_educational_plan, id_module_name, id_module_fields_name);


-- public.module_fields_name definition

CREATE TABLE public.module_fields_name (
	id_module_fields_name int8 DEFAULT nextval('module_fields_name_id_module_fields_name_seq'::regclass) NOT NULL,
	module_fields_name_ky character varying(100),
	module_fields_name_ru character varying(100),
	module_fields_name_en character varying(100),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT module_fields_name_module_fields_name_ru_key UNIQUE (module_fields_name_ru),
	CONSTRAINT module_fields_name_pkey PRIMARY KEY (id_module_fields_name)
);


-- public.module_name definition

CREATE TABLE public.module_name (
	id_module_name int4 DEFAULT nextval('module_name_id_module_name_seq'::regclass) NOT NULL,
	module_name_ky character varying(100) DEFAULT ''::character varying,
	module_name_ru character varying(100) DEFAULT ''::character varying,
	module_name_en character varying(100) DEFAULT ''::character varying,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT module_name_pkey PRIMARY KEY (id_module_name)
);


-- public.movement_category definition

CREATE TABLE public.movement_category (
	id_movement_category int4 NOT NULL,
	movement_category_ky character varying(25),
	movement_category_ru character varying(25),
	movement_category_en character varying(25),
	CONSTRAINT movement_category_pkey PRIMARY KEY (id_movement_category)
);


-- public.movement_type definition

CREATE TABLE public.movement_type (
	id_movement_type int4 DEFAULT nextval('movement_type_id_movement_type_seq'::regclass) NOT NULL,
	id_movement_category int4,
	movement_type_ky character varying(50),
	movement_type_ru character varying(50),
	movement_type_en character varying(50),
	note text,
	CONSTRAINT movement_type_id_movement_category_movement_type_ru_key UNIQUE (id_movement_category, movement_type_ru),
	CONSTRAINT movement_type_pkey PRIMARY KEY (id_movement_type),
	CONSTRAINT movement_type_id_movement_category_fkey FOREIGN KEY (id_movement_category) REFERENCES movement_category(id_movement_category)
);

CREATE INDEX movement_type_id_movement_category_idx ON public.movement_type USING btree (id_movement_category);


-- public.nationality definition

CREATE TABLE public.nationality (
	id_nationality int4 DEFAULT nextval('nationality_id_nationality_seq'::regclass) NOT NULL,
	nationality_ky text NOT NULL,
	nationality_ru text NOT NULL,
	nationality_en text NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT nationality_nationality_ky_nationality_ru_nationality_en_key UNIQUE (nationality_ky, nationality_ru, nationality_en),
	CONSTRAINT nationality_pkey PRIMARY KEY (id_nationality)
);


-- public.org_manager_status definition

CREATE TABLE public.org_manager_status (
	id_org_manager_status int4 DEFAULT nextval('org_manager_status_id_org_manager_status_seq'::regclass) NOT NULL,
	org_manager_status_ky character varying(50),
	org_manager_status_ru character varying(50),
	org_manager_status_en character varying(50),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT org_manager_status_pkey PRIMARY KEY (id_org_manager_status)
);

CREATE INDEX org_manager_status_id_org_manager_status_idx ON public.org_manager_status USING btree (id_org_manager_status);


-- public.org_type definition

CREATE TABLE public.org_type (
	id_org_type int4 DEFAULT nextval('org_type_id_org_type_seq'::regclass) NOT NULL,
	org_type_ky character varying(10) NOT NULL,
	org_type_ru character varying(10) NOT NULL,
	org_type_en character varying(10) NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT org_type_org_type_ru_key UNIQUE (org_type_ru),
	CONSTRAINT org_type_pkey PRIMARY KEY (id_org_type)
);


-- public.organization definition

CREATE TABLE public.organization (
	id_org int4 DEFAULT nextval('organization_id_org_seq'::regclass) NOT NULL,
	id_org_type int4,
	okpo character varying(15),
	s_org text,
	org_ky text,
	org_ru text,
	org_en text,
	tin character varying(50),
	entered_org_ky text,
	entered_org_ru text,
	entered_org_en text,
	finish_org_ky text,
	finish_org_ru text,
	finish_org_en text,
	id_org_manager_status int4,
	created_date timestamp DEFAULT timezone('Asia/Bishkek'::text, now()),
	org_full_name_ky text,
	org_full_name_ru text,
	id_ownership int4,
	sort int4,
	visible_faculty bool DEFAULT true NOT NULL,
	visible_direction bool DEFAULT true NOT NULL,
	reg_org text DEFAULT 0 NOT NULL,
	id_org_manager_second int4,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT organization_okpo_key UNIQUE (okpo),
	CONSTRAINT organization_reg_org_id_org_type_key UNIQUE (reg_org, id_org_type),
	CONSTRAINT organization_pkey PRIMARY KEY (id_org),
	CONSTRAINT organization_id_org_manager_status_fkey FOREIGN KEY (id_org_manager_status) REFERENCES org_manager_status(id_org_manager_status),
	CONSTRAINT organization_id_org_type_fkey FOREIGN KEY (id_org_type) REFERENCES org_type(id_org_type),
	CONSTRAINT organization_id_ownership_fkey FOREIGN KEY (id_ownership) REFERENCES ownership(id_ownership)
);

CREATE INDEX organization_id_org_idx ON public.organization USING btree (id_org);
CREATE INDEX organization_id_org_manager_status_idx ON public.organization USING btree (id_org_manager_status);
CREATE INDEX organization_id_org_manager_status_idx1 ON public.organization USING btree (id_org_manager_status);
CREATE INDEX organization_id_org_type_idx ON public.organization USING btree (id_org_type);
CREATE INDEX organization_id_ownership_idx ON public.organization USING btree (id_ownership);
CREATE INDEX organization_okpo_idx ON public.organization USING btree (okpo);


-- public.ownership definition

CREATE TABLE public.ownership (
	id_ownership int4 DEFAULT nextval('ownership_id_ownership_seq'::regclass) NOT NULL,
	ownership_ky character varying(50),
	ownership_ru character varying(50),
	ownership_en character varying(50),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT ownership_ownership_ru_key UNIQUE (ownership_ru),
	CONSTRAINT ownership_pkey PRIMARY KEY (id_ownership)
);

CREATE INDEX ownership_id_ownership_idx ON public.ownership USING btree (id_ownership);


-- public.position definition

CREATE TABLE public.position (
	id_position int4 DEFAULT nextval('position_id_position_seq'::regclass) NOT NULL,
	position_ky character varying(255) NOT NULL,
	position_ru character varying(255) NOT NULL,
	position_en character varying(255) NOT NULL,
	sort int4 DEFAULT 1000,
	CONSTRAINT position_position_ru_key UNIQUE (position_ru),
	CONSTRAINT position_pkey PRIMARY KEY (id_position)
);

CREATE INDEX position_sort_idx ON public."position" USING btree (sort);


-- public.qualification definition

CREATE TABLE public.qualification (
	id_qualification int4 DEFAULT nextval('qualification_id_qualification_seq'::regclass) NOT NULL,
	qualification_ky character varying(300),
	qualification_ru character varying(300),
	qualification_en character varying(300),
	id_org_type int4,
	id_org int4,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT qualification_qualification_ru_id_org_type_key UNIQUE (id_org_type, id_org, qualification_en, qualification_ru),
	CONSTRAINT qualification_pkey PRIMARY KEY (id_qualification),
	CONSTRAINT qualification_id_org_fkey FOREIGN KEY (id_org) REFERENCES organization(id_org),
	CONSTRAINT qualification_id_org_type_fkey FOREIGN KEY (id_org_type) REFERENCES org_type(id_org_type)
);

CREATE INDEX qualification_id_org_idx ON public.qualification USING btree (id_org);
CREATE INDEX qualification_id_org_type_idx ON public.qualification USING btree (id_org_type);
CREATE INDEX qualification_id_qualification_idx ON public.qualification USING btree (id_qualification);


-- public.region definition

CREATE TABLE public.region (
	id_region int4 DEFAULT nextval('region_id_region_seq'::regclass) NOT NULL,
	region_ky text NOT NULL,
	region_ru text NOT NULL,
	region_en text NOT NULL,
	id_country int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	id_address_register int4,
	code int8,
	CONSTRAINT region_id_country_region_ky_region_ru_region_en_key UNIQUE (id_country, region_ky, region_ru, region_en),
	CONSTRAINT region_pkey PRIMARY KEY (id_region),
	CONSTRAINT region_id_country_fkey FOREIGN KEY (id_country) REFERENCES country(id_country) ON DELETE CASCADE
);


-- public.role definition

CREATE TABLE public.role (
	id_role int4 DEFAULT nextval('role_id_role_seq'::regclass) NOT NULL,
	role character varying(20),
	description_ru character varying(50),
	description_kg character varying(255),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT role_role_key UNIQUE (role),
	CONSTRAINT role_pkey PRIMARY KEY (id_role)
);


-- public.semester definition

CREATE TABLE public.semester (
	id_semester int4 DEFAULT nextval('semester_id_semester_seq'::regclass) NOT NULL,
	semester_ky character varying(15),
	semester_ru character varying(15),
	semester_en character varying(15),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT semester_pkey PRIMARY KEY (id_semester)
);


-- public.special_status definition

CREATE TABLE public.special_status (
	id_special_status int4 DEFAULT nextval('special_status_id_special_status_seq'::regclass) NOT NULL,
	status_ky text,
	status_ru text NOT NULL,
	status_en text,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	description text,
	CONSTRAINT special_status_status_ky_status_ru_status_en_key UNIQUE (status_ky, status_ru, status_en),
	CONSTRAINT special_status_pkey PRIMARY KEY (id_special_status)
);


-- public.specialty definition

CREATE TABLE public.specialty (
	id_specialty int4 DEFAULT nextval('specialty_id_specialty_seq'::regclass) NOT NULL,
	id_direction int4 NOT NULL,
	id_learning int4 NOT NULL,
	id_industry int4,
	specialty_cipher character varying(255),
	specialty_ky text,
	specialty_ru text NOT NULL,
	specialty_en text,
	id_qualification int4,
	id_education_period_year int4,
	id_education_period_month int4,
	created_date timestamp DEFAULT timezone('Asia/Bishkek'::text, now()),
	upd_date timestamp,
	is_active bool DEFAULT true NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT specialty_id_direction_id_learning_specialty_cipher_special_key UNIQUE (id_direction, id_learning, specialty_cipher, specialty_ru, id_education_period_year, id_education_period_month),
	CONSTRAINT specialty_pkey PRIMARY KEY (id_specialty),
	CONSTRAINT specialty_id_direction_fkey FOREIGN KEY (id_direction) REFERENCES direction(id_direction),
	CONSTRAINT specialty_id_education_period_month_fkey FOREIGN KEY (id_education_period_month) REFERENCES education_period_month(id_education_period_month),
	CONSTRAINT specialty_id_education_period_year_fkey FOREIGN KEY (id_education_period_year) REFERENCES education_period_year(id_education_period_year),
	CONSTRAINT specialty_id_industry_fkey FOREIGN KEY (id_industry) REFERENCES industry(id_industry),
	CONSTRAINT specialty_id_learning_fkey FOREIGN KEY (id_learning) REFERENCES learning(id_learning),
	CONSTRAINT specialty_id_qualification_fkey FOREIGN KEY (id_qualification) REFERENCES qualification(id_qualification)
);

CREATE INDEX idx_specialty_id_direction ON public.specialty USING btree (id_direction);
CREATE INDEX idx_specialty_id_education_period_month ON public.specialty USING btree (id_education_period_month);
CREATE INDEX idx_specialty_id_education_period_year ON public.specialty USING btree (id_education_period_year);
CREATE INDEX idx_specialty_id_industry ON public.specialty USING btree (id_industry);
CREATE INDEX idx_specialty_id_learning ON public.specialty USING btree (id_learning);
CREATE INDEX idx_specialty_id_qualification ON public.specialty USING btree (id_qualification);
CREATE INDEX idx_specialty_learning_ru ON public.specialty USING btree (id_learning, specialty_ru);


-- public.staff_category definition

CREATE TABLE public.staff_category (
	id_staff_category int4 DEFAULT nextval('staff_category_id_staff_category_seq'::regclass) NOT NULL,
	staff_category_ky text,
	staff_category_ru text,
	staff_category_en text,
	note text,
	CONSTRAINT staff_category_staff_category_ru_key UNIQUE (staff_category_ru),
	CONSTRAINT staff_category_pkey PRIMARY KEY (id_staff_category)
);


-- public.staff_schedule definition

CREATE TABLE public.staff_schedule (
	id_staff_schedule int4 DEFAULT nextval('staff_schedule_id_staff_schedule_seq'::regclass) NOT NULL,
	id_year int4 NOT NULL,
	id_structure int4,
	id_academic_department int4 DEFAULT '-1'::integer,
	id_staff_category int4,
	id_position int4 NOT NULL,
	id_budget_contract int4,
	count_stavka numeric NOT NULL,
	is_active bool DEFAULT true,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT staff_schedule_pkey PRIMARY KEY (id_staff_schedule),
	CONSTRAINT staff_schedule_id_academic_department_fkey FOREIGN KEY (id_academic_department) REFERENCES academic_department(id_academic_department),
	CONSTRAINT staff_schedule_id_budget_contract_fkey FOREIGN KEY (id_budget_contract) REFERENCES budget_contract(id_budget_contract),
	CONSTRAINT staff_schedule_id_structure_fkey FOREIGN KEY (id_structure) REFERENCES structure(id_structure),
	CONSTRAINT staff_schedule_id_position_fkey FOREIGN KEY (id_position) REFERENCES "position"(id_position),
	CONSTRAINT staff_schedule_id_staff_category_fkey FOREIGN KEY (id_staff_category) REFERENCES staff_category(id_staff_category),
	CONSTRAINT staff_schedule_count_stavka_check CHECK ((count_stavka > (0)::numeric))
);


-- public.structure definition

CREATE TABLE public.structure (
	id_structure int4 DEFAULT nextval('structure_id_structure_seq'::regclass) NOT NULL,
	structure_ky text,
	structure_ru text,
	structure_en text,
	sort int4 DEFAULT 0,
	CONSTRAINT structure_structure_ru_key UNIQUE (structure_ru),
	CONSTRAINT structure_pkey PRIMARY KEY (id_structure)
);


-- public.student definition

CREATE TABLE public.student (
	id_student int8 DEFAULT nextval('student_id_student_seq'::regclass) NOT NULL,
	pin int8,
	surname character varying(50) NOT NULL,
	name character varying(50),
	patronymic character varying(50),
	id_gender int4,
	date_birth date,
	created_at timestamptz DEFAULT timezone('Asia/Bishkek'::text, now()),
	updated_at timestamptz,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	password varchar,
	surname_en character varying(50),
	name_en character varying(50),
	patronymic_en character varying(50),
	CONSTRAINT student_pin_key UNIQUE (pin),
	CONSTRAINT student_pkey PRIMARY KEY (id_student),
	CONSTRAINT fk_student_gender FOREIGN KEY (id_gender) REFERENCES gender(id_gender)
);

CREATE INDEX idx_student_pin ON public.student USING btree (pin);
CREATE INDEX idx_student_surname ON public.student USING btree (surname);
CREATE INDEX student_created_at_idx ON public.student USING btree (created_at);


-- public.student_education definition

CREATE TABLE public.student_education (
	id_student_education int4 DEFAULT nextval('student_education_id_student_education_seq'::regclass) NOT NULL,
	id_student int4 NOT NULL,
	id_country int4,
	id_region int4,
	id_district int4,
	id_city int4,
	id_village int4,
	institution text NOT NULL,
	id_education_document_type int4 NOT NULL,
	document_series character varying(20) NOT NULL,
	document_number character varying(20),
	graduation_year int4,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT student_education_id_student_key UNIQUE (id_student),
	CONSTRAINT student_education_pkey PRIMARY KEY (id_student_education),
	CONSTRAINT student_education_id_city_fkey FOREIGN KEY (id_city) REFERENCES city(id_city),
	CONSTRAINT student_education_id_country_fkey FOREIGN KEY (id_country) REFERENCES country(id_country),
	CONSTRAINT student_education_id_district_fkey FOREIGN KEY (id_district) REFERENCES district(id_district),
	CONSTRAINT student_education_id_education_document_type_fkey FOREIGN KEY (id_education_document_type) REFERENCES education_document_type(id_education_document_type),
	CONSTRAINT student_education_id_region_fkey FOREIGN KEY (id_region) REFERENCES region(id_region),
	CONSTRAINT student_education_id_student_fkey FOREIGN KEY (id_student) REFERENCES student(id_student) ON DELETE CASCADE,
	CONSTRAINT student_education_id_village_fkey FOREIGN KEY (id_village) REFERENCES village(id_village)
);

CREATE INDEX idx_student_education_graduation_year ON public.student_education USING btree (graduation_year);
CREATE INDEX idx_student_education_id_student ON public.student_education USING btree (id_student);


-- public.student_info definition

CREATE TABLE public.student_info (
	id_student_info int4 DEFAULT nextval('student_info_id_student_info_seq'::regclass) NOT NULL,
	id_student int4 NOT NULL,
	id_document_type int4,
	passport_series character varying(20),
	passport_number character varying(20),
	id_citizenship int4,
	id_nationality int4,
	id_marital_status int4,
	id_special_status int4 DEFAULT 1,
	phone character varying(30),
	id_military_document_type int4,
	military_serial_number character varying(50),
	id_military_office int4,
	military_registration_date date,
	created_at timestamptz DEFAULT timezone('Asia/Bishkek'::text, now()) NOT NULL,
	updated_at timestamptz,
	email character varying(255),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp,
	CONSTRAINT student_info_id_student_key UNIQUE (id_student),
	CONSTRAINT student_info_pkey PRIMARY KEY (id_student_info),
	CONSTRAINT student_info_citizenship_fkey FOREIGN KEY (id_citizenship) REFERENCES citizenship(id_citizenship),
	CONSTRAINT student_info_document_type_fkey FOREIGN KEY (id_document_type) REFERENCES document_type(id_document_type),
	CONSTRAINT student_info_id_military_document_type_fkey FOREIGN KEY (id_military_document_type) REFERENCES military_document_type(id_military_document_type),
	CONSTRAINT student_info_id_military_office_fkey FOREIGN KEY (id_military_office) REFERENCES military_office(id_military_office),
	CONSTRAINT student_info_id_student_fkey FOREIGN KEY (id_student) REFERENCES student(id_student) ON DELETE CASCADE,
	CONSTRAINT student_info_marital_status_fkey FOREIGN KEY (id_marital_status) REFERENCES marital_status(id_marital_status),
	CONSTRAINT student_info_nationality_fkey FOREIGN KEY (id_nationality) REFERENCES nationality(id_nationality),
	CONSTRAINT student_info_special_status_fkey FOREIGN KEY (id_special_status) REFERENCES special_status(id_special_status)
);

CREATE INDEX idx_student_info_citizenship ON public.student_info USING btree (id_citizenship);
CREATE INDEX idx_student_info_id_student ON public.student_info USING btree (id_student);
CREATE INDEX idx_student_info_phone ON public.student_info USING btree (phone);
CREATE INDEX idx_student_info_special_status ON public.student_info USING btree (id_special_status);


-- public.student_movement definition

CREATE TABLE public.student_movement (
	id_student_movement int8 DEFAULT nextval('student_movement_id_student_movement_seq'::regclass) NOT NULL,
	id_student int8 NOT NULL,
	id_movement_type int4 NOT NULL,
	id_years int4 NOT NULL,
	id_year_half int4 NOT NULL,
	id_course int4 NOT NULL,
	id_semester int4 NOT NULL,
	id_academic_group int4 NOT NULL,
	id_budget_contract int4 NOT NULL,
	order_num character varying(50),
	order_date date,
	note text,
	is_active bool DEFAULT true NOT NULL,
	system_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT uq_student_movement_unique_movement UNIQUE (id_student, id_movement_type, id_years, id_year_half, id_course, id_semester, id_academic_group),
	CONSTRAINT student_movement_id_student_is_active_key UNIQUE (id_student, is_active),
	CONSTRAINT student_movement_pkey PRIMARY KEY (id_student_movement),
	CONSTRAINT student_movement_id_course_fkey FOREIGN KEY (id_course) REFERENCES course(id_course),
	CONSTRAINT student_movement_id_movement_type_fkey FOREIGN KEY (id_movement_type) REFERENCES movement_type(id_movement_type),
	CONSTRAINT student_movement_id_semester_fkey FOREIGN KEY (id_semester) REFERENCES semester(id_semester),
	CONSTRAINT student_movement_id_student_fkey FOREIGN KEY (id_student) REFERENCES student(id_student),
	CONSTRAINT student_movement_id_year_half_fkey FOREIGN KEY (id_year_half) REFERENCES year_half(id_year_half),
	CONSTRAINT student_movement_id_years_fkey FOREIGN KEY (id_years) REFERENCES years(id_years),
	CONSTRAINT student_movement_id_academic_group_fkey FOREIGN KEY (id_academic_group) REFERENCES academic_group(id_academic_group),
	CONSTRAINT student_movement_id_budget_contract_fkey FOREIGN KEY (id_budget_contract) REFERENCES budget_contract(id_budget_contract)
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


-- public.student_movement_history definition

CREATE TABLE public.student_movement_history (
	id_student_movement_history int8 DEFAULT nextval('student_movement_history_id_student_movement_history_seq'::regclass) NOT NULL,
	id_student_movement int8,
	id_student int8 NOT NULL,
	id_movement_type int4 NOT NULL,
	id_years int4 NOT NULL,
	id_year_half int4 NOT NULL,
	id_course int4 NOT NULL,
	id_semester int4 NOT NULL,
	id_academic_group int4 NOT NULL,
	id_budget_contract int4 NOT NULL,
	order_num character varying(50),
	order_date date,
	note text,
	is_active bool NOT NULL,
	action character varying(30) NOT NULL,
	id_user int4,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT student_movement_history_id_student_movement_id_student_id__key UNIQUE (id_student_movement, id_student, id_movement_type, id_years, id_year_half, id_course, id_semester, id_academic_group, id_budget_contract),
	CONSTRAINT student_movement_history_pkey PRIMARY KEY (id_student_movement_history),
	CONSTRAINT fk_smh_years FOREIGN KEY (id_years) REFERENCES years(id_years),
	CONSTRAINT fk_smh_movement_type FOREIGN KEY (id_movement_type) REFERENCES movement_type(id_movement_type),
	CONSTRAINT fk_smh_semester FOREIGN KEY (id_semester) REFERENCES semester(id_semester),
	CONSTRAINT fk_smh_student FOREIGN KEY (id_student) REFERENCES student(id_student) ON DELETE CASCADE,
	CONSTRAINT fk_smh_student_movement FOREIGN KEY (id_student_movement) REFERENCES student_movement(id_student_movement) ON DELETE SET NULL,
	CONSTRAINT fk_smh_year_half FOREIGN KEY (id_year_half) REFERENCES year_half(id_year_half),
	CONSTRAINT fk_smh_academic_group FOREIGN KEY (id_academic_group) REFERENCES academic_group(id_academic_group),
	CONSTRAINT fk_smh_budget_contract FOREIGN KEY (id_budget_contract) REFERENCES budget_contract(id_budget_contract),
	CONSTRAINT fk_smh_course FOREIGN KEY (id_course) REFERENCES course(id_course),
	CONSTRAINT chk_smh_order_date_not_future CHECK (((order_date IS NULL) OR (order_date <= CURRENT_DATE))),
	CONSTRAINT chk_smh_order_num_not_empty CHECK (((order_num IS NULL) OR (length(TRIM(BOTH FROM order_num)) > 0))),
	CONSTRAINT chk_smh_note_not_empty CHECK (((note IS NULL) OR (length(TRIM(BOTH FROM note)) > 0))),
	CONSTRAINT chk_smh_is_active_boolean CHECK ((is_active = ANY (ARRAY[true, false]))),
	CONSTRAINT chk_smh_action CHECK (((action)::text = ANY (ARRAY[('INSERT'::character varying)::text, ('UPDATE'::character varying)::text, ('DELETE'::character varying)::text, ('MOVE'::character varying)::text, ('CHANGE_GROUP'::character varying)::text, ('GRADUATE'::character varying)::text, ('RESTORE'::character varying)::text, ('TRANSFER'::character varying)::text])))
);

CREATE INDEX idx_smh_action ON public.student_movement_history USING btree (action);
CREATE INDEX idx_smh_created_at ON public.student_movement_history USING btree (created_at);
CREATE INDEX idx_smh_id_academic_group ON public.student_movement_history USING btree (id_academic_group);
CREATE INDEX idx_smh_id_movement_type ON public.student_movement_history USING btree (id_movement_type);
CREATE INDEX idx_smh_id_student ON public.student_movement_history USING btree (id_student);
CREATE INDEX idx_smh_id_student_movement ON public.student_movement_history USING btree (id_student_movement);
CREATE INDEX idx_smh_movement_time ON public.student_movement_history USING btree (id_student_movement, created_at DESC);


-- public.student_movement_log definition

CREATE TABLE public.student_movement_log (
	id_log int8 DEFAULT nextval('student_movement_log_id_log_seq'::regclass) NOT NULL,
	id_user int4 NOT NULL,
	id_student_movement int8,
	id_student int8,
	action character varying(20) NOT NULL,
	old_data jsonb,
	new_data jsonb,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT student_movement_log_pkey PRIMARY KEY (id_log),
	CONSTRAINT fk_student_movement_log_student FOREIGN KEY (id_student) REFERENCES student(id_student) ON DELETE SET NULL,
	CONSTRAINT fk_student_movement_log_student_movement FOREIGN KEY (id_student_movement) REFERENCES student_movement(id_student_movement) ON DELETE SET NULL,
	CONSTRAINT chk_student_movement_log_action CHECK (((action)::text = ANY (ARRAY[('insert'::character varying)::text, ('update'::character varying)::text, ('delete'::character varying)::text])))
);

CREATE INDEX idx_student_movement_log_created_at ON public.student_movement_log USING btree (created_at DESC);
CREATE INDEX idx_student_movement_log_id_student ON public.student_movement_log USING btree (id_student);
CREATE INDEX idx_student_movement_log_id_student_movement ON public.student_movement_log USING btree (id_student_movement);


-- public.student_parents definition

CREATE TABLE public.student_parents (
	id_student_parent int4 DEFAULT nextval('student_parents_id_student_parent_seq'::regclass) NOT NULL,
	id_student int4 NOT NULL,
	father_fullname character varying(150),
	father_email character varying(100),
	father_phone character varying(30),
	mother_fullname character varying(150),
	mother_email character varying(100),
	mother_phone character varying(30),
	created_at timestamptz DEFAULT timezone('Asia/Bishkek'::text, now()) NOT NULL,
	updated_at timestamptz,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT student_parents_id_student_key UNIQUE (id_student),
	CONSTRAINT student_parents_pkey PRIMARY KEY (id_student_parent),
	CONSTRAINT student_parents_id_student_fkey FOREIGN KEY (id_student) REFERENCES student(id_student) ON DELETE CASCADE
);

CREATE INDEX idx_student_parents_id_student ON public.student_parents USING btree (id_student);


-- public.student_photo definition

CREATE TABLE public.student_photo (
	id_student_photo int4 DEFAULT nextval('student_photo_id_student_photo_seq'::regclass) NOT NULL,
	id_student int4 NOT NULL,
	photo bytea,
	photo_url character varying(50),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT student_photo_pkey PRIMARY KEY (id_student_photo),
	CONSTRAINT student_photo_id_student_fkey FOREIGN KEY (id_student) REFERENCES student(id_student) ON DELETE CASCADE
);

CREATE INDEX idx_student_photo_id_student ON public.student_photo USING btree (id_student);


-- public.teacher definition

CREATE TABLE public.teacher (
	id_teacher int4 DEFAULT nextval('teacher_id_teacher_seq'::regclass) NOT NULL,
	id_users int4,
	id_academic_department int4,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT teacher_id_users_id_academic_department_key UNIQUE (id_users, id_academic_department),
	CONSTRAINT teacher_pkey PRIMARY KEY (id_teacher),
	CONSTRAINT teacher_id_academic_department_fkey FOREIGN KEY (id_academic_department) REFERENCES academic_department(id_academic_department),
	CONSTRAINT teacher_id_users_fkey FOREIGN KEY (id_users) REFERENCES users(id_users)
);

CREATE INDEX teacher_id_users_id_academic_department_idx ON public.teacher USING btree (id_users, id_academic_department);


-- public.teacher_load definition

CREATE TABLE public.teacher_load (
	id_teacher_load int8 DEFAULT nextval('teacher_load_id_teacher_load_seq'::regclass) NOT NULL,
	id_educational_plan int8 NOT NULL,
	id_academic_group int4,
	id_academic_department int4 NOT NULL,
	id_discipline int8 NOT NULL,
	id_discipline_control int4,
	id_user int4 NOT NULL,
	total_hours float4 DEFAULT 0 NOT NULL,
	id_rule int4,
	mark_sheet bool DEFAULT false NOT NULL,
	note text,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT teacher_load_unique UNIQUE (id_user, id_discipline, id_educational_plan, id_academic_group),
	CONSTRAINT teacher_load_pkey PRIMARY KEY (id_teacher_load),
	CONSTRAINT teacher_load_id_academic_department_fkey FOREIGN KEY (id_academic_department) REFERENCES academic_department(id_academic_department) ON DELETE RESTRICT,
	CONSTRAINT teacher_load_id_user_fkey FOREIGN KEY (id_user) REFERENCES users(id_users) ON DELETE RESTRICT,
	CONSTRAINT teacher_load_id_discipline_fkey FOREIGN KEY (id_discipline) REFERENCES discipline(id_discipline) ON DELETE RESTRICT,
	CONSTRAINT teacher_load_id_educational_plan_fkey FOREIGN KEY (id_educational_plan) REFERENCES educational_plan(id_educational_plan) ON DELETE CASCADE,
	CONSTRAINT teacher_load_total_hours_check CHECK ((total_hours >= (0)::double precision))
);

CREATE INDEX idx_teacher_load_department ON public.teacher_load USING btree (id_academic_department);
CREATE INDEX idx_teacher_load_discipline ON public.teacher_load USING btree (id_discipline);
CREATE INDEX idx_teacher_load_plan ON public.teacher_load USING btree (id_educational_plan);
CREATE INDEX idx_teacher_load_user ON public.teacher_load USING btree (id_user);


-- public.teacher_load_hours definition

CREATE TABLE public.teacher_load_hours (
	id_teacher_load_hours int8 DEFAULT nextval('teacher_load_hours_id_teacher_load_hours_seq'::regclass) NOT NULL,
	id_teacher_load int8 NOT NULL,
	field_key character varying(50) NOT NULL,
	hours float4 DEFAULT 0 NOT NULL,
	CONSTRAINT teacher_load_hours_unique UNIQUE (id_teacher_load, field_key),
	CONSTRAINT teacher_load_hours_pkey PRIMARY KEY (id_teacher_load_hours),
	CONSTRAINT teacher_load_hours_field_key_fkey FOREIGN KEY (field_key) REFERENCES educational_plan_field_meta(field_key),
	CONSTRAINT teacher_load_hours_id_teacher_load_fkey FOREIGN KEY (id_teacher_load) REFERENCES teacher_load(id_teacher_load) ON DELETE CASCADE,
	CONSTRAINT teacher_load_hours_hours_check CHECK ((hours >= (0)::double precision))
);

CREATE INDEX idx_teacher_load_hours_field ON public.teacher_load_hours USING btree (field_key);
CREATE INDEX idx_teacher_load_hours_load ON public.teacher_load_hours USING btree (id_teacher_load);


-- public.user_education definition

CREATE TABLE public.user_education (
	id_user_education int4 DEFAULT nextval('user_education_id_user_education_seq'::regclass) NOT NULL,
	id_user int4 NOT NULL,
	id_education_document_type int4 NOT NULL,
	document_series character varying(20) NOT NULL,
	document_number character varying(20),
	graduation_year int4,
	institution text,
	speciality text,
	qualification text,
	CONSTRAINT user_education_pkey PRIMARY KEY (id_user_education),
	CONSTRAINT fk_user_education_document_type FOREIGN KEY (id_education_document_type) REFERENCES education_document_type(id_education_document_type),
	CONSTRAINT fk_user_education_user FOREIGN KEY (id_user) REFERENCES users(id_users) ON DELETE CASCADE
);

CREATE INDEX idx_user_education_id_document_type ON public.user_education USING btree (id_education_document_type);
CREATE INDEX idx_user_education_id_user ON public.user_education USING btree (id_user);


-- public.user_info definition

CREATE TABLE public.user_info (
	id_user_info int4 DEFAULT nextval('user_info_id_user_info_seq'::regclass) NOT NULL,
	id_user int4 NOT NULL,
	date_birth date,
	id_gender int4,
	id_document_type int4,
	passport_series character varying(20),
	passport_number character varying(20),
	id_citizenship int4,
	id_nationality int4,
	id_marital_status int4,
	id_special_status int4 DEFAULT 1,
	phone character varying(30),
	email character varying(255),
	id_military_document_type int4,
	military_serial_number character varying(50),
	id_military_office int4,
	military_registration_date date,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp,
	CONSTRAINT user_info_id_user_key UNIQUE (id_user),
	CONSTRAINT pk_user_info PRIMARY KEY (id_user_info),
	CONSTRAINT fk_user_info_document_type FOREIGN KEY (id_document_type) REFERENCES document_type(id_document_type),
	CONSTRAINT fk_user_info_gender FOREIGN KEY (id_gender) REFERENCES gender(id_gender),
	CONSTRAINT fk_user_info_marital_status FOREIGN KEY (id_marital_status) REFERENCES marital_status(id_marital_status),
	CONSTRAINT fk_user_info_military_document_type FOREIGN KEY (id_military_document_type) REFERENCES military_document_type(id_military_document_type),
	CONSTRAINT fk_user_info_military_office FOREIGN KEY (id_military_office) REFERENCES military_office(id_military_office),
	CONSTRAINT fk_user_info_nationality FOREIGN KEY (id_nationality) REFERENCES nationality(id_nationality),
	CONSTRAINT fk_user_info_special_status FOREIGN KEY (id_special_status) REFERENCES special_status(id_special_status),
	CONSTRAINT fk_user_info_user FOREIGN KEY (id_user) REFERENCES users(id_users) ON DELETE CASCADE,
	CONSTRAINT fk_user_info_citizenship FOREIGN KEY (id_citizenship) REFERENCES citizenship(id_citizenship)
);

CREATE INDEX idx_user_info_email ON public.user_info USING btree (email);
CREATE INDEX idx_user_info_id_user ON public.user_info USING btree (id_user);
CREATE INDEX idx_user_info_passport ON public.user_info USING btree (passport_series, passport_number);
CREATE INDEX idx_user_info_phone ON public.user_info USING btree (phone);


-- public.user_photo definition

CREATE TABLE public.user_photo (
	id_user_photo int4 DEFAULT nextval('user_photo_id_user_photo_seq'::regclass) NOT NULL,
	id_user int4 NOT NULL,
	photo bytea,
	photo_url character varying(255),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT user_photo_id_user_key UNIQUE (id_user),
	CONSTRAINT user_photo_pkey PRIMARY KEY (id_user_photo),
	CONSTRAINT fk_user_photo_user FOREIGN KEY (id_user) REFERENCES users(id_users) ON DELETE CASCADE
);

CREATE INDEX idx_user_photo_id_user ON public.user_photo USING btree (id_user);


-- public.user_security definition

CREATE TABLE public.user_security (
	id_user_security int8 DEFAULT nextval('user_security_id_user_security_seq'::regclass) NOT NULL,
	id_user int4 NOT NULL,
	id_role int4,
	id_user_table int4 NOT NULL,
	id_object int4 NOT NULL,
	permission character varying(50) DEFAULT 'read'::character varying NOT NULL,
	note text,
	system_created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT user_security_user_table_object_user_key UNIQUE (id_user, id_user_table, id_object),
	CONSTRAINT user_security_pkey PRIMARY KEY (id_user_security),
	CONSTRAINT user_security_id_role_fkey FOREIGN KEY (id_role) REFERENCES role(id_role),
	CONSTRAINT user_security_id_user_fkey FOREIGN KEY (id_user) REFERENCES users(id_users) ON DELETE CASCADE,
	CONSTRAINT user_security_id_user_table_fkey FOREIGN KEY (id_user_table) REFERENCES user_table(id_user_table),
	CONSTRAINT user_security_permission_check CHECK (((permission)::text = ANY (ARRAY[('read'::character varying)::text, ('write'::character varying)::text, ('update'::character varying)::text, ('delete'::character varying)::text, ('full'::character varying)::text])))
);

CREATE INDEX idx_user_security_user_role ON public.user_security USING btree (id_user, id_role);
CREATE INDEX user_security_id_user_table_idx ON public.user_security USING btree (id_user_table);


-- public.user_table definition

CREATE TABLE public.user_table (
	id_user_table int4 DEFAULT nextval('user_object_type_id_object_type_seq'::regclass) NOT NULL,
	user_table character varying(50) NOT NULL,
	note text,
	CONSTRAINT user_table_user_table_key UNIQUE (user_table),
	CONSTRAINT user_object_type_pkey PRIMARY KEY (id_user_table)
);


-- public.users definition

CREATE TABLE public.users (
	id_users int4 DEFAULT nextval('users_id_users_seq'::regclass) NOT NULL,
	surname character varying(100) NOT NULL,
	name character varying(100) NOT NULL,
	patronymic character varying(100),
	pin int8 NOT NULL,
	password character varying(255),
	active bool DEFAULT true NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT users_pin_key UNIQUE (pin),
	CONSTRAINT users_pkey PRIMARY KEY (id_users)
);

CREATE INDEX users_active_idx ON public.users USING btree (active);
CREATE INDEX users_pin_idx ON public.users USING btree (pin, password);


-- public.users_faculty definition

CREATE TABLE public.users_faculty (
	id_users_faculty int4 DEFAULT nextval('users_faculty_id_users_faculty_seq'::regclass) NOT NULL,
	id_users int4 NOT NULL,
	id_faculty int4 NOT NULL,
	insDate timestamp DEFAULT timezone('Asia/Bishkek'::text, now()),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT users_faculty_id_users_id_faculty_key UNIQUE (id_users, id_faculty),
	CONSTRAINT users_faculty_pkey PRIMARY KEY (id_users_faculty),
	CONSTRAINT users_faculty_id_faculty_fkey FOREIGN KEY (id_faculty) REFERENCES faculty(id_faculty),
	CONSTRAINT users_faculty_id_users_fkey FOREIGN KEY (id_users) REFERENCES users(id_users)
);

CREATE INDEX users_faculty_id_users_id_faculty_idx ON public.users_faculty USING btree (id_users, id_faculty);


-- public.village definition

CREATE TABLE public.village (
	id_village int4 DEFAULT nextval('village_id_village_seq'::regclass) NOT NULL,
	village_ky text NOT NULL,
	village_ru text NOT NULL,
	village_en text NOT NULL,
	id_district int4 NOT NULL,
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT village_id_district_village_ky_village_ru_village_en_key UNIQUE (id_district, village_ky, village_ru, village_en),
	CONSTRAINT village_pkey PRIMARY KEY (id_village),
	CONSTRAINT village_id_district_fkey FOREIGN KEY (id_district) REFERENCES district(id_district) ON DELETE CASCADE
);


-- public.year_half definition

CREATE TABLE public.year_half (
	id_year_half int4 DEFAULT nextval('year_half_id_year_half_seq'::regclass) NOT NULL,
	year_half_ky character varying(50),
	year_half_ru character varying(50),
	year_half_en character varying(50),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT year_half_en_uniq UNIQUE (year_half_en),
	CONSTRAINT year_half_ky_uniq UNIQUE (year_half_ky),
	CONSTRAINT year_half_ru_uniq UNIQUE (year_half_ru),
	CONSTRAINT year_half_pkey PRIMARY KEY (id_year_half)
);


-- public.years definition

CREATE TABLE public.years (
	id_years int4 DEFAULT nextval('years_id_years_seq'::regclass) NOT NULL,
	sh_years int4,
	study_year character varying(9),
	system_created_at timestamp DEFAULT CURRENT_TIMESTAMP,
	system_updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT years_sh_years_key UNIQUE (sh_years),
	CONSTRAINT years_years_key UNIQUE (study_year),
	CONSTRAINT years_pkey PRIMARY KEY (id_years)
);


