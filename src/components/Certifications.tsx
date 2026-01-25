'use client'

import { motion } from 'framer-motion'
import { PROFILE_CONFIG } from '@/config/profile'
import { useLanguage } from '@/contexts/LanguageContext'
import { websiteContent } from '@/locales/content'

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  verifyUrl: string
}

interface CertificationsProps {
  className?: string
}

export const Certifications: React.FC<CertificationsProps> = ({ className = '' }) => {
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

  const handleVerifyCredential = (verifyUrl: string) => {
    window.open(verifyUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {t('hero.certificationsTitle')}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROFILE_CONFIG.certifications.map((cert: Certification, index: number) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)"
                }}
                className="glass p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center">
                  {/* Certification Badge */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.1,
                      filter: "drop-shadow(0 0 12px rgba(34, 211, 238, 0.8))"
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 mb-4 rounded-lg overflow-hidden"
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Certification Details */}
                  <div className="flex-1 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-cyan-300 text-sm font-medium mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {cert.date}
                    </p>
                  </div>
                </div>

                {/* Verify Button */}
                <div className="mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVerifyCredential(cert.verifyUrl)}
                    className="w-full px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded-lg font-medium hover:bg-cyan-500/30 hover:border-cyan-400/60 transition-colors"
                  >
                    Verify Credential
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
