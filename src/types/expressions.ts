
import { CharacterId } from './game';

export type CharacterMood = 'happy' | 'neutral' | 'sad' | 'angry' | 'surprised' | 'thoughtful' | 'flirty' | 'worried';
export type MoodType = CharacterMood | 'normal';

export interface CharacterExpression {
  characterId: CharacterId;
  mood: MoodType;
  image: string;
  description: string;
  priority?: boolean; // Added for asset preloading
}

export interface CharacterExpressionDictionary {
  [key: string]: CharacterExpression;
}

export type CharacterExpressionKey = string;
