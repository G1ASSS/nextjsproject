-- First, get the category UUIDs (run this first)
SELECT id, name, slug FROM categories WHERE slug IN ('html', 'security', 'next.js') ORDER BY name;

-- Then replace these UUIDs in the INSERT statements below
-- HTML_UUID_HERE = UUID from HTML category
-- SECURITY_UUID_HERE = UUID from Security category
-- NEXTJS_UUID_HERE = UUID from Next.js category

-- English Posts
INSERT INTO blogs (title, slug, author_name, description, content, image_url, video_url, category_id, status, language) VALUES
(
  'Modern HTML5 Features',
  'modern-html5-features',
  'G1ASS',
  'Explore the latest HTML5 features including semantic elements, multimedia support, and powerful APIs that enhance web development.',
  '# Modern HTML5 Features

HTML5 has revolutionized web development with semantic elements, multimedia support, and powerful APIs. Learn about the latest HTML5 features that can enhance your web applications and improve user experience.

## Key Features Covered

### Semantic HTML Elements
- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- Better accessibility and SEO
- Clear document structure

### Multimedia Support
- Native audio and video elements
- Canvas and SVG graphics
- Responsive images with srcset

### Web Storage APIs
- localStorage for persistent data
- sessionStorage for session data
- IndexedDB for complex data storage

### Geolocation API
- User location detection
- Privacy considerations
- Practical use cases

### Web Workers
- Background JavaScript execution
- Improved performance
- Real-time data processing

## Benefits for Modern Development

HTML5 features provide better user experience, improved performance, and enhanced accessibility for modern web applications.',
  'https://images.unsplash.com/photo-1627398242455-45a1465c2479?w=800&h=400&fit=crop&crop=center',
  'https://www.youtube.com/embed/3JZ_D3ELwOQ',
  'HTML_UUID_HERE', -- Replace with actual HTML category UUID
  'published',
  'en'
),
(
  'Introduction to Web Security',
  'introduction-to-web-security',
  'G1ASS',
  'Learn the fundamentals of web security including common vulnerabilities, best practices, and essential tools for protecting modern web applications.',
  '# Introduction to Web Security

Web security is a critical aspect of modern web development. In this comprehensive guide, we explore the fundamental concepts of web security, including common vulnerabilities, best practices, and tools you can use to protect your applications.

## OWASP Top 10 Vulnerabilities

### 1. Injection Flaws
- SQL Injection
- NoSQL Injection
- Command Injection

### 2. Broken Authentication
- Weak passwords
- Session management
- Multi-factor authentication

### 3. Sensitive Data Exposure
- Data encryption
- Secure transmission
- Storage security

### 4. XML External Entities (XXE)
- XML parsing vulnerabilities
- Secure XML processing

### 5. Broken Access Control
- Authorization flaws
- Privilege escalation
- Secure access patterns

## Security Best Practices

### Input Validation
- Sanitize all user inputs
- Use parameterized queries
- Implement content security policies

### Authentication & Authorization
- Strong password policies
- Session management
- Role-based access control

### Data Protection
- Encryption at rest and in transit
- Secure key management
- Privacy compliance

## Essential Security Tools

- **OWASP ZAP**: Web application security scanner
- **Burp Suite**: Web vulnerability testing
- **Nessus**: Network vulnerability assessment
- **Metasploit**: Penetration testing framework

This foundation will help you build more secure and robust web applications.',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&crop=center',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'SECURITY_UUID_HERE', -- Replace with actual Security category UUID
  'published',
  'en'
);

