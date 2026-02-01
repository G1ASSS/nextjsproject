-- Get category UUIDs to use in the migration
SELECT 
  id, 
  name, 
  slug,
  'CATEGORY_UUID_HERE' as placeholder
FROM categories 
WHERE slug IN ('security', 'html') 
ORDER BY name;

-- After running this, replace the UUIDs in the migration:
-- SECURITY_UUID_HERE with the actual Security UUID
-- HTML_UUID_HERE with the actual HTML UUID
