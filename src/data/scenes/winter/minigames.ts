
import { Scene } from '../../../types/game';

// Winter minigame scenes
const minigameScenes: Record<string, Scene> = {
  // Looking Signs minigame - start scene
  'winter-looking-signs-start': {
    id: 'winter-looking-signs-start',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: 'Reading the signs of fortune begins now!'
      }
    ],
    minigame: 'lookingSigns'
  },

  // Looking Signs minigame - complete scene
  'winter-looking-signs-complete': {
    id: 'winter-looking-signs-complete',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "That was interesting! I think I'm starting to understand this tradition better.",
        mood: 'happy'
      }
    ],
    nextSceneId: 'winter-festival-activities'
  }
};

export default minigameScenes;
