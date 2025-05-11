
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
  // Only render the character portrait if it's a character (not narrator) and should be shown
  if (!shouldShow || !characterId || characterId === 'narrator') {
    return null;
  }

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4/5 z-10 character-portrait-container">
      <CharacterPortrait 
        characterId={characterId}
        mood={characterMood}
        className="character-portrait max-h-full w-auto"
        animate={true}
      />
    </div>
  );
};

export default CharacterPortraitDisplay;
