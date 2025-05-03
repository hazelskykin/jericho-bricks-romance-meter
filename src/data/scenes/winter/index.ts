
import { Scene } from '../../../types/game';

// Import winter scene collections when they are developed
// import introScenes from './intro';
// import festivalScenes from './festival';

const winter: Record<string, Scene> = {
  // Create a placeholder scene for winter intro
  'winter-intro': {
    id: 'winter-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'Winter has arrived in Stonewich, bringing with it snow-covered streets and festive decorations.',
      },
      {
        character: 'maven',
        text: "It's hard to believe we've been here for almost a year now.",
        mood: 'neutral',
      },
    ],
    nextSceneId: 'winter-planning',
  },
  
  // Placeholder for winter planning
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
