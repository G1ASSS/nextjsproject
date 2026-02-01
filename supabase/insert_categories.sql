-- Insert Categories with exact slugs
INSERT INTO categories (name, slug) VALUES 
('HTML', 'html'),
('Security', 'security'),
('Next.js', 'next.js')
ON CONFLICT (slug) DO NOTHING;

-- Verify inserted categories
SELECT id, name, slug FROM categories ORDER BY name;
