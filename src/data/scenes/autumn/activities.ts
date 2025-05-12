import { Scene } from '@/types/game';

const activitiesScenes: Record<string, Scene> = {
  'autumn-festival-activities': {
    id: 'autumn-festival-activities',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The Autumn Festival is in full swing! There are several activities I could join. What should I check out first?",
        mood: 'thoughtful',
      }
    ],
    choices: [
      {
        text: "Join the artisan workshop to create a handcrafted item",
        nextSceneId: 'autumn-crafter-intro'
      },
      {
        text: "Help guide tourists around the historic district",
        nextSceneId: 'autumn-tour-guide-intro'
      },
      {
        text: "Create a memory photo album of the festival",
        nextSceneId: 'autumn-memories-intro'
      }
    ]
  },
  
  'autumn-crafter-intro': {
    id: 'autumn-crafter-intro',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The artisan workshop looks interesting. I've always wanted to try my hand at crafting something special.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Crafting connects us to traditions that span generations. The techniques may evolve, but the spirit of creation remains the same.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "I'm excited to make something that blends traditional craft with my own personal touch.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-crafter-start'
  },

  'autumn-crafter-start': {
    id: 'autumn-crafter-start',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "Time to get creative! Let's see what I can make...",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-crafter-complete'
  },
  
  'autumn-crafter-complete': {
    id: 'autumn-crafter-complete',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "I'm really proud of what I created! It's something special that captures both tradition and innovation.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "It's beautiful, Maven. You've captured the essence of what makes handcrafting so powerful - the personal connection to what you create.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Thank you! I think I understand a bit better now why preserving these traditions matters so much.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  },
  'autumn-tour-guide-intro': {
    id: 'autumn-tour-guide-intro',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "Guiding tourists could be a fun way to share the city's history and culture.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Sharing our city's story is a great way to connect with others and celebrate our heritage.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'm excited to show off the hidden gems and historical landmarks of Stonewich.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-tour-guide-start'
  },
  'autumn-tour-guide-start': {
    id: 'autumn-tour-guide-start',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "Let's start the tour and show these visitors what makes Stonewich so special!",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-tour-guide-complete'
  },
  'autumn-tour-guide-complete': {
    id: 'autumn-tour-guide-complete',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The tour was a success! I enjoyed sharing the history and culture of Stonewich with the visitors.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "You did a great job, Maven! Your passion for the city really shines through.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Thank you! It feels good to connect with others and celebrate our shared heritage.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  },
  'autumn-memories-intro': {
    id: 'autumn-memories-intro',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "Creating a memory photo album sounds like a wonderful way to capture the spirit of the festival.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Photographs are powerful tools for preserving memories and sharing our experiences with others.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "I'm excited to create a visual story that celebrates the people and traditions of Stonewich.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-memories-date-start'
  },
  'autumn-memories-date-start': {
    id: 'autumn-memories-date-start',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "Let's start snapping some photos and create a beautiful memory album!",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-memories-date-complete'
  },
  'autumn-memories-date-complete': {
    id: 'autumn-memories-date-complete',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The memory photo album is complete! It's a beautiful collection of moments that capture the essence of the festival.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "This album is a testament to the power of community and the importance of preserving our shared memories.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "I'm so glad I could contribute to this celebration of Stonewich's heritage.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-activities'
  },
};

export default activitiesScenes;
