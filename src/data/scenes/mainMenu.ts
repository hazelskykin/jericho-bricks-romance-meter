
import { Scene } from '../../types/game';

const mainMenu: Record<string, Scene> = {
  'start': {
    id: 'start',
    background: 'wall-tiles',
    dialogue: [
      {
        character: 'narrator',
        text: 'Welcome to Jericho Bricks!',
      },
    ],
    choices: [
      {
        text: 'New Game',
        nextSceneId: 'intro',
      },
      {
        text: 'About',
        nextSceneId: 'about',
      },
    ],
  },
  
  'about': {
    id: 'about',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'Jericho Bricks is a visual novel game set in the city of Stonewich.',
      },
      {
        character: 'narrator',
        text: 'Follow Maven and her teammates as they navigate their roles as city administrators.',
      },
      {
        character: 'narrator',
        text: 'Each character has their own strengths and personality. Your choices will affect your relationships with them.',
      },
    ],
    choices: [
      {
        text: 'Back to Main Menu',
        nextSceneId: 'start',
      },
    ],
  },
  
  'main-menu': {
    id: 'main-menu',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'Thank you for playing Jericho Bricks!',
      },
    ],
    choices: [
      {
        text: 'Return to Main Menu',
        nextSceneId: 'start',
      },
    ],
  },
};

export default mainMenu;
