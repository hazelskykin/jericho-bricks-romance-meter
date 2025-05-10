
import { CharacterId } from './game';

export type CharacterMood = 
  | 'happy' 
  | 'neutral' 
  | 'sad' 
  | 'angry' 
  | 'surprised' 
  | 'thoughtful' 
  | 'flirty' 
  | 'worried'
  | 'laughing'
  | 'shocked'
  | 'embarrassed'
  | 'confident'
  | 'determined'
  | 'curious'
  | 'nervous'
  | 'concerned'
  | 'reflective'
  | 'pleased'
  | 'proud';
  
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

// Add CharacterExpressionSet interface for individual character expression files
export interface CharacterExpressionSet {
  [key: string]: CharacterExpression;
}

// Add AllCharacterExpressions interface for combined character expressions
export interface AllCharacterExpressions {
  [characterId: string]: CharacterExpression[];
}
