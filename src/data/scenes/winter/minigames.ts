
import { Scene } from '@/types/game';

// Winter minigame scenes
const minigameScenes: Record<string, Scene> = {
  // Looking Signs minigame - intro scene
  'winter-looking-signs-intro': {
    id: 'winter-looking-signs-intro',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'senara',
        text: "Fortune reading is an ancient tradition in Stonewich. By reading the signs correctly, one can glimpse what fate has in store.",
        mood: 'thoughtful'
      },
      {
        character: 'maven',
        text: "How does it work?",
        mood: 'thoughtful' // Changed from 'curious' to 'thoughtful' as it's in the allowed types
      },
      {
        character: 'senara',
        text: "The reader must sort signs as they appear - sending bad omens to the left to hex them, and good signs to the right to embrace their energy.",
        mood: 'neutral'
      },
      {
        character: 'maven',
        text: "This sounds fascinating. I'd like to try it!",
        mood: 'happy'
      }
    ],
    nextSceneId: 'winter-looking-signs-start'
  },

  // Looking Signs minigame - start scene
  'winter-looking-signs-start': {
    id: 'winter-looking-signs-start',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: 'Reading the signs of fortune begins now!'
      }
    ],
    minigame: 'lookingSigns'
  },

  // Looking Signs minigame - complete scene
  'winter-looking-signs-complete': {
    id: 'winter-looking-signs-complete',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "That was interesting! I think I'm starting to understand this tradition better.",
        mood: 'happy'
      },
      {
        character: 'senara',
        text: "You have a natural intuition for reading the signs. That's quite rare for someone not born in Stonewich.",
        mood: 'happy'
      }
    ],
    nextSceneId: 'winter-festival-activities'
  }
};

export default minigameScenes;
