'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'my' | 'th' | 'es' | 'zh'

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: string, options?: { defaultValue?: string; [key: string]: any }) => string
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
      learning: 'Learning & Sharing',
      projects: 'Projects',
      kaliTools: 'Kali Linux Tools'
    },
    learningDescription: 'Explore my latest insights, tutorials, and discoveries in web development, security, and emerging technologies.',
    kaliDescription: 'Master the art of ethical hacking with my curated list of essential Kali Linux tools for penetration testing and security auditing.',
    terminalDescription: 'Watch as I scan networks and discover vulnerabilities in real-time.',
    learning_title: 'Learning & Sharing',
    learning_title_part1: 'Learning &',
    learning_title_part2: 'Sharing',
    search_placeholder: 'Search categories...',
    back_to_learning: 'Back to Learning',
    explore_desc: {
      single: 'Explore {{count}} post about {{name}}. Discover tutorials, insights, and best practices.',
      plural: 'Explore {{count}} posts about {{name}}. Discover tutorials, insights, and best practices.'
    },
    categoryDescription: {
      single: 'Explore {{count}} post about {{name}}. Discover tutorials, insights, and best practices in this area.',
      plural: 'Explore {{count}} posts about {{name}}. Discover tutorials, insights, and best practices in this area.'
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
      home: 'ပင်မ',
      about: 'အကြောင်း',
      services: 'ဝန်ဆောင်မှု',
      contact: 'ဆက်သွယ်',
      dailyBlog: 'နေ့စဉ်ဘလော့',
      blogTitle: 'လေ့လာမှုနှင့် မျှဝေမှု',
      learning: 'လေ့လာမှုနှင့် မျှဝေမှု',
      projects: 'စီမံကိန်းများ',
      kaliTools: 'Kali ကိရိယာ'
    },
    learningDescription: 'ဝက်ဘ်ဖွံ့ဖြိုးတိုးတက်မှု၊ လုံခြုံရေးနှင့် ပေါ်ထွက်လာသော နည်းချက်များကို အချိန်နှင့်တပြေးညီ ရှာဖွေဖော်ထုတ်နေမှုကို ကြည့်ရှုပါ။',
    kaliDescription: 'Penetration testing နှင့် လုံခြုံရေးစစ်ဆေးခြင်းများအတွက် လိုအပ်သော Kali Linux လက်နက်များကို ဤနေရာတွင် လေ့လာနိုင်ပါသည်။',
    terminalDescription: 'ကွန်ရက်များကို စစ်ဆေးပြီး အားနည်းချက်များကို အချိန်နှင့်တပြေးညီ ရှာဖွေဖော်ထုတ်နေမှုကို ကြည့်ရှုပါ။',
    learning_title: 'လေ့လာမှုနှင့် မျှဝေခြင်း',
    learning_title_part1: 'လေ့လာမှုနှင့်',
    learning_title_part2: 'မျှဝေခြင်း',
    search_placeholder: 'အမျိုးအစားများကို ရှာဖွေပါ...',
    back_to_learning: 'လေ့လာမှုသို့ ပြန်သွားရန်',
    explore_desc: '{{name}} နှင့ပတ်သက်သော သင်ခန်းစာ {{count}} ခုကို လေ့လာပါ။ နည်းပညာနှင့် အကောင်းအထောက်အပံ့များကို ရှာဖွေနိုင်ပါသည်။',
    categoryDescription: '{{name}} နှင့်ပတ်သက်သော သင်ခန်းစာ {{count}} ခုကို လေ့လာပါ။ ဤကဏ္ဍတွင် နည်းပညာအသစ်များနှင့် ကောင်းမွန်သော လုပ်ဆောင်ချက်များကို ရှာဖွေနိုင်ပါသည်။',
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
      dailyBlog: 'บล็อก',
      blogTitle: 'การเรียนรู้และการแชร์',
      learning: 'เรียนรู้',
      projects: 'โครงการ',
      kaliTools: 'เครื่องมือ Kali'
    },
    learningDescription: 'สำรวจข้อมูลเชิงลึก บทเรียน และการค้นพบล่าสุดของฉันในการพัฒนาเว็บ ความปลอดภัย และเทคโนโลยีที่กำลังเติบโต',
    kaliDescription: 'เรียนรู้ศิลปะการเจาะระบบอย่างมีจริยธรรมด้วยเครื่องมือ Kali Linux ที่จำเป็นสำหรับการทดสอบการเจาะระบบ',
    terminalDescription: 'ดูขณะที่ฉันสแกนเครือข่ายและค้นหาช่องโหว่แบบเรียลไทม์',
    learning_title: 'การเรียนรู้และการแบ่งปัน',
    learning_title_part1: 'การเรียนรู้ &',
    learning_title_part2: 'การแบ่งปัน',
    search_placeholder: 'ค้นหาหมวดหมู่...',
    back_to_learning: 'กลับไปที่การเรียนรู้',
    explore_desc: {
      single: 'สำรวจ {{count}} บทความเกี่ยวกับ {{name}} ค้นพบบทเรียน ข้อมูลเชิงลึก และแนวทางปฏิบัติที่ดีที่สุด',
      plural: 'สำรวจ {{count}} บทความเกี่ยวกับ {{name}} ค้นพบบทเรียน ข้อมูลเชิงลึก และแนวทางปฏิบัติที่ดีที่สุด'
    },
    categoryDescription: {
      single: 'สำรวจ {{count}} บทความเกี่ยวกับ {{name}} ค้นพบบทเรียน ข้อมูลเชิงลึก และแนวทางปฏิบัติที่ดีที่สุดในด้านนี้',
      plural: 'สำรวจ {{count}} บทความเกี่ยวกับ {{name}} ค้นพบบทเรียน ข้อมูลเชิงลึก และแนวทางปฏิบัติที่ดีที่สุดในด้านนี้'
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
      about: 'Acerca',
      services: 'Servicios',
      contact: 'Contacto',
      dailyBlog: 'Blog Diario',
      blogTitle: 'Aprender y Compartir',
      learning: 'Aprender',
      projects: 'Proyectos',
      kaliTools: 'Herramientas Kali'
    },
    learningDescription: 'Explora mis últimos conocimientos, tutoriales y descubrimientos en desarrollo web, seguridad y tecnologías emergentes.',
    kaliDescription: 'Domina el arte del hacking ético con mi lista de herramientas esenciales de Kali Linux para pruebas de penetración.',
    terminalDescription: 'Mira como escaneo redes y descubro vulnerabilidades en tiempo real.',
    learning_title: 'Aprender y Compartir',
    learning_title_part1: 'Aprender &',
    learning_title_part2: 'Compartir',
    search_placeholder: 'Buscar categorías...',
    back_to_learning: 'Volver al Aprendizaje',
    explore_desc: {
      single: 'Explora {{count}} publicación sobre {{name}}. Descubre tutoriales, ideas y mejores prácticas.',
      plural: 'Explora {{count}} publicaciones sobre {{name}}. Descubre tutoriales, ideas y mejores prácticas.'
    },
    categoryDescription: {
      single: 'Explora {{count}} publicación sobre {{name}}. Descubre tutoriales, ideas y mejores prácticas en esta área.',
      plural: 'Explora {{count}} publicaciones sobre {{name}}. Descubre tutoriales, ideas y mejores prácticas en esta área.'
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
      dailyBlog: '每日博客',
      blogTitle: '学习与分享',
      learning: '学习',
      projects: '项目',
      kaliTools: 'Kali 工具'
    },
    learningDescription: '探索我在网页开发、安全和新兴技术方面的最新见解、教程和发现。',
    kaliDescription: '掌握道德黑客的艺术，使用我精选的Kali Linux基本工具进行渗透测试和安全审计。',
    terminalDescription: '观看我扫描网络并实时发现漏洞。',
    learning_title: '学习与分享',
    learning_title_part1: '学习 &',
    learning_title_part2: '分享',
    search_placeholder: '搜索分类...',
    back_to_learning: '返回学习',
    explore_desc: {
      single: '探索关于 {{name}} 的 {{count}} 篇文章。发现本领域的教程、见解和最佳实践。',
      plural: '探索关于 {{name}} 的 {{count}} 篇文章。发现本领域的教程、见解和最佳实践。'
    },
    categoryDescription: {
      single: '探索关于 {{name}} 的 {{count}} 篇文章。发现本领域的教程、见解和最佳实践。',
      plural: '探索关于 {{name}} 的 {{count}} 篇文章。发现本领域的教程、见解和最佳实践。'
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

// Get language from localStorage with fallback
const getStoredLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('selectedLanguage')
      if (stored && ['en', 'my', 'th', 'es', 'zh'].includes(stored)) {
        console.log('📦 Loaded language from localStorage:', stored)
        return stored as Language
      }
    } catch (error) {
      console.error('Error reading localStorage:', error)
    }
  }
  console.log('📦 No stored language, using fallback: en')
  return 'en'
}

