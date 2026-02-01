const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tdckfwyohklvzudnfswk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkY2tmd3lvaGtsdnp1ZG5mc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTg1NjgsImV4cCI6MjA4NDY3NDU2OH0.0kpiLZpQOY3jdhbtxRaKM27Tz9NiQFTGC7EV5Pw0lag';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugStaticParams() {
  try {
    console.log('=== DEBUGGING STATIC PARAMS ===');
    
    // Fetch all posts with categories
    const { data: posts, error } = await supabase
      .from('blogs')
      .select(`
        slug,
        categories!inner(slug)
      `)
      .eq('status', 'published');

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('Found posts:', posts.length);
    
    posts.forEach((post, index) => {
      console.log(`Post ${index + 1}:`);
      console.log('  Post slug:', post.slug);
      console.log('  Category slug:', post.categories.slug);
      console.log('  Full post:', JSON.stringify(post, null, 2));
      console.log('---');
    });

    // Generate params
    const params = posts.map((post) => ({
      slug: post.categories.slug,
      postSlug: post.slug
    }));

    console.log('Generated params:', params);
    
  } catch (error) {
    console.error('Debug error:', error);
  }
}

debugStaticParams();
