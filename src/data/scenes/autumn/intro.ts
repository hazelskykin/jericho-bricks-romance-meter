
import { Scene } from '../../../types/game';

const autumnIntroScenes: Record<string, Scene> = {
  'autumn-intro': {
    id: 'autumn-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'As summer fades, the crisp air of autumn settles over Stonewich.',
      },
      {
        character: 'narrator',
        text: 'The team has become more cohesive, and your relationships have deepened with certain members.',
      },
      {
        character: 'maven',
        text: "The seasons change so quickly here. It feels like we just arrived.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'spring-transition', // Temporarily point back to spring for demo purposes
  }
};

export default autumnIntroScenes;
