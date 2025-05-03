
import { Scene } from '../../../types/game';

const springIntroScenes: Record<string, Scene> = {
  'spring-intro': {
    id: 'spring-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'Two months have passed since your arrival in Stonewich. The city has begun to welcome the spring season.',
      },
      {
        character: 'narrator',
        text: 'The administration team has settled into their roles, though there have been challenges along the way.',
      },
      {
        character: 'maven',
        text: "I'm still trying to find my place here. Everyone else seems to have their specialty.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "As you walk into the office this morning, you find Xavier reviewing reports on his tablet.",
      },
      {
        character: 'xavier',
        text: "Morning, Maven! Have you heard about the Spring festival? It's coming up next week—Blooms & Brooms.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Blooms & Brooms? That sounds interesting.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "It's one of Stonewich's four seasonal festivals. Spring is all about renewal—cleaning up the city and planting new gardens.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Did I hear someone mention the festival? It's a great PR opportunity for us newcomers. We should all participate.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'spring-character-selection', // Changed this to point to character selection screen
  }
};

export default springIntroScenes;
