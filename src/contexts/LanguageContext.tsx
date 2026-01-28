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
      learning: 'Learning & Sharing',
      projects: 'Projects',
      kaliTools: 'Kali Linux Tools'
    },
    learningDescription: 'Explore my latest insights, tutorials, and discoveries in web development, security, and emerging technologies.',
    kaliDescription: 'Master the art of ethical hacking with my curated list of essential Kali Linux tools for penetration testing and security auditing.',
    terminalDescription: 'Watch as I scan networks and discover vulnerabilities in real-time.',
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
    terminalDescription: 'ดูขณะที่ฉันสแกนเครือข่ายและค้นหาช่องโหว่แบบเรียนไทม์',
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
      dailyBlog: '博客',
      blogTitle: '学习与分享',
      learning: '学习',
      projects: '项目',
      kaliTools: 'Kali 工具'
    },
    learningDescription: '探索我在网页开发、安全和新兴技术方面的最新见解、教程和发现。',
    kaliDescription: '掌握道德黑客的艺术，使用我精选的Kali Linux基本工具进行渗透测试和安全审计。',
    terminalDescription: '观看我扫描网络并实时发现漏洞。',
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
