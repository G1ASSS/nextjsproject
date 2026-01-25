'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Language = 'en' | 'my' | 'th' | 'es' | 'zh'

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      dailyBlog: 'Daily Learning Blog',
      blogTitle: 'Learning & Sharing',
      kaliTools: 'Kali Linux Tools',
      projects: 'Projects'
    },
    languages: {
      en: 'English',
      my: 'Myanmar',
      th: 'Thailand',
      es: 'Spain',
      zh: 'Chinese'
    }
  },
  my: {
    nav: {
      home: 'ပင်မစာမျက်နှာ',
      about: 'အကြောင်း',
      services: 'ဝန်ဆောင်မှုများ',
      contact: 'ဆက်သွယ်ရန်',
      dailyBlog: 'နေ့စဉ်လေ့လာရေးဘလော့',
      blogTitle: 'လေ့လာမှုနှင့် မျှဝေမှု',
      kaliTools: 'Kali Linux ကိရိယာများ',
      projects: 'စီမံကိန်းများ'
    },
    languages: {
      en: 'English',
      my: 'မြန်မာ',
      th: 'ထိုင်း',
      es: 'စပိန်',
      zh: 'တရုတ်'
    }
  },
  th: {
    nav: {
      home: 'หน้าแรก',
      about: 'เกี่ยวกับ',
      services: 'บริการ',
      contact: 'ติดต่อ',
      dailyBlog: 'บล็อกการเรียนรู้ประจำวัน',
      blogTitle: 'การเรียนรู้และการแชร์',
      kaliTools: 'เครื่องมือ Kali Linux',
      projects: 'โครงการ'
    },
    languages: {
      en: 'English',
      my: 'พม่า',
      th: 'ไทย',
      es: 'สเปน',
      zh: 'จีน'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      services: 'Servicios',
      contact: 'Contacto',
      dailyBlog: 'Blog de Aprendizaje Diario',
      blogTitle: 'Aprendizaje y Compartir',
      kaliTools: 'Herramientas de Kali Linux',
      projects: 'Proyectos'
    },
    languages: {
      en: 'English',
      my: 'Birmania',
      th: 'Tailandia',
      es: 'España',
      zh: 'Chino'
    }
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于',
      services: '服务',
      contact: '联系',
      dailyBlog: '每日学习博客',
      blogTitle: '学习与分享',
      kaliTools: 'Kali Linux 工具',
      projects: '项目'
    },
    languages: {
      en: '英语',
      my: '缅甸',
      th: '泰国',
      es: '西班牙',
      zh: '中文'
    }
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[currentLanguage]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
