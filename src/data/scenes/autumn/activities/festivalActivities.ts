
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
    nextSceneId: 'autumn-festival-completion' // Adding a proper next scene ID
    // Removed the 'type' property which doesn't exist in Scene type
  }
};

export default festivalActivities;
