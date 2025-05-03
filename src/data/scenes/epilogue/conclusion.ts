
import { Scene } from '@/types/game';

const conclusionScenes: Record<string, Scene> = {
  'epilogue-conclusion': {
    id: 'epilogue-conclusion',
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'narrator',
        text: 'Your time in Stonewich has come to its official conclusion, but your story with your partner is just beginning.'
      },
      {
        character: 'maven',
        text: "Whatever comes next, I know we'll face it together.",
        mood: 'happy'
      },
      {
        character: 'narrator',
        text: "As the sun sets on your year in the program, a new dawn awaits..."
      }
    ],
    nextSceneId: 'epilogue-end'
  },
  'epilogue-end': {
    id: 'epilogue-end',
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'narrator',
        text: 'Congratulations! You have completed this character\'s route.'
      },
      {
        character: 'narrator',
        text: 'Return to the main menu to explore another character\'s story or continue your journey.'
      }
    ],
    nextSceneId: 'start'
  }
};

export default conclusionScenes;
