# Category Filtering System Setup

This document explains how to set up the category filtering system for your Learning & Sharing page.

## 🗄️ Database Setup

### 1. Create Categories Table

Run the following SQL in your Supabase SQL Editor:

```sql
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
```

### 2. Update Blogs Table

Add category relationship to your existing blogs table:

```sql
-- Add category_id foreign key to blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_category_id ON blogs(category_id);

-- Update existing blogs to have default categories (optional)
UPDATE blogs 
SET category_id = (
  SELECT id FROM categories 
  WHERE slug = CASE 
    WHEN LOWER(category) LIKE '%html%' THEN 'html'
    WHEN LOWER(category) LIKE '%css%' THEN 'css'
    WHEN LOWER(category) LIKE '%javascript%' OR LOWER(category) LIKE '%js%' THEN 'javascript'
    WHEN LOWER(category) LIKE '%react%' THEN 'react'
    WHEN LOWER(category) LIKE '%nextjs%' OR LOWER(category) LIKE '%next.js%' THEN 'nextjs'
    WHEN LOWER(category) LIKE '%typescript%' OR LOWER(category) LIKE '%ts%' THEN 'typescript'
    WHEN LOWER(category) LIKE '%security%' THEN 'security'
    WHEN LOWER(category) LIKE '%devops%' THEN 'devops'
    WHEN LOWER(category) LIKE '%database%' OR LOWER(category) LIKE '%sql%' THEN 'database'
    WHEN LOWER(category) LIKE '%api%' THEN 'api'
    ELSE 'javascript' -- default category
  END
  LIMIT 1
)
WHERE category_id IS NULL AND category IS NOT NULL;
```

## 🚀 Features Implemented

### 1. **Category Management**
- Automatic category fetching from Supabase
- Fallback categories when database is unavailable
- Category caching for performance

### 2. **Filter UI Components**
- `CategoryFilter`: Dropdown filter with search and selection
- `CategoryBadge`: Styled category display component
- Responsive design with animations

### 3. **Data Integration**
- Blog posts now include category data
- Real-time filtering by category
- Results count display

### 4. **Smart Routing**
- Works with both GitHub Pages (static) and Vercel (dynamic)
- Environment-aware category filtering

## 📁 Files Created/Modified

### New Files:
- `src/lib/categories.ts` - Category data management
- `src/components/CategoryFilter.tsx` - Filter UI component
- `supabase/migrations/001_create_categories_table.sql` - Categories table
- `supabase/migrations/002_add_category_to_blogs.sql` - Blog relationship

### Modified Files:
- `src/lib/blog.ts` - Updated to include category data
- `src/app/page.tsx` - Added category filter to Learning & Sharing section
- `src/components/BlogCard.tsx` - Added category badge display

## 🎯 How It Works

### 1. **Data Flow**
```
Supabase Categories → CategoryFilter → User Selection → Filtered Blog Posts
```

### 2. **Component Structure**
```
Learning & Sharing Section
├── Category Filter (dropdown)
├── Results Count
└── Blog Cards (with category badges)
```

### 3. **State Management**
- `categories`: All available categories
- `selectedCategory`: Currently selected filter
- `blogPosts`: Filtered blog posts based on selection

## 🔧 Usage

### Adding New Categories
```sql
INSERT INTO categories (name, slug) VALUES 
('New Category', 'new-category');
```

### Assigning Categories to Blog Posts
```sql
UPDATE blogs 
SET category_id = (SELECT id FROM categories WHERE slug = 'your-category-slug')
WHERE id = 'your-blog-id';
```

### Customizing Categories
Edit the default categories in the migration file or add new ones via Supabase dashboard.

## 🎨 Styling

The category system uses your existing theme:
- Cyan color scheme for consistency
- Glass morphism effects
- Smooth animations with Framer Motion
- Responsive design for all screen sizes

## 🚨 Troubleshooting

### Categories Not Showing
1. Check Supabase connection
2. Verify SQL migrations were run
3. Check browser console for errors

### Filter Not Working
1. Ensure category_id is properly set in blogs table
2. Check RLS policies on categories table
3. Verify component props are passed correctly

### Performance Issues
1. Categories are cached for 10 minutes
2. Blog posts are cached when not filtered
3. Database indexes are optimized

## 🔄 Next Steps

1. **Run the SQL migrations** in your Supabase dashboard
2. **Test locally** with `npm run dev`
3. **Deploy to Vercel** for full functionality
4. **Deploy to GitHub Pages** for static version

The system will automatically fall back to hardcoded categories if Supabase is unavailable, ensuring your site always works.
