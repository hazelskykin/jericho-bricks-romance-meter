
import { CharacterId } from './game';

export type MoodType = 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'laughing' | 'shocked' | 'embarrassed' | 'confident' | 'thoughtful';

export interface CharacterExpression {
  characterId: CharacterId;
  mood: MoodType;
  image: string;
  description: string;
}

export type CharacterExpressionSet = Record<MoodType, CharacterExpression>;
export type AllCharacterExpressions = Record<CharacterId, CharacterExpressionSet>;
