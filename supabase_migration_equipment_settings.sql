-- Create settings table for equipment inventory
CREATE TABLE IF NOT EXISTS equipment_settings (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial stock values
INSERT INTO equipment_settings (key, value)
VALUES ('inventory', '{"z6": 2, "z60": 2}')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS (Optional, for security)
ALTER TABLE equipment_settings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read
CREATE POLICY "Allow public read access"
ON equipment_settings FOR SELECT
TO anon
USING (true);

-- Create policy to allow anyone to update (Use with caution in production)
-- Since the admin panel is using the anon key, we need this for the upsert to work
CREATE POLICY "Allow public update access"
ON equipment_settings FOR ALL
TO anon
USING (true)
WITH CHECK (true);
