-- Fix blogs table structure with all required columns

-- First, let's see what we have and back it up if needed
CREATE TABLE blogs_backup AS SELECT * FROM blogs;

-- Drop the existing blogs table
DROP TABLE IF EXISTS blogs CASCADE;

-- Recreate the blogs table with the exact structure specified
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  author_name TEXT DEFAULT 'G1ASS',
  description TEXT,
  content TEXT,
  image_url TEXT,
  video_url TEXT,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_blogs_category_id ON blogs(category_id);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_status ON blogs(status);
CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access for published posts
CREATE POLICY "Public published blogs are viewable by everyone" ON blogs
  FOR SELECT USING (status = 'published');

-- Create policy for authenticated users to insert/update/delete
CREATE POLICY "Authenticated users can manage blogs" ON blogs
  FOR ALL USING (auth.role() = 'authenticated');

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blogs_updated_at 
  BEFORE UPDATE ON blogs 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Now insert sample data with proper category relationships
-- First, get the category UUIDs
-- Run this first to see your categories:
-- SELECT id, name, slug FROM categories ORDER BY name;

-- Sample posts for Security category (replace with actual UUID from your categories table)
INSERT INTO blogs (title, slug, author_name, description, content, image_url, video_url, category_id, status) VALUES
(
  'Introduction to Web Security',
  'introduction-to-web-security',
  'G1ASS',
  'Learn the fundamentals of web security including common vulnerabilities, best practices, and essential tools for protecting modern web applications.',
  '# Introduction to Web Security\n\nWeb security is a critical aspect of modern web development. In this comprehensive guide, we''ll explore the fundamental concepts of web security, including common vulnerabilities, best practices, and tools you can use to protect your applications.\n\n## Key Topics Covered:\n- OWASP Top 10 vulnerabilities\n- Authentication and authorization\n- Secure coding practices\n- Common attack vectors\n- Security testing methodologies\n\nThis article provides a solid foundation for developers looking to enhance their security knowledge and build more secure applications.',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&crop=center',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'SECURITY_UUID_HERE', -- Replace this with actual Security category UUID
  'published'
),
(
  'Common Security Vulnerabilities',
  'common-security-vulnerabilities',
  'G1ASS',
  'Deep dive into the most common security vulnerabilities including SQL injection, XSS, CSRF, and how to prevent them in your applications.',
  '# Common Security Vulnerabilities\n\nUnderstanding common security vulnerabilities is essential for every developer. This article covers OWASP Top 10 vulnerabilities, including SQL injection, XSS, CSRF, and how to prevent them in your applications.\n\n## Vulnerabilities Covered:\n- SQL Injection\n- Cross-Site Scripting (XSS)\n- Cross-Site Request Forgery (CSRF)\n- Broken Authentication\n- Sensitive Data Exposure\n\nLearn practical prevention strategies and secure coding practices to protect your applications from these common threats.',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop&crop=center',
  NULL,
  'SECURITY_UUID_HERE', -- Replace this with actual Security category UUID
  'published'
);

-- Sample post for HTML category (replace with actual UUID from your categories table)
INSERT INTO blogs (title, slug, author_name, description, content, image_url, video_url, category_id, status) VALUES
(
  'Modern HTML5 Features',
  'modern-html5-features',
  'G1ASS',
  'Explore the latest HTML5 features including semantic elements, multimedia support, and powerful APIs that enhance web development.',
  '# Modern HTML5 Features\n\nHTML5 has revolutionized web development with semantic elements, multimedia support, and powerful APIs. Learn about the latest HTML5 features that can enhance your web applications and improve user experience.\n\n## Features Covered:\n- Semantic HTML elements\n- Audio and video support\n- Canvas and SVG graphics\n- Web Storage APIs\n- Geolocation API\n- Web Workers\n\nDiscover how these modern features can help you build more interactive, accessible, and responsive web applications.\n\n![HTML5 Logo](https://images.unsplash.com/photo-1627398242455-45a1465c2479?w=600&h=300&fit=crop&crop=center)',
  'https://images.unsplash.com/photo-1627398242455-45a1465c2479?w=800&h=400&fit=crop&crop=center',
  'https://www.youtube.com/embed/3JZ_D3ELwOQ',
  'HTML_UUID_HERE', -- Replace this with actual HTML category UUID
  'published'
);

-- Verify the inserted posts
SELECT 
  b.id, 
  b.title, 
  b.slug,
  b.category_id,
  c.name as category_name,
  c.slug as category_slug,
  b.status,
  b.created_at
FROM blogs b 
JOIN categories c ON b.category_id = c.id 
WHERE b.status = 'published'
ORDER BY c.name, b.title;
