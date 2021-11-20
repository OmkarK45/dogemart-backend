--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

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
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cart" (
    product_id text,
    quantity integer,
    user_id text NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."Cart" OWNER TO postgres;

--
-- Name: Cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cart_id_seq" OWNER TO postgres;

--
-- Name: Cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cart_id_seq" OWNED BY public."Cart".id;


--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    category_name text NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: CategoryGroup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CategoryGroup" (
    id integer NOT NULL,
    category_id integer NOT NULL,
    product_id text NOT NULL
);


ALTER TABLE public."CategoryGroup" OWNER TO postgres;

--
-- Name: CategoryGroup_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CategoryGroup_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CategoryGroup_id_seq" OWNER TO postgres;

--
-- Name: CategoryGroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CategoryGroup_id_seq" OWNED BY public."CategoryGroup".id;


--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Category_id_seq" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    price double precision NOT NULL,
    description text NOT NULL,
    images text[],
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    discount integer DEFAULT 0 NOT NULL,
    excerpt text NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    stock integer NOT NULL,
    title text NOT NULL,
    user_id text NOT NULL,
    id text NOT NULL,
    brand text DEFAULT 'GENERIC_BRAND'::text NOT NULL,
    slug text,
    colors text[],
    features text[],
    sizes text[],
    rating double precision DEFAULT 0 NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id text NOT NULL,
    product_id text NOT NULL,
    user_id text NOT NULL,
    rating integer NOT NULL,
    comment text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    sid text NOT NULL,
    data text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "userId" text
);


ALTER TABLE public."Session" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "hashedPassword" text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_at timestamp(3) without time zone NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: Wishlist; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Wishlist" (
    id text NOT NULL,
    product_id text,
    wishlist_name text DEFAULT 'default'::text NOT NULL,
    user_id text NOT NULL
);


ALTER TABLE public."Wishlist" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Cart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart" ALTER COLUMN id SET DEFAULT nextval('public."Cart_id_seq"'::regclass);


--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: CategoryGroup id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryGroup" ALTER COLUMN id SET DEFAULT nextval('public."CategoryGroup_id_seq"'::regclass);


--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cart" (product_id, quantity, user_id, id) FROM stdin;
60cdc665-ca84-4b63-a9fe-bcf62fea188a	99	b5fca53b-64c4-406c-a1aa-87213a88a62a	5
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (category_name, id) FROM stdin;
category_name1	1
category_name2	2
category_name3	3
category_name4	4
\.


