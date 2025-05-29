
import { useState, useEffect } from 'react';
import { CharacterId } from '@/types/game';
import { MoodType } from '@/types/expressions';
import { getCharacterExpressionByMood } from '@/data/characterExpressions';
import { assetManager } from '@/utils/assetManager';

interface UseLazyCharacterExpressionResult {
  imageSrc: string | null;
  isLoading: boolean;
  hasError: boolean;
}

// Simple cache to avoid re-checking the same expression multiple times
const expressionCache = new Map<string, string>();

export const useLazyCharacterExpression = (
  characterId: CharacterId | 'narrator' | undefined,
  mood: MoodType
): UseLazyCharacterExpressionResult => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!characterId || characterId === 'narrator') {
      setImageSrc(null);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    // Create cache key
    const cacheKey = `${characterId}-${mood}`;
    
    // Check our expression cache first
    if (expressionCache.has(cacheKey)) {
      const cachedPath = expressionCache.get(cacheKey)!;
      console.log(`Using cached expression: ${cacheKey}`);
      setImageSrc(cachedPath);
      setIsLoading(false);
      setHasError(false);
      return;
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
      expressionCache.set(cacheKey, expressionPath);
      setImageSrc(expressionPath);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    // Load the expression on-demand
    console.log(`Lazy loading character expression: ${cacheKey}`);
    setIsLoading(true);
    setHasError(false);

    // Create image to test loading
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      console.log(`Successfully lazy loaded: ${cacheKey}`);
      expressionCache.set(cacheKey, expressionPath);
      setImageSrc(expressionPath);
      setIsLoading(false);
      setHasError(false);
    };

    img.onerror = () => {
      console.error(`Failed to lazy load: ${cacheKey}`);
      setImageSrc(null);
      setIsLoading(false);
      setHasError(true);
    };

    img.src = expressionPath;

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [characterId, mood]);

  return { imageSrc, isLoading, hasError };
};
