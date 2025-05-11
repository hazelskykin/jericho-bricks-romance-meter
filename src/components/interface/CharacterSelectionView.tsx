
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
  console.log(`CharacterSelectionView rendering with sceneId: ${sceneId}, season: ${season}`);
  
  // Extract suffix number if present (e.g., spring-character-selection-1 -> 1)
  let suffix = '';
  const suffixMatch = sceneId.match(/-(\d+)$/);
  if (suffixMatch) {
    suffix = suffixMatch[1];
  }
  
  // Parse which characters have been visited
  const visitedChars: CharacterId[] = [];
  
  if (suffix.includes('1')) visitedChars.push('xavier');
  if (suffix.includes('2')) visitedChars.push('navarre');
  if (suffix.includes('3')) visitedChars.push('etta');
  if (suffix.includes('4')) visitedChars.push('senara');
  
  // For simplified checking, we also look at the number itself
  const suffixNumber = parseInt(suffix) || 0;
  if (suffixNumber === 1) visitedChars.push('xavier');
  if (suffixNumber === 2) visitedChars.push('navarre');
  if (suffixNumber === 3) visitedChars.push('etta');
  if (suffixNumber === 4) visitedChars.push('senara');
  
  console.log(`Detected visited characters: ${visitedChars.join(', ')}`);
  
  const remainingChars = (['xavier', 'navarre', 'etta', 'senara'] as CharacterId[]).filter(
    char => !visitedChars.includes(char)
  );
  
  console.log(`Remaining characters to visit: ${remainingChars.join(', ')}`);
  
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
