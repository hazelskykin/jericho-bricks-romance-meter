
import { Scene } from '@/types/game';

const activitiesScenes: Record<string, Scene> = {
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
      },
      {
        character: 'xavier',
        text: "The technical systems are all ready to support the festival activities. We've added some special features this year to highlight the heritage exhibits.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "I've been working with the local artisans to make sure they get prime placement. You wouldn't believe the politics involved in booth arrangement!",
        mood: 'laughing',
      },
      {
        character: 'etta',
        text: "We've organized the day into three main activities. Maven, you should decide which one you want to participate in first.",
        mood: 'neutral',
      },
    ],
    nextSceneId: 'autumn-festival-activities',
  },

  'autumn-festival-activities': {
    id: 'autumn-festival-activities',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "There's so much to do at the Heritage & Handicrafts Festival. What should I try first?",
        mood: 'happy',
      }
    ],
    // This scene will be handled by FestivalActivitiesView component
  },
  
  'autumn-tour-guide-intro': {
    id: 'autumn-tour-guide-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "I think I'll help with the tour guide station. It sounds like an interesting way to learn about Stonewich's history.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Excellent choice. You'll be matching visitors with appropriate tour routes based on their interests and needs.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'm looking forward to it. Let's get started!",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-tour-guide-start',
  },
  
  'autumn-crafter-intro': {
    id: 'autumn-crafter-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "The crafting booth looks fascinating. I'd like to try making something myself.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "An excellent opportunity to experience the tactile aspect of creation. There's a psychological benefit to working with one's hands.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I wonder what I'll be able to create.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-crafter-start',
  },
  
  'autumn-memories-date-intro': {
    id: 'autumn-memories-date-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "I'd like to spend some time making memories at the festival with someone special.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "The 'Making Memories' photo booth is perfect for that. You can capture special moments and create customized photo keepsakes.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "That sounds wonderful. Let's go there together.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-memories-date-start',
  },
  
  'autumn-tour-guide-complete': {
    id: 'autumn-tour-guide-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "That was really fulfilling. I helped so many visitors find the perfect tour for their interests.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "You did an excellent job. Your organizational skills are impressive.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-completion',
  },
  
  'autumn-crafter-complete': {
    id: 'autumn-crafter-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "I can't believe I made this myself! It's not perfect, but I'm proud of it.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The imperfections are what make handcrafted items special. They represent the unique human touch.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'autumn-festival-completion',
  },
  
  'autumn-memories-date-complete': {
    id: 'autumn-memories-date-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'maven',
        text: "These photos turned out wonderful. I'll treasure these memories of our time together.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-completion',
  },
  
  'autumn-festival-completion': {
    id: 'autumn-festival-completion',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "As the day draws to a close, the Heritage & Handicrafts Festival is declared a great success. Visitors leave with new appreciation for Stonewich's cultural history and artisanal traditions.",
      },
      {
        character: 'xavier',
        text: "The festival systems ran flawlessly. The digital heritage archive received a record number of uploads from participants.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "The local artisans are thrilled with the turnout and sales. Several of them have already asked about participating next year.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Our metrics show excellent engagement across all demographics. The festival achieved all its community connection goals.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The qualitative feedback has been overwhelmingly positive. People particularly appreciated learning about the historical context of various crafts.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "It was a wonderful day. I feel like I understand Stonewich and its people so much better now.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-conclusion',
  }
};

export default activitiesScenes;
