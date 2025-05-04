
import { Scene } from '../../../types/game';

const summerMinigameScenes: Record<string, Scene> = {
  // Summer minigame intro scenes
  'summer-music-game-intro': {
    id: 'summer-music-game-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "Music is a big part of the Summer Songs & Sips festival. We have special interactive exhibits planned.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'm curious to see how technology and music come together in these exhibits.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'summer-music-game-start',
  },
  
  // Placeholder for summer minigame start scenes - these would trigger actual minigames
  'summer-music-game-start': {
    id: 'summer-music-game-start',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You approach the interactive music exhibit, ready to test your skills.",
      },
    ],
    // This would typically trigger a minigame, but for now just continues the story
    nextSceneId: 'summer-music-game-complete',
  },
  
  // Result scenes for minigames
  'summer-music-game-complete': {
    id: 'summer-music-game-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You enjoyed the interactive music experience at the festival.",
      },
      {
        character: 'xavier',
        text: "That was impressive! Your musical intuition really shines through.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'summer-conclusion',
  }
};

export default summerMinigameScenes;
