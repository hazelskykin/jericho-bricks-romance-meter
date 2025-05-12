
export interface Position {
  x: number;
  y: number;
}

export interface HiddenItem {
  id: string;
  name: string;
  found: boolean;
  highlighted: boolean;
  position: Position;
}

export interface GameState {
  hiddenItems: HiddenItem[];
  clickPosition: Position | null;
  showHint: boolean;
  hintCooldown: number;
  gameComplete: boolean;
  timeRemaining: number;
  gameExited: boolean;
}
