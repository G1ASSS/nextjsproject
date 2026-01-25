'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useContentTranslation } from '@/hooks/useContentTranslation'
import { PROFILE_CONFIG } from '@/config/profile'
import { Github, Mail, MapPin, Calendar } from 'lucide-react'

export default function AboutPage() {
  const { t } = useContentTranslation()

  const skills = [
    'Penetration Testing',
    'Network Security',
    'Web Application Security',
    'Mobile Security',
    'Cryptography',
    'Digital Forensics',
    'Risk Assessment',
    'Security Auditing'
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-cyan-300 hover:text-white transition-colors border border-cyan-500/30 hover:border-cyan-400/60"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('nav.about')}
          </h1>
          <p className="text-xl text-cyan-300 max-w-3xl mx-auto">
            Passionate cybersecurity professional dedicated to protecting digital assets and securing modern web applications.
          </p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-12 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-shrink-0"
            >
              <img 
                src={PROFILE_CONFIG.imageUrl}
                alt={PROFILE_CONFIG.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-cyan-400/50 shadow-2xl shadow-cyan-400/20"
              />
            </motion.div>

            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex-1 text-center md:text-left"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                {PROFILE_CONFIG.name}
              </h2>
              <p className="text-xl text-cyan-300 mb-4">
                {PROFILE_CONFIG.role}
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                {PROFILE_CONFIG.bio}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>contact@g1ass.dev</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Yangon, Myanmar</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Available for projects</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass rounded-2xl p-8 md:p-12 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
            Core Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass p-4 rounded-lg border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <span className="text-cyan-300 font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* GitHub Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
              <Github className="w-6 h-6 mr-3" />
              Open Source Contributions
            </h2>
            <p className="text-gray-300 mb-6">
              Explore my GitHub repositories for security tools, scripts, and research projects.
            </p>
            <Link
              href="https://github.com/g1ass"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-lg font-medium hover:bg-cyan-500/30 hover:border-cyan-400/60 transition-colors"
            >
              <Github className="w-5 h-5" />
              View GitHub Profile
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
