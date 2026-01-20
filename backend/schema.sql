-- Dallas MMA Boxing Database Schema
-- PostgreSQL Database Schema

-- Drop existing tables if they exist (for development)
DROP TABLE IF EXISTS release_forms CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS classes CASCADE;

-- Classes table
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  schedule VARCHAR(255),
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_id VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Release Forms table
CREATE TABLE release_forms (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  signed_pdf_url TEXT,
  signed_date TIMESTAMP,
  is_signed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_payments_client_id ON payments(client_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_release_forms_client_id ON release_forms(client_id);
CREATE INDEX idx_clients_email ON clients(email);

-- Insert sample data for testing
INSERT INTO classes (name, description, schedule, price) VALUES
  ('Beginner Boxing', 'Introduction to boxing fundamentals and techniques', 'Mon, Wed, Fri - 6:00 PM', 120.00),
  ('Advanced MMA', 'Mixed martial arts for experienced fighters', 'Tue, Thu - 7:00 PM', 150.00),
  ('Youth Boxing', 'Boxing classes for ages 8-16', 'Sat - 10:00 AM', 100.00);

INSERT INTO clients (name, email, phone, address) VALUES
  ('John Doe', 'john.doe@example.com', '(214) 555-0100', '123 Main St, Dallas, TX 75201'),
  ('Jane Smith', 'jane.smith@example.com', '(214) 555-0200', '456 Oak Ave, Dallas, TX 75202');

INSERT INTO payments (client_id, amount, status, stripe_id, description) VALUES
  (1, 120.00, 'completed', 'ch_mock_123456', 'Monthly membership - January 2026'),
  (2, 150.00, 'pending', 'ch_mock_789012', 'Monthly membership - January 2026');

INSERT INTO release_forms (client_id, signed_pdf_url, signed_date, is_signed) VALUES
  (1, 'https://storage.example.com/forms/client-1-release.pdf', '2026-01-15', true),
  (2, NULL, NULL, false);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to automatically update updated_at column
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_release_forms_updated_at BEFORE UPDATE ON release_forms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
