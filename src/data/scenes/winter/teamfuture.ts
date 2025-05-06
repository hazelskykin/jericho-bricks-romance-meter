import { Scene } from '../../../types/game';

const teamFutureScenes: Record<string, Scene> = {

// game-end-team-futures, follows relationship-confession scenes

'team-future-meeting': {
    id: 'team-future-meeting',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'narrator',
        text: "Dr. Voss: After reviewing all factors, I've made a decision regarding your team's future.",
      },
      {
        character: 'narrator',
        text: "Given your exceptional performance and the positive feedback from Stonewich, your team will remain together and continue your assignment there.",
      },
      {
        character: 'narrator',
        text: "As for the 'Versa' role experiment, a conclusion has not yet been reached. We will discuss that separately at another time. Maven, for now, you will continue as a permanent member of the team.",
      },
      {
        character: 'narrator',
        text: "Congratulations to all of you. Your work this year has set a new standard for Cybaton's city management teams.",
      },
      {
        character: 'maven',
        text: "Thank you, Dr. Voss. We're honored to continue our work in Stonewich.",
        mood: 'grateful',
      }
    ],
    nextSceneId: 'winter-epilogue-check',
  },

  'winter-epilogue-check': {
    id: 'winter-epilogue-check',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'maven',
        text: "As Dr. Voss leaves the room, I catch the eye of my teammates. This next year in Stonewich promises to be even more exciting than the last.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'epilogue-intro',
  },
  
  'winter-voss-report': {
    id: 'winter-voss-report',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'narrator',
        text: "The team gathers for their final seasonal report to Dr. Voss. There's tension in the air - this evaluation will determine their future with Cybaton.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Your team has shown remarkable growth over the course of this year. The Winter Games & Gala was a resounding success.",
      },
      {
        character: 'narrator',
        text: "The metrics show unprecedented efficiency, public satisfaction, and technological innovation.",
      },
      {
        character: 'narrator',
        text: "What's more impressive is how you've each developed individually and as a cohesive unit.",
      },
      {
        character: 'maven',
        text: "Thank you, Dr. Voss. This experience has transformed all of us.",
        mood: 'grateful',
      },
      {
        character: 'narrator',
        text: "Indeed. And now it's time to discuss your future assignments with Cybaton.",
      }
    ],
    nextSceneId: 'winter-conclusion'
  },
  'winter-conclusion': {
    id: 'winter-conclusion',
    background: 'cybaton-lobby',
    dialogue: [
      {
        character: 'narrator',
        text: "With the final assessment complete, the team gathers one last time in Stonewich. Their year-long assignment is coming to an end.",
      },
      {
        character: 'xavier',
        text: "I can't believe it's almost over. This year changed everything for me.",
        mood: 'thoughtful',
      },
      {
        character: 'etta',
        text: "For all of us. We're not the same people who arrived here last spring.",
        mood: 'thoughtful',
      },
      {
        character: 'navarre',
        text: "Oh, I'm definitely still charming and devastatingly handsome. But maybe a bit wiser too.",
        mood: 'laughing',
      },
      {
        character: 'senara',
        text: "We've built something meaningful here. Not just for the city, but for ourselves.",
        mood: 'sincere',
      },
      {
        character: 'maven',
        text: "Whatever comes next, I'm grateful for this time with all of you.",
        mood: 'grateful',
      }
    ],
    choices: [
      {
        text: "Look toward the future",
        nextSceneId: "epilogue-route"
      }
]
  }
};

export default teamFutureScenes;
