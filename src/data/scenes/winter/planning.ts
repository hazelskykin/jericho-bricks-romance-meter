
import { Scene } from '@/types/game';

const winterPlanningScenes: Record<string, Scene> = {
  'winter-planning': {
    id: 'winter-planning',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'maven',
        text: "Winter in Stonewich brings new challenges, but also new opportunities to build on what we've learned.",
        mood: 'thoughtful',
      },
      {
        character: 'narrator',
        text: "The team gathers to discuss plans for the Winter Gala & Games. There's a sense of change in the air, as each person reflects on their personal growth over the seasons.",
      },
      {
        character: 'etta',
        text: "This festival is our biggest challenge yet. We need to be prepared for increased system load and potential issues.",
        mood: 'serious',
      },
    ],
    // This is a routing scene that will direct to character-specific content
    choices: [
      {
        text: "Continue",
        nextSceneId: 'winter-planning-route'
      }
    ]
  },

  'winter-planning-route': {
    id: 'winter-planning-route',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: "You find yourself naturally working with the one person who you have become closest to.",
      }
    ],
    // This is a placeholder scene that will immediately route to the character-specific scene
    nextSceneId: 'winter-character-specific-planning'
  },
  // Xavier's winter planning scene
  'winter-xavier-planning': {
    id: 'winter-xavier-planning',
    background: 'cybaton-lab',
    dialogue: [
      {
        character: 'xavier',
        text: "You know that communications system we worked on? I've been thinking about expanding it for the Winter Games.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "A city-wide rollout? That sounds ambitious.",
        mood: 'surprised',
      },
      {
        character: 'xavier',
        text: "I want to take what we learned and scale it up. A system that can recommend local connections based on interests and proximity.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "After autumn, I realized how much people need these connections. I want to help others find what we found together.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "That's incredible, Xavier. I think it could really make a difference for people during the festival.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "With your support, I feel like I can do this. I'm not just the tech guy anymore - I'm someone who can help bring people together.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-festival-intro'
  },
  // Etta's winter planning scene
  'winter-etta-planning': {
    id: 'winter-etta-planning',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'etta',
        text: "I reached out to my father yesterday. About the arranged marriage situation.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "That must have been difficult. How did it go?",
        mood: 'sad',
      },
      {
        character: 'etta',
        text: "Better than expected. I was direct about my feelings, about what I want for my future... and about us.",
        mood: 'sad',
      },
      {
        character: 'etta',
        text: "He was surprised, but he listened. I proposed that his company could still partner with Cybaton without the marriage requirement.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "That's a huge step, Etta. I'm proud of you for standing up for yourself.",
        mood: 'confident',
      },
      {
        character: 'etta',
        text: "For the Winter Gala, he's agreed to come and discuss terms. I want to show him that I can be successful on my own terms.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "And I want him to meet you. Properly.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-festival-intro'
  },
  // Navarre's winter planning scene
  'winter-navarre-planning': {
    id: 'winter-navarre-planning',
    background: 'stonewich-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "Have you seen the latest video Morgan and I posted? The viewership is incredible!",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I saw it. Your partnership is really working out.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "It is, but... there's something I need to address. The fans keep speculating about my love life.",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "I've seen some of the comments. Does it bother you?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "What bothers me is that they might make you think this is just another flirtation for me. It's not.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "For the Winter Gala, I want to dedicate a special broadcast that shows real people with honest relationships and what makes them last. I'd like you to appear on the show with me.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Navarre... you don't have to prove anything to me.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "I'm tired of being seen as just the charming influencer and want to encourage others to express themselves more authentically like I've been learning to do, with you. I want to be seen as someone capable of real commitment. Someone worthy of you.",
        mood: 'sad',
      }
    ],
    nextSceneId: 'winter-festival-intro'
  },
  // Senara's winter planning scene
  'winter-senara-planning': {
    id: 'winter-senara-planning',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'senara',
        text: "I find myself distracted from the planning efforts required for the festival.",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "Oh? Is something troubling you?",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "You, in part. I mean, you are the root cause of the flood of emotions I'm now experiencing that have caused me to be distracted.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I've spent too much of my life in silence, with moderated logical reactions as were expected of me. Now I feel like I know what the heights and lows of human emotion are for the first time.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "What's different now?",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "First, I think I was subconsciously regulating my thoughts and feelings to avoid further scrutiny from those watching over my development. But after declining the interface sessions, a floodgate opened in my mind.",
        mood: 'sad',
      },
      {
        character: 'senara',
        text: "And, I'm trying to be more assertive with my feelings. Starting with how I feel about you.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "May I?",
        mood: 'embarrassed',
      },
      {
        character: 'narrator',
        text: "Senara brings his hand up to yours with slow hesitation, watching for your reaction as he gently wraps his fingers with yours in the barest of touches.",
      },
      {
        character: 'maven',
        text: "Yes, please.",
        mood: 'embarrassed',
      },
    ],
    nextSceneId: 'winter-festival-intro'
  },

  // Winter festival introduction
  'winter-festival-intro': {
    id: 'winter-festival-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The day of the Winter Gala & Games arrives. Stonewich is transformed, streets glittering with lights and decorations.",
      },
      {
        character: 'maven',
        text: "It's beautiful. All our planning has really paid off.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "All the arrangements have been made, and the teams are executing smoothly.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Let's make this a night to remember.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'winter-festival-activities'
  }
};

export default winterPlanningScenes;
