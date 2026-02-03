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
    console.log('🚀 GitHub Webhook Bridge Function Called')
    console.log('📋 Request method:', req.method)
    console.log('📋 Request URL:', req.url)
    
    // Parse the incoming webhook payload from Supabase
    const body = await req.json()
    console.log('📦 Received webhook payload:', JSON.stringify(body, null, 2))
    
    const { record, table, schema, type, old_record } = body
    
    // Only trigger on INSERT events for the blogs table
    if (table === 'blogs' && type === 'INSERT') {
      console.log('📝 New blog post detected, triggering GitHub deployment')
      
      // Get GitHub configuration from environment variables
      const githubToken = Deno.env.get('GITHUB_TOKEN')
      const repoOwner = Deno.env.get('GITHUB_REPO_OWNER')
      const repoName = Deno.env.get('GITHUB_REPO_NAME')
      
      if (!githubToken || !repoOwner || !repoName) {
        console.error('❌ Missing required environment variables')
        console.error('GITHUB_TOKEN:', githubToken ? '✅ Set' : '❌ Missing')
        console.error('GITHUB_REPO_OWNER:', repoOwner ? '✅ Set' : '❌ Missing')
        console.error('GITHUB_REPO_NAME:', repoName ? '✅ Set' : '❌ Missing')
        
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Missing GitHub configuration in environment variables' 
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500 
          }
        )
      }

      // Prepare the GitHub repository_dispatch payload
      const githubPayload = {
        event_type: 'supabase_update',
        client_payload: {
          table: table,
          type: type,
          record_id: record?.id,
          slug: record?.slug,
          title: record?.title,
          content: record?.content?.substring(0, 200) + '...', // First 200 chars
          category_id: record?.category_id,
          language: record?.language,
          status: record?.status,
          timestamp: new Date().toISOString(),
          supabase_event: {
            schema: schema,
            table: table,
            type: type,
            record_id: record?.id
          }
        }
      }

      console.log('📤 Sending to GitHub:', JSON.stringify(githubPayload, null, 2))

      // Send the repository_dispatch event to GitHub
      const githubResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'Supabase-Webhook-Bridge/1.0'
          },
          body: JSON.stringify(githubPayload)
        }
      )

      if (!githubResponse.ok) {
        const errorText = await githubResponse.text()
        console.error('❌ GitHub API error:', {
          status: githubResponse.status,
          statusText: githubResponse.statusText,
          body: errorText
        })
        
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `GitHub API error: ${githubResponse.status} ${githubResponse.statusText}`,
            details: errorText
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500 
          }
        )
      }

      const githubResult = await githubResponse.json()
      console.log('✅ GitHub deployment triggered successfully:', githubResult)

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'GitHub deployment triggered successfully',
          github_response: githubResult,
          blog_post: {
            id: record?.id,
            slug: record?.slug,
            title: record?.title
          }
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
        event: { table, type, record_id: record?.id }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('❌ Error in GitHub webhook bridge:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage,
        stack: errorStack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
