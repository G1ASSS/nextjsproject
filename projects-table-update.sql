-- Add content column to existing projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS content TEXT;

-- Update the comment for the content column
COMMENT ON COLUMN projects.content IS 'Detailed project content with markdown formatting';

-- Optional: Update existing sample data to include content
-- This will only work if you have existing rows
UPDATE projects 
SET content = 'Project content coming soon...' 
WHERE content IS NULL;

-- If you want to insert the sample data with content (run this after adding the column)
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
)
ON CONFLICT DO NOTHING;
