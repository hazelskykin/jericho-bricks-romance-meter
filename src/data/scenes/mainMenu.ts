
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
