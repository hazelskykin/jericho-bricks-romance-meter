
import { Scene } from '../../../types/game';

const springFestivalScenes: Record<string, Scene> = {
  'spring-planning': {
    id: 'spring-planning',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'etta',
        text: "If we're going to participate in this festival, we need a strategic approach. It's not just about fun—it's about demonstrating Cybaton's commitment to Stonewich.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The festival has three main activities: Brooms Away, Mud-fling, and the Bloom with a View art fair.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "Brooms Away is a city-wide cleanup effort—but they've gamified it. You identify sensitive tech spots while sweeping away the winter dust.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Mud-fling is hilarious! Teams throw mud at each other while preparing the new garden beds. It gets messy but it's a crowd favorite.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "And the Bloom with a View is an art fair held in the botanical gardens. There's a scavenger hunt component that's quite popular.",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Let's participate in all the activities as a team.",
        affectionChanges: { xavier: 1, navarre: 1, etta: -1, senara: 0 },
        nextSceneId: 'spring-festival-all',
      },
      {
        text: "I'd prefer to focus on one activity and excel at it.",
        affectionChanges: { xavier: 0, navarre: -1, etta: 1, senara: 1 },
        nextSceneId: 'spring-festival-choose',
      },
      {
        text: "What if we divide and conquer? Each person takes one activity.",
        affectionChanges: { xavier: 0, navarre: 0, etta: 1, senara: 1 },
        nextSceneId: 'spring-festival-divide',
      }
    ],
  },
  
  'spring-festival-all': {
    id: 'spring-festival-all',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The day of the festival arrives. Stonewich is bustling with activity as citizens prepare for the spring celebration.",
      },
      {
        character: 'xavier',
        text: "This is exciting! I've read about these traditions but never participated before.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "It's great public relations too. People love seeing their administrators get their hands dirty alongside them.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Let's keep focused. Remember, this is a job, not just a social outing.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What should we try first?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Let's start with Brooms Away.",
        nextSceneId: 'spring-brooms-away-intro',
      },
      {
        text: "Mud-fling looks fun!",
        nextSceneId: 'spring-mud-fling-intro',
      },
      {
        text: "I'd like to explore the Bloom with a View art fair.",
        nextSceneId: 'spring-bloom-view-intro',
      }
    ],
  },
  
  'spring-festival-choose': {
    id: 'spring-festival-choose',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The day of the festival arrives. You've decided to focus your efforts on one activity.",
      },
      {
        character: 'maven',
        text: "I think I'll be more effective if I concentrate on one thing rather than trying to do everything.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "A sensible approach. Quality over quantity.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Which activity should I focus on?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "I'll join the Brooms Away cleanup crew.",
        nextSceneId: 'spring-brooms-away-intro',
      },
      {
        text: "The Mud-fling garden preparation looks interesting.",
        nextSceneId: 'spring-mud-fling-intro',
      },
      {
        text: "I think I'd be most helpful at the Bloom with a View art fair.",
        nextSceneId: 'spring-bloom-view-intro',
      }
    ],
  },
  
  'spring-festival-divide': {
    id: 'spring-festival-divide',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The festival day arrives, and your team has decided to divide and conquer the activities.",
      },
      {
        character: 'etta',
        text: "An efficient approach. I'll oversee the logistics of the main stage events.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "I can help with the tech side of Brooms Away. Some of those systems need careful handling.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "I'll take Mud-fling! It's right up my alley—messy but fun, and great for networking.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I'll document the art installations at Bloom with a View. The historical significance is worth cataloging.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "And I should choose...",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "I'll join Xavier with Brooms Away.",
        affectionChanges: { xavier: 1, navarre: 0, etta: 0, senara: 0 },
        nextSceneId: 'spring-brooms-away-intro',
      },
      {
        text: "I'll team up with Navarre for Mud-fling.",
        affectionChanges: { xavier: 0, navarre: 1, etta: 0, senara: 0 },
        nextSceneId: 'spring-mud-fling-intro',
      },
      {
        text: "I'll help Senara at Bloom with a View.",
        affectionChanges: { xavier: 0, navarre: 0, etta: 0, senara: 1 },
        nextSceneId: 'spring-bloom-view-intro',
      }
    ],
  }
};

export default springFestivalScenes;
