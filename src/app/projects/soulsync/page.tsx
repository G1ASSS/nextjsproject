'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Brain, Palette } from 'lucide-react'
import { TranslateText, TranslateH1, TranslateH2, TranslateH3, TranslateP } from '@/components/TranslateText'

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

export default function SoulSyncProject() {
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
            <TranslateText text="Back to Home" className="text-sm font-medium" />
          </Link>
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <TranslateH1 
              text="SoulSync App" 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            />
            <TranslateP 
              text="Emotional Synchronization Through AI"
              className="text-xl text-cyan-300 mb-6"
            />
            <TranslateP 
              text="Building an Android application that uses artificial intelligence to analyze and synchronize emotional states between users in real-time."
              className="text-gray-300 max-w-3xl mx-auto leading-relaxed"
            />
          </motion.div>

          {/* Project Goal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <TranslateH2 
              text="Project Goal"
              className="text-2xl font-bold text-white mb-4 flex items-center"
            />
            <TranslateP 
              text="SoulSync is an innovative Android application that leverages artificial intelligence to synchronize emotional states between users in real-time. By analyzing biometric data, voice patterns, and behavioral indicators, app creates meaningful emotional connections, fostering deeper understanding and empathy in digital relationships. The platform aims to revolutionize how we experience emotional connectivity in our increasingly digital world."
              className="text-gray-300 text-lg leading-relaxed"
            />
          </motion.div>

          {/* Tech Arsenal */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <TranslateH2 
              text="Tech Arsenal"
              className="text-2xl font-bold text-white mb-8 flex items-center"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Kali Linux */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(34, 211, 238)",
                      filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2m0 0l-2-2m6 2l2 2m0 0l-2-2" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">Kali Linux</h3>
                  <p className="text-gray-300 text-sm text-center">
                    Advanced penetration testing and security assessment tools
                  </p>
                </div>
              </motion.div>

              {/* Next.js */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(59, 130, 246)",
                      filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">Next.js</h3>
                  <p className="text-gray-300 text-sm text-center">
                    React framework for server-side rendering
                  </p>
                </div>
              </motion.div>

              {/* Python */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(34, 197, 94)",
                      filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20v6M9 14l6-6m6 6v6a2 2 0 002-2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2zM9 9a1 1 0 000 2v3a1 1 0 001 1h3a1 1 0 001-1H9z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">Python</h3>
                  <p className="text-gray-300 text-sm text-center">
                    Data analysis and automation scripts
                  </p>
                </div>
              </motion.div>

              {/* Tailwind CSS */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(34, 211, 238)",
                      filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18a3 3 0 003 3h18a3 3 0 003 3H6a3 3 0 003 3v18a3 3 0 003 3H6zM3 3h3a3 3 0 003 3v18a3 3 0 003 3H6z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">Tailwind CSS</h3>
                  <p className="text-gray-300 text-sm text-center">
                    Utility-first CSS framework for rapid UI development
                  </p>
                </div>
              </motion.div>

              {/* Android SDK */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(34, 211, 238)",
                      filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2v-4a2 2 0 00-2-2h-2zM9 9a1 1 0 000 2v3a1 1 0 001 1h3a1 1 0 001-1H9z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">Android SDK</h3>
                  <p className="text-gray-300 text-sm text-center">
                    Native development tools and APIs
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
              Key Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* UI/UX Design */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">UI/UX Design</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Creating an intuitive and emotionally resonant interface that adapts to user emotions. 
                  The design emphasizes smooth transitions, calming color palettes, and responsive feedback mechanisms.
                </p>
              </motion.div>

              {/* Splash Screen */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Splash Screen</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  An immersive onboarding experience with animated heart rate visualization and emotional calibration. 
                  Features smooth animations and introduces users to the SoulSync concept.
                </p>
              </motion.div>

              {/* User Interface */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">User Interface</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Currently developing the main application interface with real-time emotion visualization, 
                  connection management, and AI-powered insights dashboard.
                </p>
              </motion.div>

              {/* AI Integration */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">AI Integration</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Advanced machine learning algorithms for emotion detection, pattern recognition, 
                  and predictive emotional synchronization between connected users.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
              Key Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Splash Screen */}
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(34, 211, 238)",
                      filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sparkles className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white">Splash Screen</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Animated logo transition for a premium feel with smooth gradients and 
                  particle effects that create an immersive first impression.
                </p>
              </motion.div>

              {/* AI Emotional Sync */}
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(34, 211, 238)",
                      filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Brain className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white">AI Emotional Sync</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Real-time emotion analysis using advanced machine learning models that 
                  interpret facial expressions, voice patterns, and behavioral indicators.
                </p>
              </motion.div>

              {/* Modern UI/UX */}
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(34, 211, 238)",
                      filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Palette className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white">Modern UI/UX</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Dark-themed, minimalist Android interface with intuitive navigation and 
                  smooth micro-interactions for optimal user experience.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Development Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
              Development Progress
            </h2>
            
            <div className="space-y-6">
              {/* Concept & Research */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">Concept & Research</h3>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-400/40 text-green-300 text-xs rounded-full font-medium">
                    100% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                    style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}
                  />
                </div>
              </motion.div>

              {/* App Name & Branding */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">App Name & Branding</h3>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-400/40 text-green-300 text-xs rounded-full font-medium">
                    100% Complete
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">Named: SoulSync</p>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                    style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}
                  />
                </div>
              </motion.div>

              {/* UI/UX Design & Splash Screen */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">UI/UX Design & Splash Screen</h3>
                  <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 text-xs rounded-full font-medium">
                    In Progress
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full relative"
                    style={{ boxShadow: '0 0 10px rgba(250, 204, 21, 0.5)' }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-900">75%</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* AI Integration */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">AI Integration</h3>
                  <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs rounded-full font-medium">
                    Future Phase
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 1.2, delay: 0.9 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                    style={{ boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
              Tech Stack
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Next.js */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(34, 211, 238)",
                      filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">Next.js</h3>
                  <p className="text-gray-300 text-sm text-center">
                    React framework for server-side rendering and optimized performance
                  </p>
                </div>
              </motion.div>

              {/* Android SDK */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(34, 211, 238)",
                      filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2v-4a2 2 0 00-2-2h-2zM9 9a1 1 0 000 2v3a1 1 0 001 1h3a1 1 0 001-1H9z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">Android SDK</h3>
                  <p className="text-gray-300 text-sm text-center">
                    Native development tools and APIs for Android platform
                  </p>
                </div>
              </motion.div>

              {/* AI Frameworks */}
              <motion.div
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(34, 211, 238)",
                      filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Frameworks</h3>
                  <p className="text-gray-300 text-sm text-center">
                    TensorFlow, PyTorch, and scikit-learn for machine learning
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Mobile Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
              Mobile Mockup
            </h2>
            
            <div className="flex justify-center">
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateY: [0, 5, 0],
                  transition: { duration: 0.6 }
                }}
                className="relative"
              >
                {/* 3D Phone Frame */}
                <div className="relative mx-auto" style={{ width: '320px', height: '640px' }}>
                  {/* Phone Shadow */}
                  <div 
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)',
                      transform: 'perspective(1000px) rotateX(10deg) translateZ(-20px)',
                      filter: 'blur(20px)',
                      zIndex: -1
                    }}
                  />
                  
                  {/* Phone Body */}
                  <div 
                    className="relative glass rounded-3xl border-2 border-cyan-500/30 overflow-hidden"
                    style={{ 
                      width: '320px', 
                      height: '640px',
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 100px rgba(34, 211, 238, 0.2)',
                      transform: 'perspective(1000px) rotateX(-5deg)',
                    }}
                  >
                    {/* Phone Top Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
                    
                    {/* Screen Area */}
                    <div className="absolute top-6 left-2 right-2 bottom-8 bg-black rounded-2xl overflow-hidden">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center px-4 py-1 text-white text-xs">
                        <span>9:41</span>
                        <div className="flex gap-1">
                          <div className="w-4 h-3 bg-white rounded-sm"></div>
                          <div className="w-4 h-3 bg-white rounded-sm"></div>
                          <div className="w-4 h-3 bg-white rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* App Content Placeholder */}
                      <div className="p-4 h-full bg-gradient-to-br from-cyan-900 to-blue-900 flex flex-col">
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            {/* SoulSync Logo */}
                            <div className="mb-8">
                              <div className="w-20 h-20 bg-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-lg">SS</span>
                              </div>
                              <h3 className="text-cyan-300 text-xl font-bold">SoulSync</h3>
                              <p className="text-gray-400 text-sm">Emotional Connection</p>
                            </div>
                            
                            {/* Mock App Interface */}
                            <div className="space-y-4">
                              <div className="glass p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-green-400 rounded-full animate-pulse"></div>
                                  <div className="flex-1">
                                    <div className="h-2 bg-gray-600 rounded mb-2"></div>
                                    <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="glass p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                                  <div className="flex-1">
                                    <div className="h-2 bg-gray-600 rounded mb-2"></div>
                                    <div className="h-2 bg-gray-600 rounded w-2/3"></div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="glass p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-purple-400 rounded-full"></div>
                                  <div className="flex-1">
                                    <div className="h-2 bg-gray-600 rounded mb-2"></div>
                                    <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Phone Bottom Button */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-800 rounded-full border border-gray-600"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Development Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
              Development Roadmap
            </h2>
            
            <div className="relative">
              {/* Glowing Connection Line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="w-full h-full bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full"
                  style={{ 
                    boxShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)',
                    filter: 'blur(1px)'
                  }}
                />
              </div>
              
              {/* Phase 1: Completed */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="relative mb-12"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-cyan-500/20 border-2 border-cyan-400 rounded-full flex items-center justify-center"
                    style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)' }}
                  >
                    <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2m0 0l-2-2m6 2l2 2m0 0l-2-2" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-2">Phase 1</h3>
                    <p className="text-white font-semibold">Conceptualization & Branding</p>
                    <span className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs rounded-full font-medium mt-2">
                      ✓ Completed
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Phase 2: In Progress */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="relative mb-12"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-amber-500/20 border-2 border-amber-400 rounded-full flex items-center justify-center"
                    style={{ boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)' }}
                  >
                    <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-300 mb-2">Phase 2</h3>
                    <p className="text-white font-semibold">UI Design & Splash Screen</p>
                    <span className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs rounded-full font-medium mt-2">
                      ⟳ In Progress
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Phase 3: Planning */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-gray-500/20 border-2 border-gray-400 rounded-full flex items-center justify-center"
                    style={{ boxShadow: '0 0 20px rgba(156, 163, 175, 0.6)' }}
                  >
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2zM9 9a1 1 0 000 2v3a1 1 0 001 1h3a1 1 0 001-1H9z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-300 mb-2">Phase 3</h3>
                    <p className="text-white font-semibold">AI Core Integration</p>
                    <span className="inline-block px-3 py-1 bg-gray-500/20 border border-gray-400/40 text-gray-300 text-xs rounded-full font-medium mt-2">
                      ○ Planning
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Current Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 p-6 bg-cyan-500/10 border border-cyan-400/30 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Current Development Status</h3>
                <p className="text-gray-300 text-sm">
                  Actively developing the core user interface and emotion synchronization algorithms. 
                  Project in active development phase.
                </p>
              </div>
              <div className="text-cyan-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
