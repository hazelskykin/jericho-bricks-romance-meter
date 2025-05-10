
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
}

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
