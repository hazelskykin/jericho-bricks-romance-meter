
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
        character: 'mavne',
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
  
  // Summer minigame intro scenes
  'summer-serenade-intro': {
    id: 'summer-serenade-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "The four main stages each showcase a different musical style. Each one reflects something about our team's personalities, in a way.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I can see the crowds are really getting into the music. It's a beautiful sight.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Why not try the interactive rhythm experience? You can select a stage and follow along with the music.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "That sounds like fun! I'll give it a try.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-serenade-start',
  },
  
  'summer-spoken-word-intro': {
    id: 'summer-spoken-word-intro',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'senara',
        text: "Poetry is a fascinating linguistic construct. The way words can be arranged to create both meaning and rhythm simultaneously.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I've never written poetry before, but I've always appreciated it.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The spoken word competition allows participants to choose from different stanza options to create a coherent poem. Would you like to try?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I think I would. It might help me understand the artistic side of Stonewich better.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-spoken-word-start',
  },
  
  'summer-whats-on-tap-intro': {
    id: 'summer-whats-on-tap-intro',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "The beer tents are always the heart of the social scene at the festival! Want to try your hand at serving?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I've never done anything like that before.",
        mood: 'surprised',
      },
      {
        character: 'navarre',
        text: "It's simple! Just pour the right drinks with the right amount of foam, ice, or flavoring. You'll be surprised how quickly you can read what people want.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Alright, I'll give it a shot. It could be fun to be on the other side of the counter for once.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-whats-on-tap-start',
  },
  
  // Result scenes for summer minigames
  'summer-serenade-complete': {
    id: 'summer-serenade-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "That was fantastic! Music has this way of connecting people instantaneously. It's one of the purest forms of communication.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I felt that. When everyone was moving to the same rhythm, it created this sense of unity I hadn't experienced before.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "That's exactly why I love creating these interactive experiences. Technology can help forge those connections, make them more accessible.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-festival-activities',
  },
  
  'summer-spoken-word-complete': {
    id: 'summer-spoken-word-complete',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'senara',
        text: "Interesting choices in your composition. The thematic coherence shows an intuitive understanding of linguistic patterns.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "It was challenging to maintain a consistent theme while also creating something that flowed naturally.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "That's the beauty of it. The constraints force creative solutions. Your mind adapted to find connections between seemingly disparate elements.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'summer-festival-activities',
  },
  
  'summer-whats-on-tap-complete': {
    id: 'summer-whats-on-tap-complete',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "You're a natural! Did you see how people opened up to you while you were serving them?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "It was surprising how many conversations started just from a simple interaction over a drink order.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "That's the secret to networking - create a simple, comfortable exchange first. Everything builds from there. You just experienced the foundation of how I build connections.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-festival-activities',
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
