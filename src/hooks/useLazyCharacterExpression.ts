
import { useState, useEffect, useRef } from 'react';
import { CharacterId } from '@/types/game';
import { MoodType } from '@/types/expressions';
import { getCharacterExpressionByMood } from '@/data/characterExpressions';
import { assetManager } from '@/utils/assetManager';

interface UseLazyCharacterExpressionResult {
  imageSrc: string | null;
  isLoading: boolean;
  hasError: boolean;
}

// Persistent cache to avoid re-checking the same expression multiple times
const expressionCache = new Map<string, { src: string; loaded: boolean }>();

export const useLazyCharacterExpression = (
  characterId: CharacterId | 'narrator' | undefined,
  mood: MoodType
): UseLazyCharacterExpressionResult => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const loadingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!characterId || characterId === 'narrator') {
      setImageSrc(null);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    // Create cache key
    const cacheKey = `${characterId}-${mood}`;
    
    // Check our persistent cache first
    if (expressionCache.has(cacheKey)) {
      const cached = expressionCache.get(cacheKey)!;
      if (cached.loaded) {
        console.log(`Using persistent cached expression: ${cacheKey}`);
        setImageSrc(cached.src);
        setIsLoading(false);
        setHasError(false);
        return;
      }
    }

    // Get the expression data
    const expression = getCharacterExpressionByMood(characterId, mood);
    if (!expression || !expression.image) {
      console.warn(`No expression found for ${characterId} with mood ${mood}`);
      setImageSrc(null);
      setIsLoading(false);
      setHasError(true);
      return;
    }

    const expressionPath = expression.image;

    // Check if already loaded in asset manager
    if (assetManager.hasAsset(expressionPath)) {
      console.log(`Character expression already in asset manager: ${cacheKey}`);
      expressionCache.set(cacheKey, { src: expressionPath, loaded: true });
      setImageSrc(expressionPath);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    // Prevent duplicate loading requests
    if (loadingRef.current) {
      return;
    }

    // Load the expression on-demand
    console.log(`Lazy loading character expression: ${cacheKey}`);
    loadingRef.current = true;
    setIsLoading(true);
    setHasError(false);

    // Create image to test loading
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      console.log(`Successfully lazy loaded: ${cacheKey}`);
      expressionCache.set(cacheKey, { src: expressionPath, loaded: true });
      setImageSrc(expressionPath);
      setIsLoading(false);
      setHasError(false);
      loadingRef.current = false;
    };

    img.onerror = () => {
      console.error(`Failed to lazy load: ${cacheKey}`);
      expressionCache.set(cacheKey, { src: expressionPath, loaded: false });
      setImageSrc(null);
      setIsLoading(false);
      setHasError(true);
      loadingRef.current = false;
    };

    img.src = expressionPath;

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
      loadingRef.current = false;
    };
  }, [characterId, mood]);

  return { imageSrc, isLoading, hasError };
};
