// Simple test script to check Thai posts in Supabase
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkThaiPosts() {
  console.log('=== CHECKING THAI POSTS IN SUPABASE ===')
  
  try {
    // Check all Thai posts
    const { data: thaiPosts, error: thaiError } = await supabase
      .from('blogs')
      .select('*')
      .eq('language', 'th')
      .eq('status', 'published')
    
    console.log('Thai posts:', thaiPosts?.length || 0)
    console.log('Thai posts data:', thaiPosts)
    console.log('Thai posts error:', thaiError)
    
    // Check all posts by language
    const { data: allPosts, error: allError } = await supabase
      .from('blogs')
      .select('language, title, slug, status')
      .eq('status', 'published')
    
    console.log('All posts by language:')
    const langCounts = allPosts?.reduce((acc, post) => {
      acc[post.language] = (acc[post.language] || 0) + 1
      return acc
    }, {})
    console.log(langCounts)
    
    // Check categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
    
    console.log('Categories:', categories?.length || 0)
    console.log('Categories data:', categories)
    
  } catch (error) {
    console.error('Error:', error)
  }
  
  console.log('=== END CHECK ===')
}

checkThaiPosts()
