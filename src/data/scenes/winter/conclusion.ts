
import { Scene } from '../../../types/game';

const winterConclusionScenes: Record<string, Scene> = {
  'winter-festival-completion': {
    id: 'winter-festival-completion',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The Winter Games & Gala comes to a magical conclusion. As the final events wrap up, there's a sense of accomplishment throughout the team.",
      },
      {
        character: 'xavier',
        text: "All systems functioned at optimal capacity throughout the entire festival. It's a new record!",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "And the social media engagement was off the charts. People loved this year's events.",
        mood: 'proud',
      },
      {
        character: 'etta',
        text: "The organizational structure we implemented was highly efficient. Dr. Voss should be pleased with the results.",
        mood: 'pleased',
      },
      {
        character: 'maven',
        text: "We've come so far since we first arrived in Stonewich. It's hard to believe our year is almost over.",
        mood: 'thoughtful',
      },
      {
        character: 'senara',
        text: "We should prepare our final report for Dr. Voss. This will be our last seasonal assessment.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'winter-voss-report'
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
        character: 'drvoss',
        text: "Your team has shown remarkable growth over the course of this year. The Winter Games & Gala was a resounding success.",
      },
      {
        character: 'drvoss',
        text: "The metrics show unprecedented efficiency, public satisfaction, and technological innovation.",
      },
      {
        character: 'drvoss',
        text: "What's more impressive is how you've each developed individually and as a cohesive unit.",
      },
      {
        character: 'maven',
        text: "Thank you, Dr. Voss. This experience has transformed all of us.",
        mood: 'grateful',
      },
      {
        character: 'drvoss',
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
        mood: 'reflective',
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

export default winterConclusionScenes;
