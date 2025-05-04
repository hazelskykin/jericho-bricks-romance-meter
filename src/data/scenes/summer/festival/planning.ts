
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
      }
    ],
    choices: [
      {
        text: "Let's focus on the musical performances first",
        nextSceneId: 'summer-music-discussion',
        affectionChanges: { xavier: 0.5, senara: 0.5 }
      },
      {
        text: "I'm more interested in the beverage aspects",
        nextSceneId: 'summer-beverage-discussion',
        affectionChanges: { navarre: 0.5, etta: 0.5 }
      }
    ]
  },
  
  // Detailed discussion scenes
  'summer-music-discussion': {
    id: 'summer-music-discussion',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'xavier',
        text: "Music brings people together across all backgrounds. I've designed some interactive exhibits that will let visitors experience the songs in new ways.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The festival features four main stages, each with a different musical tradition. It's a fascinating cultural analysis of how sound patterns evolve differently across communities.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I've always found music so powerful. It's amazing how it can communicate emotions even without words.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "The organizers have also included a spoken word competition this year. It's an excellent way for people to express themselves.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-festival-activities'
  },
  
  'summer-beverage-discussion': {
    id: 'summer-beverage-discussion',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'navarre',
        text: "The 'Sips' part of the festival is where all the networking magic happens. Local breweries and vineyards showcase their finest creations.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The beverage industry generates significant revenue for Stonewich. We've structured the pricing tiers to maximize both accessibility and profit.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "How do you organize such a large-scale beverage service for the entire city?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Volunteers! They run the beer tents throughout the festival grounds. It's actually quite fun - you might want to try it yourself.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-festival-activities'
  },
};

export default summerFestivalPlanningScenes;
