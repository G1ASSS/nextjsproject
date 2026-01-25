'use client'

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateText } from '@/utils/translation';

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translate = useCallback(async (text: string): Promise<string> => {
    if (!text || currentLanguage === 'en') {
      return text;
    }

    setIsLoading(true);
    setError(null);

    try {
      const translated = await translateText(text, currentLanguage);
      return translated;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed';
      setError(errorMessage);
      return text; // Return original text on error
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage]);

  const translateMultiple = useCallback(async (texts: string[]): Promise<string[]> => {
    if (!texts.length || currentLanguage === 'en') {
      return texts;
    }

    setIsLoading(true);
    setError(null);

    try {
      const promises = texts.map(text => translateText(text, currentLanguage));
      const translated = await Promise.all(promises);
      return translated;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed';
      setError(errorMessage);
      return texts; // Return original texts on error
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage]);

  return {
    translate,
    translateMultiple,
    isLoading,
    error,
    currentLanguage
  };
};
