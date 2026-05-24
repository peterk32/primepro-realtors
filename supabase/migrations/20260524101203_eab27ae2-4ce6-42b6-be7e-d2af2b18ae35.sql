
CREATE TYPE property_type AS ENUM ('rent', 'sale');

CREATE TABLE public.properties (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type property_type NOT NULL,
  location TEXT NOT NULL,
  price BIGINT NOT NULL,
  bedrooms INTEGER NOT NULL DEFAULT 0,
  bathrooms INTEGER NOT NULL DEFAULT 0,
  main_image TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Properties are publicly viewable"
  ON public.properties FOR SELECT
  USING (true);

CREATE INDEX idx_properties_type ON public.properties(type);
CREATE INDEX idx_properties_featured ON public.properties(is_featured);
