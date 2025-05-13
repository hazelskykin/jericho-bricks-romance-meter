
import { Scene } from '../../types/game';

const festivalScenes: Record<string, Scene> = {
  'winter-festival-intro': {
    id: 'winter-festival-intro',
    background: 'winter-festival',
    dialogue: [
      {
        character: 'maven',
        text: "The Winter Games & Gala is Stonewich's biggest celebration of the year! The entire city is decorated with lights and there's a festive atmosphere everywhere.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Everyone who's anyone in the city attends the gala. It's the perfect opportunity to make connections and celebrate our accomplishments.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The Winter Festival also has deep cultural significance. It combines ancient traditions with modern celebrations.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'winter-festival-activities',
  },
  'winter-festival-activities': {
    id: 'winter-festival-activities',
    background: 'winter-festival',
    dialogue: [
      {
        character: 'maven',
        text: "There are so many activities happening during the Winter Games & Gala. What should I check out first?",
        mood: 'thoughtful',
      }
    ],
    choices: [
      {
        text: "Participate in the Charity Auction",
        nextSceneId: 'winter-charity-auction-intro',
      },
      {
        text: "Join the Gala Dance",
        nextSceneId: 'winter-gala-dance-intro',
      },
      {
        text: "Try Looking for Signs fortune reading",
        nextSceneId: 'winter-looking-signs-intro',
      },
      {
        text: "Skip activities",
        nextSceneId: 'winter-festival-conclusion',
      }
    ],
  },
  'winter-festival-conclusion': {
    id: 'winter-festival-conclusion',
    background: 'winter-festival',
    dialogue: [
      {
        character: 'maven',
        text: "The Winter Festival was incredible! I've never experienced anything quite like it.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "As the festival comes to a close, the team prepares for their final evaluations and the end of their training year."
      }
    ],
    nextSceneId: 'winter-conclusion',
  },
  'winter-conclusion': {
    id: 'winter-conclusion',
    background: 'winter-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "I can't believe our year in Stonewich is almost over. It feels like we just arrived yesterday.",
        mood: 'sad',
      },
      {
        character: 'narrator',
        text: "The team gathers for their final evaluation meeting with Cybaton representatives.",
      }
    ],
    nextSceneId: 'winter-ending',
  },
};

export default festivalScenes;