--
-- Data for Name: CategoryGroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CategoryGroup" (id, category_id, product_id) FROM stdin;
1	1	10bcf896-af98-4472-b6d4-cc77d52bf59b
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (price, description, images, created_at, discount, excerpt, is_deleted, stock, title, user_id, id, brand, slug, colors, features, sizes, rating) FROM stdin;
46	product_description1	{https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg}	2021-11-12 15:45:38.471	34	product_excerpt1	f	73	product_name1	b5fca53b-64c4-406c-a1aa-87213a88a62a	11faf870-2b56-4659-bb70-db8138fbe43f	GENERIC_BRAND	product-17-doge-QSfdXQ	{green,white}	{"Just your everyday smooth, comfy tee, a wardrobe staple","Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt"}	{XL,L}	4.6
8	product_description2	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg,https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg,https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg}	2021-11-18 15:08:42.948	34	product_excerpt2	f	44	product_name12	b5fca53b-64c4-406c-a1aa-87213a88a62a	c56beaed-9579-456a-ab18-da020e8e91fe	GENERIC_BRAND	product-30-doge-5_Tr6P	{white,yellow,green,red}	{"Colors are ink printed on the frosted shell surface"}	{S,L,XL}	1.3
14	product_description6	{https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg,https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg,https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg}	2021-11-18 15:08:42.963	34	product_excerpt6	f	78	product_name16	b5fca53b-64c4-406c-a1aa-87213a88a62a	21a19b27-55dc-4a0b-8194-650a5ab41821	GENERIC_BRAND	product-24-doge-Bq0M8S	{black}	{"Just your everyday smooth, comfy tee, a wardrobe staple","Colors are ink printed on the frosted shell surface","Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt","Male model shown is 60 183 cm tall and wearing size Large"}	{XXL,M,XL,S}	1.2
39	product_description8	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg,https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg,https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg}	2021-11-18 13:32:34.208	34	product_excerpt8	f	3	product_name18	b5fca53b-64c4-406c-a1aa-87213a88a62a	ed9b559a-51a0-4155-add7-49810f8a8334	GENERIC_BRAND	product-99-doge-Duy4O7	{black}	{"Shock absorbent TPU case with anti-fingerprint finish","Colors are ink printed on the frosted shell surface","Male model shown is 60 183 cm tall and wearing size Large"}	{L}	3.8
12	product_description6	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg,https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg}	2021-11-18 13:32:34.196	34	product_excerpt6	f	27	product_name16	b5fca53b-64c4-406c-a1aa-87213a88a62a	30da76b6-21e2-4fe5-bdee-6cefd99e2a9f	GENERIC_BRAND	product-94-doge-yVAs91	{black,yellow,green}	{"Male model shown is 60 183 cm tall and wearing size Large"}	{L,M}	0.7
67	product_description7	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg,https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg,https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg}	2021-11-18 15:08:42.968	34	product_excerpt7	f	43	product_name17	b5fca53b-64c4-406c-a1aa-87213a88a62a	6d9648a8-761c-44c3-83d2-d8bc16399dbb	GENERIC_BRAND	product-10-doge-UMeLlG	{yellow,red}	{"Shock absorbent TPU case with anti-fingerprint finish"}	{L}	3.1
45	product_description3	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg,https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg}	2021-11-18 15:08:42.952	34	product_excerpt3	f	23	product_name13	b5fca53b-64c4-406c-a1aa-87213a88a62a	16e7fab0-6850-4f62-89fd-c0f8b365a22b	GENERIC_BRAND	product-25-doge-O8pdaI	{green,white,red,blue}	{"Just your everyday smooth, comfy tee, a wardrobe staple","Shock absorbent TPU case with anti-fingerprint finish","Colors are ink printed on the frosted shell surface","Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt"}	{XL,L,S,XXL}	3.1
85	product_description4	{https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg,https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg}	2021-11-12 15:45:38.497	34	product_excerpt4	f	14	product_name4	b5fca53b-64c4-406c-a1aa-87213a88a62a	7429d420-0248-4a3f-9bcc-485550797e5a	GENERIC_BRAND	product-97-doge-Bn9GlM	{blue,yellow,white,red}	{"Male model shown is 60 183 cm tall and wearing size Large","Shock absorbent TPU case with anti-fingerprint finish","Just your everyday smooth, comfy tee, a wardrobe staple","Colors are ink printed on the frosted shell surface"}	{XL,S,M}	1.3
10	product_description9	{https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg,https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg}	2021-11-18 13:32:34.216	34	product_excerpt9	f	98	product_name19	b5fca53b-64c4-406c-a1aa-87213a88a62a	bbf8d5a0-0dd7-4df2-a1e3-69ec4230b1bc	GENERIC_BRAND	product-49-doge-b7rS76	{white,red}	{"Shock absorbent TPU case with anti-fingerprint finish","Male model shown is 60 183 cm tall and wearing size Large","Colors are ink printed on the frosted shell surface","Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt"}	{S,L}	1.4
83	product_description7	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg}	2021-11-18 13:32:34.2	34	product_excerpt7	f	89	product_name17	b5fca53b-64c4-406c-a1aa-87213a88a62a	b63abe14-c2ba-48e2-8946-4441ed626f35	GENERIC_BRAND	product-64-doge-5uI02Q	{yellow,black}	{"Shock absorbent TPU case with anti-fingerprint finish","Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt","Just your everyday smooth, comfy tee, a wardrobe staple"}	{XXL,M}	0.7
61	product_description6	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg,https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg}	2021-11-12 15:45:38.504	34	product_excerpt6	f	9	product_name6	b5fca53b-64c4-406c-a1aa-87213a88a62a	3b2ab47b-09c6-4745-ba19-7522a58d09b7	GENERIC_BRAND	product-93-doge-cfQ3FZ	{white,red,green,blue}	{"Male model shown is 60 183 cm tall and wearing size Large","Shock absorbent TPU case with anti-fingerprint finish","Just your everyday smooth, comfy tee, a wardrobe staple"}	{M,S,L,XXL}	1.5
97	product_description3	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg}	2021-11-12 15:45:38.493	34	product_excerpt3	f	79	product_name3	b5fca53b-64c4-406c-a1aa-87213a88a62a	34e42046-d4c7-4f14-b4cc-052653e21251	GENERIC_BRAND	product-27-doge-AVsZ8o	{yellow}	{"Just your everyday smooth, comfy tee, a wardrobe staple","Shock absorbent TPU case with anti-fingerprint finish","Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt"}	{XL}	1.8
10	product_description3	{https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg}	2021-11-18 13:32:34.178	34	product_excerpt3	f	77	product_name13	b5fca53b-64c4-406c-a1aa-87213a88a62a	37d124f6-415b-4c57-b71a-0d5285d0c3e6	GENERIC_BRAND	product-4-doge-1RwIzO	{blue,white,yellow}	{"Shock absorbent TPU case with anti-fingerprint finish","Colors are ink printed on the frosted shell surface","Just your everyday smooth, comfy tee, a wardrobe staple"}	{M,L,XXL,S}	3.3
19	product_description7	{https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg,https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg}	2021-11-12 15:45:38.507	34	product_excerpt7	f	90	product_name7	b5fca53b-64c4-406c-a1aa-87213a88a62a	9f06a6f8-2f36-4158-a390-2c379ad0c441	GENERIC_BRAND	product-54-doge-VFlPDq	{yellow,white}	{"Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt"}	{M}	1.2
31	product_description5	{https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg,https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg}	2021-11-18 15:08:42.959	34	product_excerpt5	f	75	product_name15	b5fca53b-64c4-406c-a1aa-87213a88a62a	e3aeece5-64ab-4553-ba74-3ab5cb77a635	GENERIC_BRAND	product-71-doge-ilcmCM	{black}	{"Shock absorbent TPU case with anti-fingerprint finish","Colors are ink printed on the frosted shell surface","Just your everyday smooth, comfy tee, a wardrobe staple"}	{L,XXL,M,XL}	2.5
95	product_description5	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg,https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg,https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg}	2021-11-18 13:32:34.187	34	product_excerpt5	f	32	product_name15	b5fca53b-64c4-406c-a1aa-87213a88a62a	10bcf896-af98-4472-b6d4-cc77d52bf59b	GENERIC_BRAND	product-40-doge-XZsN-t	{white,green}	{"Shock absorbent TPU case with anti-fingerprint finish"}	{XXL,XL,S}	1.8
50	product_description8	{https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg,https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg,https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg}	2021-11-18 15:08:42.971	34	product_excerpt8	f	64	product_name18	b5fca53b-64c4-406c-a1aa-87213a88a62a	88d1226a-c2ba-44cc-9f5f-7023dffc776a	GENERIC_BRAND	product-43-doge-75XC8J	{blue,white}	{"Male model shown is 60 183 cm tall and wearing size Large","Just your everyday smooth, comfy tee, a wardrobe staple","Colors are ink printed on the frosted shell surface"}	{XL,S}	3.7
98	product_description4	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg,https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg,https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg,https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg}	2021-11-18 13:32:34.182	34	product_excerpt4	f	11	product_name14	b5fca53b-64c4-406c-a1aa-87213a88a62a	618bf694-a7eb-41da-a6bd-0821ecaca617	GENERIC_BRAND	product-72-doge-Haa_hk	{white,blue,black,green}	{"Shock absorbent TPU case with anti-fingerprint finish"}	{XXL,L,S,M}	4.6
84	product_description5	{https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg,https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg,https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg,https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg}	2021-11-12 15:45:38.501	34	product_excerpt5	f	40	product_name5	b5fca53b-64c4-406c-a1aa-87213a88a62a	60cdc665-ca84-4b63-a9fe-bcf62fea188a	GENERIC_BRAND	product-6-doge-du6aR0	{white}	{"Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt","Male model shown is 60 183 cm tall and wearing size Large"}	{L}	4.1
63	product_description9	{https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg}	2021-11-18 15:08:42.974	34	product_excerpt9	f	19	product_name19	b5fca53b-64c4-406c-a1aa-87213a88a62a	4e75aedc-36b3-4b67-9af8-ce9d75be970e	GENERIC_BRAND	product-60-doge-tV-6hg	{black,blue,yellow,white}	{"Colors are ink printed on the frosted shell surface","Just your everyday smooth, comfy tee, a wardrobe staple","Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt","Shock absorbent TPU case with anti-fingerprint finish"}	{XL,L,S}	2.6
50	product_description9	{https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg}	2021-11-12 15:45:38.515	34	product_excerpt9	f	60	product_name9	b5fca53b-64c4-406c-a1aa-87213a88a62a	cbb76ccd-1d49-420b-8814-15c47c5e02df	GENERIC_BRAND	product-42-doge-ucSIig	{blue,yellow,white,green}	{"Male model shown is 60 183 cm tall and wearing size Large","Just your everyday smooth, comfy tee, a wardrobe staple","Shock absorbent TPU case with anti-fingerprint finish"}	{S}	1.9
43	product_description1	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg,https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg}	2021-11-18 15:08:42.905	34	product_excerpt1	f	0	product_name11	b5fca53b-64c4-406c-a1aa-87213a88a62a	71151ff0-413d-48fd-86cd-7a3306d805fe	GENERIC_BRAND	product-46-doge-pWf2qM	{yellow}	{"Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt","Shock absorbent TPU case with anti-fingerprint finish"}	{XXL,M}	3.5
43	product_description2	{https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg}	2021-11-12 15:45:38.489	34	product_excerpt2	f	4	product_name2	b5fca53b-64c4-406c-a1aa-87213a88a62a	9d5a1060-90dd-4ed1-b8ac-ef3aded2a34a	GENERIC_BRAND	product-75-doge-r9KVY6	{white,blue,red,yellow}	{"Shock absorbent TPU case with anti-fingerprint finish","Male model shown is 60 183 cm tall and wearing size Large"}	{XL,XXL,L}	3.1
38	product_description2	{https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg,https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-04.jpg,https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg}	2021-11-18 13:32:34.169	34	product_excerpt2	f	49	product_name12	b5fca53b-64c4-406c-a1aa-87213a88a62a	55301509-ab4d-405a-a25b-2efbe758d4eb	GENERIC_BRAND	product-59-doge-QTksxd	{blue}	{"Colors are ink printed on the frosted shell surface"}	{XL,M}	2.4
34	product_description8	{https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg}	2021-11-12 15:45:38.511	34	product_excerpt8	f	8	product_name8	b5fca53b-64c4-406c-a1aa-87213a88a62a	abef979d-febc-4334-8794-de1126b606c1	GENERIC_BRAND	product-20-doge-Ot7D-5	{white,blue,black}	{"Just your everyday smooth, comfy tee, a wardrobe staple","Colors are ink printed on the frosted shell surface"}	{XL,L}	1.4
15	product_description1	{https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg,https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg,https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg}	2021-11-18 13:32:34.128	34	product_excerpt1	f	38	product_name11	b5fca53b-64c4-406c-a1aa-87213a88a62a	93ca8699-8389-4d08-bf4f-ebb448ee402c	GENERIC_BRAND	product-36-doge-370YNf	{blue,yellow,white}	{"Slim fit, so size up if you prefer a looser fit, or check out the Classic T-Shirt","Colors are ink printed on the frosted shell surface","Just your everyday smooth, comfy tee, a wardrobe staple"}	{XXL,S,XL}	0.6
14	product_description4	{https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg,https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg,https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg}	2021-11-18 15:08:42.956	34	product_excerpt4	f	64	product_name14	b5fca53b-64c4-406c-a1aa-87213a88a62a	7d7f537e-7dc7-40b7-bee1-8e709b8ebc3a	GENERIC_BRAND	product-89-doge-O6O6ZC	{black}	{"Male model shown is 60 183 cm tall and wearing size Large","Just your everyday smooth, comfy tee, a wardrobe staple","Shock absorbent TPU case with anti-fingerprint finish"}	{L,XL,M,S}	4.1
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, product_id, user_id, rating, comment, created_at, updated_at) FROM stdin;
b4d42abf-cb6c-4c4f-b2a4-0eb0b06c6517	11faf870-2b56-4659-bb70-db8138fbe43f	1cf8ca9c-076d-4b4f-bfab-5b1c656295a0	4	This T shirt looks good on me	2021-11-18 19:37:16.885	2021-11-18 19:37:16.889
f34c7c27-8b1f-49d1-8aef-25e65be22fd2	c56beaed-9579-456a-ab18-da020e8e91fe	b5fca53b-64c4-406c-a1aa-87213a88a62a	0	I recommend buying this one.	2021-11-18 19:37:16.926	2021-11-18 19:37:16.927
f4a462d6-ae2b-412b-ad03-2e8dc86a07bf	21a19b27-55dc-4a0b-8194-650a5ab41821	1cf8ca9c-076d-4b4f-bfab-5b1c656295a0	4	Didnt thought second time. Got one for my dog as well	2021-11-18 19:37:16.932	2021-11-18 19:37:16.933
e467cd9a-41d2-4a08-a758-1cf1ab5761ed	ed9b559a-51a0-4155-add7-49810f8a8334	7783b3be-7e84-464d-8a19-baf0e3ed71f5	3	I recommend buying this one.	2021-11-18 19:37:16.937	2021-11-18 19:37:16.937
91f78831-2ed1-431b-8ca3-99a8ac69639b	30da76b6-21e2-4fe5-bdee-6cefd99e2a9f	1cf8ca9c-076d-4b4f-bfab-5b1c656295a0	0	Amazing fit.	2021-11-18 19:37:16.94	2021-11-18 19:37:16.941
64635b0a-37ba-42bb-b76a-8f18120a34a9	6d9648a8-761c-44c3-83d2-d8bc16399dbb	b5fca53b-64c4-406c-a1aa-87213a88a62a	4	Didnt thought second time. Got one for my dog as well	2021-11-18 19:37:16.945	2021-11-18 19:37:16.945
1473a2c2-9a36-4b89-8c27-33359d067dce	16e7fab0-6850-4f62-89fd-c0f8b365a22b	1cf8ca9c-076d-4b4f-bfab-5b1c656295a0	1	I love this product.	2021-11-18 19:37:16.95	2021-11-18 19:37:16.951
0fcb3d31-df6c-4f0f-84b0-cf57e1b03617	7429d420-0248-4a3f-9bcc-485550797e5a	1cf8ca9c-076d-4b4f-bfab-5b1c656295a0	2	This T shirt looks good on me	2021-11-18 19:37:16.954	2021-11-18 19:37:16.955
ea917e81-bfea-49a9-b7c4-f6acaf5f4496	bbf8d5a0-0dd7-4df2-a1e3-69ec4230b1bc	2ce1b1b0-f4a1-4095-beca-22411f118f1a	1	Didnt thought second time. Got one for my dog as well	2021-11-18 19:37:16.959	2021-11-18 19:37:16.96
5767fa52-e48e-4cd2-9e80-b21bc04c68dd	b63abe14-c2ba-48e2-8946-4441ed626f35	b5fca53b-64c4-406c-a1aa-87213a88a62a	0	I love this product.	2021-11-18 19:37:16.964	2021-11-18 19:37:16.964
bbe0b419-0d89-41d1-8756-304da133252d	3b2ab47b-09c6-4745-ba19-7522a58d09b7	7783b3be-7e84-464d-8a19-baf0e3ed71f5	1	This T shirt looks good on me	2021-11-18 19:37:16.967	2021-11-18 19:37:16.968
8d95fe73-3959-4581-a976-ef344ef92249	34e42046-d4c7-4f14-b4cc-052653e21251	b5fca53b-64c4-406c-a1aa-87213a88a62a	0	Amazing fit.	2021-11-18 19:37:16.97	2021-11-18 19:37:16.971
7d6aaa06-113d-4189-9a71-d3d35c47df21	37d124f6-415b-4c57-b71a-0d5285d0c3e6	2ce1b1b0-f4a1-4095-beca-22411f118f1a	0	This T shirt looks good on me	2021-11-18 19:37:16.974	2021-11-18 19:37:16.974
340d0f89-7e34-467f-a15a-6be4de0f6d78	9f06a6f8-2f36-4158-a390-2c379ad0c441	2ce1b1b0-f4a1-4095-beca-22411f118f1a	3	This is a really nice product.	2021-11-18 19:37:16.979	2021-11-18 19:37:16.98
ce73b9df-341b-4e3d-9f31-9b79df8ec3ad	e3aeece5-64ab-4553-ba74-3ab5cb77a635	2ce1b1b0-f4a1-4095-beca-22411f118f1a	5	Didnt thought second time. Got one for my dog as well	2021-11-18 19:37:16.982	2021-11-18 19:37:16.983
b89e511e-9236-47d1-97ba-fc638eeab484	88d1226a-c2ba-44cc-9f5f-7023dffc776a	7783b3be-7e84-464d-8a19-baf0e3ed71f5	5	This T shirt looks good on me	2021-11-18 19:37:16.986	2021-11-18 19:37:16.986
13fa088e-c514-4e8b-a57d-58f47f56a5f2	618bf694-a7eb-41da-a6bd-0821ecaca617	2ce1b1b0-f4a1-4095-beca-22411f118f1a	1	Amazing fit.	2021-11-18 19:37:16.989	2021-11-18 19:37:16.99
1d9a18a0-39de-40ce-b17e-88603945b372	60cdc665-ca84-4b63-a9fe-bcf62fea188a	b5fca53b-64c4-406c-a1aa-87213a88a62a	0	Amazing fit.	2021-11-18 19:37:16.997	2021-11-18 19:37:16.998
99e0850e-5650-4c60-80ab-a1e24cb35702	4e75aedc-36b3-4b67-9af8-ce9d75be970e	b5fca53b-64c4-406c-a1aa-87213a88a62a	3	Didnt thought second time. Got one for my dog as well	2021-11-18 19:37:17	2021-11-18 19:37:17.001
cf2169a2-ec25-4251-9187-46ea80d27aba	cbb76ccd-1d49-420b-8814-15c47c5e02df	7783b3be-7e84-464d-8a19-baf0e3ed71f5	2	This T shirt looks good on me	2021-11-18 19:37:17.004	2021-11-18 19:37:17.005
8b0b5cfd-1bc9-453c-af70-b639815ec5b2	71151ff0-413d-48fd-86cd-7a3306d805fe	1cf8ca9c-076d-4b4f-bfab-5b1c656295a0	5	Didnt thought second time. Got one for my dog as well	2021-11-18 19:37:17.008	2021-11-18 19:37:17.008
3b12b809-50eb-49de-af3d-0ff182a49bdd	9d5a1060-90dd-4ed1-b8ac-ef3aded2a34a	b5fca53b-64c4-406c-a1aa-87213a88a62a	0	I recommend buying this one.	2021-11-18 19:37:17.012	2021-11-18 19:37:17.013
d8f58b01-2098-4d3b-aa37-7c7b8c335d30	55301509-ab4d-405a-a25b-2efbe758d4eb	1cf8ca9c-076d-4b4f-bfab-5b1c656295a0	0	Didnt thought second time. Got one for my dog as well	2021-11-18 19:37:17.016	2021-11-18 19:37:17.017
5c4f4aca-3d0c-48a7-82b4-5bdc75764525	abef979d-febc-4334-8794-de1126b606c1	7783b3be-7e84-464d-8a19-baf0e3ed71f5	2	This is a really nice product.	2021-11-18 19:37:17.019	2021-11-18 19:37:17.02
575591aa-0331-406f-afbc-c47f4038d6b6	93ca8699-8389-4d08-bf4f-ebb448ee402c	1cf8ca9c-076d-4b4f-bfab-5b1c656295a0	1	I love this product.	2021-11-18 19:37:17.022	2021-11-18 19:37:17.023
14eb03fb-d163-430c-ae5f-6c1cc9d5d1d9	7d7f537e-7dc7-40b7-bee1-8e709b8ebc3a	2ce1b1b0-f4a1-4095-beca-22411f118f1a	0	This T shirt looks good on me	2021-11-18 19:37:17.026	2021-11-18 19:37:17.027
93e378ff-449f-4961-93fc-272d6e1f03e4	10bcf896-af98-4472-b6d4-cc77d52bf59b	b5fca53b-64c4-406c-a1aa-87213a88a62a	4	I really love this phone.	2021-11-19 10:06:10.528	2021-11-19 10:06:10.529
8b6bfe46-5527-438f-a11e-7f4bd34972cb	10bcf896-af98-4472-b6d4-cc77d52bf59b	7783b3be-7e84-464d-8a19-baf0e3ed71f5	3	I really love this phone.	2021-11-19 10:07:34.798	2021-11-19 10:07:34.799
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Session" (id, sid, data, "expiresAt", "userId") FROM stdin;
KSSH-B3V4DQP_foxoHVPK6o_GhHi8E56	KSSH-B3V4DQP_foxoHVPK6o_GhHi8E56	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-25T19:54:22.900Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-25 19:54:22.9	\N
vHU457VDP69wolPJbZt0k01Su2viouz-	vHU457VDP69wolPJbZt0k01Su2viouz-	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-25T19:56:47.726Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-25 19:56:47.726	\N
Igq1x7v9poopGIO-1pREDGG-44IH3I3A	Igq1x7v9poopGIO-1pREDGG-44IH3I3A	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-26T14:37:55.326Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"7783b3be-7e84-464d-8a19-baf0e3ed71f5","email":"root_user4@gmail.com","name":"root_user3","role":"USER","created_at":"2021-11-12T15:45:16.301Z","update_at":"2021-11-12T15:45:16.301Z"}}	2021-11-26 14:37:55.326	\N
9YJhCbCRSjd01Yi0Qwk2ldtjfa52VqMV	9YJhCbCRSjd01Yi0Qwk2ldtjfa52VqMV	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-22T08:59:37.235Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-22 08:59:37.235	\N
xk5Xla9G9GDE3RTOitdYMnkSEDOZeMhn	xk5Xla9G9GDE3RTOitdYMnkSEDOZeMhn	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-22T09:05:03.599Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-22 09:05:03.599	\N
rmNX7iZoVuxJVtPXtgphhVYdaVqdmCqL	rmNX7iZoVuxJVtPXtgphhVYdaVqdmCqL	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-22T09:05:20.663Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-22 09:05:20.663	\N
7NApOLA2jUETkUMcuUtZyyQh4giSrssR	7NApOLA2jUETkUMcuUtZyyQh4giSrssR	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-22T09:16:18.269Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-22 09:16:18.269	\N
RLe2LcK623O6ajoKRMFxIqMPCX04UlBx	RLe2LcK623O6ajoKRMFxIqMPCX04UlBx	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-22T09:16:43.416Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-22 09:16:43.416	\N
82p2niaEbvldHj3BSSjuCDhFbbg4IjlN	82p2niaEbvldHj3BSSjuCDhFbbg4IjlN	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-22T09:17:00.473Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-22 09:17:00.473	\N
j4cceP9O5QBuD8dysjRf19DSj5QiRZza	j4cceP9O5QBuD8dysjRf19DSj5QiRZza	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-22T09:18:07.909Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-22 09:18:07.909	\N
5f5bKQy4ZgLhUFHlXfIn-wu0-3k3CRCA	5f5bKQy4ZgLhUFHlXfIn-wu0-3k3CRCA	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-22T09:19:12.033Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-22 09:19:12.033	\N
amzBV-m3dTmjjDgKnQsvLAqkoHrDSswX	amzBV-m3dTmjjDgKnQsvLAqkoHrDSswX	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-22T09:19:31.957Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-22 09:19:31.957	\N
Z28rCf_ht38ci21_BoRr-K6nEUZVGzrX	Z28rCf_ht38ci21_BoRr-K6nEUZVGzrX	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-22T09:20:19.329Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-22 09:20:19.329	\N
TI_s1bUXvlq-h9sP3IGpb5YQkkVrFNlI	TI_s1bUXvlq-h9sP3IGpb5YQkkVrFNlI	{"cookie":{"originalMaxAge":604800000,"expires":"2021-11-22T16:02:01.805Z","secure":false,"httpOnly":true,"path":"/"},"user":{"id":"b5fca53b-64c4-406c-a1aa-87213a88a62a","email":"root_user2@gmail.com","name":"root_user1","role":"USER","created_at":"2021-11-12T15:45:16.133Z","update_at":"2021-11-12T15:45:16.133Z"}}	2021-11-22 16:02:01.805	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, "hashedPassword", created_at, update_at, role) FROM stdin;
b5fca53b-64c4-406c-a1aa-87213a88a62a	root_user1	root_user2@gmail.com	$2a$10$LFgZ6HPWgWq4p5mojpqrSOciwduD5A/uV8Ct2jtbxHANZdAAkNeDy	2021-11-12 15:45:16.133	2021-11-12 15:45:16.133	USER
1cf8ca9c-076d-4b4f-bfab-5b1c656295a0	root_user2	root_user3@gmail.com	$2a$10$tNAqOHARnVN1XU7kOB8bsOyKWYGY4R4dj9xsAF9fPyF2Kza1Xomn2	2021-11-12 15:45:16.216	2021-11-12 15:45:16.217	USER
7783b3be-7e84-464d-8a19-baf0e3ed71f5	root_user3	root_user4@gmail.com	$2a$10$Xfb8lc0ya6JF1D6R20VfhOwg/btGGEqsxcgfwXzxBuXnAkhiP7FTW	2021-11-12 15:45:16.301	2021-11-12 15:45:16.301	USER
2ce1b1b0-f4a1-4095-beca-22411f118f1a	root_user4	root_user5@gmail.com	$2a$10$tiTEkmVEnULWTlBHWI7s/ujDBJUpoi.EYEY3FP3e.6RzzLtnX69Ia	2021-11-12 15:45:16.391	2021-11-12 15:45:16.391	USER
\.


