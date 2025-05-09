import React, { useEffect, useState } from 'react';
import { getImageCache } from '../utils/imageCache';
import characterExpressions from '../data/characterExpressions';
import { CharacterId } from '@/types/game';
import { MoodType } from '@/types/expressions';

interface CharacterPortraitProps {
  src?: string;
  name?: string;
  alt?: string;
  position?: 'left' | 'center' | 'right';
  speaking?: boolean;
  className?: string;
  onClick?: () => void;
  characterId?: CharacterId;
  mood?: MoodType;
  isActive?: boolean;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  src,
  characterId,
  mood = 'neutral',
  name,
  alt,
  position = 'center',
  speaking = false,
  className = '',
  isActive = true,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [displayName, setDisplayName] = useState<string>('');
  
  const imageCache = getImageCache();

  // Determine the correct image source based on props
  useEffect(() => {
    let imageSrc = src || '';
    let characterName = name || '';
    
    // If characterId is provided, get the expression from data
    if (characterId && mood) {
      const characterData = characterExpressions[characterId];
      const expression = characterData ? characterData[`${characterId}-${mood}`] : null;
      
      if (expression) {
        imageSrc = expression.src || expression.image || '';
        if (!name && expression.characterId) {
          // Set character name based on ID if not provided
          const charName = characterId.charAt(0).toUpperCase() + characterId.slice(1);
          characterName = charName;
        }
      }
    }
    
    setCurrentSrc(imageSrc);
    setDisplayName(characterName);
  }, [src, characterId, mood, name]);

  useEffect(() => {
    if (!currentSrc) return;
    
    // Check if image is in cache
    const isCached = imageCache.has(currentSrc);
    
    if (isCached) {
      // If image is cached, set loaded immediately
      setIsLoaded(true);
    } else {
      // Otherwise, load the image
      setIsLoaded(false);
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = currentSrc;
    }
  }, [currentSrc, imageCache]);

  useEffect(() => {
    if (prevSrc !== null && prevSrc !== currentSrc) {
      setIsFading(true);
      
      const timer = setTimeout(() => {
        setIsFading(false);
        setPrevSrc(null);
      }, 300); // 300ms transition
      
      return () => clearTimeout(timer);
    }
  }, [prevSrc, currentSrc]);

  // When src changes, set previous src for transition
  useEffect(() => {
    if (currentSrc && currentSrc !== prevSrc) {
      setPrevSrc(prevSrc || currentSrc);
    }
  }, [currentSrc]);

  if (!currentSrc) return null;
  
  // Default alt text if not provided
  const altText = alt || `${displayName || 'Character'} ${mood || ''}`;

  const positions = {
    left: 'left-0 ml-4',
    center: 'left-1/2 transform -translate-x-1/2',
    right: 'right-0 mr-4',
  };

  return (
    <div 
      className={`absolute bottom-0 ${positions[position]} transition-all duration-300 cursor-pointer
                 ${speaking ? 'scale-105' : 'scale-100'} ${className}`}
      onClick={onClick}
    >
      {prevSrc && (
        <img
          src={prevSrc}
          alt={altText}
          className={`max-h-[70vh] transition-opacity duration-300 ${isFading ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <img
        src={currentSrc}
        alt={altText}
        className={`max-h-[70vh] transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'} 
                  ${isLoaded ? '' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
      {displayName && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-primary-purple text-white px-4 py-1 rounded-t-lg">
          {displayName}
        </div>
      )}
    </div>
  );
};

export default CharacterPortrait;
