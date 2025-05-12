
import { Scene } from '@/types/game';

const tourGuideScenes: Record<string, Scene> = {
  'autumn-tour-guide-intro': {
    id: 'autumn-tour-guide-intro',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "Guiding tourists could be a fun way to share the city's history and culture.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Sharing our city's story is a great way to connect with others and celebrate our heritage.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'm excited to show off the hidden gems and historical landmarks of Stonewich.",
        mood: 'happy',
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
        text: "Let's start the tour and show these visitors what makes Stonewich so special!",
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
        text: "The tour was a success! I enjoyed sharing the history and culture of Stonewich with the visitors.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "You did a great job, Maven! Your passion for the city really shines through.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Thank you! It feels good to connect with others and celebrate our shared heritage.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  }
};

export default tourGuideScenes;
