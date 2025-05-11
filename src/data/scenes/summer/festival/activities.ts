
import { Scene } from '../../../../types/game';

const summerFestivalActivitiesScenes: Record<string, Scene> = {
  // Festival activities selection scene
  'summer-festival-activities': {
    id: 'summer-festival-activities',
    background: 'summer-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: "The Summer Songs & Sips festival is underway! What aspect would you like to experience first?",
      }
    ],
    // This scene doesn't advance automatically as it uses the FestivalActivitiesScene component
  },
};

export default summerFestivalActivitiesScenes;
