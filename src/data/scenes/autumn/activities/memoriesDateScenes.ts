
import { Scene } from '@/types/game';

const memoriesDateScenes: Record<string, Scene> = {
  'autumn-memories-intro': {
    id: 'autumn-memories-intro',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "Creating a memory photo album sounds like a wonderful way to capture the spirit of the festival.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Photographs are powerful tools for preserving memories and sharing our experiences with others.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "I'm excited to create a visual story that celebrates the people and traditions of Stonewich.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-memories-date-start'
  },
  
  'autumn-memories-date-start': {
    id: 'autumn-memories-date-start',
    background: 'autumn-cityoverlook',
    minigame: 'memoriesDate',
    dialogue: [
      {
        character: 'maven',
        text: "Let's start snapping some photos and create a beautiful memory album!",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-memories-date-complete'
  },
  
  'autumn-memories-date-complete': {
    id: 'autumn-memories-date-complete',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The memory photo album is complete! It's a beautiful collection of moments that capture the essence of the festival.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "This album is a testament to the power of community and the importance of preserving our shared memories.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "I'm so glad I could contribute to this celebration of Stonewich's heritage.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  }
};

export default memoriesDateScenes;
