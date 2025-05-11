
import React from 'react';
import CharacterPortrait from '../CharacterPortrait';
import { CharacterId } from '@/types/game';
import { MoodType } from '@/types/expressions';

interface CharacterPortraitDisplayProps {
  characterId: CharacterId | undefined;
  characterMood: MoodType;
  shouldShow: boolean;
}

const CharacterPortraitDisplay: React.FC<CharacterPortraitDisplayProps> = ({
  characterId,
  characterMood,
  shouldShow
}) => {
  // Only render if we should show a character and have a valid character ID
  // that isn't the narrator (which is handled separately)
  if (!shouldShow || !characterId) return null;
  
  return (
    <div className="absolute inset-y-0 right-1/4 flex items-center pointer-events-none z-20">
      <div className="character-portrait-container max-h-[80vh] max-w-[350px]">
        <CharacterPortrait 
          characterId={characterId}
          mood={characterMood}
          animate={true}
          className="character-portrait"
        />
      </div>
    </div>
  );
};

export default CharacterPortraitDisplay;
