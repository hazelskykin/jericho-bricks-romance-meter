
import { Scene } from '@/types/game';

const activitiesScenes: Record<string, Scene> = {
  'autumn-festival-activities': {
    id: 'autumn-festival-activities',
    background: 'autumn-transition',
    dialogue: [
      {
        character: 'maven',
        text: "There's so much to do at the festival today. I should decide what I want to experience first.",
        mood: 'happy',
      }
    ],
    // This scene will be handled by the FestivalActivitiesScene component
    nextSceneId: 'autumn-festival-completion',
  },

  // Tour Guide Minigame Introduction
  'autumn-tour-guide-intro': {
    id: 'autumn-tour-guide-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "I think I'll help out at the visitor information kiosk. People need help organizing their heritage tours.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "That's perfect for you! You're great with people, and it'll be a chance to showcase the city's history.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I need to match tour groups with appropriate itineraries and make sure the tours are filled but not overcrowded.",
        mood: 'thoughtful',
      },
      {
        character: 'etta',
        text: "Don't forget that tours need a minimum number of people to run, and they can't exceed the maximum capacity.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Right! And the day is only so long, so I need to make sure I'm efficient with the scheduling.",
        mood: 'determined',
      }
    ],
    nextSceneId: 'autumn-tour-guide-start',
  },

  // Trigger for Tour Guide minigame
  'autumn-tour-guide-start': {
    id: 'autumn-tour-guide-start',
    background: 'stonewich-cityscape',
    dialogue: [],
    nextSceneId: 'autumn-tour-guide-complete',
  },

  // After Tour Guide minigame
  'autumn-tour-guide-complete': {
    id: 'autumn-tour-guide-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "Whew! That was quite a busy day at the information kiosk.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "How did it go? Were you able to organize the tours successfully?",
        mood: 'curious',
      },
      {
        character: 'maven',
        text: "I did my best! It was challenging to balance all the different requests and make sure everyone got to experience the tours they wanted.",
        mood: 'thoughtful',
      },
      {
        character: 'etta',
        text: "Maybe you're learning something from me after all.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Etta! Are you trying to take credit for Maven's success? haha!",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I think we all feel a sense of pride when our team members excel, don't we? There's nothing wrong with sharing that sense of accomplishment.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-midway',
  },

  // Crafter Minigame Introduction
  'autumn-crafter-intro': {
    id: 'autumn-crafter-intro',
    background: 'autumn-transition',
    dialogue: [
      {
        character: 'maven',
        text: "The DIY crafting booth looks interesting. I could make something special there.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Crafting is a meaningful way to connect with the heritage of Stonewich. Each item tells a story.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I think I'll try to create something that's meaningful... something that represents my time here in Stonewich.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'autumn-crafter-start',
  },

  // Trigger for Crafter minigame
  'autumn-crafter-start': {
    id: 'autumn-crafter-start',
    background: 'autumn-transition',
    dialogue: [],
    nextSceneId: 'autumn-crafter-complete',
  },

  // After Crafter minigame
  'autumn-crafter-complete': {
    id: 'autumn-crafter-complete',
    background: 'autumn-transition',
    dialogue: [
      {
        character: 'maven',
        text: "There! I've finished my craft. I hope it conveys the feeling I wanted to express.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Are you enjoying the crafters guild? What have you got there?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Yes, it was fun. But nevermind this. It's a secret.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-midway',
  },

  // Memories Date Introduction
  'autumn-memories-date-intro': {
    id: 'autumn-memories-date-intro',
    background: 'autumn-transition',
    dialogue: [
      {
        character: 'maven',
        text: "It's time for my date!",
        mood: 'happy',
      }
    ],
    choices: [
      {
        text: "I've been looking forward to spending some time alone with a certain someone, without work.",
        affectionChanges: { xavier: 1, navarre: 1, etta: 1, senara: 1 },
        nextSceneId: 'autumn-memories-date-start'
      },
      {
        text: "It'll be good to have a break at today's festival.",
        nextSceneId: 'autumn-memories-date-start'
      }
    ]
  },

  // Trigger for Memories Date minigame
  'autumn-memories-date-start': {
    id: 'autumn-memories-date-start',
    background: 'autumn-transition',
    dialogue: [],
    nextSceneId: 'autumn-memories-date-complete',
  },

  // After Memories Date
  'autumn-memories-date-complete': {
    id: 'autumn-memories-date-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "That was a wonderful day exploring the festival together.",
        mood: 'happy',
      }
    ],
      nextSceneId: 'autumn-gift-giving'
  },

  // Gift giving scene
  'autumn-gift-giving': {
    id: 'autumn-gift-giving',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "I made this for you earlier today. I hope you like it.",
        mood: 'embarrassed',
      }
    ],
    nextSceneId: 'autumn-gift-reaction',
  },

  // Gift reaction scenes will be dynamically selected based on the current love interest
  'autumn-gift-reaction': {
    id: 'autumn-gift-reaction',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The character reacts to your gift...",
      }
    ],
    nextSceneId: 'autumn-food-fest',
  },

  // Heritage Food Fest scene
  'autumn-food-fest': {
    id: 'autumn-food-fest',
    background: 'autumn-transition',
    dialogue: [
      {
        character: 'maven',
        text: "Everything smells amazing! There are so many traditional dishes to try.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "The food is one of the best parts of the Heritage Festival. The two of you grow closer with every shared bite and smile.",
      }
    ],
    nextSceneId: 'autumn-festival-conclusion',
  },

  // Festival midway point - player can choose other activities
  'autumn-festival-midway': {
    id: 'autumn-festival-midway',
    background: 'autumn-festival',
    dialogue: [
      {
        character: 'maven',
        text: "There's still more to explore at the festival. What should I do next?",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-activities',
  },
  
  // Festival completion scene
  'autumn-festival-completion': {
    id: 'autumn-festival-completion',
    background: 'autumn-transition',
    dialogue: [
      {
        character: 'maven',
        text: "What an incredible festival! I feel so much closer to Stonewich and the people here than before.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "It's days like today that make me realize how much I've come to love this city.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festivities-conclusion',
  },
};

export default activitiesScenes;