--
-- Data for Name: Wishlist; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Wishlist" (id, product_id, wishlist_name, user_id) FROM stdin;
67f4697b-aaf8-4dba-9978-8de1dcd9ea1a	11faf870-2b56-4659-bb70-db8138fbe43f	default	1cf8ca9c-076d-4b4f-bfab-5b1c656295a0
24623055-e53d-43a5-84ad-9a9fd5b91675	60cdc665-ca84-4b63-a9fe-bcf62fea188a	b5fca53b-64c4-406c-a1aa-87213a88a62a-wishlist	b5fca53b-64c4-406c-a1aa-87213a88a62a
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
fac99ac8-54e1-4bfc-b69c-ac69dab382ac	13381c475488e28371652a31de0c6f0dcac3c0e9348024ec1c74dcfa1f17bb8b	2021-11-12 21:14:26.901982+05:30	20210202045146_init	\N	\N	2021-11-12 21:14:26.89392+05:30	1
8bc5e341-2d1b-48bb-b7b1-bef7fd7ed121	1d339edb337afab7fd3dff25e23c58e7f93d8bfbb0848e051e2811077d47844a	2021-11-12 21:14:27.095377+05:30	20211111085731_revert_implicit_relation	\N	\N	2021-11-12 21:14:27.068327+05:30	1
ec6874b4-f01e-4b22-a0a7-00332c9f3a75	b13caca7af79fba98421adfc58bd246f03421b4799628dc9180471e5bddf3294	2021-11-12 21:14:26.922411+05:30	20211109180140_add_users	\N	\N	2021-11-12 21:14:26.902742+05:30	1
9835434a-15bf-4c75-b654-45cb074d948e	470dbf69bfa682aac9819bb57a762a23d091628f0e90da8c5332ef35cd95fc3d	2021-11-12 21:14:26.955207+05:30	20211109191729_add_products_and_cart	\N	\N	2021-11-12 21:14:26.923101+05:30	1
537e613f-2f97-4bc5-91ef-ab1cfb1267c7	a676053c394928022fb4c5dc5139ebdfeffaeea0b983c9fbd65d0e42a896d6e4	2021-11-12 21:14:27.314339+05:30	20211112145836_unique_wishlist	\N	\N	2021-11-12 21:14:27.310621+05:30	1
e195c918-1cb3-4551-bbec-9b3f38c1f620	2683ffc7b22e0ae068e6c5f91a891301182cabd40dd4704800c7d60e8380164a	2021-11-12 21:14:26.960308+05:30	20211109192510_role	\N	\N	2021-11-12 21:14:26.956059+05:30	1
6406a854-2cab-4e46-9e7c-6f8d44c851d4	b2f9b63a0d2e1955c6a4056f951cc7263b691f996ea9b47a0ef2ffa6b87ad607	2021-11-12 21:14:27.19821+05:30	20211111111326_new	\N	\N	2021-11-12 21:14:27.096245+05:30	1
30712d33-b455-46d3-b4c0-002cb2216a41	564fdd0aaa6011112db8985a7ac81190bee2adac08f9b855b2718b37ad777d37	2021-11-12 21:14:26.965551+05:30	20211109194217_added_stocks	\N	\N	2021-11-12 21:14:26.961737+05:30	1
f4c7b491-38ca-454a-b867-ae600837e69e	c0c9694132cc1a080c4fdc9acdba533fdce87b2caa39136969d76a5df38a3530	2021-11-12 21:14:26.968235+05:30	20211109194317_description	\N	\N	2021-11-12 21:14:26.966418+05:30	1
97ce7ca7-5e32-43e4-90b4-e1c94cae8cd5	c175ef1d019a32bcaba09b44027fcab12eeec3d8b905a5108573d2521c9826bb	2021-11-12 21:14:26.971192+05:30	20211110090211_added_carttype	\N	\N	2021-11-12 21:14:26.968869+05:30	1
83877a83-369a-466c-882b-e2917e8b973d	763596aa515a776aebd81334130df2d322b711413400df9562af6c0eaf349a7c	2021-11-12 21:14:27.289895+05:30	20211111111807_int_to_uuid	\N	\N	2021-11-12 21:14:27.199055+05:30	1
23109394-c221-4b39-b6d9-ec30eaf7066f	6f696b18a3012462ec10d8e2b00ac0f7a793e46836e1380aa25db83748725bef	2021-11-12 21:14:27.020328+05:30	20211110111114_new	\N	\N	2021-11-12 21:14:26.971976+05:30	1
54e85f60-2af8-4809-b84c-19ad21f2bade	b6a77a371e7ee69bd3333a8b016d459bcb79f7f29c05f8762cfb307a9b7349e8	2021-11-12 21:14:27.025049+05:30	20211110123453_category_unique	\N	\N	2021-11-12 21:14:27.021261+05:30	1
f5dea7c3-3373-4f74-8abf-5853c182e852	0932a84b7c024b2fbb83f775d23dbae0544537bd3e210cb4cb4b5c7ae9782c3c	2021-11-16 18:19:05.441667+05:30	20211116124905_brand_not_optional	\N	\N	2021-11-16 18:19:05.435842+05:30	1
0bb1812f-5281-4e83-995d-cb8a0596aeb9	1f3b4a719327f480fa5a289306f4ed70a5532d0afb5cf45e20b7eb50db4e013e	2021-11-12 21:14:27.02987+05:30	20211110124647_product_id_in_cart_produt_is_unique_now	\N	\N	2021-11-12 21:14:27.025802+05:30	1
9ef8a641-b36d-4ea5-9ac8-edf1d1b061b0	00b3cf0333602e9d3c0d6565dafd11536cddaef2f3b338ef51d45d9232cf9834	2021-11-12 21:14:27.293068+05:30	20211111115348_add_brand	\N	\N	2021-11-12 21:14:27.290717+05:30	1
015881a9-c2c2-490e-9424-8e50c73ae919	8aff22628614874270e6b533db28e6448e0c09480aef0cab4e0ced131e417c67	2021-11-12 21:14:27.035052+05:30	20211111083349_make_cart_id_unique_for_cart_product	\N	\N	2021-11-12 21:14:27.030467+05:30	1
e0f7910c-6771-46d5-b7e1-582deead9bce	a0409168bad93e4978c35c682cafa326f0bb7228c7b6da5a2221a210c81b637d	2021-11-12 21:14:27.037756+05:30	20211111083548_remove_unique	\N	\N	2021-11-12 21:14:27.035857+05:30	1
60196ac2-1c53-4085-b236-9c64cc76ae6f	a5ebbe5ccad3aa06f7c1e043cc54a143dfefb3b1237d2e3a722ae01b8a2733cc	2021-11-12 22:05:09.06175+05:30	20211112163508_wishlist_product_not_unique	\N	\N	2021-11-12 22:05:09.025518+05:30	1
22496c1f-6e2b-4223-8bfc-73be2c024732	df159ed11503d964b2d5444fe4508f27fc9d363eb52ba050d0ae36e17dd42d8d	2021-11-12 21:14:27.067539+05:30	20211111084347_removed_cart_product	\N	\N	2021-11-12 21:14:27.038309+05:30	1
1c9342c3-c1f2-49ad-b9c7-07317ad99d88	43b6f7459f333fd5f554fdce93554cb5c0ffe4a1c949676846224204ba2dcf29	2021-11-12 21:14:27.295681+05:30	20211111145117_add_product_slug	\N	\N	2021-11-12 21:14:27.293729+05:30	1
884f44dd-6796-46cc-a6ea-ff114575ba5c	a18963967bbef45c425880138a1c1c28a89084e3add111e8652cc310af1a6fe8	2021-11-12 21:14:27.297928+05:30	20211111163921_remove_qty_compulsory	\N	\N	2021-11-12 21:14:27.296496+05:30	1
c4b00297-85c0-4a30-a3b8-68c7c8be351d	73db82a145ba6937498d7442492353a947a8a909a89facb0c7d4511edf1b59f0	2021-11-12 21:14:27.301115+05:30	20211111172547_index_on_cart	\N	\N	2021-11-12 21:14:27.298442+05:30	1
3f9f72a8-d52f-4a2d-b747-9104f163c908	c4c90a86cd66c5b1b0bcc55bc1cb984db2b1c0f12af0b4340210b7cde9c0f790	2021-11-13 15:38:25.326151+05:30	20211113100825_make_review_table	\N	\N	2021-11-13 15:38:25.265282+05:30	1
f3592414-6639-48a7-a390-1b4f9ed1d839	fda0cc1a36fafd3438eea4b5482b98a6df195414258f5a5d540f3c35fa8e26ac	2021-11-12 21:14:27.305408+05:30	20211111172748_userid_unique_for_cart	\N	\N	2021-11-12 21:14:27.301645+05:30	1
c483704e-0970-456c-952d-7ca046408db7	abd7e3509270eea3d6078aa8fd874027c7f73113751ae8bd71c6ff075b967e0b	2021-11-12 21:14:27.310036+05:30	20211111173216_compound_unique	\N	\N	2021-11-12 21:14:27.305972+05:30	1
8b191bbb-0dc1-454f-b702-8e8f7c89db67	20d2c48dc4c0045fa2f42dcc04783de7667a789030c67da76dd8447416faa27f	2021-11-13 16:18:06.424481+05:30	20211113104806_compound_unique_for_product_and_review_by_user	\N	\N	2021-11-13 16:18:06.417524+05:30	1
30049f28-c787-4b0a-aa8a-a2a42af19547	d0fdb12742e067d42b9822ed0bfb4792aa5cb5a05fb7183636a56c44bb36895a	2021-11-19 15:21:36.426298+05:30	20211119095136_add_ratings_on_products	\N	\N	2021-11-19 15:21:36.413803+05:30	1
f9af857e-cdde-4ce2-bd38-31a1732e5b74	44a4caf3c59725c09722b7e053778e41191771bdfc1a1e9d7f8bcac3efb5d384	2021-11-16 18:04:57.157314+05:30	20211116123457_added_optional_product_metadata	\N	\N	2021-11-16 18:04:57.147124+05:30	1
\.


