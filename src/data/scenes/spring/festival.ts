
import { Scene } from '../../../types/game';

const springFestivalScenes: Record<string, Scene> = {
  // Festival planning scene after all character visits
  'spring-festival-planning': {
    id: 'spring-festival-planning',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: "A few days later, with the Spring festival approaching, the team gathers to finalize the plans.",
      },
      {
        character: 'etta',
        text: "Let's review our preparations for the Spring Blooms & Brooms festival. I'm happy to say we're right on schedule and on budget.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "The city systems are all set. I've programmed the cleaning drones to assist with the community cleanup events.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "I've leveraged my connections to create quite a buzz. Fashion designers are creating festival-themed collections, media outlets are covering us, and several celebrities have confirmed attendance. The PR for Stonewich is excellent, and businesses are lining up for sponsorship opportunities.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I've developed an AI assistant for festival attendees. It offers historical anecdotes about the festival, a comprehensive flower identification database, and detailed planting guidance. The information is accessible through interactive kiosks throughout the festival grounds.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Excellent work, everyone. Maven, I'd like you to experience some of these activities firsthand tomorrow. Your perspective will be valuable for our team's assessment.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Of course, I'd be happy to try them out.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Good. It's important that we all understand the public experience of our initiatives.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'spring-festival-activities',
  },

  // New navigation scene for festival activities
  'spring-festival-activities': {
    id: 'spring-festival-activities',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The day of the Spring Blooms & Brooms festival arrives. The city is vibrant with activity as residents participate in various events.",
      },
      {
        character: 'maven',
        text: "There's so much happening today. I should try out some of these activities to report back to the team.",
        mood: 'happy',
      }
    ],
    // No nextSceneId as this will use the FestivalActivitiesScene component
  },

  // Scene after completing the festival activities
  'spring-festival-completion': {
    id: 'spring-festival-completion',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: "As the Spring Blooms & Brooms festival concludes, the team gathers to discuss the outcomes.",
      },
      {
        character: 'etta',
        text: "The festival was a tremendous success. Our community engagement metrics exceeded projections.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "The cleaning drones performed flawlessly. We've collected data that will help optimize city maintenance protocols.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "The social media buzz was incredible. Stonewich is trending across multiple platforms, and I've already got inquiries about future collaborations.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The AI assistant logged over ten thousand interactions. People were particularly interested in the historical context of the festival traditions.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "It was amazing to see everything come together. The residents seemed genuinely happy.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Dr. Voss will be pleased. Let's prepare our report for tomorrow's meeting at Cybaton headquarters.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'spring-conclusion-meeting',
  },
  
  // Spring conclusion with Dr. Voss
  'spring-conclusion-meeting': {
    id: 'spring-conclusion-meeting',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'narrator',
        text: "Back at Cybaton headquarters, the team presents their spring festival results to Dr. Voss.",
      },
      {
        character: 'etta',
        text: "As you can see from our metrics, Dr. Voss, the Spring Blooms & Brooms festival was executed perfectly. All objectives were met or exceeded.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "Our technological implementations functioned at 98.7% efficiency, and we've gathered valuable data for future improvements.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "The social and economic impact has been substantial. We've secured three new corporate partnerships for the city as a direct result of the festival connections.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Public knowledge retention about Stonewich's history increased by 42% according to our exit surveys. The educational components were particularly successful.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "The community really came together. There was a genuine sense of civic pride.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Dr. Voss listens carefully, occasionally making notes as the team presents.",
      },
      {
        character: 'narrator',
        text: "After the presentation concludes, Dr. Voss stands and addresses the team.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss is a commanding presence with silver-streaked hair and piercing eyes that seem to evaluate everything.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Dr. Voss speaks with a measured tone, each word precisely chosen.",
      },
      {
        character: 'narrator',
        text: "\"I'm impressed with what you've accomplished. Each of you has demonstrated excellence in your respective domains.\"",
      },
      {
        character: 'narrator',
        text: "\"This is a promising start, but merely the beginning of what Stonewich requires.\"",
      },
      {
        character: 'narrator',
        text: "Dr. Voss paces slowly before continuing.",
      },
      {
        character: 'narrator',
        text: "\"Festivals and community events are important, yes. But beneath Stonewich's charming exterior lie systemic issues that will demand more from you.\"",
      },
      {
        character: 'narrator',
        text: "\"In the coming seasons, I expect you to move beyond executing pleasant civic functions and begin addressing the core challenges facing Stonewich.\"",
      },
      {
        character: 'narrator',
        text: "\"When you truly begin to function as a unified team rather than exceptional individuals, you'll become a model for city administration that others will follow.\"",
      },
      {
        character: 'narrator',
        text: "Dr. Voss nods firmly, a clear dismissal.",
      },
      {
        character: 'narrator',
        text: "As the team files out, the weight of Dr. Voss's expectations settles on their shoulders. There's clearly much more at stake than seasonal festivals.",
      }
    ],
    nextSceneId: 'spring-conclusion',
  },
};

export default springFestivalScenes;
