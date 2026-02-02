import { getBlogPosts, getBlogPostsByCategoryId, BlogPost, testSupabaseConnection } from '@/lib/blog'
import { getCategories, Category } from '@/lib/categories'
import Link from 'next/link'
import CategoryPageClient from './CategoryPageClient'
import { supabase } from '@/lib/supabase'
import { fetchBlogPostsDynamic, getEffectiveLocale } from '@/lib/dynamicQueries'
import { notFound } from 'next/navigation'

// Generate static params for static export
export async function generateStaticParams() {
  console.log('=== STATIC PARAMS DEBUG ===');
  
  // Always return fallback categories for static generation
  const fallbackCategories = [
    { slug: 'html' },
    { slug: 'css' },
    { slug: 'javascript' },
    { slug: 'react' },
    { slug: 'nextjs' },
    { slug: 'typescript' },
    { slug: 'security' },
    { slug: 'devops' },
    { slug: 'database' },
    { slug: 'api' }
  ]
  
  console.log('Using fallback categories for static generation:', fallbackCategories.map(c => c.slug));
  console.log('=== END STATIC PARAMS DEBUG ===');
  
  return fallbackCategories
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  console.log('=== DYNAMIC CATEGORY PAGE DEBUG ===');
  console.log('Category slug:', slug);
  
  // For static export, we'll fetch all posts and let client handle language filtering
  // This ensures the page works for all languages without hardcoded checks
  let posts = []
  let postsError = null
  
  try {
    console.log('=== DYNAMIC POST FETCH ===');
    console.log('Fetching posts for category:', slug);
    
    // Fetch all published posts for this category (all languages)
    // Client will handle language filtering dynamically
    posts = await fetchBlogPostsDynamic({
      locale: 'all', // Special value to get all languages
      category: slug,
      status: 'published'
    })
    
    console.log('Dynamic fetch result:', { postsCount: posts.length, postsError });
    console.log('Posts received:', posts.map(p => ({
      id: p.id,
      title: p.title,
      language: p.language,
      category_id: p.category_id,
      category: p.category
    })));
    console.log('=== END DYNAMIC POST FETCH ===');
    
  } catch (error) {
    console.error('Error in dynamic post fetch:', error);
    postsError = error
  }
  
  // Fix Category Fetch: Find category first
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('slug', slug)
    .single();
  
  console.log('Category fetch result:', { categoryData, categoryError });
  
  // Error Handling: Check if category exists
  if (!categoryData) {
    console.log('Category not found for slug:', slug);
    return notFound()
  }
  
  console.log('Category found:', categoryData);
  console.log('Fetched Category ID:', categoryData.id);
  console.log('Category slug:', categoryData.slug);
  
  console.log('Final posts count being sent to client:', posts.length);
  console.log('=== END DYNAMIC CATEGORY PAGE DEBUG ===');
  
  // Handle errors gracefully
  if (postsError) {
    console.error('Error fetching posts:', postsError);
  }
  
  // Create category object for the client component
  const category = {
    id: categoryData.id,
    name: categoryData.name,
    slug: categoryData.slug,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  return (
    <div>
      <CategoryPageClient 
        blogPosts={posts} 
        category={category}
      />
    </div>
  )
}
