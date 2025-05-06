
import { Scene } from '../../../types/game';

const autumnConclusionScenes: Record<string, Scene> = {
  'autumn-festivities-conclusion': {
    id: 'autumn-festivities-conclusion',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "As autumn reaches its peak, the Heritage & Handicrafts Festival comes to a successful conclusion.",
      },
      {
        character: 'navarre',
        text: "Another fantastic festival in the books! The engagement metrics are through the roof.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The operational efficiency was 12% higher than last season. We're definitely improving.",
        mood: 'pleased',
      },
      {
        character: 'xavier',
        text: "All the systems performed without a single major issue. I think we've really hit our stride as a team.",
        mood: 'proud',
      },
      {
        character: 'maven',
        text: "We should be proud of what we've accomplished here.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "We should prepare for our meeting with Dr. Voss. She'll want a detailed report.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'autumn-conclusion-meeting'
  },
  'autumn-conclusion-meeting': {
    id: 'autumn-conclusion-meeting',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'narrator',
        text: "The team meets with Dr. Voss to discuss the autumn festival's outcomes and prepare for winter.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Your performance this season has been exemplary. The festival metrics show significant improvements across all categories.",
      },
      {
        character: 'narrator',
        text: "With winter approaching, you'll face your final and most challenging season. The Winter Games & Gala is Stonewich's premier event.",
      },
      {
        character: 'maven',
        text: "We're ready for it, Dr. Voss. We've learned so much since we started.",
        mood: 'confident',
      },
      {
        character: 'narrator',
        text: "Indeed. I've observed considerable growth in all of you. Personal development is as important as professional achievements in this program.",
      },
      {
        character: 'narrator',
        text: "Keep this momentum going into winter. It will determine your final evaluations and future assignments with Cybaton.",
      }
    ],
    nextSceneId: 'autumn-conclusion'
  },
  'autumn-conclusion': {
    id: 'autumn-conclusion',
    background: 'stonewich-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: "After the meeting with Dr. Voss, the team gathers at a café to unwind and reflect on their journey so far.",
      },
      {
        character: 'navarre',
        text: "Just one season left. It's hard to believe how quickly this year has gone by.",
        mood: 'reflective',
      },
      {
        character: 'etta',
        text: "We've come a long way since that first awkward meeting at Cybaton headquarters.",
        mood: 'reflective',
      },
      {
        character: 'xavier',
        text: "Remember when the coffee machine exploded during our second week? I thought Etta was going to have us all fired.",
        mood: 'laughing',
      },
      {
        character: 'etta',
        text: "It was YOUR programming that caused the malfunction!",
        mood: 'laughing',
      },
      {
        character: 'senara',
        text: "I think we've all changed since then. For the better.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Here's to our final season. Let's make it count.",
        mood: 'determined',
      }
    ],
    nextSceneId: 'season-transition-winter'
  }
};

export default autumnConclusionScenes;
