
import { Scene } from '@/types/game';

const crafterScenes: Record<string, Scene> = {
  'autumn-crafter-intro': {
    id: 'autumn-crafter-intro',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The artisan workshop looks interesting. I've always wanted to try my hand at crafting something special.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Crafting connects us to traditions that span generations. The techniques may evolve, but the spirit of creation remains the same.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "I'm excited to make something that blends traditional craft with my own personal touch.",
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
        text: "Time to get creative! Let's see what I can make...",
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
        text: "I'm really proud of what I created! It's something special that captures both tradition and innovation.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "It's beautiful, Maven. You've captured the essence of what makes handcrafting so powerful - the personal connection to what you create.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Thank you! I think I understand a bit better now why preserving these traditions matters so much.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  }
};

export default crafterScenes;
