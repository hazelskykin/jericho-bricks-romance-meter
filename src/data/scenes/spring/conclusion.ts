
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
        text: "The seasonal traditions here are deeply rooted. Understanding them helps us better integrate our technological solutions.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I feel like I'm starting to find my place here in Stonewich.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'spring-conclusion',
  },
  
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
        text: "You've begun to see patterns in how your teammates operate, and found yourself gravitating toward certain approaches.",
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
    nextSceneId: 'spring-transition',
  },
  
  // Special scene to handle transition between seasons
  'spring-transition': {
    id: 'spring-transition',
    background: 'stonewich-cityscape',
    dialogue: [], // Empty dialogue to trigger season transition
    nextSceneId: 'main-menu', // Temporarily return to main menu until summer content is implemented
  }
};

export default springConclusionScenes;
