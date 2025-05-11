
import { Scene } from '../../../types/game';

const seasonTransitionScenes: Record<string, Scene> = {
  'season-transition-autumn': {
    id: 'season-transition-autumn',
    background: 'autumn-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "As summer fades, autumn blankets Stonewich in rich, warm colors. The city prepares for the Handicrafts & Heritage festival.",
      },
      {
        character: 'narrator',
        text: "The team's bond has grown stronger, and certain relationships have deepened beyond professional camaraderie.",
      },
      {
        character: 'maven',
        text: "Autumn in Stonewich... I can feel a change in the air. Not just the season, but something in me too.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'autumn-intro'
  }
};

export default seasonTransitionScenes;
