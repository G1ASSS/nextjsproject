'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, Suspense } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { websiteContent } from '@/locales/content'
import Terminal from '@/components/Terminal'
import VideoModal from '@/components/VideoModal'
import { Certifications } from '@/components/Certifications'
import { PROFILE_CONFIG } from '@/config/profile'
import { getBlogPosts, BlogPost } from '@/lib/blog'
import { getTools, Tool } from '@/lib/tools'
import { getProjects, Project } from '@/lib/projects'
import BlogCard from '@/components/BlogCard'

// Learning logs data
const LEARNING_LOGS = [
  {
    id: 1,
    title: 'SoulSync App',
    description: 'Building an Android app for emotional synchronization using AI.',
    category: '#AppDev',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: 'Jan 22, 2024'
  },
  {
    id: 2,
    title: 'WiFi Security',
    description: 'Capturing handshakes and analyzing WPA security.',
    category: '#Cybersecurity',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: 'Jan 20, 2024'
  },
  {
    id: 3,
    title: 'Trading Website',
    description: 'Web3 integration and database management for a trading platform.',
    category: '#Web3',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop&crop=center',
    date: 'Jan 18, 2024'
  }
]

// Blog cards data
const BLOG_CARDS = [
  {
    id: 1,
    title: 'Kali Linux Deep Dive',
    description: 'Exploring advanced penetration testing tools and techniques for ethical hacking and security auditing.',
    category: '#Kali Linux',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    date: 'Jan 22, 2024',
    tags: ['Security', 'Penetration Testing', 'Ethical Hacking']
  },
  {
    id: 2,
    title: 'Next.js Performance Optimization',
    description: 'Building lightning-fast web applications with Next.js 14, server components, and advanced caching strategies.',
    category: '#Next.js',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop&crop=center',
    date: 'Jan 21, 2024',
    tags: ['Web Development', 'React', 'Performance']
  },
  {
    id: 3,
    title: 'Python Security Scripts',
    description: 'Automating security tasks with Python - from network scanning to vulnerability assessment and reporting.',
    category: '#Python',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop&crop=center',
    date: 'Jan 20, 2024',
    tags: ['Programming', 'Automation', 'Security']
  },
  {
    id: 4,
    title: 'Android Security Best Practices',
    description: 'Implementing secure coding practices and penetration testing methodologies for Android applications.',
    category: '#Android',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop&crop=center',
    date: 'Jan 19, 2024',
    tags: ['Mobile Security', 'App Development', 'Best Practices']
  }
]

// Animation variants for scroll effects
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
}

const containerVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [tools, setTools] = useState<Tool[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { currentLanguage } = useLanguage()

  // Fetch blog posts from Supabase
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getBlogPosts()
        setBlogPosts(posts)
      } catch (error) {
        console.error('Error in fetchBlogPosts:', error)
      }
    }

    fetchBlogPosts()
  }, [])

  // Fetch tools from Supabase
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const toolsData = await getTools()
        setTools(toolsData)
      } catch (error) {
        console.error('Error in fetchTools:', error)
      }
    }

    fetchTools()
  }, [])

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects()
        setProjects(projectsData)
      } catch (error) {
        console.error('Error in fetchProjects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = websiteContent[currentLanguage as keyof typeof websiteContent]
    
    // Fallback to English if current language doesn't have key
    if (!value) {
      value = websiteContent.en
    }
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const openVideoModal = (videoUrl: string, title: string) => {
    setSelectedVideo({ url: videoUrl, title })
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="glass p-12 rounded-2xl text-center"
        >
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="flex-1"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {currentLanguage === 'my' ? (
                  <>
                    <span className="text-cyan-400" style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)' }}>{t('hero.brand')}</span> {t('hero.welcome')}
                  </>
                ) : (
                  <>
                    {t('hero.welcome')} <span className="text-cyan-400" style={{ textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)' }}>{t('hero.brand')}</span>
                  </>
                )}
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
              >
                {t('hero.subtitle')}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/about" className="block">
                    <button className="px-8 py-3 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition-colors shadow-lg">
                      {t('hero.ctaAbout')}
                    </button>
                  </Link>
                  <Link href="/blog" className="block">
                    <button className="px-8 py-3 glass text-white border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500 hover:bg-opacity-20 transition-colors">
                      {t('hero.ctaLearn')}
                    </button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Profile Photo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="relative">
                {/* Circular Photo Container */}
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-500/50"
                >
                  <Image
                    src={PROFILE_CONFIG.imageUrl}
                    alt={PROFILE_CONFIG.name}
                    width={400}
                    height={400}
                    className="rounded-full object-cover shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                    priority
                  />
                  
                  {/* Cyan Neon Glow Border */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.4) 50%, rgba(34, 211, 238, 0.4) 50%, transparent)',
                      filter: 'blur(1px)',
                      boxShadow: '0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.4)'
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Learning & Sharing Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('techArsenal.blogTitle')}
            </h2>
            <p className="text-gray-400">
              {t('learningDescription')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              // Show skeleton cards while loading
              [1, 2, 3].map((skeleton) => (
                <motion.div
                  key={skeleton}
                  variants={cardVariants}
                  className="glass rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
                >
                  <div className="relative h-48">
                    <div className="w-full h-full bg-gray-700 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Show actual blog posts
              blogPosts.slice(0, 3).map((blog) => {
                // Get category slug from category_data or fallback to category name
                const categorySlug = blog.category_data?.slug || 
                  (blog.category ? blog.category.toLowerCase().replace(/\s+/g, '-') : 'general');
                
                return (
                  <BlogCard
                    key={blog.id}
                    title={blog.title}
                    description={blog.description}
                    category={blog.category}
                    imageUrl={blog.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center'}
                    date={new Date(blog.created_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                    linkUrl={`/learning/${categorySlug}`}
                    linkText="View Details"
                  />
                );
              })
            )}
          </div>
        </motion.section>

        {/* Learning & Sharing See More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex justify-center mt-10 mb-16"
        >
          <Link href="/learning" className="block">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 glass text-white border border-cyan-400/50 rounded-lg font-medium hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
            >
              {t('hero.seeMore')}
            </motion.button>
          </Link>
        </motion.div>

        {/* Learning Log Section */}
        <motion.section
          id="tools"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            {t('learningLog.title')}
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            {t('kaliDescription')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              // Show skeleton cards while loading
              [1, 2, 3].map((skeleton) => (
                <motion.div
                  key={skeleton}
                  variants={cardVariants}
                  className="glass rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
                >
                  <div className="relative h-48">
                    <div className="w-full h-full bg-gray-700 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Show actual tools from Supabase
              tools.slice(0, 3).map((tool) => (
                <BlogCard
                  key={tool.id}
                  title={tool.title}
                  description={tool.description}
                  category={tool.category}
                  imageUrl={tool.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center'}
                  date={new Date(tool.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                  linkUrl={`/tools/${tool.id}`}
                  linkText="View Details"
                />
              ))
            )}
          </div>
        </motion.section>

        {/* Learning Log See More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex justify-center mt-10 mb-16"
        >
          <Link href="/tools" className="block">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 glass text-white border border-cyan-400/50 rounded-lg font-medium hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
            >
              {t('hero.seeMore')}
            </motion.button>
          </Link>
        </motion.div>

        {/* My Learning Journey Section */}
        <motion.section
          id="projects"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-32"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            {t('learningJourney.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              // Show skeleton cards while loading
              [1, 2, 3].map((skeleton) => (
                <motion.div
                  key={skeleton}
                  variants={cardVariants}
                  className="glass rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
                >
                  <div className="relative h-48">
                    <div className="w-full h-full bg-gray-700 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Show actual projects from Supabase
              projects.slice(0, 3).map((project) => (
                <BlogCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  imageUrl={project.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center'}
                  date={new Date(project.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                  linkUrl={project.link}
                  linkText="View Details"
                />
              ))
            )}
          </div>
        </motion.section>

        {/* My Learning Journey See More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex justify-center mt-10 mb-16"
        >
          <Link href="/projects" className="block">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 glass text-white border border-cyan-400/50 rounded-lg font-medium hover:bg-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
            >
              {t('hero.seeMore')}
            </motion.button>
          </Link>
        </motion.div>

        {/* Professional Certifications Section */}
        <section id="certifications">
          <Certifications />
        </section>

        {/* Terminal Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-32 mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('hero.terminalTitle')}
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t('terminalDescription')}
            </p>
          </div>
          <Terminal />
        </motion.section>

        

        {/* Kali Linux Tools See More Button */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-32 mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)"
              }}
              transition={{ duration: 0.3 }}
              className="glass p-8 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t('features.fastTitle')}</h3>
              <p className="text-gray-300">{t('features.fastDesc')}</p>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)"
              }}
              transition={{ duration: 0.3 }}
              className="glass p-8 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t('features.designTitle')}</h3>
              <p className="text-gray-300">{t('features.designDesc')}</p>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)"
              }}
              transition={{ duration: 0.3 }}
              className="glass p-8 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t('features.motionTitle')}</h3>
              <p className="text-gray-300">{t('features.motionDesc')}</p>
            </motion.div>
          </div>
        </motion.section>
      </div>
      
      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={closeVideoModal}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
}
