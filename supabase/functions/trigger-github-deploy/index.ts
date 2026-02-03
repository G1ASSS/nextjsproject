import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('🚀 GitHub deployment trigger function called')
    
    const { record, table, schema, type } = await req.json()
    
    console.log('📋 Event details:', {
      table,
      schema,
      type,
      record_id: record?.id
    })

    // Only trigger on specific events
    if (table === 'blogs' && type === 'INSERT') {
      console.log('📝 New blog post detected, triggering GitHub deployment')
      
      // Get GitHub token from environment
      const githubToken = Deno.env.get('GITHUB_TOKEN')
      const repoOwner = Deno.env.get('GITHUB_REPO_OWNER')
      const repoName = Deno.env.get('GITHUB_REPO_NAME')
      
      if (!githubToken || !repoOwner || !repoName) {
        console.error('❌ Missing required environment variables')
        throw new Error('Missing GitHub configuration')
      }

      // Prepare payload for GitHub repository_dispatch
      const payload = {
        event_type: 'supabase_update',
        client_payload: {
          table: table,
          type: type,
          record_id: record?.id,
          slug: record?.slug,
          title: record?.title,
          timestamp: new Date().toISOString()
        }
      }

      console.log('📤 Sending repository_dispatch to GitHub:', payload)

      // Send repository_dispatch event to GitHub
      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        }
      )

      if (!response.ok) {
        const errorData = await response.text()
        console.error('❌ GitHub API error:', errorData)
        throw new Error(`GitHub API error: ${response.status} ${errorData}`)
      }

      const result = await response.json()
      console.log('✅ GitHub deployment triggered successfully:', result)

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'GitHub deployment triggered',
          github_response: result 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    // For other events, just log and return success
    console.log(`ℹ️ Ignoring ${type} event on ${table} table`)
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Event received but no action needed',
        event: { table, type }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('❌ Error in GitHub deployment trigger:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
