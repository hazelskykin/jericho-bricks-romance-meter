
import { Scene } from '../../../types/game';

const relationshipScenes: Record<string, Scene> = {
  // Example relationship scene (you may already have more)
  'autumn-character-relationship': {
    id: 'autumn-character-relationship',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The autumn festival is coming up. I should invite someone to join me.",
        mood: 'thoughtful',
      },
    ],
    nextSceneId: 'autumn-character', // Route to character-specific scenes
  },
  
  // Ensure all character resolution scenes properly transition to the festival intro
  'autumn-xavier-resolution': {
    id: 'autumn-xavier-resolution',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "Thanks for spending time with me, Xavier. The autumn festival should be starting soon.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-intro',
  },
  
  'autumn-navarre-resolution': {
    id: 'autumn-navarre-resolution',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "That was fun, Navarre. We should head to the autumn festival now.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-intro',
  },
  
  'autumn-etta-resolution': {
    id: 'autumn-etta-resolution',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "I enjoyed our time together, Etta. Let's check out the autumn festival.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-intro',
  },
  
  'autumn-senara-resolution': {
    id: 'autumn-senara-resolution',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "That was lovely, Senara. The autumn festival should be starting.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-intro',
  }
};

export default relationshipScenes;
