import { Scene } from '../../../types/game';
import introScenes from './intro';

// Import winter scene collections when they are developed
// import festivalScenes from './festival';

const winter: Record<string, Scene> = {
  ...introScenes,
  
  // Create a placeholder scene for winter planning
  'winter-planning': {
    id: 'winter-planning',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'xavier',
        text: "Winter in Stonewich is special. The Winter Games & Gala is their biggest event of the year.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'winter-character-selection',
  },
  
  // Placeholder for character selection
  'winter-character-selection': {
    id: 'winter-character-selection',
    background: 'stonewich-cityscape',
    dialogue: [],
    nextSceneId: 'winter-festival-planning',
  },
};

export default winter;
