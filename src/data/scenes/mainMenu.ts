
import { Scene } from '../../types/game';

const mainMenu: Record<string, Scene> = {
  'start': {
    id: 'start',
    background: 'cybaton-office',
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
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'narrator',
        text: 'Jericho Bricks is a visual novel where you play as Maven, a new recruit in the Cybaton city administration program.',
      },
      {
        character: 'narrator',
        text: 'Your choices will affect your relationships with your teammates, each of whom is a potential romance option.',
      },
      {
        character: 'narrator',
        text: 'Explore the city of Stonewich, navigate workplace challenges, and maybe find love along the way!',
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
        text: 'End of prologue. Thank you for playing the demo of Jericho Bricks!',
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
