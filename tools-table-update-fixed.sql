-- Add content column to existing tools table
ALTER TABLE tools ADD COLUMN IF NOT EXISTS content TEXT;

-- Update the comment for the content column
COMMENT ON COLUMN tools.content IS 'Detailed tool documentation with markdown formatting';

-- Optional: Update existing sample data to include content
-- This will only work if you have existing rows
UPDATE tools 
SET content = 'Tool documentation coming soon...' 
WHERE content IS NULL;

-- If you want to insert sample data with content (run this after adding the column)
-- Note: Using dollar-quoted strings to handle complex markdown content

INSERT INTO tools (title, description, content, image_url, category, link, created_at) VALUES
(
    'Network Scanner',
    'Advanced network reconnaissance and vulnerability scanning tool for discovering hosts and services.',
    $doc$# Network Scanner

## Overview
Network Scanner is a comprehensive tool designed for network reconnaissance and vulnerability assessment. It combines multiple scanning techniques to provide detailed information about network infrastructure.

## Features

### Core Capabilities

- **Host Discovery**: Identify active hosts on the network
- **Port Scanning**: Comprehensive port scanning with multiple techniques
- **Service Detection**: Identify running services and versions
- **OS Detection**: Determine operating system of target hosts
- **Vulnerability Scanning**: Check for known vulnerabilities
- **Network Mapping**: Visual representation of network topology

### Scanning Techniques

#### Host Discovery Methods

```bash
# ARP scan (local network)
arp-scan -l

# ICMP echo request
ping -c 4 192.168.1.1

# TCP SYN ping
nmap -sn 192.168.1.0/24

# UDP ping
nmap -sU -sn 192.168.1.0/24
```

#### Port Scanning Methods

| Technique | Description | Use Case |
|-----------|-------------|----------|
| TCP Connect | Full three-way handshake | Reliable scanning |
| TCP SYN | Half-open scan | Stealthy scanning |
| UDP Scan | UDP port detection | Service discovery |
| FIN Scan | Stealth technique | Firewall evasion |
| Xmas Scan | Christmas tree scan | Advanced evasion |

## Installation

### Prerequisites

- Python 3.7+
- Scapy library
- Nmap (optional, for enhanced features)

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/g1ass/network-scanner
cd network-scanner

# Install dependencies
pip install -r requirements.txt

# Install scapy (if not in requirements)
pip install scapy

# Run the tool
python main.py --help
```

### Requirements File

```txt
scapy==2.4.5
python-nmap==0.7.1
colorama==0.4.4
tabulate==0.9.0
requests==2.28.1
```

## Usage Examples

### Basic Network Scan

```bash
# Scan entire network
python main.py --target 192.168.1.0/24

# Scan specific host
python main.py --target 192.168.1.100

# Scan specific ports
python main.py --target 192.168.1.100 --ports 22,80,443

# Custom port range
python main.py --target 192.168.1.100 --ports 1-1000
```

### Advanced Scanning

```bash
# Comprehensive scan with service detection
python main.py --target 192.168.1.0/24 --service-detection

# OS detection
python main.py --target 192.168.1.100 --os-detection

# Aggressive scan with timing
python main.py --target 192.168.1.100 --aggressive --timing 4

# Export results to file
python main.py --target 192.168.1.0/24 --output results.json
```

## Configuration

### Configuration File (config.ini)

```ini
[scanner]
default_timeout = 1.0
max_threads = 100
retry_attempts = 3

[output]
default_format = table
include_timestamps = true

[advanced]
enable_service_detection = true
enable_os_detection = false
vuln_database = /path/to/vuln.db
```

### Command Line Options

```
Network Scanner v1.0

Usage: python main.py [OPTIONS]

Options:
  --target TEXT          Target IP or range (required)
  --ports TEXT           Specific ports or range (default: 1-1000)
  --timeout FLOAT        Timeout in seconds (default: 1.0)
  --threads INTEGER      Number of threads (default: 50)
  --service-detection    Enable service detection
  --os-detection         Enable OS detection
  --aggressive           Enable aggressive scanning
  --timing INTEGER       Timing template (1-5)
  --output TEXT          Output file path
  --format TEXT          Output format (table|json|xml|csv)
  --help                 Show this message and exit
```

## Output Formats

### Table Format

```
+----------------+-------+--------+------------------------+
| IP Address     | Port  | State  | Service                |
+----------------+-------+--------+------------------------+
| 192.168.1.1    | 22    | open   | OpenSSH 7.4           |
| 192.168.1.1    | 80    | open   | Apache httpd 2.4.29   |
| 192.168.1.100  | 443   | open   | nginx 1.18.0          |
+----------------+-------+--------+------------------------+
```

### JSON Format

```json
{
  "scan_info": {
    "target": "192.168.1.0/24",
    "timestamp": "2023-12-07T10:30:00Z",
    "scan_duration": 45.2
  },
  "hosts": [
    {
      "ip": "192.168.1.1",
      "hostname": "router.local",
      "os": "Linux 4.15",
      "ports": [
        {
          "port": 22,
          "protocol": "tcp",
          "state": "open",
          "service": "OpenSSH 7.4",
          "version": "7.4"
        }
      ]
    }
  ]
}
```

## Advanced Features

### Vulnerability Scanning

```python
# Example vulnerability check
def check_vulnerabilities(host, port, service):
    vulnerabilities = []
    
    # Check for outdated SSH version
    if service == "OpenSSH" and version < "7.6":
        vulnerabilities.append({
            "severity": "Medium",
            "cve": "CVE-2018-15473",
            "description": "User enumeration vulnerability"
        })
    
    return vulnerabilities
```

### Network Mapping

```python
# Generate network topology
def generate_network_map(scan_results):
    graph = nx.Graph()
    
    for host in scan_results:
        graph.add_node(host['ip'], 
                      hostname=host.get('hostname'),
                      os=host.get('os'))
        
        for port in host['ports']:
            if port['state'] == 'open':
                graph.add_edge(host['ip'], f"{host['ip']}:{port['port']}",
                              service=port['service'])
    
    return graph
```

## Performance Optimization

### Parallel Processing

```python
import concurrent.futures
from threading import Lock

def parallel_scan(targets, ports, max_workers=100):
    results = []
    lock = Lock()
    
    def scan_host_port(host, port):
        result = scan_port(host, port)
        with lock:
            results.append(result)
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = []
        for host in targets:
            for port in ports:
                futures.append(executor.submit(scan_host_port, host, port))
        
        concurrent.futures.wait(futures)
    
    return results
```

### Rate Limiting

```python
import time
from collections import deque

class RateLimiter:
    def __init__(self, max_requests_per_second):
        self.max_requests = max_requests_per_second
        self.requests = deque()
    
    def wait_if_needed(self):
        now = time.time()
        
        # Remove old requests
        while self.requests and self.requests[0] <= now - 1:
            self.requests.popleft()
        
        # Wait if we have too many requests
        if len(self.requests) >= self.max_requests:
            time.sleep(1 - (now - self.requests[0]))
        
        self.requests.append(now)
```

## Security Considerations

### Legal Usage

- **Authorization**: Always have written permission
- **Scope**: Stay within authorized boundaries
- **Impact**: Avoid disrupting network services
- **Documentation**: Keep detailed logs

### Stealth Techniques

```python
# Randomize timing between scans
import random

def stealth_scan(target, ports):
    results = []
    for port in ports:
        result = scan_port(target, port)
        results.append(result)
        
        # Random delay between scans
        time.sleep(random.uniform(0.1, 0.5))
    
    return results

# Use decoy IPs
def decoy_scan(target, port, decoys):
    # Send decoy packets before actual scan
    for decoy in decoys:
        send_syn_packet(decoy, target, port)
    
    # Actual scan
    return scan_port(target, port)
```

## Troubleshooting

### Common Issues

#### Permission Denied
```bash
# Run with sudo for raw socket access
sudo python main.py --target 192.168.1.0/24
```

#### Network Unreachable
```bash
# Check network connectivity
ping -c 4 192.168.1.1

# Check routing table
ip route show
```

#### Slow Performance
```bash
# Reduce thread count
python main.py --target 192.168.1.0/24 --threads 10

# Increase timeout
python main.py --target 192.168.1.0/24 --timeout 2.0
```

## Contributing

### Development Setup

```bash
# Clone repository
git clone https://github.com/g1ass/network-scanner
cd network-scanner

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install development dependencies
pip install -r requirements-dev.txt

# Run tests
python -m pytest tests/

# Run linting
flake8 src/
black src/
```

### Adding New Features

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-feature`
3. **Make changes** and add tests
4. **Run tests**: `python -m pytest`
5. **Submit pull request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is for educational and authorized security testing purposes only. Users are responsible for ensuring they have proper authorization before scanning any networks. The authors are not responsible for any misuse of this software.

> "With great power comes great responsibility." - Use responsibly and ethically.$doc$,
    'https://images.unsplash.com/photo-1550745165-9bc0b252726a?w=400&h=200&fit=crop&crop=center',
    'Reconnaissance',
    'https://github.com/g1ass/network-scanner',
    NOW()
),
(
    'Password Cracker',
    'Multi-threaded password recovery and cracking utility with support for various hash algorithms.',
    $doc$# Password Cracker

## Overview
Password Cracker is a powerful, multi-threaded utility designed for password recovery and security testing. It supports multiple hash algorithms and cracking techniques.

## Features

### Supported Hash Types

- **MD5**: Message Digest 5
- **SHA1**: Secure Hash Algorithm 1
- **SHA256**: Secure Hash Algorithm 256-bit
- **SHA512**: Secure Hash Algorithm 512-bit
- **NTLM**: NT LAN Manager
- **bcrypt**: Blowfish-based hashing
- **MySQL**: MySQL password hashes
- **WordPress**: WordPress password hashes

### Cracking Techniques

| Technique | Description | Speed | Success Rate |
|-----------|-------------|-------|--------------|
| Dictionary | Wordlist-based | Fast | Medium |
| Brute Force | Character combinations | Slow | High |
| Mask Attack | Pattern-based | Medium | High |
| Rainbow Table | Precomputed hashes | Very Fast | High |
| Hybrid | Combined methods | Variable | Very High |

## Installation

### System Requirements

- Python 3.8+
- 4GB+ RAM recommended
- Multi-core CPU for best performance

### Setup

```bash
# Clone repository
git clone https://github.com/g1ass/password-cracker
cd password-cracker

# Install dependencies
pip install -r requirements.txt

# Download wordlists (optional)
python download_wordlists.py

# Run the tool
python main.py --help
```

### Dependencies

```txt
hashlib==0.1.0
multiprocessing==0.70.12
click==8.1.0
colorama==0.4.4
tqdm==4.64.0
pycryptodome==3.15.0
```

## Usage Examples

### Basic Dictionary Attack

```bash
# Dictionary attack with default wordlist
python main.py --hash "5f4dcc3b5aa765d61d8327deb882cf99" --type md5

# Custom wordlist
python main.py --hash "5f4dcc3b5aa765d61d8327deb882cf99" --type md5 --wordlist custom.txt

# Multiple hashes
python main.py --hashes hashes.txt --type md5 --wordlist rockyou.txt
```

### Brute Force Attack

```bash
# Brute force with character set
python main.py --hash "5f4dcc3b5aa765d61d8327deb882cf99" --type md5 --brute-force --charset "abcdefghijklmnopqrstuvwxyz0123456789" --min-length 1 --max-length 8

# Numeric brute force
python main.py --hash "5f4dcc3b5aa765d61d8327deb882cf99" --type md5 --brute-force --charset "0123456789" --min-length 4 --max-length 6

# Alphanumeric with symbols
python main.py --hash "5f4dcc3b5aa765d61d8327deb882cf99" --type md5 --brute-force --charset "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*" --min-length 1 --max-length 10
```

### Mask Attack

```bash
# Known pattern attack
python main.py --hash "5f4dcc3b5aa765d61d8327deb882cf99" --type md5 --mask "?u?l?l?l?d?d?d?d"

# Custom mask patterns
python main.py --hash "5f4dcc3b5aa765d61d8327deb882cf99" --type md5 --mask "password?d" --min-length 8 --max-length 12

# Multiple masks
python main.py --hash "5f4dcc3b5aa765d61d8327deb882cf99" --type md5 --masks masks.txt
```

## Configuration

### Mask Patterns

```python
# Common mask patterns
MASK_PATTERNS = {
    "lowercase": "?l",
    "uppercase": "?u", 
    "digits": "?d",
    "symbols": "?s",
    "alphanumeric": "?u?l?d",
    "all": "?u?l?d?s"
}

# Example masks
example_masks = [
    "?u?l?l?l?d?d?d?d",     # Password1234
    "?l?l?l?l?l?d?d",       # abcdef12
    "?u?l?l?l?l?l?l?d",     # Password1
    "?d?d?d?d?d?d",         # 123456
    "?l?l?l?l?l?l?l?l"      # password
]
```

### Performance Tuning

```python
# Configuration options
config = {
    "max_threads": multiprocessing.cpu_count(),
    "chunk_size": 1000,
    "progress_interval": 100,
    "output_format": "table",
    "save_session": True,
    "resume_session": True
}
```

## Advanced Features

### Session Management

```python
# Save cracking session
def save_session(session_data, filename):
    with open(filename, 'wb') as f:
        pickle.dump(session_data, f)

# Resume session
def load_session(filename):
    with open(filename, 'rb') as f:
        return pickle.load(f)
```

### Distributed Cracking

```python
# Master node
def master_distributed_crack(hash_target, hash_type, wordlist_chunks, workers):
    results = {}
    
    for i, chunk in enumerate(wordlist_chunks):
        worker = workers[i]
        result = worker.crack_chunk(hash_target, hash_type, chunk)
        results.update(result)
    
    return results

# Worker node
def worker_crack_chunk(hash_target, hash_type, wordlist_chunk):
    results = {}
    
    for word in wordlist_chunk:
        if verify_hash(hash_target, hash_type, word):
            results[hash_target] = word
            break
    
    return results
```

### GPU Acceleration

```python
# PyOpenCL GPU acceleration
import pyopencl as cl
import numpy as np

def gpu_hash_crack(hash_target, hash_type, wordlist):
    # Setup OpenCL context
    ctx = cl.create_some_context()
    queue = cl.CommandQueue(ctx)
    
    # Load OpenCL kernel
    with open('hash_kernel.cl', 'r') as f:
        kernel_code = f.read()
    
    program = cl.Program(ctx, kernel_code).build()
    
    # Transfer data to GPU
    wordlist_buffer = cl.Buffer(ctx, cl.mem_flags.READ_ONLY | cl.mem_flags.COPY_HOST_PTR, hostbuf=wordlist.encode())
    hash_buffer = cl.Buffer(ctx, cl.mem_flags.READ_ONLY | cl.mem_flags.COPY_HOST_PTR, hostbuf=hash_target.encode())
    result_buffer = cl.Buffer(ctx, cl.mem_flags.WRITE_ONLY, wordlist.size)
    
    # Execute kernel
    program.hash_crack(queue, (len(wordlist),), None, wordlist_buffer, hash_buffer, result_buffer)
    
    # Read results
    result = np.empty_like(wordlist)
    cl.enqueue_copy(queue, result, result_buffer)
    
    return result
```

## Wordlists

### Included Wordlists

- **rockyou.txt**: 14 million common passwords
- **common-passwords.txt**: 10,000 most common passwords
- **dictionary.txt**: English dictionary words
- **names.txt**: Common names and surnames
- **dates.txt**: Common date patterns

### Custom Wordlists

```python
# Generate custom wordlist
def generate_wordlist(base_words, numbers, symbols):
    wordlist = set()
    
    for word in base_words:
        wordlist.add(word)
        
        # Add numbers
        for num in numbers:
            wordlist.add(f"{word}{num}")
            wordlist.add(f"{num}{word}")
        
        # Add symbols
        for sym in symbols:
            wordlist.add(f"{word}{sym}")
            wordlist.add(f"{sym}{word}")
    
    return list(wordlist)

# Example usage
base_words = ["password", "admin", "user", "login"]
numbers = ["123", "2023", "2024"]
symbols = ["!", "@", "#", "$"]

custom_wordlist = generate_wordlist(base_words, numbers, symbols)
```

## Performance Benchmarks

### Hardware Performance

| CPU | Cores | Hashes/sec (MD5) | Hashes/sec (SHA256) |
|-----|-------|------------------|---------------------|
| Intel i7-9700K | 8 | 2.5B | 1.8B |
| AMD Ryzen 9 5900X | 12 | 3.2B | 2.4B |
| Intel i9-12900K | 16 | 4.1B | 3.1B |
| AMD Threadripper 3970X | 32 | 7.8B | 5.9B |

### GPU Performance

| GPU | Cores | Hashes/sec (MD5) | Hashes/sec (SHA256) |
|-----|-------|------------------|---------------------|
| NVIDIA RTX 3080 | 8704 | 45B | 28B |
| NVIDIA RTX 3090 | 10496 | 52B | 32B |
| AMD RX 6800 XT | 4608 | 38B | 24B |
| NVIDIA A100 | 6912 | 68B | 42B |

## Security Considerations

### Ethical Usage

- **Authorization**: Only crack hashes you own or have permission to test
- **Legal Compliance**: Follow local laws and regulations
- **Data Protection**: Securely store and handle sensitive data
- **Responsible Disclosure**: Report vulnerabilities responsibly

### Best Practices

```python
# Secure hash verification
def secure_hash_verify(hash_target, candidate):
    # Constant-time comparison to prevent timing attacks
    return hmac.compare_digest(hash_target, candidate)

# Rate limiting
def rate_limit_crack(attempts_per_minute):
    last_attempt = 0
    
    def decorator(func):
        def wrapper(*args, **kwargs):
            nonlocal last_attempt
            
            current_time = time.time()
            if current_time - last_attempt < 60 / attempts_per_minute:
                time.sleep(1)
            
            last_attempt = time.time()
            return func(*args, **kwargs)
        
        return wrapper
    return decorator
```

## Troubleshooting

### Common Issues

#### Memory Issues
```bash
# Reduce chunk size
python main.py --chunk-size 100

# Limit threads
python main.py --threads 4

# Use streaming mode
python main.py --stream-mode
```

#### Slow Performance
```bash
# Use GPU acceleration
python main.py --gpu

# Optimize wordlist
python main.py --optimize-wordlist

# Use mask attack
python main.py --mask "?u?l?l?l?d?d?d?d"
```

## Contributing

### Development Guidelines

1. **Code style**: Follow PEP 8
2. **Testing**: Include unit tests
3. **Documentation**: Update README and inline docs
4. **Performance**: Benchmark new features

### Submitting Changes

```bash
# Fork and clone
git clone https://github.com/yourusername/password-cracker
cd password-cracker

# Create feature branch
git checkout -b feature/new-feature

# Make changes and test
python -m pytest tests/

# Submit pull request
git push origin feature/new-feature
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Disclaimer

This tool is for educational and authorized security testing purposes only. Users are responsible for ensuring they have proper authorization before attempting to crack any passwords. The authors are not responsible for any misuse of this software.

> "Great power comes with great responsibility." - Use ethically and legally.$doc$,
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop&crop=center',
    'Authentication',
    'https://github.com/g1ass/password-cracker',
    NOW()
)
ON CONFLICT DO NOTHING;
