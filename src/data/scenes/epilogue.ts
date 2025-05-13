
import { Scene } from '@/types/game';

const epilogueScenes: Record<string, Scene> = {
  'epilogue-intro': {
    id: 'epilogue-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "One year later...",
      },
      {
        character: 'maven',
        text: "It's hard to believe two years have passed since I first arrived in Stonewich.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "So much has changed since then. I never could have imagined it back then as awkward and unsure of myself as I was.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'epilogue-check-ending',
  },

  'epilogue-check-ending': {
    id: 'epilogue-check-ending',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "Looking back on everything that's happened, the biggest change for me...",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'epilogue-route',
  },

  'epilogue-route': {
    id: 'epilogue-route',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Checking for appropriate epilogue...",
      }
    ],
    // This scene will be handled by GameInterface.tsx to route to the appropriate epilogue
    nextSceneId: 'game-complete',
  },

  'happy-ending-intro': {
    id: 'happy-ending-intro',
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'maven',
        text: "I've found something I never expected when I came to Stonewich... I found love.",
        mood: 'embarrassed',
      }
    ],
    nextSceneId: 'happy-ending-character',
  },

  'happy-ending-character': {
    id: 'happy-ending-character',
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'narrator',
        text: "This scene will be dynamically replaced with the appropriate character's happy ending.",
      }
    ],
    nextSceneId: 'game-complete',
  },

  'game-complete': {
    id: 'game-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Thank you for playing Versa! Your journey in Stonewich has come to an end.",
      },
      {
        character: 'narrator',
        text: "You can start a new game to experience different character routes and unlock new content.",
      }
    ],
    choices: [
      {
        text: "Return to Main Menu",
        nextSceneId: 'start'
      },
      {
        text: "About Versa",
        nextSceneId: 'about'
      }
    ]
  },

  // Game End - Try Again Screen
  'game-end-try-again': {
    id: 'game-end-try-again',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'narrator',
        text: "Game End - Cybaton has disbanded your team due to insufficient levels of team chemistry and commitment. Try again to boost your relationships and to connect with someone special."
      }
    ],
    nextSceneId: 'start'
  }
};

export default epilogueScenes;
