-- Solo agrega la columna faltante
ALTER TABLE bookings ADD COLUMN include_printer BOOLEAN DEFAULT FALSE;

-- O si quieres asegurarte de que todas las columnas existan, puedes usar este script:
/*
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS client_name TEXT,
ADD COLUMN IF NOT EXISTS client_email TEXT,
ADD COLUMN IF NOT EXISTS client_phone TEXT,
ADD COLUMN IF NOT EXISTS client_type TEXT,
ADD COLUMN IF NOT EXISTS client_document TEXT,
ADD COLUMN IF NOT EXISTS client_tax_id TEXT,
ADD COLUMN IF NOT EXISTS client_address TEXT,
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS quantity_z6 INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS quantity_z60 INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS include_cart BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS include_printer BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS total_price NUMERIC,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending_delivery';
*/
