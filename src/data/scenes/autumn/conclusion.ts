
import { Scene } from '../../../types/game';

const autumnConclusionScenes: Record<string, Scene> = {
  'autumn-festivities-conclusion': {
    id: 'autumn-festivities-conclusion',
    background: 'autumn-cityoverlook',
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
        character: 'etta',
        text: "That wraps up the report for the season. Did you have feedback for us, Dr. Voss?",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Your performance this season has been exemplary. You continue to deliver as individual talents.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: I don't think you need me to tell you that. You've started showing some progress on those broader social markers as well, as only a unified team can.",
      },
      {
        character: 'maven',
        text: "Your feedback last season helped us to look beyond ourselves. We have a long way to go, but our behavioral patterns are shifting.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Indeed. I've observed considerable changes, much more than could be considered coincidental.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: The autumn festival in particular drove higher rates of romantic commitments and productive skill building, both essential for a stable and happy workforce.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: The competitors are still there, but the local authorities and commerce leaders are not as receptive.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: From the end of summer until now, that is a remarkable shift. If you can keep up this momentum, Stonewich may emerge on stronger footing than it's had in the last ten years.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Your final evaluations and future assignments with Cybaton will be at the end of the year. Cybaton is counting on you. Stonewich needs your best.",
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
        character: 'etta',
        text: "I can't believe what a difference there was between the report we gave at the end of summer and this one. Dr. Voss was practically giddy.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "I don't know if we can go that far, but she definitely didn't have the doom and gloom soundtrack playing this time.",
        mood: 'laughing',
      },
      {
        character: 'xavier',
        text: "Everything felt so much more grounded in purpose this season. It really helped me to consider a broader perspective.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Maven's influence was subtle, sincere and effective.",
        mood: 'happy',
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
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-conclusion'
  },
  'autumn-conclusion': {
    id: 'autumn-conclusion',
    background: 'autumn-cityoverlook',
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
