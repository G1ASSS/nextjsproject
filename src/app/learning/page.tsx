'use client'

import { useState, useEffect } from 'react'
import { getCategories, Category } from '@/lib/categories'
import { getBlogPosts, BlogPost } from '@/lib/blog'
import Link from 'next/link'
import { Layout, Palette, Code2, Webhook, Database, ShieldCheck, Search, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// Icon mapping for categories
const getCategoryIcon = (slug: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'html': <Layout size={40} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />,
    'css': <Palette size={40} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />,
    'javascript': <Code2 size={40} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />,
    'react': <Code2 size={40} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />,
    'nextjs': <Layout size={40} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />,
    'typescript': <Code2 size={40} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />,
    'security': <ShieldCheck size={40} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />,
    'devops': <Layout size={40} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />,
    'database': <Database size={40} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />,
    'api': <Webhook size={40} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />
  }
  
  return iconMap[slug] || <Layout size={40} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />
}

export default function LearningPage() {
  const { t } = useLanguage()
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesWithCounts, setCategoriesWithCounts] = useState<Array<{category: Category, count: number}>>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCategories, setFilteredCategories] = useState<Array<{category: Category, count: number}>>([])

  // Fetch categories and post counts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log('Starting to fetch categories...')
        
        // First, try to get categories from Supabase
        let categoriesData: Category[] = []
        
        try {
          categoriesData = await getCategories()
          console.log('Categories fetched from Supabase:', categoriesData.length)
        } catch (error) {
          console.log('Error fetching from Supabase, using fallback:', error)
          // Use fallback categories
          categoriesData = [
            { id: '1', name: 'HTML', slug: 'html', created_at: '', updated_at: '' },
            { id: '2', name: 'CSS', slug: 'css', created_at: '', updated_at: '' },
            { id: '3', name: 'JavaScript', slug: 'javascript', created_at: '', updated_at: '' },
            { id: '4', name: 'React', slug: 'react', created_at: '', updated_at: '' },
            { id: '5', name: 'Next.js', slug: 'nextjs', created_at: '', updated_at: '' },
            { id: '6', name: 'TypeScript', slug: 'typescript', created_at: '', updated_at: '' },
            { id: '7', name: 'Security', slug: 'security', created_at: '', updated_at: '' },
            { id: '8', name: 'DevOps', slug: 'devops', created_at: '', updated_at: '' },
            { id: '9', name: 'Database', slug: 'database', created_at: '', updated_at: '' },
            { id: '10', name: 'API', slug: 'api', created_at: '', updated_at: '' }
          ]
        }
        
        setCategories(categoriesData)
        console.log('Final categories set:', categoriesData.length)
        
        // Try to fetch blog posts for counting
        try {
          const allPosts = await getBlogPosts()
          console.log('Blog posts fetched:', allPosts.length)
          
          // Count posts per category
          const categoryCounts = categoriesData.map(category => {
            const count = allPosts.filter(post => {
              if (post.category_data) {
                return post.category_data.slug === category.slug
              }
              return post && post.category && post.category.toLowerCase() === category.name.toLowerCase()
            }).length
            
            return { category, count }
          })
          
          setCategoriesWithCounts(categoryCounts)
          console.log('Category counts calculated:', categoryCounts.length)
        } catch (postError) {
          console.log('Error fetching posts, using zero counts:', postError)
          // Set zero counts for all categories
          const categoryCounts = categoriesData.map(category => ({ category, count: 0 }))
          setCategoriesWithCounts(categoryCounts)
        }
        
      } catch (error) {
        console.error('Major error in fetchData:', error)
        // Set fallback categories with zero counts
        const fallbackCategories = [
          { id: '1', name: 'HTML', slug: 'html', created_at: '', updated_at: '' },
          { id: '2', name: 'CSS', slug: 'css', created_at: '', updated_at: '' },
          { id: '3', name: 'JavaScript', slug: 'javascript', created_at: '', updated_at: '' }
        ]
        setCategories(fallbackCategories)
        setCategoriesWithCounts(fallbackCategories.map(cat => ({ category: cat, count: 0 })))
      } finally {
        setLoading(false)
        console.log('Data fetching completed, loading set to false')
      }
    }

    fetchData()
  }, [])

  // Real-time search filtering
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(categoriesWithCounts)
    } else {
      const filtered = categoriesWithCounts.filter(({ category }) =>
        category && category.name && category.slug && (
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.slug.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      setFilteredCategories(filtered)
    }
  }, [searchQuery, categoriesWithCounts])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Learning & <span className="text-cyan-400">Sharing</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {t('learningDescription')}
            </p>
            
            {/* Premium Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-full pl-12 pr-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Show skeleton cards while loading
          [1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div key={skeleton} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <div className="w-full h-full">
                <div className="w-16 h-16 bg-gray-700 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-700 rounded mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          ))
        ) : filteredCategories.length > 0 ? (
          // Show filtered category cards with explicit Link components
          filteredCategories.map(({ category, count }) => (
            <Link 
              key={category.id} 
              href={`/learning/${category.slug}`}
              className="block"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 cursor-pointer group">
                {/* Premium Icon */}
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {getCategoryIcon(category.slug)}
                </div>
                
                {/* Category Name */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  {category.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {category.slug === 'html' && 'Structure and semantic markup for the web'}
                  {category.slug === 'css' && 'Styling and layout for modern web design'}
                  {category.slug === 'javascript' && 'Dynamic programming and interactivity'}
                  {category.slug === 'react' && 'Component-based UI development'}
                  {category.slug === 'nextjs' && 'Full-stack React framework'}
                  {category.slug === 'typescript' && 'Type-safe JavaScript development'}
                  {category.slug === 'security' && 'Cybersecurity and best practices'}
                  {category.slug === 'devops' && 'Development operations and deployment'}
                  {category.slug === 'database' && 'Data storage and management'}
                  {category.slug === 'api' && 'Application programming interfaces'}
                  {!['html', 'css', 'javascript', 'react', 'nextjs', 'typescript', 'security', 'devops', 'database', 'api'].includes(category.slug) && 'Explore articles and tutorials'}
                </p>
                
                {/* Post count */}
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 text-sm font-medium">
                    {count} {count === 1 ? 'post' : 'posts'}
                  </span>
                  
                  {/* Arrow indicator */}
                  <div className="text-cyan-400 group-hover:translate-x-1 transition-transform duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          // No categories found or no search results
          <div className="col-span-full text-center py-20">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                {searchQuery ? 'No categories found' : 'No categories found in Supabase'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery 
                  ? `No categories match "${searchQuery}". Try searching for something else.`
                  : 'Please check your Supabase setup or run the SQL migration script.'
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-lg font-medium hover:bg-cyan-500/30 hover:border-cyan-400 transition-colors"
                >
                  Clear Search
                </button>
              )}
              {!searchQuery && (
                <Link 
                  href="/"
                  className="inline-block"
                >
                  <div className="px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-lg font-medium hover:bg-cyan-500/30 hover:border-cyan-400 transition-colors">
                    Back to Home
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
