'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { motion } from 'framer-motion'

interface TranslateTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  children?: (translatedText: string, isLoading: boolean) => React.ReactNode
  fallback?: React.ReactNode
}

export const TranslateText: React.FC<TranslateTextProps> = ({
  text,
  className = '',
  as: Component = 'span',
  children,
  fallback
}) => {
  const { translate, currentLanguage } = useTranslation()
  const [translatedText, setTranslatedText] = useState(text)
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    const translateContent = async () => {
      if (!text) return

      // If English or empty, use original text
      if (currentLanguage === 'en') {
        setTranslatedText(text)
        setIsTranslating(false)
        return
      }

      setIsTranslating(true)
      
      try {
        const translated = await translate(text)
        setTranslatedText(translated)
      } catch (error) {
        console.warn('Translation failed:', error)
        setTranslatedText(text) // Fallback to original text
      } finally {
        setIsTranslating(false)
      }
    }

    translateContent()
  }, [text, currentLanguage, translate])

  // Custom render function
  if (children) {
    return <>{children(translatedText, isTranslating)}</>
  }

  // Fallback content while translating
  if (isTranslating && fallback) {
    return <>{fallback}</>
  }

  // Default render with animation
  const MotionComponent = motion[Component] as any

  return (
    <MotionComponent
      key={`${currentLanguage}-${text.slice(0, 20)}`} // Force re-render on language change
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {translatedText}
    </MotionComponent>
  )
}

// Higher-order component for wrapping existing components
export const withTranslation = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithTranslationComponent = (props: P & { text?: string }) => {
    const { text, ...rest } = props

    if (!text) {
      return <WrappedComponent {...(rest as P)} />
    }

    return (
      <TranslateText text={text}>
        {(translatedText, isLoading) => (
          <WrappedComponent {...(rest as P)}>
            {translatedText}
          </WrappedComponent>
        )}
      </TranslateText>
    )
  }

  WithTranslationComponent.displayName = `withTranslation(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`

  return WithTranslationComponent
}

// Specialized components for common use cases
export const TranslateH1: React.FC<Omit<TranslateTextProps, 'as'>> = (props) => (
  <TranslateText {...props} as="h1" />
)

export const TranslateH2: React.FC<Omit<TranslateTextProps, 'as'>> = (props) => (
  <TranslateText {...props} as="h2" />
)

export const TranslateH3: React.FC<Omit<TranslateTextProps, 'as'>> = (props) => (
  <TranslateText {...props} as="h3" />
)

export const TranslateP: React.FC<Omit<TranslateTextProps, 'as'>> = (props) => (
  <TranslateText {...props} as="p" />
)

export const TranslateSpan: React.FC<Omit<TranslateTextProps, 'as'>> = (props) => (
  <TranslateText {...props} as="span" />
)

export const TranslateDiv: React.FC<Omit<TranslateTextProps, 'as'>> = (props) => (
  <TranslateText {...props} as="div" />
)