-- Myanmar Posts (Translated content)
INSERT INTO blogs (title, slug, author_name, description, content, image_url, video_url, category_id, status, language) VALUES
(
  'ခေတ်မီ HTML5 အင်္ဂါရပ်များ',
  'modern-html5-features-my',
  'G1ASS',
  'ဆီမန်တစ် HTML ဒြပ်စင်များ၊ မာလတီမီဒီယာထောက်ပံ့မှုနှင့် ဝက်ဘ်ဖွံ့ဖြိုးတိုးတက်ရေးအတွက် အင်္ဂါရပ်များကို လေ့လာပါ။',
  '# ခေတ်မီ HTML5 အင်္ဂါရပ်များ

HTML5 သည် ဆီမန်တစ် HTML ဒြပ်စင်များ၊ မာလတီမီဒီယာထောက်ပံ့မှုနှင့် အင်္ဂါရပ်များဖြင့် ဝက်ဘ်ဖွံ့ဖြိုးတိုးတက်ရေးကို တော်လှန်ခဲ့ပါသည်။

## အဓိက အင်္ဂါရပ်များ

### ဆီမန်တစ် HTML ဒြပ်စင်များ
- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- ပိုမိုကောင်းမွန်သော ဝင်ရောက်နိုင်မှုနှင့် SEO
- ရှင်းလင်းသော စာရွက်စာတမ်း ဖွဲ့စည်းပုံ

### မာလတီမီဒီယာထောက်ပံ့မှု
- ဒေတာအသံနှင့် ဗီဒီယိုဒြပ်စင်များ
- Canvas နှင့် SVG ဂရပ်ဖစ်များ
- srcset ဖြင့် တုံ့ပြန်ပုံစံ ပုံရိပ်များ

### ဝက်ဘ်သိုလှောင်း API များ
- localStorage သည် ဆက်လက်တည်ရှိသော ဒေတာအတွက်
- sessionStorage သည် ဆက်ရှင်ဒေတာအတွက်
- IndexedDB သည် ရှုပ်ထွေးသော ဒေတာသိုလှောင်းမှုအတွက်

### တည်နေရာ API
- အသုံးပြုသူ၏ တည်နေရာ ရှာဖွေခြင်း
- ကိုယ်ရေးကိုယ်တာ စဉ်းစားချက်များ
- လက်တွေ့အသုံးချ အခြေအနေများ

### ဝက်ဘ်အလုပ်သမားများ
- နောက်ခံ JavaScript လုပ်ဆောင်ခြင်း
- ပိုမိုကောင်းမွန်သော စွမ်းဆောင်ရည်
- အချိန်နှင့်တပြိုင် ဒေတာဆက်လက်လုပ်ဆောင်ခြင်း

## ခေတ်မီဖွံ့ဖြိုးတိုးတက်ရေးအတွက် အကျိုးခံစားခွင့်များ

HTML5 အင်္ဂါရပ်များသည် ခေတ်မီဝက်ဘ်အက်ပလီကေးရှင်းများအတွက် ပိုမိုကောင်းမွန်သော အသုံးပြုသူအတွေ့အကြုံ၊ တိုးတက်လာသော စွမ်းဆောင်ရည်နှင့် ပိုမိုကောင်းမွန်သော ဝင်ရောက်နိုင်မှုတို့ကို ပေးဆောင်ပါသည်။',
  'https://images.unsplash.com/photo-1627398242455-45a1465c2479?w=800&h=400&fit=crop&crop=center',
  'https://www.youtube.com/embed/3JZ_D3ELwOQ',
  'HTML_UUID_HERE', -- Replace with actual HTML category UUID
  'published',
  'my'
),
(
  'ဝက်ဘ်လုံခြုံရေး မိတ်ဆက်ခြင်း',
  'introduction-to-web-security-my',
  'G1ASS',
  'ဝက်ဘ်လုံခြုံရေး၏ အခြေခံအကြောင်းအရာများ၊ အန္တရာယ်ရှိသော အားနည်းချက်များ၊ အကောင်းဆုံးလုပ်ထုံးများနှင့် ခေတ်မီဝက်ဘ်အက်ပလီကေးရှင်းများကို ကာကွယ်ရန် လိုအပ်သော ကိရိယာများကို လေ့လာပါ။',
  '# ဝက်ဘ်လုံခြုံရေး မိတ်ဆက်ခြင်း

ဝက်ဘ်လုံခြုံရေးသည် ခေတ်မီဝက်ဘ်ဖွံ့ဖြိုးတိုးတက်ရေး၏ အရေးကြီးသော အစိတ်အပိုင်ဖြစ်သည်။ ဤကျယ်ပြန့်သော �မ်းညွှန်းတွင် ဝက်ဘ်လုံခြုံရေး၏ အခြေခံသဘောတရားများ၊ အန္တရာယ်ရှိသော အားနည်းချက်များ၊ အကောင်းဆုံးလုပ်ထုံးများနှင့် သင့်အက်ပလီကေးရှင်းများကို ကာကွယ်ရန် အသုံးဝင်သော ကိရိယာများကို ရှာဖွေတွေ့ရှိပါသည်။

## OWASP ထိပ်ဆုံး အန္တရာယ်ရှိသော အားနည်းချက်များ

### ၁. ထည့်သွင်းခြင်း ချို့ယွင်းချက်များ
- SQL ထည့်သွင်းခြင်း
- NoSQL ထည့်သွင်းခြင်း
- ညွှန်ကြားချက် ထည့်သွင်းခြင်း

### ၂. ပျက်စီးသော အထောက်အထားစစ်ဆေးခြင်း
- အားနည်းသော စကားဝှက်များ
- ဆက်ရှင်စီမံခန့်ခွဲမှု
- များပြားသော အချက်အလက် အထောက်အထားစစ်ဆေးခြင်း

### ၃. ထိခိုက်လွယ်သော ဒေတာ ဖော်ပြခြင်း
- ဒေတာစာဝှက်ရေး
- လုံခြုံစွာ ပို့ဆောင်ခြင်း
- သိုလှောင်းခြင်း လုံခြုံရေး

ဤအခြေခံသည် သင့်အနေဖြင့် ပိုမိုလုံခြုံသောနှင့် ခိုင်မာသော ဝက်ဘ်အက်ပလီကေးရှင်းများ တည်ဆောက်ရန် ကူညီပေးပါသည်။',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&crop=center',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'SECURITY_UUID_HERE', -- Replace with actual Security category UUID
  'published',
  'my'
);

-- Verify all inserted posts
SELECT 
  b.id,
  b.title,
  b.slug,
  b.language,
  b.category_id,
  c.name as category_name,
  c.slug as category_slug,
  b.status,
  b.created_at
FROM blogs b 
JOIN categories c ON b.category_id = c.id 
WHERE b.status = 'published'
ORDER BY c.name, b.language, b.title;
