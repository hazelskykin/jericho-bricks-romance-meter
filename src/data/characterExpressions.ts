
import { CharacterId } from '@/types/game';
import { CharacterExpression, AllCharacterExpressions, MoodType } from '@/types/expressions';

// Import individual character expressions
import mavenExpressions from './expressions/maven';
import xavierExpressions from './expressions/xavier';
import navarreExpressions from './expressions/navarre';
import ettaExpressions from './expressions/etta';
import senaraExpressions from './expressions/senara';

// Export type for backward compatibility
export type { MoodType } from '@/types/expressions';

// Combine all expressions into one object
const characterExpressions: AllCharacterExpressions = {
  maven: mavenExpressions,
  xavier: xavierExpressions,
  navarre: navarreExpressions,
  etta: ettaExpressions,
  senara: senaraExpressions
};

// Helper function to get all expressions for a character
export function getCharacterExpressions(characterId: CharacterId): CharacterExpression[] {
  return Array.isArray(characterExpressions[characterId]) 
    ? characterExpressions[characterId] 
    : [];
}

// Helper function to get a specific expression by mood
export function getCharacterExpressionByMood(
  characterId: CharacterId, 
  mood: MoodType
): CharacterExpression | undefined {
  const expressions = characterExpressions[characterId] || [];
  
  if (Array.isArray(expressions)) {
    return expressions.find(e => e.mood === mood);
  }
  return undefined;
}

export default characterExpressions;
