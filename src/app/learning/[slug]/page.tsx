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
  
  console.log("Searching for slug:", slug);
  
  // Fix Category Fetch: Find category first
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', slug)
    .single();
  
  console.log('Category fetch result:', { categoryData, categoryError });
  
  // Error Handling: Check if category exists
  if (!categoryData) {
    console.log('Category not found for slug:', slug);
    return (
      <div className="min-h-screen">
        {/* Top Navigation Bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="flex justify-start items-center">
              <Link
                href="/learning"
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-cyan-300 hover:text-white transition-colors border border-cyan-500/30 hover:border-cyan-400/60"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Back to All Categories</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Category Not Found
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                The category you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  console.log('Category found:', categoryData);
  
  // Data Verification: Add temporary console logs
  console.log('Fetched Category ID:', categoryData.id);
  
  // Fix Post Fetch: Use the id from categoryData to fetch posts
  const { data: posts, error: postsError } = await supabase
    .from('blogs')
    .select('*')
    .eq('category_id', categoryData.id);
  
  console.log('Posts fetch result:', { posts, postsError });
  console.log('Fetched Posts Count:', posts?.length);
  
  // Data Verification: Check if posts have category_id
  if (posts && posts.length > 0) {
    console.log('Sample post data:', posts[0]);
    console.log('Sample post category_id:', posts[0].category_id);
    console.log('Category ID match check:', posts[0].category_id === categoryData.id);
  }
  
  // Alternative: Try Supabase Join if direct query fails
  if (!posts || posts.length === 0) {
    console.log('Direct query failed, trying Supabase join...');
    const { data: joinedPosts, error: joinedError } = await supabase
      .from('blogs')
      .select('*, categories!inner(slug)')
      .eq('categories.slug', slug);
    
    console.log('Joined posts result:', { joinedPosts, joinedError });
    console.log('Joined posts count:', joinedPosts?.length);
    
    if (joinedPosts && joinedPosts.length > 0) {
      console.log('Sample joined post:', joinedPosts[0]);
      console.log('Joined post categories:', joinedPosts[0].categories);
      console.log('Joined post category slug:', joinedPosts[0].categories?.slug);
    }
  }
  
  // Create category object for the client component
  const category = {
    id: categoryData.id,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    slug: slug,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  const blogPosts = posts || [];
  
  return (
    <CategoryPageClient 
      blogPosts={blogPosts}
      category={category}
    />
  )
}
