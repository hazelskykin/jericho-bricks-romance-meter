
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
  isInDialog?: boolean; // Flag to determine if portrait is in dialog
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  characterId,
  mood = 'neutral',
  className = '',
  animate = false,
  onLoad,
  isInDialog = false
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

  // Trigger animation only when explicitly requested
  useEffect(() => {
    if (animate && imageLoaded) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [animate, imageLoaded]);
  
  const portraitSrc = characterExpression && characterExpression.image ? characterExpression.image : '';

  // Apply different styles based on whether this is in the dialog or not
  const portraitClasses = isInDialog
    ? "w-full h-full object-cover object-top rounded-full" // For avatar in dialog
    : "h-auto w-auto object-contain"; // For any other use

  return (
    <img
      ref={imgRef}
      src={portraitSrc}
      alt={`${characterId} - ${mood}`}
      className={`
        ${className}
        ${isAnimating ? 'animate-fade-in' : ''}
        ${portraitClasses}
      `}
    />
  );
};

export default CharacterPortrait;
