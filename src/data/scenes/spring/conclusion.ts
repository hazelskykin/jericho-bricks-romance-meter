
import { Scene } from '../../../types/game';

const springConclusionScenes: Record<string, Scene> = {
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
