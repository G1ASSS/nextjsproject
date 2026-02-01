import { Metadata } from 'next'

interface TestPageProps {
  params: Promise<{
    slug: string
    postSlug: string
  }>
}

export async function generateMetadata({ params }: TestPageProps): Promise<Metadata> {
  const { slug, postSlug } = await params
  return {
    title: `Test: ${slug} - ${postSlug}`,
    description: 'Test page to verify routing works'
  }
}

export default async function TestPage({ params }: TestPageProps) {
  const { slug, postSlug } = await params
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">Test Page</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Route Parameters</h2>
        <p className="text-lg">Category Slug: <span className="text-cyan-300">{slug}</span></p>
        <p className="text-lg">Post Slug: <span className="text-cyan-300">{postSlug}</span></p>
      </div>
      <div className="mt-6">
        <a href="/learning" className="text-cyan-400 hover:text-cyan-300 underline">
          ← Back to Learning
        </a>
      </div>
    </div>
  )
}
