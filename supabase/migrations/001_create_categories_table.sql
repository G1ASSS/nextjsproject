-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- Create policy for authenticated users to insert/update
CREATE POLICY "Authenticated users can manage categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert default categories
INSERT INTO categories (name, slug) VALUES
  ('HTML', 'html'),
  ('CSS', 'css'),
  ('JavaScript', 'javascript'),
  ('React', 'react'),
  ('Next.js', 'nextjs'),
  ('TypeScript', 'typescript'),
  ('Security', 'security'),
  ('DevOps', 'devops'),
  ('Database', 'database'),
  ('API', 'api')
ON CONFLICT (slug) DO NOTHING;
