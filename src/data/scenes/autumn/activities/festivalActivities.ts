
import { Scene } from '@/types/game';

const festivalActivities: Record<string, Scene> = {
  'autumn-festival-activities': {
    id: 'autumn-festival-activities',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "Choose an autumn festival activity to explore."
      }
    ],
    nextSceneId: 'autumn-festival-completion'
  }
};

export default festivalActivities;