// Save language to localStorage
const saveLanguageToStorage = (language: Language) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('selectedLanguage', language)
      console.log('💾 Saved language to localStorage:', language)
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Initialize from localStorage, NOT hardcoded 'en'
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    return getStoredLanguage()
  })

  // Sync with localStorage on mount and language changes
  useEffect(() => {
    const storedLanguage = getStoredLanguage()
    if (storedLanguage !== currentLanguage) {
      console.log('🔄 Syncing language with localStorage:', storedLanguage)
      setCurrentLanguage(storedLanguage)
    }
  }, [])

  const setLanguage = (language: Language) => {
    console.log('=== LANGUAGE CONTEXT UPDATE ===')
    console.log('Previous language:', currentLanguage)
    console.log('New language:', language)
    
    setCurrentLanguage(language)
    saveLanguageToStorage(language)
    
    console.log('✅ Language updated and saved to localStorage')
    console.log('=== END LANGUAGE CONTEXT UPDATE ===')
  }
  const t = (key: string, options?: { defaultValue?: string; [key: string]: any }): string => {
    console.log('=== TRANSLATION DEBUG ===')
    console.log('Looking for key:', key)
    console.log('Options:', options)
    
    const keys = key.split('.')
    let value: any = translations[currentLanguage]
    
    console.log('Current language:', currentLanguage)
    console.log('Available keys in language:', Object.keys(translations[currentLanguage] || {}))
    
    // Check if the entire language dictionary exists
    if (!translations[currentLanguage]) {
      console.warn(`Language dictionary for '${currentLanguage}' not found, falling back to English`)
      value = translations['en']
    } else {
      // Navigate through the nested keys
      for (const k of keys) {
        value = value?.[k]
        console.log(`After navigating to '${k}':`, value)
      }
    }
    
    console.log('Final value:', value)
    
    // If translation not found in current language, fallback to English
    if (value === undefined || value === null) {
      console.warn(`Translation key '${key}' not found for '${currentLanguage}', falling back to English`)
      let fallbackValue: any = translations['en']
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k]
        console.log(`English fallback after '${k}':`, fallbackValue)
      }
      
      // If English fallback also not found, use defaultValue or return the key
      if (fallbackValue === undefined || fallbackValue === null) {
        console.warn(`Translation key '${key}' not found in English fallback, using defaultValue or key`)
        return options?.defaultValue || key
      }
      
      value = fallbackValue
    }
    
    // Handle variable interpolation (e.g., {{count}}, {{name}})
    if (typeof value === 'string' && options) {
      const interpolated = value.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        const replacement = options[key] !== undefined ? String(options[key]) : match
        console.log(`Replacing {{${key}}} with:`, replacement)
        return replacement
      })
      console.log('Interpolated result:', interpolated)
      return interpolated
    }
    
    // Handle pluralization if value is an object with single/plural
    if (typeof value === 'object' && value !== null) {
      console.log('Value is object, handling pluralization')
      const count = options?.count || 1
      console.log('Count for pluralization:', count)
      
      let selectedValue: string
      // Treat 0 as plural, 1 as singular
      if (count === 1 && value.single) {
        console.log('Using singular form:', value.single)
        selectedValue = value.single
      } else if (count !== 1 && value.plural) {
        console.log('Using plural form:', value.plural)
        selectedValue = value.plural
      } else {
        // Default to first available value
        const firstValue = Object.values(value)[0]
        selectedValue = firstValue ? String(firstValue) : String(options?.defaultValue || key)
      }
      
      // Handle interpolation for the selected value
      if (typeof selectedValue === 'string' && options) {
        const interpolated = selectedValue.replace(/\{\{(\w+)\}\}/g, (match, key) => {
          const replacement = options[key] !== undefined ? String(options[key]) : match
          console.log(`Replacing {{${key}}} with:`, replacement)
          return replacement
        })
        console.log('Interpolated result:', interpolated)
        return interpolated
      }
      
      return String(selectedValue)
    }
    
    console.log('Final return value:', String(value || options?.defaultValue || key))
    console.log('=== END TRANSLATION DEBUG ===')
    
    return String(value || options?.defaultValue || key)
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
