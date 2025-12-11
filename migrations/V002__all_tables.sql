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
	title_ky varchar(500) NULL,
	title_ru varchar(500) NULL,
	attachment varchar(100) NOT NULL,
	organization_id int8 NOT NULL,
	created timestamptz NOT NULL,
	updated timestamptz NULL,
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
	fullname_en varchar(500) NULL,
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