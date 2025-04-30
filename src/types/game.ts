
export type CharacterId = 'xavier' | 'navarre' | 'etta' | 'senara';

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
  character?: CharacterId | 'maven' | 'narrator';
  text: string;
  mood?: 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised';
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
