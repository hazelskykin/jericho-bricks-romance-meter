
import { Scene } from '../../../types/game';

const winterIntroScenes: Record<string, Scene> = {
  'winter-intro': {
    id: 'winter-intro',
    background: 'winter-transition',
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
      {
        character: 'xavier',
        text: "Winter in Stonewich is special. The Winter Games & Gala is their biggest event of the year.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The cold weather presents unique challenges for our systems. We need to ensure all heating and snow removal functions are operating at peak efficiency.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "The gala is THE social event of the year. Everyone who's anyone will be there, and it's the perfect opportunity to strengthen our connections in the city.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Winter celebrations in Stonewich date back to the founding of the city. They represent the community's resilience through hardship.",
        mood: 'neutral',
      },
    ],
    nextSceneId: 'winter-planning',
  }
};

export default winterIntroScenes;
