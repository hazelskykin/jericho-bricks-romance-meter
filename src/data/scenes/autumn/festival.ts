
import { Scene } from '@/types/game';

const festivalScenes: Record<string, Scene> = {
  'autumn-festival-intro': {
    id: 'autumn-festival-intro',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The autumn air is crisp with the scent of spiced cider and wood smoke as we arrive at the Autumn Handicrafts & Heritage Festival.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "The festival celebrates the traditional crafts and cultural heritage that have been passed down through generations in Stonewich.",
      },
      {
        character: 'maven',
        text: "I'm excited to see all the different crafts and traditions on display. There's so much to explore!",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-activities',
  },
  
  'autumn-festivities-conclusion': {
    id: 'autumn-festivities-conclusion',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "That was a wonderful time at the festival. I feel like I've really connected with the heritage of Stonewich.",
        mood: 'happy'
      },
      {
        character: 'maven',
        text: "I should check in with the team and see what's next on our agenda.",
        mood: 'thoughtful'
      }
    ],
    nextSceneId: 'autumn-conclusion-debrief'
  }
};

export default festivalScenes;
