'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Terminal = () => {
  const [currentText, setCurrentText] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const [userClickLine, setUserClickLine] = useState('')
  const [showUserLine, setShowUserLine] = useState(false)

  const terminalLines = [
    'g1ass@kali:~$ nmap -sV target_network',
    'Scanning for vulnerabilities...',
    'Exploit found: SoulSync Android App Vulnerability Fixed',
    'Status: Learning Cybersecurity & Web Development'
  ]

  const handleTerminalClick = () => {
    if (!showUserLine) {
      setUserClickLine('g1ass@kali:~$ access_granted... welcome to the garden')
      setShowUserLine(true)
      // Hide the user line after 3 seconds
      setTimeout(() => {
        setShowUserLine(false)
        setUserClickLine('')
      }, 3000)
    }
  }

  useEffect(() => {
    if (!isTyping) return

    const currentLine = terminalLines[currentLineIndex]
    
    if (currentText.length < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentLine.substring(0, currentText.length + 1))
      }, 30 + Math.random() * 50) // Random typing speed
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentText('')
        if (currentLineIndex < terminalLines.length - 1) {
          setCurrentLineIndex(currentLineIndex + 1)
        } else {
          // Loop back to start
          setCurrentLineIndex(0)
        }
      }, 1500) // Pause between lines
      return () => clearTimeout(timeout)
    }
  }, [currentText, currentLineIndex, isTyping, terminalLines])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 300) // Faster blinking for more realistic feel
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
        {/* Terminal Header */}
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-400 text-sm font-mono">g1ass@kali:~</div>
          <div className="w-16"></div>
        </div>
        
        {/* Terminal Content */}
        <div 
          className="p-4 font-mono text-sm bg-black min-h-[400px] max-h-[500px] overflow-y-auto cursor-pointer"
          onClick={handleTerminalClick}
        >
          <div className="space-y-1">
            {/* Previous lines (faded) */}
            {terminalLines.slice(0, currentLineIndex).map((line, index) => (
              <div key={index} className="text-green-400 opacity-70" style={{ textShadow: '0 0 5px rgba(74, 222, 128, 0.5)' }}>
                {line}
              </div>
            ))}
            
            {/* User click line */}
            {showUserLine && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-cyan-400 font-bold"
                style={{ textShadow: '0 0 10px rgba(34, 211, 238, 0.8)' }}
              >
                {userClickLine}
                {showCursor && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="bg-cyan-400 w-2 h-4 ml-1 inline-block"
                    style={{ boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)' }}
                  />
                )}
              </motion.div>
            )}
            
            {/* Current typing line */}
            <div className="flex">
              <span className="text-green-400" style={{ textShadow: '0 0 8px rgba(74, 222, 128, 0.8)' }}>{currentText}</span>
              {showCursor && !showUserLine && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="bg-green-400 w-2 h-4 ml-1 inline-block"
                  style={{ boxShadow: '0 0 8px rgba(74, 222, 128, 0.8)' }}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Terminal Footer */}
        <div className="bg-gray-900 px-4 py-1 text-xs text-gray-500 font-mono">
          <div className="flex justify-between">
            <span>Kali Linux 2024.1</span>
            <span>UTF-8 • bash</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Terminal
