-- Diagnostic script to check the current database state

-- 1. Check if blogs table exists and its structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'blogs' 
ORDER BY ordinal_position;

-- 2. Check categories table
SELECT id, name, slug FROM categories ORDER BY name;

-- 3. Check all blogs with their current structure
SELECT 
  id, 
  title, 
  slug,
  COALESCE(category_id, 'NULL') as category_id,
  COALESCE(category, 'NULL') as category,
  COALESCE(status, 'NULL') as status,
  created_at
FROM blogs 
ORDER BY created_at DESC;

-- 4. Check if there are any HTML posts
SELECT 
  b.id,
  b.title,
  b.category_id,
  b.category,
  c.name as category_name,
  c.slug as category_slug
FROM blogs b
LEFT JOIN categories c ON b.category_id = c.id
WHERE b.category = 'HTML' 
   OR b.category = 'html'
   OR c.slug = 'html'
   OR c.name = 'HTML';

-- 5. Test the join query that should work
SELECT 
  b.*,
  c.slug as category_slug,
  c.name as category_name
FROM blogs b
INNER JOIN categories c ON b.category_id = c.id
WHERE c.slug = 'html';

-- 6. Test alternative join by category name
SELECT 
  b.*,
  c.slug as category_slug,
  c.name as category_name
FROM blogs b
INNER JOIN categories c ON LOWER(b.category) = LOWER(c.name)
WHERE c.slug = 'html';
