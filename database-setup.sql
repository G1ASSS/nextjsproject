-- Drop existing blogs table if it exists
DROP TABLE IF EXISTS blogs;

-- Create blogs table with proper structure matching BlogPost interface
CREATE TABLE blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author TEXT,
    image_url TEXT,
    category TEXT,
    tags TEXT[],
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for better query performance
CREATE INDEX idx_blogs_published ON blogs(published);
CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);
CREATE INDEX idx_blogs_category ON blogs(category);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to published posts
CREATE POLICY "Published posts are viewable by everyone" ON blogs
    FOR SELECT USING (published = true);

-- Create policy to allow full access for authenticated users (optional)
CREATE POLICY "Authenticated users can manage posts" ON blogs
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert seed data
INSERT INTO blogs (title, content, excerpt, author, image_url, category, tags, published) VALUES
(
    'Advanced Kali Linux Security Techniques',
    'In this comprehensive guide, we explore advanced penetration testing methodologies using Kali Linux. From network reconnaissance to vulnerability assessment, this post covers essential tools and techniques that every security professional should master. We''ll dive deep into tools like Nmap, Metasploit, and Burp Suite, demonstrating practical scenarios and real-world applications.',
    'Master advanced penetration testing tools and techniques for ethical hacking and security auditing with Kali Linux.',
    'G1ASS Security Team',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    'Security',
    ARRAY['Security', 'Penetration Testing', 'Ethical Hacking', 'Kali Linux', 'Network Security'],
    true
),
(
    'Next.js 14 Performance Optimization Guide',
    'Building lightning-fast web applications requires understanding the intricacies of Next.js 14. This guide covers server components, client components, advanced caching strategies, image optimization, and bundle splitting. Learn how to leverage the App Router, implement proper data fetching patterns, and optimize your application for both Core Web Vitals and user experience.',
    'Build high-performance web applications with Next.js 14, server components, and advanced optimization strategies.',
    'G1ASS Development Team',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop&crop=center',
    'Web Development',
    ARRAY['Web Development', 'React', 'Next.js', 'Performance', 'JavaScript', 'TypeScript'],
    true
),
(
    'Python for Security Automation',
    'Automating security tasks with Python can significantly improve efficiency and accuracy. This post explores how to build powerful security scripts for network scanning, vulnerability assessment, log analysis, and automated reporting. We''ll cover libraries like Scapy, Requests, BeautifulSoup, and demonstrate how to create custom tools for your security arsenal.',
    'Automate security workflows with Python - from network scanning to vulnerability assessment and reporting.',
    'G1ASS Automation Team',
    'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop&crop=center',
    'Python',
    ARRAY['Python', 'Automation', 'Security', 'Programming', 'Scripting', 'DevOps'],
    true
);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blogs_updated_at 
    BEFORE UPDATE ON blogs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Verify the data was inserted correctly
SELECT 
    id, 
    title, 
    excerpt, 
    author, 
    category, 
    tags, 
    published, 
    created_at,
    updated_at
FROM blogs 
ORDER BY created_at DESC;
