
import { CharacterId } from './game';

// Minigame types by season
export type MinigameType = 
  // Spring minigames
  'broomsAway' | 'mudFling' | 'bloomWithAView' | 
  // Summer minigames
  'serenade' | 'spokenWord' | 'whatsOnTap' |
  // Autumn minigames
  'tourGuide' | 'crafter' | 'memoriesDate' |
  // Winter minigames
  'charityAuction' | 'galaDance' | 'lookingSigns';

// Affection changes by minigame and character
export interface AffectionChanges {
  [key: string]: Partial<Record<CharacterId, number>>;
}

// Minigame state for tracking active minigames
export interface MinigameState {
  activeMinigame: MinigameType | null;
  returnSceneAfterMinigame: string;
  pendingMinigame: MinigameType | null;
}
