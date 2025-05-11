
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
  // No longer rendering the character portrait here - it will be shown inside the dialog box
  return null;
};

export default CharacterPortraitDisplay;
