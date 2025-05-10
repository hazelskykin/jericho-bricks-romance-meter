
import { CharacterId } from '@/types/game';

export interface MudballData {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  rotation: number;
  speed: number;
  shooter: 'player' | 'opponent';
  state: 'flying' | 'splashing' | 'completed';
  splashStartTime?: number;
  
  // Additional properties for compatibility with existing code
  position?: { x: number, y: number };
  targetPosition?: { x: number, y: number };
  owner?: 'player' | 'opponent';
  team?: 'team1' | 'team2';
  timeLeft?: number;
  isFlying?: boolean;
  flying?: boolean;
  size?: number;
  angle?: number;
}

// Alias for MudballData to maintain compatibility with both naming conventions
export type MudBall = MudballData;

export interface AISettings {
  accuracy: number; // 0-1, how accurate the AI is
  reactionTime: number; // ms, how quickly the AI responds
  aggressiveness: number; // 0-1, how often the AI throws
}

export interface MudFlingGameState {
  playerCharacter: string;
  opponentCharacter: string;
  score: {
    player: number;
    opponent: number;
  };
  gameTime: number; // Total time in seconds
  timeRemaining: number; // Time left in seconds
  gameStatus: 'intro' | 'playing' | 'paused' | 'completed';
}

export interface Position {
  x: number;
  y: number;
}

export interface MudCharacterPosition {
  x: number;
  y: number;
}

export interface Character {
  id: CharacterId;
  position: Position;
  team: 'team1' | 'team2';
  isHit: boolean;
  recoveryTime: number;
}
