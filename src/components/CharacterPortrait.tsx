
import React from 'react';
import { CharacterId } from '../types/game';
import { MoodType } from '../data/characterExpressions';
import { useLazyCharacterExpression } from '../hooks/useLazyCharacterExpression';

interface CharacterPortraitProps {
  characterId: CharacterId;
  mood?: MoodType;
  className?: string;
  animate?: boolean;
  onLoad?: () => void;
  isInDialog?: boolean;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  characterId,
  mood = 'neutral',
  className = '',
  animate = false,
  onLoad,
  isInDialog = false
}) => {
  const { imageSrc, isLoading, hasError } = useLazyCharacterExpression(characterId, mood);

  // Call onLoad when image is successfully loaded
  React.useEffect(() => {
    if (imageSrc && !isLoading && !hasError) {
      onLoad?.();
    }
  }, [imageSrc, isLoading, hasError, onLoad]);

  // Apply different styles based on whether this is in the dialog or not
  const portraitClasses = isInDialog
    ? "w-full h-full object-cover object-top rounded-full" // For avatar in dialog
    : "h-auto w-auto object-contain"; // For any other use

  // Show loading state
  if (isLoading) {
    return (
      <div className={`${className} ${portraitClasses} bg-gray-800 flex items-center justify-center`}>
        <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Show error state or fallback
  if (hasError || !imageSrc) {
    return (
      <div className={`${className} ${portraitClasses} bg-gray-800 flex items-center justify-center text-gray-400 text-xs`}>
        {characterId}
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={`${characterId} - ${mood}`}
      className={`
        ${className}
        ${animate ? 'animate-fade-in' : ''}
        ${portraitClasses}
      `}
    />
  );
};

export default CharacterPortrait;
