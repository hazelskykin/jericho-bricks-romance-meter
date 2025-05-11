
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
  // We're now suppressing the character portrait display entirely
  return null;
};

export default CharacterPortraitDisplay;
