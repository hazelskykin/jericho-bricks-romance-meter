
export interface Position {
  x: number;
  y: number;
}

export interface MudCharacterPosition {
  x: number;
  y: number;
}

export interface MudBall {
  id: string;
  position: Position;
  team: 'team1' | 'team2';
  isFlying: boolean;
  targetPosition?: Position;
  velocity?: {
    x: number;
    y: number;
  };
  size: number;
  flying: boolean;
  isThrown?: boolean;
  isHeld?: boolean;
  
  // For compatibility with older code
  x?: number;
  y?: number;
  targetX?: number;
  targetY?: number;
  speed?: number;
  owner?: 'player' | 'opponent';
  timeLeft?: number;
  angle?: number;
  state?: 'flying' | 'splashed';
}

export interface Character {
  id: string;
  position: Position;
  team: 'team1' | 'team2';
  isHit: boolean;
  recoveryTime: number;
}
