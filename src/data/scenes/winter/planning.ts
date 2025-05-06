
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
        nextSceneId: "winter-planning-character"
      }
    ]
  },
  'winter-planning-character': {
    id: 'winter-planning-character',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: "As the meeting continues, you find yourself working closely with someone who has become particularly important to you.",
      }
    ],
    nextSceneId: 'winter-planning-route'
  },
  'winter-planning-route': {
    id: 'winter-planning-route',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: "This scene will route to the appropriate character's winter planning scene based on your romantic interest.",
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
        mood: 'sincere',
      },
      {
        character: 'maven',
        text: "That's incredible, Xavier. I think it could really make a difference for people during the festival.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "With your support, I feel like I can do this. I'm not just the tech guy anymore - I'm someone who can help bring people together.",
        mood: 'grateful',
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
        mood: 'nervous',
      },
      {
        character: 'maven',
        text: "That must have been difficult. How did it go?",
        mood: 'concerned',
      },
      {
        character: 'etta',
        text: "Better than expected. I was direct about my feelings, about what I want for my future... and about us.",
        mood: 'vulnerable',
      },
      {
        character: 'etta',
        text: "He was surprised, but he listened. I proposed that his company could still partner with Cybaton without the marriage requirement.",
        mood: 'determined',
      },
      {
        character: 'maven',
        text: "That's a huge step, Etta. I'm proud of you for standing up for yourself.",
        mood: 'proud',
      },
      {
        character: 'etta',
        text: "For the Winter Gala, he's agreed to come and discuss terms. I want to show him that I can be successful on my own terms.",
        mood: 'determined',
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
        mood: 'concerned',
      },
      {
        character: 'maven',
        text: "I've seen some of the comments. Does it bother you?",
        mood: 'curious',
      },
      {
        character: 'navarre',
        text: "What bothers me is that they might make you think this is just another flirtation for me. It's not.",
        mood: 'serious',
      },
      {
        character: 'navarre',
        text: "For the Winter Gala, I want to dedicate a special broadcast. To show everyone that what we have is real and lasting.",
        mood: 'sincere',
      },
      {
        character: 'maven',
        text: "Navarre... you don't have to prove anything to me.",
        mood: 'touched',
      },
      {
        character: 'navarre',
        text: "I know. But I want to. I'm tired of being seen as just the charming influencer. I want to be seen as someone capable of real commitment. Someone worthy of you.",
        mood: 'determined',
      }
    ],
    nextSceneId: 'winter-festival-intro'
  },
  // Senara's winter planning scene
  'winter-senara-planning': {
    id: 'winter-senara-planning',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'senara',
        text: "I've been developing a new platform for the Winter Gala & Games. Something to give voice to those who usually go unheard.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "That sounds perfect for you. What inspired this?",
        mood: 'curious',
      },
      {
        character: 'senara',
        text: "You did, in part. Seeing you accept me for who I am... it made me want to create spaces where others feel that same acceptance.",
        mood: 'sincere',
      },
      {
        character: 'senara',
        text: "I've spent too much of my life in silence, watching from the shadows. Now I want to help others step into the light.",
        mood: 'determined',
      },
      {
        character: 'maven',
        text: "I've never heard you speak so passionately about something before.",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "I'm trying to be more assertive with my feelings. Starting with how I feel about you.",
        mood: 'vulnerable',
      },
      {
        character: 'senara',
        text: "This project isn't just about technology. It's about connection, understanding, and giving everyone a chance to be heard.",
        mood: 'determined',
      }
    ],
    nextSceneId: 'winter-festival-intro'
  },
  // Character-specific planning router
  'winter-character-specific-planning': {
    id: 'winter-character-specific-planning',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: "Routing to character-specific winter planning scene...",
      }
    ],
    // This scene exists only to route to the appropriate character's scene
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
        character: 'xavier',
        text: "The systems are all running smoothly. Even with the increased load, we're handling it perfectly.",
        mood: 'proud',
      },
      {
        character: 'senara',
        text: "Let's make this a night to remember.",
        mood: 'determined',
      }
    ],
    nextSceneId: 'winter-festival-activities'
  }
};

export default winterPlanningScenes;
