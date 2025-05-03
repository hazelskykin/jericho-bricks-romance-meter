
import { Scene } from '../../../types/game';

const departureScenes: Record<string, Scene> = {
  'departure': {
    id: 'departure',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'senara',
        text: 'Arriving in a new city is always fascinating. So much potential waiting to be unlocked.',
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "It's a little overwhelming, but I'm ready to learn.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'As your team settles into Stonewich, you begin your new role as Cybaton administrators...',
      },
      {
        character: 'narrator',
        text: 'The city seems to welcome you, but there are challenges ahead that will test your adaptability.',
      },
    ],
    nextSceneId: 'season-transition-spring', // Changed from 'main-menu' to transition to spring
  }
};

export default departureScenes;
