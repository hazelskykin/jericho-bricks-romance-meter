
import { Scene } from '../../../types/game';

const winterIntroScenes: Record<string, Scene> = {
  'winter-intro': {
    id: 'winter-intro',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "With autumn's harvest complete, winter settles in Stonewich. The air is crisp and the city prepares for its most celebrated event.",
      },
      {
        character: 'narrator',
        text: "The Winter Games & Gala is the crown jewel of Stonewich's seasonal festivals, drawing visitors from neighboring cities.",
      },
      {
        character: 'xavier',
        text: "Winter in Stonewich really is something special. The Games & Gala transforms the entire city.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "It's a complex logistical operation. Our systems will be running at maximum capacity.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I've heard so much about this festival. I'm excited to see it firsthand.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'winter-planning',
  }
};

export default winterIntroScenes;
