
import { Scene } from '@/types/game';

// Import scene collections
import intro from './intro';
import relationshipScenes from './relationship';
import activities from './activities';
import activitiesScenes from './activities/index';

// Create autumn-festival-intro scene
const festivalIntroScene: Record<string, Scene> = {
  'autumn-festival-intro': {
    id: 'autumn-festival-intro',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The Autumn Heritage & Handicrafts Festival is starting today! I should check out what activities they have.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "The city is decorated with autumn colors, and the air smells of spiced cider and wood smoke.",
      },
      {
        character: 'senara',
        text: "This festival celebrates the rich heritage of Stonewich. The traditional crafts exhibited here have been passed down through generations.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  }
};

// Additional autumn scenes
const additionalScenes: Record<string, Scene> = {
  'autumn-conclusion': {
    id: 'autumn-conclusion',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The Autumn Festival was wonderful. I've learned so much about Stonewich's traditions and made some meaningful connections.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "As the season draws to a close, the team prepares for winter and the upcoming annual review."
      }
    ],
    nextSceneId: 'season-transition-winter'
  },
  'autumn-festivities-conclusion': {
    id: 'autumn-festivities-conclusion',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "I really enjoyed the Autumn Heritage Festival. The traditional crafts and activities gave me a deeper appreciation for Stonewich's culture.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "The festival concludes with a small ceremony honoring the artisans and volunteers who made it possible."
      }
    ],
    nextSceneId: 'autumn-conclusion'
  }
};

// Merge all autumn scenes into one collection
const autumn: Record<string, Scene> = {
  ...intro,
  ...relationshipScenes,
  ...activities,
  ...activitiesScenes,
  ...festivalIntroScene,
  ...additionalScenes
};

export default autumn;
