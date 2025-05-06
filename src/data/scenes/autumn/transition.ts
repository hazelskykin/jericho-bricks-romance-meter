
import { Scene } from '../../../types/game';

const seasonTransitionScenes: Record<string, Scene> = {
  'season-transition-winter': {
    id: 'season-transition-winter',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "As autumn fades, winter settles over Stonewich. The city transforms under a blanket of snow and twinkling lights.",
      },
      {
        character: 'narrator',
        text: "A new season brings new challenges and opportunities, as well as the looming final assessment of the team's year in Stonewich.",
      },
      {
        character: 'maven',
        text: "Winter in Stonewich... it's beautiful. Hard to believe our year is almost up.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'winter-intro'
  }
};

export default seasonTransitionScenes;
