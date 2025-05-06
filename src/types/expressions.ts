
import { CharacterId } from '@/types/game';

export type MoodType = 
  'neutral' | 
  'happy' | 
  'sad' | 
  'angry' | 
  'surprised' | 
  'laughing' | 
  'shocked' | 
  'embarrassed' | 
  'thoughtful' | 
  'determined' | 
  'curious' | 
  'nervous' | 
  'concerned' | 
  'conflicted' | 
  'stressed' | 
  'vulnerable' | 
  'sincere' | 
  'serious' | 
  'grateful' | 
  'excited' | 
  'proud' | 
  'impressed' | 
  'pleased' |
  'confident'; // Adding 'confident' to fix build errors

export interface CharacterExpression {
  characterId: CharacterId;
  mood: MoodType;
  image: string;
  description: string;
}

export interface CharacterExpressionSet {
  [key: string]: CharacterExpression;
}

export interface AllCharacterExpressions {
  [characterId: string]: CharacterExpressionSet;
}
