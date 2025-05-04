
import { Scene } from '../../../types/game';

const springTransitionScenes: Record<string, Scene> = {
  'season-transition-spring': {
    id: 'season-transition-spring',
    background: 'spring-transition',
    dialogue: [
      {
        character: narrator,
        text: "Spring Chapter 1",
      },
    ],  // Empty dialogue as this will be handled by the SeasonTransition component
    nextSceneId: 'spring-intro',
  },
};

export default springTransitionScenes;
