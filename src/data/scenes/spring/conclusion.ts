
import { Scene } from '../../../types/game';

const springConclusionScenes: Record<string, Scene> = {
  // Festival conclusion
  'spring-festival-end': {
    id: 'spring-festival-end',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "As the sun sets on Stonewich, the Spring festival winds down. Citizens are pleased with the clean streets, prepared garden beds, and beautiful art displays.",
      },
      {
        character: 'xavier',
        text: "The first few months have been quite an experience, haven't they?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "And we're just getting started! I've made so many great connections today.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The productivity metrics from today are impressive. We should incorporate these community engagement strategies into our regular operations.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The seasonal traditions here are deeply rooted. Understanding them helps us better appreciate the thread of continuity in our collective identity.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Time to head back to Cybaton for the end of season report. I feel like I'm starting to understand how I can contribute.",
        mood: 'happy',
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
        text: "Our technological implementations functioned at 98.7% efficiency, and we've gathered valuable data for future improvements. No major downtime or incidents.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "The social and economic impact has been substantial. Tourism enjoyed a huge lift as a direct result of the festival connections.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The usage patterns from the AI assistant indicate a 37% skill productivity increase on average and 43% knowledge extension rates. Attendees became more adept at cleaning, beautification and eagerly shared knowledge."
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
  
  'spring-conclusion': {
    id: 'spring-conclusion',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "As spring continues in Stonewich, your team settles into a rhythm. Each member's strengths become more apparent in different situations.",
      },
      {
        character: 'narrator',
        text: "You've begun to see patterns in how your teammates operate, and found yourself gravitating toward certain approaches. Dr. Voss's words weigh at the back of your mind, but daily routines make it seem less urgent.",
      },
      {
        character: 'maven',
        text: "These past few months have taught me so much about everyone... and about myself.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "With spring coming to a close, it's time to prepare for summer—and the next seasonal festival.",
      },
      {
        character: 'narrator',
        text: "But your experiences have already begun to shape your path. Your strongest connections are becoming clear.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'season-transition-summer',
  },
  
  // Special scene to handle transition between seasons
  'season-transition-summer': {
    id: 'season-transition-summer',
    background: 'summer-transition',
    dialogue: [
      {
        character: narrator,
        text: "Summer, Chapter 2",
      },
    ], // Empty dialogue to trigger season transition
    nextSceneId: 'summer-intro', // Now points to summer content instead of main menu
  }
};

export default springConclusionScenes;
