
import { Scene } from '../../../types/game';

const summerConclusionScenes: Record<string, Scene> = {
  'summer-conclusion': {
    id: 'summer-conclusion',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "As summer continues in Stonewich, the heat seems to bring forth new challenges like bubbles in a cauldron rising to the surface.",
      },
      {
        character: 'narrator',
        text: "You've begun to see not only the patterns in how your teammates operate but their blindspots as well. You know now that Dr. Voss's omnious words from the spring report meeting were no mere motivational speech.",
      },
      {
        character: 'maven',
        text: "Did I never notice these things before when I merely followed others, assuming they were better than I was? Could I have been so oblivious?",
        mood: 'sad',
      }
      {
        character: 'narrator',
        text: "With summer coming to a close, it's time to prepare for autumn—and the next seasonal festival.",
      },
      {
        character: 'narrator',
        text: "But your experiences have already begun to shape your path. Your strongest connections are becoming clear.",
      }
    ],
    nextSceneId: 'season-transition-summer',
  },
  
  // Special scene to handle transition between seasons
  'season-transition-autumn': {
    id: 'season-transition-autumn',
    background: 'autumn-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "Autumn, Chapter 3",
      },
    ], // Empty dialogue to trigger season transition
    nextSceneId: 'autumn-intro', // Now points to summer content instead of main menu
  }
};

export default summerConclusionScenes;
