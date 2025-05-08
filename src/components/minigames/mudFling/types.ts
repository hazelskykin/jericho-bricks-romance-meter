
export interface Position {
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
  size: number; // Add size property
  flying: boolean; // Add flying alias for isFlying for backward compatibility
}

export interface Character {
  id: string;
  position: Position;
  team: 'team1' | 'team2';
  isHit: boolean;
  recoveryTime: number;
}
