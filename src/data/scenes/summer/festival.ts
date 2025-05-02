
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
    nextSceneId: 'spring-transition', // Temporarily point back to spring for demo purposes
  }
};

export default summerFestivalScenes;
