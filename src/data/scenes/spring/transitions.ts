
import { Scene } from '../../../types/game';

const springTransitionScenes: Record<string, Scene> = {
  'season-transition-spring': {
    id: 'season-transition-spring',
    background: 'spring-transition',
    dialogue: [],  // Empty dialogue as this will be handled by the SeasonTransition component
    nextSceneId: 'spring-intro',
  },
};

export default springTransitionScenes;
