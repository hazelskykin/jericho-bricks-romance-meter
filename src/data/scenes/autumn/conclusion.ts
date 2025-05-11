
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
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "All the systems performed without a single major issue. I think we've really hit our stride as a team.",
        mood: 'happy',
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
    background: 'cybaton-meeting-room',
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
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Indeed. I've observed considerable growth in all of you. Personal development is as important as professional achievements in this program.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Keep this momentum going into winter. It will determine your final evaluations and future assignments with Cybaton.",
      }
    ],
    nextSceneId: 'autumn-conclusion-debrief'
  },
  'autumn-conclusion-debrief': {
    id: 'autumn-conclusion-debrief',
    background: 'cybaton-shuttle',
    dialogue: [
      {
        character: 'narrator',
        text: "After the meeting with Dr. Voss, the team debriefs on the shuttle back to Stonewich and reflects on their journey so far.",
      },
      {
        character: 'navarre',
        text: "Just one season left. It's hard to believe how quickly this year has gone by.",
        mood: 'sad',
      },
      {
        character: 'etta',
        text: "We've come a long way since that first awkward meeting at Cybaton headquarters.",
        mood: 'sad',
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
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Here's to our final season. Let's make it count.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'autumn-conclusion'
  },
  'autumn-conclusion': {
    id: 'autumn-conclusion',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'maven',
        text: "Autumn in Stonewich has been a time of reflection and deeper connections. The Heritage & Handicrafts Festival was amazing.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I feel like I'm really making special connections here. I'm looking forward to what comes next. Winter is coming!",
        mood: 'happy',
      }
    ],
    nextSceneId: 'season-transition-winter',
  }
};

export default autumnConclusionScenes;
