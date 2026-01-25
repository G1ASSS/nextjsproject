'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Facebook, Instagram, Send, X } from 'lucide-react'
import { PROFILE_CONFIG } from '@/config/profile'
import { useLanguage } from '@/contexts/LanguageContext'
import { websiteContent } from '@/locales/content'

const Footer = () => {
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

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass border-t border-cyan-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.navigateTitle')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-cyan-300 transition-colors">
                  {t('footer.links.about')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-cyan-300 transition-colors">
                  {t('footer.links.dailyBlog')}
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-gray-300 hover:text-cyan-300 transition-colors">
                  {t('footer.links.kaliTools')}
                </Link>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-cyan-300 transition-colors">
                  {t('footer.links.builtByG1ASS')}
                </a>
              </li>
              <li>
                <a href="#certifications" className="text-gray-300 hover:text-cyan-300 transition-colors">
                  {t('footer.links.certifications')}
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.connect')}</h3>
            <div className="flex space-x-4">
              {/* Facebook */}
              <motion.a
                href={PROFILE_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                aria-label="Facebook"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-10 h-10 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500/20 group-hover:border-blue-400/40">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(59, 130, 246)",
                      filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Facebook className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                  </motion.div>
                </div>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href={PROFILE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                aria-label="Instagram"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-10 h-10 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-pink-500/20 group-hover:border-pink-400/40">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(236, 72, 153)",
                      filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Instagram className="w-5 h-5 text-gray-300 group-hover:text-pink-400 transition-colors" />
                  </motion.div>
                </div>
              </motion.a>

              

              {/* X */}
              <motion.a
                href={PROFILE_CONFIG.socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                aria-label="X"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-10 h-10 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500/20 group-hover:border-sky-400/40">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(14, 165, 233)",
                      filter: "drop-shadow(0 0 8px rgba(14, 165, 233, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Send className="w-5 h-5 text-gray-300 group-hover:text-sky-400 transition-colors" />
                  </motion.div>
                </div>
              </motion.a>

              {/* Telegram */}
              <motion.a
                href={PROFILE_CONFIG.socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
                aria-label="Telegram"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-10 h-10 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500/20 group-hover:border-sky-400/40">
                  <motion.div
                    whileHover={{ 
                      color: "rgb(6, 182, 212)",
                      filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-5 h-5 text-gray-300 group-hover:text-sky-400 transition-colors" />
                  </motion.div>
                </div>
              </motion.a>


              
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.g1ass')}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 pt-8 border-t border-cyan-500/20 text-center"
        >
          <p className="text-gray-400">
            ©{t('footer.rights')}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
