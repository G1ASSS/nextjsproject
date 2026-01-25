'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { websiteContent } from '@/locales/content'
import Terminal from '@/components/Terminal'
import VideoModal from '@/components/VideoModal'
import { Certifications } from '@/components/Certifications'
import { PROFILE_CONFIG } from '@/config/profile'
import BlogCard from '@/components/BlogCard'

// Static data for GitHub Pages
const STATIC_BLOG_POSTS = [
  {
    id: '1',
    title: 'Getting Started with Cybersecurity',
    description: 'A comprehensive guide to beginning your journey in cybersecurity.',
    category: 'Cybersecurity',
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    created_at: '2024-01-24T03:20:28.714483+00:00'
  },
  {
    id: '2',
    title: 'Advanced Kali Linux Security Techniques',
    description: 'Master advanced penetration testing tools and techniques for ethical hacking.',
    category: 'Security',
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    created_at: '2024-01-23T04:56:43.882013+00:00'
  },
  {
    id: '3',
    title: 'Next.js 14 Performance Optimization',
    description: 'Build high-performance web applications with Next.js 14 and advanced optimization.',
    category: 'Web Development',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop&crop=center',
    created_at: '2024-01-23T04:56:43.882013+00:00'
  }
]

const STATIC_TOOLS = [
  {
    id: '1',
    title: 'Network Scanner',
    description: 'Advanced network scanning and reconnaissance tool for security audits.',
    category: 'Network Security',
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    created_at: '2024-01-22T03:20:28.714483+00:00'
  },
  {
    id: '2',
    title: 'Password Cracker',
    description: 'Ethical password testing and security assessment tool.',
    category: 'Security Tools',
    image_url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop&crop=center',
    created_at: '2024-01-21T04:56:43.882013+00:00'
  },
  {
    id: '3',
    title: 'Vulnerability Scanner',
    description: 'Comprehensive vulnerability assessment and reporting system.',
    category: 'Assessment',
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop&crop=center',
    created_at: '2024-01-20T04:56:43.882013+00:00'
  }
]

const STATIC_PROJECTS = [
  {
    id: '1',
    title: 'SoulSync App',
    description: 'Building an Android app for emotional synchronization using AI.',
    category: 'App Development',
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    link: '/projects/soulsync',
    created_at: '2024-01-22T03:20:28.714483+00:00'
  },
  {
    id: '2',
    title: 'Trading Platform',
    description: 'Web3 integration and database management for a trading platform.',
    category: 'Web3',
    image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop&rop=center',
    link: '/projects/trading',
    created_at: '2024-01-21T04:56:43.882013+00:00'
  },
  {
    id: '3',
    title: 'Security Dashboard',
    description: 'Real-time security monitoring and alert system.',
    category: 'Security',
    image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    link: '/projects/dashboard',
    created_at: '2024-01-20T04:56:43.882013+00:00'
  }
]

// Animation variants
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

export default function StaticHome() {
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null)
  const { currentLanguage } = useLanguage()

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = websiteContent[currentLanguage as keyof typeof websiteContent]
    
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

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-500/50 relative"
                >
                  <img 
                    src={PROFILE_CONFIG.imageUrl}
                    alt={PROFILE_CONFIG.name}
                    className="w-full h-full object-cover"
                  />
                  
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

        {/* Blog Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            {t('techArsenal.blogTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STATIC_BLOG_POSTS.slice(0, 3).map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                description={blog.description}
                category={blog.category}
                imageUrl={blog.image_url}
                date={new Date(blog.created_at).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
                linkUrl={`/blog/${blog.id}`}
                linkText="View Details"
              />
            ))}
          </div>
        </motion.section>

        {/* Tools Section */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STATIC_TOOLS.slice(0, 3).map((tool) => (
              <BlogCard
                key={tool.id}
                title={tool.title}
                description={tool.description}
                category={tool.category}
                imageUrl={tool.image_url}
                date={new Date(tool.created_at).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
                linkUrl={`/tools/${tool.id}`}
                linkText="View Details"
              />
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            {t('learningJourney.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STATIC_PROJECTS.slice(0, 3).map((project) => (
              <BlogCard
                key={project.id}
                title={project.title}
                description={project.description}
                category={project.category}
                imageUrl={project.image_url}
                date={new Date(project.created_at).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
                linkUrl={project.link}
                linkText="View Details"
              />
            ))}
          </div>
        </motion.section>

        {/* Certifications Section */}
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
              Watch as I scan networks and discover vulnerabilities in real-time
            </p>
          </div>
          <Terminal />
        </motion.section>
      </div>
      
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={closeVideoModal}
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
        />
      )}
    </div>
  )
}
