
import { Scene } from '../../../types/game';

const seasonTransitionScenes: Record<string, Scene> = {
  'season-transition-winter': {
    id: 'season-transition-winter',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "Winter blankets Stonewich in pristine white snow, transforming the city into a glistening wonderland. The final and most prestigious event of the year approaches - the Winter Games & Gala.",
      },
      {
        character: 'narrator',
        text: "As the team prepares for their final challenge, personal relationships have deepened and professional bonds have strengthened through the seasons.",
      },
      {
        character: 'maven',
        text: "The final season... our last chance to prove ourselves. And perhaps, to decide where our hearts truly lie.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'winter-intro'
  }
};

export default seasonTransitionScenes;
