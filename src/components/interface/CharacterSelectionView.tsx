
import React from 'react';
import { CharacterId } from '@/types/game';
import CharacterSelectionScene from '../CharacterSelectionScene';

interface CharacterSelectionViewProps {
  season: 'spring' | 'summer';
  sceneId: string;
  gameState: any;
}

const CharacterSelectionView: React.FC<CharacterSelectionViewProps> = ({ 
  season, 
  sceneId,
  gameState 
}) => {
  const suffix = sceneId.replace(`${season}-character-selection`, '');
  const visitedChars: CharacterId[] = [];
  
  if (suffix.includes('1')) visitedChars.push('xavier');
  if (suffix.includes('2')) visitedChars.push('navarre');
  if (suffix.includes('3')) visitedChars.push('etta');
  if (suffix.includes('4')) visitedChars.push('senara');
  
  const remainingChars = (['xavier', 'navarre', 'etta', 'senara'] as CharacterId[]).filter(
    char => !visitedChars.includes(char)
  );
  
  return (
    <CharacterSelectionScene
      availableCharacters={remainingChars}
      scenePrefix={`${season}-visit`}
      title={`${season.charAt(0).toUpperCase() + season.slice(1)} Connections`}
      description={
        remainingChars.length > 0
          ? `Spend time with your teammates. Who would you like to visit next?`
          : `You've visited all your teammates. You can proceed to the ${season.charAt(0).toUpperCase() + season.slice(1)} festival planning.`
      }
      completionSceneId={remainingChars.length === 0 ? `${season}-festival-planning` : undefined}
    />
  );
};

export default CharacterSelectionView;
