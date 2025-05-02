
import { Scene } from '../../../types/game';

const summerIntroScenes: Record<string, Scene> = {
  'summer-intro': {
    id: 'summer-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'The spring season comes to a close as Stonewich welcomes the warmth of summer.',
      },
      {
        character: 'narrator',
        text: 'Your team has grown more comfortable with their roles, and the next seasonal festival approaches—Summer Songs & Sips.',
      },
      {
        character: 'maven',
        text: "I'm looking forward to seeing what summer in Stonewich has to offer.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-planning',
  }
};

export default summerIntroScenes;
