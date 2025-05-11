
import { Scene, CharacterId } from '@/types/game';

// Spring character selection scene
const springCharacterSelections: Record<string, Scene> = {
  'spring-character-selection': {
    id: 'spring-character-selection',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'As spring begins in Stonewich, the team prepares for the Blooms & Brooms Festival. Maven needs to decide who to spend time with first.',
      }
    ],
    // No nextSceneId - this will be handled by the UI
  }
};

export default springCharacterSelections;
