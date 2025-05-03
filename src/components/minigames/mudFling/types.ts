
import { CharacterId } from '@/types/game';

export interface Position {
  x: number;
  y: number;
}

export interface MudBall {
  id: string;
  position: Position;
  owner: 'player' | CharacterId | null;
  target?: 'team1' | 'team2';
  isFlying: boolean;
  flightPath?: {
    start: Position;
    end: Position;
    progress: number;
  };
}

export interface Character {
  id: CharacterId;
  position: Position;
  team: 'team1' | 'team2';
  isHit: boolean;
  recoveryTime: number;
}
