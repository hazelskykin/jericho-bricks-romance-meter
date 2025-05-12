
export type CharacterId = 'xavier' | 'navarre' | 'etta' | 'senara' | 'maven';

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  description: string;
  affection: number;
  avatar: string;
  color: string;
  temperament: string;
}

export interface DialogueLine {
  character?: CharacterId | 'narrator';
  text: string;
  mood?: import('./expressions').MoodType;
}

export interface DialogueChoice {
  text: string;
  affectionChanges?: Partial<Record<CharacterId, number>>;
  nextSceneId?: string;
}

export interface Scene {
  id: string;
  background: string;
  dialogue: DialogueLine[];
  choices?: DialogueChoice[];
  nextSceneId?: string;
  minigame?: import('./minigames').MinigameType;
}

// Interface for backup scene state (for replay feature)
export interface SceneStateBackup {
  characters: Record<CharacterId, Character>;
}

export interface GameState {
  currentScene: string;
  dialogueIndex: number;
  characters: Record<CharacterId, Character>;
  sceneHistory: string[];
  showChoices: boolean;
  hasCompletedGame: boolean;
  
  // Track completed character routes
  completedRoutes: {
    xavier: boolean;
    navarre: boolean;
    etta: boolean;
    senara: boolean;
  };
  
  // Track current season and playthrough progression
  currentSeason: 'prologue' | 'spring' | 'summer' | 'autumn' | 'winter' | 'epilogue' | 'versa-epilogue';
  
  // Track which characters are still viable love interests
  viableRoutes: CharacterId[];
  
  // Track current love interest (if selected)
  currentLoveInterest?: CharacterId;
  
  // Track whether the Versa route is unlocked
  versaRouteUnlocked: boolean;
  
  // New field to backup scene state for replay feature
  sceneStateBackup: SceneStateBackup | null;
}

export interface BackgroundAsset {
  id: string;
  name: string;
  image: string;
  description: string;
  gradient: string;
}

export interface CharacterExpression {
  characterId: CharacterId;
  mood: import('./expressions').MoodType;
  image: string;
  description: string;
}

// Add ChibiImageData interface
export interface ChibiImageData {
  id: CharacterId;
  image: string;
  description: string;
  width?: string;
}
