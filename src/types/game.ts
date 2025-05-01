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
}

export interface GameState {
  currentScene: string;
  dialogueIndex: number;
  characters: Record<CharacterId, Character>;
  sceneHistory: string[];
  showChoices: boolean;
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
