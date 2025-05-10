
import { CharacterId } from './game';
import { CharacterExpression, MoodType } from './expressions';

// Type definition for CharacterExpressionSet to be used in individual character expression files
export interface CharacterExpressionSet {
  [mood: string]: CharacterExpression;
}
