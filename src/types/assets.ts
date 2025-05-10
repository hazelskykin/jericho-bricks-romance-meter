
// Define asset types for the game
export interface BackgroundAsset {
  id: string;
  name: string;
  image: string;
  description: string;
  gradient?: string;
  priority?: boolean;
}

export interface MinigameAsset {
  id: string;
  name: string;
  src: string;
  description: string;
  priority?: boolean;
  category?: 'ui' | 'character' | 'background' | 'effect' | 'item';
}

// Sound effect categories
export type SoundCategory = 'ui' | 'minigame' | 'dialogue' | 'ambient' | 'music';

export interface SoundEffect {
  id: string;
  src: string;
  volume?: number;
  fallbackSrc?: string;
  category?: SoundCategory;
  loop?: boolean;
}
