
import { Scene } from '../../../types/game';

const summerFestivalScenes: Record<string, Scene> = {
  'summer-planning': {
    id: 'summer-planning',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'xavier',
        text: "Summer Songs & Sips is Stonewich's way of celebrating music, culture, and local beverages.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "It's the most social event of the year—perfect for making connections and enjoying the nightlife.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "We should consider how our participation can optimize city maintenance during the increased tourism.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The festival includes historical performances that document Stonewich's cultural evolution.",
        mood: 'neutral',
      }
    ],
    // This scene would typically have choices, but we'll leave it as a placeholder
    nextSceneId: 'summer-conclusion',
  },
  
  // Added conclusion and transition scenes
  'summer-conclusion': {
    id: 'summer-conclusion',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "As the Summer Songs & Sips festival concludes, your relationships with your teammates have evolved.",
      },
      {
        character: 'maven',
        text: "I feel like I'm growing closer to certain people on the team.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-transition',
  },
  
  // Special scene to trigger autumn season transition
  'summer-transition': {
    id: 'summer-transition',
    background: 'stonewich-cityscape',
    dialogue: [], // Empty dialogue to trigger season transition
    nextSceneId: 'autumn-intro', // Will point to autumn content when it's created
  }
};

export default summerFestivalScenes;
