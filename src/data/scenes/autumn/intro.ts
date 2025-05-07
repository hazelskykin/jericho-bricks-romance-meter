
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
        text: "The Heritage & Handicrafts Festival is about celebrating the community and shared culture of Stonewich. Maybe it can spark some better connections.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "We need to reconsider the metrics we've been using beyond performance efficiency. It'll be a challenge to measure anything as hazy as community spirit.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The festival provides a fascinating look into the cultural evolution of the city. The artisans on display are quite remarkable.",
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
        text: "The city has a fascinating history of craftmanship and skills development. I wonder what likely contributed to periods of exceptional growth.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "I have a good feeling about the autumn season. I have decided on a focus that may help us address the larger picture that Dr. Voss shared.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "That's great, Maven, but whatever it is, we still need to deliver on expectations for the festival and our other administration duties.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "We are counting on you, Maven, but you're not alone.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "That's right! If you need a hand, it'll be our turn to pitch in for you.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Thanks, everyone. Let's all do our best!",
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
      }
      //nextSceneId should be determined by the locked-in character route
      //all possible scenes are written in relationship.ts for selection
      //after the relationship-development arc, then the festival should kick off with autumn-festival-introduction
    ],
    nextSceneId: autumn-${gameState.currentLoveInterest}-path,
  },

  'autumn-festival-introduction': {
    id: 'autumn-festival-introduction',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The day of the Autumn Heritage & Handicrafts Festival arrives. The streets are decorated with autumn leaves and historical artifacts, and the air is filled with excitement.",
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
