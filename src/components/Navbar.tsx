'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Terminal, Briefcase, User, Mail, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { currentLanguage, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  // Helper function to detect Myanmar text and adjust font size
  const getTextClassName = (text: string, baseClass: string = '') => {
    const isMyanmar = /[\u1000-\u109F]/.test(text)
    return `${baseClass} ${isMyanmar ? 'text-xs' : 'text-sm'}`
  }

  // Scroll lock effect
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'my', name: 'Myanmar', flag: '🇲🇲' },
    { code: 'th', name: 'Thailand', flag: '🇹🇭' },
    { code: 'es', name: 'Spain', flag: '🇪🇸' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' }
  ]

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  // Navigation items with icons
  const navigationItems = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/learning', label: t('nav.learning'), icon: BookOpen },
    { href: '/tools', label: t('nav.kaliTools'), icon: Terminal },
    { href: '/projects', label: t('nav.projects'), icon: Briefcase },
    { href: '/about', label: t('nav.about'), icon: User },
    { href: '/contact', label: t('nav.contact'), icon: Mail }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass sticky top-0 z-[100]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.05em', textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)' }}>
              G1ASS
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block flex-1"
          >
            <div className="flex items-center justify-end space-x-1">
              <Link
                href="/"
                className={`flex items-center gap-2 px-2 py-2 rounded-md font-medium transition-colors whitespace-nowrap max-w-[100px] ${
                  pathname === '/' 
                    ? 'text-cyan-400' 
                    : 'text-white hover:text-blue-300'
                }`}
              >
                <Home size={16} />
                <span className={getTextClassName(t('nav.home'), 'truncate')}>{t('nav.home')}</span>
              </Link>
              <Link
                href="/learning"
                className={`flex items-center gap-2 px-2 py-2 rounded-md font-medium transition-colors whitespace-nowrap max-w-[120px] ${
                  pathname === '/learning' 
                    ? 'text-cyan-400' 
                    : 'text-white hover:text-blue-300'
                }`}
              >
                <BookOpen size={16} />
                <span className={getTextClassName(t('nav.learning'), 'truncate')}>{t('nav.learning')}</span>
              </Link>
              <Link
                href="/tools"
                className={`flex items-center gap-2 px-2 py-2 rounded-md font-medium transition-colors whitespace-nowrap max-w-[120px] ${
                  pathname === '/tools' 
                    ? 'text-cyan-400' 
                    : 'text-white hover:text-blue-300'
                }`}
              >
                <Terminal size={16} />
                <span className={getTextClassName(t('nav.kaliTools'), 'truncate')}>{t('nav.kaliTools')}</span>
              </Link>
              <Link
                href="/projects"
                className={`flex items-center gap-2 px-2 py-2 rounded-md font-medium transition-colors whitespace-nowrap max-w-[100px] ${
                  pathname === '/projects' 
                    ? 'text-cyan-400' 
                    : 'text-white hover:text-blue-300'
                }`}
              >
                <Briefcase size={16} />
                <span className={getTextClassName(t('nav.projects'), 'truncate')}>{t('nav.projects')}</span>
              </Link>
              <Link
                href="/about"
                className={`flex items-center gap-2 px-2 py-2 rounded-md font-medium transition-colors whitespace-nowrap max-w-[100px] ${
                  pathname === '/about' 
                    ? 'text-cyan-400' 
                    : 'text-white hover:text-blue-300'
                }`}
              >
                <User size={16} />
                <span className={getTextClassName(t('nav.about'), 'truncate')}>{t('nav.about')}</span>
              </Link>
              <Link
                href="/contact"
                className={`flex items-center gap-2 px-2 py-2 rounded-md font-medium transition-colors whitespace-nowrap max-w-[100px] ${
                  pathname === '/contact' 
                    ? 'text-cyan-400' 
                    : 'text-white hover:text-blue-300'
                }`}
              >
                <Mail size={16} />
                <span className={getTextClassName(t('nav.contact'), 'truncate')}>{t('nav.contact')}</span>
              </Link>

              {/* Language Switcher */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="ml-4 flex items-center space-x-2 px-3 py-2 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{currentLang.flag}</span>
                  <span className="text-sm font-medium">{currentLang.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>

                {/* Language Dropdown */}
                {isLanguageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl"
                  >
                    <div className="py-2">
                      {languages.map((lang) => (
                        <motion.button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any)
                            setIsLanguageDropdownOpen(false)
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                            currentLanguage === lang.code ? 'bg-white/10 text-blue-300' : 'text-white'
                          }`}
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                          {currentLanguage === lang.code && (
                            <svg className="w-4 h-4 ml-auto text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <button
                onClick={toggleDarkMode}
                className="ml-4 relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="sr-only">Toggle dark mode</span>
                <span
                  className={`${isDarkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="md:hidden"
          >
            <button 
              onClick={toggleMobileMenu}
              className="text-white hover:text-blue-300 p-2 cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 z-[105] md:hidden"
            onClick={closeMobileMenu}
          />
          
          {/* Sidebar Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-[280px] bg-[#0a0a0a]/90 backdrop-blur-2xl border-l border-white/5 z-[110] md:hidden overflow-y-auto scrollbar-hide"
          >
            <div className="flex flex-col min-h-screen">
              {/* Close Button - Top Right with Breathing Room */}
              <div className="flex justify-end p-6">
                <button onClick={closeMobileMenu} className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links with Premium Icons and Active States */}
              <div className="flex-1 pl-10 pr-6 py-6">
                <motion.nav 
                  className="flex flex-col items-start space-y-8"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.1
                      }
                    }
                  }}
                >
                  {navigationItems.map((item, index) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    
                    return (
                      <motion.div
                        key={item.href}
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      >
                        <Link 
                          href={item.href} 
                          onClick={closeMobileMenu} 
                          className={`flex items-center space-x-3 font-medium transition-colors leading-relaxed ${
                            isActive 
                              ? 'text-cyan-400' 
                              : 'text-white/90 hover:text-white'
                          }`}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span className={getTextClassName(item.label, 'truncate')}>{item.label}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </motion.nav>
              </div>

              {/* Language Section - Below Navigation with Better Visibility */}
              <div className="px-10 pb-20">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  {languages.map((lang, index) => (
                    <motion.button
                      key={lang.code}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05, duration: 0.2 }}
                      onClick={() => {
                        setLanguage(lang.code as any)
                        closeMobileMenu()
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                        currentLanguage === lang.code 
                          ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' 
                          : 'border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white/90'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.nav>
  )
}

export default Navbar
