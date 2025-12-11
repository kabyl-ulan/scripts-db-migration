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