
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
        character: 'senara',
        text: "Photographs are a fascinating way to preserve moments in time. They let us study cultural expressions in their context.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "I'd love to create a visual story that celebrates our time here together at the festival.",
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
        text: "Let's start taking some photos and create our memory album!",
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
        text: "The memory photo album is complete! I think these photos really capture our time together.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "These images are quite... evocative. You have a good eye for composition.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "I made something for you during the crafting workshop earlier. I thought you might like to have it as a memento of today.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "A handcrafted gift? That's... unexpected. Thank you, Maven. I'll treasure it.",
        mood: 'surprised',
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  }
};

export default memoriesDateScenes;
