
import { Scene } from '../../../types/game';

const autumnConclusionScenes: Record<string, Scene> = {
  
  'autumn-conclusion': {
    id: 'autumn-conclusion',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'maven',
        text: "Autumn in Stonewich has been a time of reflection and deeper connections. The Heritage & Handicrafts Festival was amazing.",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "We've all grown so much since we first arrived here. It's hard to believe winter is already approaching.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "The annual review will be coming up at the end of winter. We should start preparing our reports.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Always thinking ahead, Etta! But you're right. The Winter Gala & Games will be here before we know it.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The winter festival is quite the spectacle, from what I've read. A formal gala, charity auction, and various winter games.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'season-transition-winter',
  },
  
  // Special scene to handle transition between seasons
  'season-transition-winter': {
    id: 'season-transition-winter',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "Winter, Chapter 4",
      },
    ], // Empty dialogue to trigger season transition
    nextSceneId: 'winter-intro', // Now points to summer content instead of main menu
  }
};

export default winterConclusionScenes;
