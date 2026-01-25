-- Create the projects table in Supabase
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    category TEXT,
    link TEXT,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comments for documentation
COMMENT ON TABLE projects IS 'Projects built by G1ASS';
COMMENT ON COLUMN projects.id IS 'Unique identifier for each project';
COMMENT ON COLUMN projects.title IS 'Project name/title';
COMMENT ON COLUMN projects.description IS 'Brief description of the project';
COMMENT ON COLUMN projects.content IS 'Detailed project content with markdown formatting';
COMMENT ON COLUMN projects.image_url IS 'URL to project image or screenshot';
COMMENT ON COLUMN projects.category IS 'Category classification (e.g., AppDev, WebDev, Security, etc.)';
COMMENT ON COLUMN projects.link IS 'External link to project demo, GitHub, or documentation';
COMMENT ON COLUMN projects.video_url IS 'YouTube video URL for project demo';
COMMENT ON COLUMN projects.created_at IS 'Timestamp when the project was added';

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later)
CREATE POLICY "Enable all operations for all users" ON projects
    FOR ALL USING (true);

-- Insert sample data (optional - you can remove this if you want to start with empty table)
INSERT INTO projects (title, description, content, image_url, category, link, video_url) VALUES
(
    'SoulSync App',
    'Building an Android app for emotional synchronization using AI.',
    '# SoulSync App\n\n## Overview\nSoulSync is an innovative Android application that leverages artificial intelligence to enable emotional synchronization between friends and family members.\n\n## Features\n\n- **Real-time mood tracking** using AI-powered sentiment analysis\n- **Emotional synchronization** algorithms\n- **Privacy-focused** data handling\n- **Cross-platform compatibility**\n\n## Technology Stack\n\n- **Frontend**: React Native\n- **Backend**: Node.js with Express\n- **AI/ML**: TensorFlow Lite for on-device processing\n- **Database**: Firebase Realtime Database\n\n## Screenshots\n\n![App Screenshot](https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center)\n\n## Installation\n\n```bash\nnpm install\nnpm run android\n```\n\n## Future Plans\n\n- Integration with wearable devices\n- Advanced emotion recognition\n- Social features and communities',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    'AppDev',
    'https://github.com/g1ass/soulsync',
    'https://www.youtube.com/embed/dQw4w9WgXcQ'
),
(
    'WiFi Security Scanner',
    'Advanced WiFi network security auditing tool.',
    '# WiFi Security Scanner\n\n## Overview\nA comprehensive WiFi security auditing tool designed for penetration testers and security professionals.\n\n## Capabilities\n\n- **Network Discovery**: Scan for nearby WiFi networks\n- **Security Analysis**: Identify encryption types and vulnerabilities\n- **Password Testing**: Test network security with various attack methods\n- **Reporting**: Generate detailed security reports\n\n## Features\n\n| Feature | Description |\n|---------|-------------|\n| WPA3 Support | Latest WiFi security protocols |\n| Enterprise Networks | Support for corporate networks |\n| Vulnerability Assessment | Comprehensive security checks |\n| Real-time Monitoring | Continuous network monitoring |\n\n## Installation\n\n```bash\ngit clone https://github.com/g1ass/wifi-scanner\ncd wifi-scanner\npip install -r requirements.txt\npython main.py\n```\n\n## Usage\n\n1. Launch the application\n2. Select network interface\n3. Start scanning\n4. Review security report\n\n## Legal Notice\n\nThis tool is for educational purposes only. Always obtain proper authorization before testing any networks.',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop&crop=center',
    'Security',
    'https://github.com/g1ass/wifi-scanner',
    'https://www.youtube.com/embed/example2'
),
(
    'Trading Platform Dashboard',
    'Real-time cryptocurrency trading platform.',
    '# Trading Platform Dashboard\n\n## Overview\nA sophisticated cryptocurrency trading platform with advanced charting and portfolio management capabilities.\n\n## Key Features\n\n### Real-time Data\n- Live price feeds from multiple exchanges\n- WebSocket connections for instant updates\n- Customizable alerts and notifications\n\n### Trading Tools\n- Advanced charting with technical indicators\n- Risk management tools\n- Automated trading strategies\n\n### Portfolio Management\n- Multi-exchange portfolio tracking\n- Profit/loss analytics\n- Tax reporting features\n\n## Technology Stack\n\n- **Frontend**: React with TypeScript\n- **Backend**: Python with FastAPI\n- **Database**: PostgreSQL with Redis for caching\n- **Real-time**: WebSocket connections\n\n## Getting Started\n\n```bash\n# Frontend\ncd frontend\nnpm install\nnpm start\n\n# Backend\ncd backend\npip install -r requirements.txt\nuvicorn main:app --reload\n```\n\n## API Documentation\n\nVisit `/docs` for interactive API documentation.\n\n## Security\n\n- Two-factor authentication\n- API rate limiting\n- Encrypted data storage\n- Regular security audits',
    'https://images.unsplash.com/photo-1611974282405-574e5292d5bb?w=400&h=200&fit=crop&crop=center',
    'WebDev',
    'https://github.com/g1ass/trading-platform',
    'https://www.youtube.com/embed/example3'
),
(
    'AI Chat Assistant',
    'Intelligent chat assistant powered by machine learning with natural language processing and contextual understanding.',
    'https://images.unsplash.com/photo-1677440106022-d2c6b18c6fc2?w=400&h=200&fit=crop&crop=center',
    'AI/ML',
    'https://github.com/g1ass/ai-assistant',
    'https://www.youtube.com/embed/example4'
),
(
    'E-commerce Platform',
    'Full-featured e-commerce solution with inventory management, payment processing, and analytics dashboard.',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop&crop=center',
    'WebDev',
    'https://github.com/g1ass/ecommerce-platform',
    'https://www.youtube.com/embed/example5'
),
(
    'Blockchain Voting System',
    'Secure and transparent voting system built on blockchain technology with smart contracts and result verification.',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop&crop=center',
    'Blockchain',
    'https://github.com/g1ass/blockchain-voting',
    'https://www.youtube.com/embed/example6'
);
