
import { Scene } from '../../../types/game';

const summerFestivalScenes: Record<string, Scene> = {
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
      }
    ],
    choices: [
      {
        text: "Let's focus on the musical performances first",
        nextSceneId: 'summer-music-game-intro',
        affectionChanges: { xavier: 0.5, senara: 0.5 }
      },
      {
        text: "I'm more interested in the wine tasting events",
        nextSceneId: 'summer-wine-tasting-intro',
        affectionChanges: { navarre: 0.5, etta: 0.5 }
      }
    ]
  },
  
  // Festival activities selection scene
  'summer-festival-activities': {
    id: 'summer-festival-activities',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The Summer Songs & Sips festival is underway! What aspect would you like to experience first?",
      }
    ],
    // This scene doesn't advance automatically as it uses the FestivalActivitiesScene component
  },
};

export default summerFestivalScenes;
