
import { CharacterId } from '@/types/game';
import { CharacterExpression, CharacterExpressionSet, MoodType, AllCharacterExpressions } from '@/types/expressions';

// Import individual character expressions
import mavenExpressions from './expressions/maven';
import xavierExpressions from './expressions/xavier';
import navarreExpressions from './expressions/navarre';
import ettaExpressions from './expressions/etta';
import senaraExpressions from './expressions/senara';

// Export type for backward compatibility
export type { MoodType } from '@/types/expressions';

// Convert expression sets to arrays for the combined dictionary
const characterExpressions: Record<CharacterId, CharacterExpression[]> = {
  maven: Object.values(mavenExpressions),
  xavier: Object.values(xavierExpressions),
  navarre: Object.values(navarreExpressions),
  etta: Object.values(ettaExpressions),
  senara: Object.values(senaraExpressions)
};

// Helper function to get all expressions for a character
export function getCharacterExpressions(characterId: CharacterId): CharacterExpression[] {
  return characterExpressions[characterId] || [];
}

// Helper function to get a specific expression by mood
export function getCharacterExpressionByMood(
  characterId: CharacterId, 
  mood: MoodType
): CharacterExpression | undefined {
  const expressions = characterExpressions[characterId] || [];
  return expressions.find(e => e.mood === mood);
}

export default characterExpressions;
