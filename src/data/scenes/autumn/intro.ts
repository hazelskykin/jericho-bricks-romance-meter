
import { Scene } from '@/types/game';

const introScenes: Record<string, Scene> = {
  'autumn-intro': {
    id: 'autumn-intro',
    background: 'autumn-transition',
    dialogue: [
      {
        character: 'narrator',
        text: 'As summer fades into autumn, the city of Stonewich transforms with vibrant oranges and reds. The air grows crisper, and preparations for the Heritage & Handicrafts Festival begin.',
      },
      {
        character: 'maven',
        text: "I can't believe we've already been here for half a year. So much has changed since we first arrived.",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "The Heritage & Handicrafts Festival is a big deal around here. It's all about celebrating the history and traditions of Stonewich.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "We'll need to make sure all the systems are optimized for the increased foot traffic around the historic districts.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The festival provides a fascinating look into the cultural evolution of the city. The artifacts on display are quite remarkable.",
        mood: 'thoughtful',
      },
      {
        character: 'navarre',
        text: "And the food! Don't forget about the Heritage Food Fest. Local restaurants showcase traditional recipes passed down through generations.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-planning',
  },

  'autumn-planning': {
    id: 'autumn-planning',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'etta',
        text: "Let's talk about our responsibilities for the festival. We need to coordinate with the event organizers and make sure everything runs smoothly.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "I've been looking at the technical needs for the festival. We'll need to set up additional network nodes around the historic district to handle the increased data traffic.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "I've already reached out to the local artisans and craftspeople. They're excited to showcase their work at the festival.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I've been compiling historical data about Stonewich for the tour guides to use. The city has a fascinating history that dates back several centuries.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "I'd like to volunteer at the visitor information kiosk. It seems like a great way to get involved and help out the community.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "That's a good idea, Maven. We need all hands on deck for this festival. It's a major event for Stonewich.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'autumn-relationship-development',
  },

  'autumn-relationship-development': {
    id: 'autumn-relationship-development',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "As autumn deepens, I find myself thinking more and more about the connections I've made here in Stonewich.",
        mood: 'thoughtful',
      },
    ],
    nextSceneId: 'autumn-festival-introduction',
  },

  'autumn-festival-introduction': {
    id: 'autumn-festival-introduction',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'The day of the Autumn Heritage & Handicrafts Festival arrives. The streets are decorated with autumn leaves and historical artifacts, and the air is filled with excitement.',
      },
      {
        character: 'maven',
        text: "It's finally here! The festival looks amazing. I can't wait to explore everything it has to offer.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-activities',
  },
};

export default introScenes;
