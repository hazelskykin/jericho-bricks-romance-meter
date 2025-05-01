
import { CharacterId, MoodType } from './game';

export interface CharacterExpression {
  characterId: CharacterId;
  mood: MoodType;
  image: string;
  description: string;
}

export type CharacterExpressionSet = Record<MoodType, CharacterExpression>;
export type AllCharacterExpressions = Record<CharacterId, CharacterExpressionSet>;
