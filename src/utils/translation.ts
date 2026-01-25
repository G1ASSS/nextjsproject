// Translation utility with caching
interface TranslationCache {
  [key: string]: {
    [lang: string]: string;
  };
}

class TranslationService {
  private cache: TranslationCache = {};
  private readonly CACHE_KEY = 'translation_cache';

  constructor() {
    // Load cache from localStorage on initialization
    this.loadCache();
  }

  private loadCache() {
    // Only access localStorage in browser environment
    if (typeof window === 'undefined') return;
    
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (cached) {
        this.cache = JSON.parse(cached);
      }
    } catch (error) {
      console.warn('Failed to load translation cache:', error);
      this.cache = {};
    }
  }

  private saveCache() {
    // Only access localStorage in browser environment
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.cache));
    } catch (error) {
      console.warn('Failed to save translation cache:', error);
    }
  }

  private generateCacheKey(text: string): string {
    // Create a simple hash for the text
    return btoa(text).substring(0, 50);
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    // Return original text if target is English or empty text
    if (!text || targetLanguage === 'en') {
      return text;
    }

    const cacheKey = this.generateCacheKey(text);

    // Check cache first
    if (this.cache[cacheKey] && this.cache[cacheKey][targetLanguage]) {
      return this.cache[cacheKey][targetLanguage];
    }

    try {
      // Using LibreTranslate (free alternative)
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: 'auto',
          target: this.getLibreTranslateLanguageCode(targetLanguage),
          format: 'text'
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const data = await response.json();
      const translatedText = data.translatedText;

      // Cache the translation
      if (!this.cache[cacheKey]) {
        this.cache[cacheKey] = {};
      }
      this.cache[cacheKey][targetLanguage] = translatedText;
      this.saveCache();

      return translatedText;
    } catch (error) {
      console.warn('Translation failed, returning original text:', error);
      return text; // Return original text if translation fails
    }
  }

  private getLibreTranslateLanguageCode(lang: string): string {
    const languageMap: { [key: string]: string } = {
      'en': 'en',
      'my': 'my', // Myanmar
      'th': 'th', // Thai
      'es': 'es', // Spanish
      'zh': 'zh'  // Chinese
    };
    return languageMap[lang] || 'en';
  }

  // Batch translate multiple texts
  async translateTexts(texts: string[], targetLanguage: string): Promise<string[]> {
    const promises = texts.map(text => this.translateText(text, targetLanguage));
    return Promise.all(promises);
  }

  // Clear cache (for testing or reset)
  clearCache() {
    this.cache = {};
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.CACHE_KEY);
    }
  }

  // Get cache size (for debugging)
  getCacheSize(): number {
    return Object.keys(this.cache).length;
  }
}

// Create singleton instance
export const translationService = new TranslationService();

// Export convenience function
export const translateText = (text: string, targetLanguage: string): Promise<string> => {
  return translationService.translateText(text, targetLanguage);
};
