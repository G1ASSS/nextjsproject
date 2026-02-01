import { getBlogPosts, getBlogPostsByCategoryId, BlogPost, testSupabaseConnection } from '@/lib/blog'
import { getCategories, Category } from '@/lib/categories'
import Link from 'next/link'
import CategoryPageClient from './CategoryPageClient'
import { supabase } from '@/lib/supabase'

// Generate static params for static export
export async function generateStaticParams() {
  try {
    // Get categories to generate static paths
    const categories = await getCategories()
    
    // Return params for each category
    return categories.map((category) => ({
      slug: category.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    // Fallback to common categories
    return [
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
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  console.log('=== CATEGORY PAGE DEBUG START ===');
  console.log('Searching for slug:', slug);
  
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
    return (
      <div className="min-h-screen">
        {/* Top Navigation Bar */}
        <div className="glass border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-cyan-300 hover:text-white transition-colors">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
            <p className="text-gray-400 mb-8">
              The category "{slug}" was not found in our database.
            </p>
            <Link 
              href="/learning"
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-cyan-300 hover:text-white transition-colors border border-cyan-500/30 hover:border-cyan-400/60"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Learning
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  console.log('Category found:', categoryData);
  console.log('Fetched Category ID:', categoryData.id);
  
  // Get current language from LanguageContext
  const currentLang = typeof window !== 'undefined' 
    ? localStorage.getItem('language') || 'en'
    : 'en';
  
  console.log('Current language for posts:', currentLang);
  
  // Fix Post Fetch: Use the id from categoryData to fetch posts with language filter
  const { data: posts, error: postsError } = await supabase
    .from('blogs')
    .select('*')
    .eq('category_id', categoryData.id)
    .eq('language', currentLang)
    .eq('status', 'published');
  
  console.log('Direct query result:', { posts, postsError });
  console.log('Direct query posts count:', posts?.length || 0);
  
  // Alternative: Try Supabase Join if direct query fails
  let finalPosts = posts || [];
  
  if (!posts || posts.length === 0) {
    console.log('Direct query failed, trying Supabase join...');
    const { data: joinedPosts, error: joinedError } = await supabase
      .from('blogs')
      .select('*, categories!inner(slug)')
      .eq('categories.slug', slug)
      .eq('language', currentLang)
      .eq('status', 'published');
    
    console.log('Join query result:', { joinedPosts, joinedError });
    console.log('Join query posts count:', joinedPosts?.length || 0);
    
    if (joinedPosts && joinedPosts.length > 0) {
      console.log('Using joined posts as fallback');
      finalPosts = joinedPosts;
    } else {
      console.log('Join query also failed, trying category name match...');
      // Try one more fallback - match by category name
      const { data: nameMatchPosts, error: nameMatchError } = await supabase
        .from('blogs')
        .select('*')
        .ilike('category', categoryData.name)
        .eq('language', currentLang)
        .eq('status', 'published');
      
      console.log('Name match query result:', { nameMatchPosts, nameMatchError });
      console.log('Name match posts count:', nameMatchPosts?.length || 0);
      
      if (nameMatchPosts && nameMatchPosts.length > 0) {
        console.log('Using name match posts as fallback');
        finalPosts = nameMatchPosts;
      }
    }
  }
  
  // Create category object for the client component
  const category = {
    id: categoryData.id,
    name: categoryData.name,
    slug: categoryData.slug,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  const blogPosts = finalPosts || [];
  
  console.log('Final posts count being sent to client:', blogPosts.length);
  console.log('=== CATEGORY PAGE DEBUG END ===');
  
  return (
    <CategoryPageClient 
      blogPosts={blogPosts}
      category={category}
    />
  )
}
