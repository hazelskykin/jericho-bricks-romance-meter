
import { Scene } from '@/types/game';

const minigameScenes: Record<string, Scene> = {
  'autumn-crafter-intro': {
    id: 'autumn-crafter-intro',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The artisan workshop looks fascinating! I could try my hand at making something with traditional methods and modern touches.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-crafter-start'
  },
  
  'autumn-crafter-start': {
    id: 'autumn-crafter-start',
    background: 'autumn-cityoverlook',
    minigame: 'crafter',
    dialogue: [
      {
        character: 'maven',
        text: "Let's see what I can create!",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-crafter-complete'
  },
  
  'autumn-crafter-complete': {
    id: 'autumn-crafter-complete',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "I'm quite proud of what I've made! It's a perfect blend of traditional craftsmanship and modern design.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  },
  
  'autumn-tour-guide-intro': {
    id: 'autumn-tour-guide-intro',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "I could help guide tourists through the historic district and share Stonewich's rich history with them.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'autumn-tour-guide-start'
  },
  
  'autumn-tour-guide-start': {
    id: 'autumn-tour-guide-start',
    background: 'autumn-cityoverlook',
    minigame: 'tourGuide',
    dialogue: [
      {
        character: 'maven',
        text: "Time to show these visitors what makes Stonewich so special!",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-tour-guide-complete'
  },
  
  'autumn-tour-guide-complete': {
    id: 'autumn-tour-guide-complete',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The tourists seemed to really enjoy learning about Stonewich's history. It's important to keep these stories alive.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  }
};

export default minigameScenes;
