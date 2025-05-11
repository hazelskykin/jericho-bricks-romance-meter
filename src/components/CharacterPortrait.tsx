
import React, { useState, useEffect, useRef } from 'react';
import { CharacterId } from '../types/game';
import { getCharacterExpressionByMood, MoodType } from '../data/characterExpressions';
import { getImageCache } from '../utils/imageCache';
import { CharacterExpression } from '@/types/expressions';

interface CharacterPortraitProps {
  characterId: CharacterId;
  mood?: MoodType;
  className?: string;
  animate?: boolean;
  onLoad?: () => void;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  characterId,
  mood = 'neutral',
  className = '',
  animate = true,
  onLoad
}) => {
  const [characterExpression, setCharacterExpression] = useState<CharacterExpression | undefined>(undefined);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageCache = getImageCache();
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);

  // Set up character expression and image
  useEffect(() => {
    if (characterId && mood) {
      try {
        // Get character expression data
        const expressionData = getCharacterExpressionByMood(characterId, mood as MoodType);
        setCharacterExpression(expressionData);
        
        // Check if image is in cache
        const imagePath = expressionData?.image || '';
        if (imagePath && typeof imagePath === 'string' && imageCache.has(imagePath)) {
          setImageLoaded(true);
          onLoad?.();
        } else {
          setImageLoaded(false);
        }
      } catch (error) {
        console.error(`Error setting character portrait: ${error}`);
        setImageLoaded(false);
      }
    }
  }, [characterId, mood, onLoad]);

  // Handle image loading
  useEffect(() => {
    const handleImageLoad = () => {
      setImageLoaded(true);
      onLoad?.();
    };

    if (imgRef.current && imgRef.current.complete) {
      handleImageLoad();
    }

    if (imgRef.current) {
      imgRef.current.addEventListener('load', handleImageLoad);
    }

    return () => {
      if (imgRef.current) {
        imgRef.current.removeEventListener('load', handleImageLoad);
      }
    };
  }, [onLoad]);

  // Trigger animation
  useEffect(() => {
    if (animate && imageLoaded) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 0); // Set to 0 to ensure it's shown immediately
      return () => clearTimeout(timer);
    }
  }, [animate, imageLoaded]);
  
  const portraitSrc = characterExpression && characterExpression.image ? characterExpression.image : '';

  return (
    <img
      ref={imgRef}
      src={portraitSrc}
      alt={`${characterId} - ${mood}`}
      className={`
        ${className}
        ${isAnimating ? 'opacity-100' : 'opacity-100'}
        max-h-[80vh] object-contain
      `}
      style={{
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  );
};

export default CharacterPortrait;
