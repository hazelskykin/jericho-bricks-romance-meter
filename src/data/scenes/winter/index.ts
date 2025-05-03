
import { Scene } from '../../../types/game';
import introScenes from './intro';

// Import winter scene collections when they are developed
// import festivalScenes from './festival';

const winter: Record<string, Scene> = {
  ...introScenes,
  
  // Create a placeholder scene for winter planning
  'winter-planning': {
    id: 'winter-planning',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'xavier',
        text: "Winter in Stonewich is special. The Winter Games & Gala is their biggest event of the year.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "We need to ensure all systems are operating at peak efficiency. The heating network alone requires significant oversight.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "And we'll need to coordinate with the various event committees. They've been planning this for months.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'winter-character-selection',
  },
  
  // Placeholder for character selection
  'winter-character-selection': {
    id: 'winter-character-selection',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'maven',
        text: "I should see how everyone's preparing for the winter festivities.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'main-menu', // Loop back to main menu for now since we're in demo mode
  },
};

export default winter;
