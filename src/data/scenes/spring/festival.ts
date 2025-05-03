
import { Scene } from '../../../types/game';

const springFestivalScenes: Record<string, Scene> = {
  // Festival planning scene after all character visits
  'spring-festival-planning': {
    id: 'spring-festival-planning',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'narrator',
        text: "With the Spring festival approaching, the team gathers to finalize the plans.",
      },
      {
        character: 'etta',
        text: "Let's review our preparations for the Spring Blooms & Brooms festival. Each area must be operating at peak efficiency.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "The city systems are all set. I've programmed the cleaning drones to assist with the community cleanup events.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "And I've secured excellent participation from local businesses. They'll be providing refreshments and sponsoring several activities.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I've prepared informational materials about the festival's historical context for those who are interested.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Maven, you'll need to choose an area to focus on during the festival. Each has its own responsibilities and challenges.",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "I'll help with the community cleanup coordination.",
        nextSceneId: 'spring-brooms-away-intro',
      },
      {
        text: "I'll assist with the public gardens and planting activities.",
        nextSceneId: 'spring-bloom-view-intro',
      },
      {
        text: "I'll help with the festivities and social activities.",
        nextSceneId: 'spring-mud-fling-intro',
      },
    ],
  },
};

export default springFestivalScenes;
