'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { websiteContent } from '@/locales/content'

type ContentKey = keyof typeof websiteContent.en

export const useContentTranslation = () => {
  const { currentLanguage } = useLanguage()

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = websiteContent[currentLanguage as keyof typeof websiteContent]
    
    // Fallback to English if current language doesn't have the key
    if (!value) {
      value = websiteContent.en
    }
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const getContent = (section: string) => {
    const langContent = websiteContent[currentLanguage as keyof typeof websiteContent]
    if (langContent && section in langContent) {
      return (langContent as any)[section]
    }
    return (websiteContent.en as any)[section]
  }

  return { t, getContent, currentLanguage }
}
