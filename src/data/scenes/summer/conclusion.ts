
import { Scene } from '../../../types/game';

const summerConclusionScenes: Record<string, Scene> = {
  'summer-conclusion-meeting': {
    id: 'summer-conclusion-meeting',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'etta',
        text: "Dr. Voss, our team's work during Summer Songs & Sips festival resulted in increased city revenues by 31% compared to last year.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "We also managed to improve community engagement significantly through the new interactive exhibits.",
        mood: 'confident',
      },
      {
        character: 'narrator',
        text: "Dr. Voss reviews your detailed report with a pleased expression.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: These results are precisely what we needed to see. Your team continues to exceed expectations in Stonewich.",
      },
      {
        character: 'xavier',
        text: "Thank you, Dr. Voss. We've been working well together and learning from each other's strengths.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Your autumn assignment will begin soon. I expect continued excellence as we move into the Handicrafts & Heritage festival preparations.",
      },
      {
        character: 'senara',
        text: "We're already researching the historical significance of the autumn traditions in Stonewich.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'season-transition-autumn' // This will lead to the autumn season transition
  }
};

export default summerConclusionScenes;
