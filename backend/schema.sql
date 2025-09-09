-- Customers Table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    -- Primary / default address info
    address TEXT,
    city TEXT,
    state TEXT,
    pin TEXT CHECK (char_length(pin) = 6),
    account_type TEXT CHECK (account_type IN ('savings','current','business','other')),
    address_count INT NOT NULL DEFAULT 0, -- count of addresses in "addresses" table
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Addresses Table (for extra/multiple addresses)
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    address_line TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pin TEXT NOT NULL CHECK (char_length(pin) = 6),
    account_type TEXT NOT NULL CHECK (account_type IN ('savings','current','business','other')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for fast lookup
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_addresses_customer_id ON addresses(customer_id);
CREATE INDEX idx_addresses_city ON addresses(city);



















-- -- CREATE TABLE IF NOT EXISTS customers (
-- --   id INT8 PRIMARY KEY DEFAULT unique_rowid(),
-- --   first_name VARCHAR(50) NOT NULL,
-- --   last_name VARCHAR(50) NOT NULL,
-- --   phone VARCHAR(15) UNIQUE NOT NULL,
-- --   email STRING UNIQUE,
-- --   address STRING,
-- --   city VARCHAR(50),
-- --   state VARCHAR(50),
-- --   pin VARCHAR(10),
-- --   account_type STRING
-- -- );


-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CREATE TABLE customers (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     first_name VARCHAR(100) NOT NULL,
--     last_name VARCHAR(100) NOT NULL,
--     phone VARCHAR(20) UNIQUE NOT NULL,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     address TEXT,
--     city VARCHAR(100),
--     state VARCHAR(100),
--     pin VARCHAR(20),
--     account_type VARCHAR(50),
--     address_count BIGINT,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
--     updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- -- Helpful indexes
-- -- CREATE INDEX idx_customers_email ON customers(email);
-- -- CREATE INDEX idx_customers_phone ON customers(phone);
-- -- Addresses table
-- CREATE TABLE addresses (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
--     address_line TEXT NOT NULL,
--     city VARCHAR(100) NOT NULL,
--     state VARCHAR(100) NOT NULL,
--     pin VARCHAR(20) NOT NULL,
--     account_type VARCHAR(50) NOT NULL,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
--     updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- -- Indexes
-- CREATE INDEX idx_customers_email ON customers(email);
-- CREATE INDEX idx_customers_phone ON customers(phone);
-- CREATE INDEX idx_addresses_customer_id ON addresses(customer_id);
-- CREATE INDEX idx_addresses_city ON addresses(city);



