
// Types shared across Bloom With A View minigame components

export interface HiddenItem {
  id: string;
  name: string;
  found: boolean;
  position: {
    x: number;
    y: number;
  };
  highlighted?: boolean; // Property for hint highlighting
}

export interface GameState {
  hiddenItems: HiddenItem[];
  clickPosition: { x: number, y: number } | null;
  showHint: boolean;
  hintCooldown: number;
  gameComplete: boolean;
  timeRemaining: number;
}
