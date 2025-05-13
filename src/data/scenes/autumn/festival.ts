
import { Scene } from '@/types/game';

const festivalScenes: Record<string, Scene> = {
  'autumn-festival-intro': {
    id: 'autumn-festival-intro',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The autumn air is crisp with the scent of spiced cider and wood smoke as we arrive at the Autumn Handicrafts & Heritage Festival.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "This festival celebrates the traditional crafts and cultural heritage that have been passed down through generations in Stonewich.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Look at all these artisans! There's everything from metalworking to textile arts. The perfect place to network and make connections.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The historical value alone makes this worth documenting. These techniques represent centuries of accumulated knowledge.",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "And the festival systems are running smoothly. The digital guide integration with the traditional demonstrations is working perfectly.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  },
  
  'autumn-festival-introduction': {
    id: 'autumn-festival-introduction',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The autumn festival is bustling with activity! There are crafters demonstrating traditional skills, history exhibits, and all kinds of seasonal treats.",
        mood: 'happy'
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  },
  
  'autumn-festivities-conclusion': {
    id: 'autumn-festivities-conclusion',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "That was a wonderful time at the festival. I feel like I've really connected with the heritage of Stonewich.",
        mood: 'happy'
      },
      {
        character: 'maven',
        text: "I should check in with the team and see what's next on our agenda.",
        mood: 'thoughtful'
      }
    ],
    nextSceneId: 'autumn-conclusion-debrief'
  }
};

export default festivalScenes;