--
-- Name: Cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cart_id_seq"', 5, true);


--
-- Name: CategoryGroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CategoryGroup_id_seq"', 1, true);


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 4, true);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: CategoryGroup CategoryGroup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryGroup"
    ADD CONSTRAINT "CategoryGroup_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Wishlist Wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wishlist"
    ADD CONSTRAINT "Wishlist_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Cart_user_id_product_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Cart_user_id_product_id_key" ON public."Cart" USING btree (user_id, product_id);


--
-- Name: Category_category_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_category_name_key" ON public."Category" USING btree (category_name);


--
-- Name: Review_product_id_user_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Review_product_id_user_id_key" ON public."Review" USING btree (product_id, user_id);


--
-- Name: Session_sid_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Session_sid_key" ON public."Session" USING btree (sid);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Wishlist_user_id_product_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Wishlist_user_id_product_id_key" ON public."Wishlist" USING btree (user_id, product_id);


--
-- Name: Cart Cart_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Cart Cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CategoryGroup CategoryGroup_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryGroup"
    ADD CONSTRAINT "CategoryGroup_category_id_fkey" FOREIGN KEY (category_id) REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CategoryGroup CategoryGroup_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryGroup"
    ADD CONSTRAINT "CategoryGroup_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Wishlist Wishlist_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wishlist"
    ADD CONSTRAINT "Wishlist_product_id_fkey" FOREIGN KEY (product_id) REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Wishlist Wishlist_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Wishlist"
    ADD CONSTRAINT "Wishlist_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

