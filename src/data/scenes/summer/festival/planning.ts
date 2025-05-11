
import { Scene } from '../../../../types/game';

const summerFestivalPlanningScenes: Record<string, Scene> = {
  'summer-planning': {
    id: 'summer-planning',
    background: 'stonewich-office',
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
        text: "We should consider how our participation can optimize tourism revenues.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The festival includes performances that celebrate Stonewich's dynamic cultural evolution.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Let's finalize our plans for the festival activities.",
        mood: 'happy',
      }
    ],
    // Direct transition to festival activities, skipping the choice
    nextSceneId: 'summer-festival-activities'
  },
};

export default summerFestivalPlanningScenes;
