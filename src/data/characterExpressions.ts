
import { MoodType, CharacterId } from '@/types/game';
import { CharacterExpression, AllCharacterExpressions } from '@/types/expressions';

// Import individual character expressions
import mavenExpressions from './expressions/maven';
import xavierExpressions from './expressions/xavier';
import navarreExpressions from './expressions/navarre';
import ettaExpressions from './expressions/etta';
import senaraExpressions from './expressions/senara';

// Export MoodType for backward compatibility
export { MoodType };

// Combine all expressions into one object
const characterExpressions: AllCharacterExpressions = {
  maven: mavenExpressions,
  xavier: xavierExpressions,
  navarre: navarreExpressions,
  etta: ettaExpressions,
  senara: senaraExpressions
};

export default characterExpressions;
