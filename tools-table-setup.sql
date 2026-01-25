-- Create the tools table in Supabase
CREATE TABLE IF NOT EXISTS tools (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    category TEXT,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comments for documentation
COMMENT ON TABLE tools IS 'Kali Linux Tools and security utilities';
COMMENT ON COLUMN tools.id IS 'Unique identifier for each tool';
COMMENT ON COLUMN tools.title IS 'Tool name/title';
COMMENT ON COLUMN tools.description IS 'Detailed description of the tool';
COMMENT ON COLUMN tools.image_url IS 'URL to tool image or icon';
COMMENT ON COLUMN tools.category IS 'Category classification (e.g., Reconnaissance, Scanning, etc.)';
COMMENT ON COLUMN tools.link IS 'External link to tool documentation or download';
COMMENT ON COLUMN tools.created_at IS 'Timestamp when the tool was added';

-- Enable Row Level Security (RLS)
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later)
CREATE POLICY "Enable all operations for all users" ON tools
    FOR ALL USING (true);

-- Insert sample data (optional - you can remove this if you want to start with empty table)
INSERT INTO tools (title, description, image_url, category, link) VALUES
(
    'Network Scanner',
    'Advanced network reconnaissance and vulnerability scanning tool for discovering hosts and services.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop&crop=center',
    'Reconnaissance',
    'https://github.com/g1ass/network-scanner'
),
(
    'Password Cracker',
    'Multi-threaded password recovery and cracking utility with support for various hash algorithms.',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop&crop=center',
    'Authentication',
    'https://github.com/g1ass/password-cracker'
),
(
    'Port Analyzer',
    'Comprehensive port scanning and service detection tool with advanced filtering capabilities.',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop&crop=center',
    'Scanning',
    'https://github.com/g1ass/port-analyzer'
),
(
    'Wireless Auditor',
    'WiFi security auditing tool for testing wireless network vulnerabilities and encryption strength.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&crop=center',
    'Wireless',
    'https://github.com/g1ass/wireless-auditor'
),
(
    'Web Vulnerability Scanner',
    'Automated web application security scanner for detecting common vulnerabilities and misconfigurations.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center',
    'Web Security',
    'https://github.com/g1ass/web-vuln-scanner'
),
(
    'Forensic Toolkit',
    'Digital forensic analysis toolkit for data recovery, file carving, and incident response.',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop&crop=center',
    'Forensics',
    'https://github.com/g1ass/forensic-toolkit'
);
