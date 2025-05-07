
import { Scene } from '@/types/game';

const winterTransitionScenes: Record<string, Scene> = {
  'season-transition-winter': {
    id: 'season-transition-winter',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "As autumn's vibrant colors fade, the first snowflakes begin to fall on Stonewich.",
      },
      {
        character: 'narrator',
        text: "Winter has arrived, bringing with it the most anticipated festival of the year - the Winter Gala & Games.",
      }
    ],
    nextSceneId: 'winter-intro',
  }
};

export default winterTransitionScenes;
