
import { Scene } from '@/types/game';

const winterFestivalScenes: Record<string, Scene> = {
  'winter-festival-intro': {
    id: 'winter-festival-intro',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: "The day of the Winter Gala & Games arrives. Stonewich is transformed, streets glittering with lights and decorations.",
      },
      {
        character: 'maven',
        text: "It's beautiful. All our planning has really paid off.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "All the arrangements have been made, and the teams are executing smoothly.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Let's make this a night to remember.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-festival-activities'
  },
  
 'winter-festival-activities': {
    id: 'winter-festival-activities',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: "With the Winter Gala & Games underway, there are several activities you could participate in.",
      },
      {
        character: 'maven',
        text: "Where should I focus my attention during the festival?",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'winter-festival-completion'
  },
  
  'winter-festival-completion': {
    id: 'winter-festival-completion',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'narrator',
        text: "As the Winter Gala & Games draws to a close, the city of Stonewich seems to glow with renewed energy and purpose.",
      },
      {
        character: 'etta',
        text: "I have to admit, this year's festival exceeded even my expectations. The team performed admirably.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "It feels like we've accomplished something special here, doesn't it?",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "We certainly have. The people of Stonewich are going to remember this winter for years to come.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'winter-review-preparation'
  },
};

export default winterFestivalScenes;
