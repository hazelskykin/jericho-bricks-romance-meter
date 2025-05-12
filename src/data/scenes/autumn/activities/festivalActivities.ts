
import { Scene } from '@/types/game';

const festivalActivities: Record<string, Scene> = {
  'autumn-festival-activities': {
    id: 'autumn-festival-activities',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The Autumn Festival is in full swing! There are several activities I could join. What should I check out first?",
        mood: 'thoughtful',
      }
    ],
    choices: [
      {
        text: "Join the artisan workshop to create a handcrafted item",
        nextSceneId: 'autumn-crafter-intro'
      },
      {
        text: "Help guide tourists around the historic district",
        nextSceneId: 'autumn-tour-guide-intro'
      },
      {
        text: "Create a memory photo album of the festival",
        nextSceneId: 'autumn-memories-intro'
      }
    ]
  }
};

export default festivalActivities;
