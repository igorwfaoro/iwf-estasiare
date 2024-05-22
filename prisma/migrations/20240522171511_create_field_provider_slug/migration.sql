-- Add the 'slug' column as optional
ALTER TABLE "Provider" ADD COLUMN "slug" VARCHAR(100);

-- Create a function to normalize the slug
CREATE OR REPLACE FUNCTION normalize_slug(text) RETURNS text AS $$
DECLARE
    result text;
BEGIN
    -- Convert to lowercase
    result := lower($1);
    -- Remove non-alphanumeric characters except spaces and hyphens
    result := regexp_replace(result, '[^a-z0-9\s-]', '', 'g');
    -- Replace spaces with hyphens
    result := regexp_replace(result, '\s+', '-', 'g');
    -- Remove hyphens at the beginning and end
    result := regexp_replace(result, '(^-+|-+$)', '', 'g');
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Update slug values for existing providers
UPDATE "Provider"
SET "slug" = normalize_slug("name");

-- Set the 'slug' column as NOT NULL
ALTER TABLE "Provider" ALTER COLUMN "slug" SET NOT NULL;

-- Create a unique index for the 'slug' column
CREATE UNIQUE INDEX "Provider_slug_key" ON "Provider"("slug");
