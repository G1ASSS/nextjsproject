'use client'

import { useEffect, useState } from 'react'

export default function DebugPage() {
  const [envVars, setEnvVars] = useState({})

  useEffect(() => {
    setEnvVars({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
    })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <pre className="bg-gray-800 p-4 rounded">
        {JSON.stringify(envVars, null, 2)}
      </pre>
      
      <h2 className="text-xl font-bold mt-8 mb-4">Testing Supabase Connection</h2>
      <button 
        onClick={async () => {
          try {
            const response = await fetch('https://tdckfwyohklvzudnfswk.supabase.co/rest/v1/blogs', {
              headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkY2tmd3lvaGtsdnp1ZG5mc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTg1NjgsImV4cCI6MjA4NDY3NDU2OH0.0kpiLZpQOY3jdhbtxRaKM27Tz9NiQFTGC7EV5Pw0lag',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkY2tmd3lvaGtsdnp1ZG5mc3drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTg1NjgsImV4cCI6MjA4NDY3NDU2OH0.0kpiLZpQOY3jdhbtxRaKM27Tz9NiQFTGC7EV5Pw0lag'
              }
            })
            const data = await response.json()
            console.log('Supabase test:', data)
            alert(`Success! Found ${data.length} blogs`)
          } catch (error) {
            console.error('Supabase error:', error)
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
          }
        }}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
      >
        Test Supabase Connection
      </button>
    </div>
  )
}
