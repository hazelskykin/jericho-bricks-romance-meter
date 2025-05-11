
import { Scene } from '../../../types/game';

const winterIntroScenes: Record<string, Scene> = {
  'winter-intro': {
    id: 'winter-intro',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: "With autumn's harvest complete, winter settles in Stonewich. The air is crisp and the city prepares for its most celebrated event.",
      },
      {
        character: 'narrator',
        text: "The Winter Gala & Games is the crown jewel of Stonewich's seasonal festivals, drawing visitors from neighboring cities.",
      },
      {
        character: 'xavier',
        text: "Winter in Stonewich really is something special. The Gala & Games transforms the entire city.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The marking of a year's end, and the hopeful start to a new one. I never fully appreciated that sentiment before.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "I've heard so much about this festival. I'm excited to see it firsthand with the very best fashion and food.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The fickle weather makes practical planning more essential than ever. There's so much to do!",
        mood: 'neutral',
      },
    ],
    nextSceneId: 'winter-planning',
  }
};

export default winterIntroScenes;
