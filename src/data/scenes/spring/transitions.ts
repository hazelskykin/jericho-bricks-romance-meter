import { Scene } from '@/types/game';

// Transition scenes for the spring season
const springTransitionScenes: Record<string, Scene> = {
  'spring-selection': {
    id: 'spring-selection',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'Maven considers who to spend time with during the festival preparations.',
      }
    ],
    nextSceneId: 'spring-character-selection' // This will ensure the proper transition
  },
  
  'season-transition-spring': {
    id: 'season-transition-spring',
    background: 'spring-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "Spring Chapter 1",
      },
    ],  // Empty dialogue as this will be handled by the SeasonTransition component
    nextSceneId: 'spring-intro',
  },
};

export default springTransitionScenes;
