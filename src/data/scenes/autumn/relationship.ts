
import { Scene } from '../../../types/game';

const relationshipScenes: Record<string, Scene> = {
  // Main autumn character relationship hub
  'autumn-character-relationship': {
    id: 'autumn-character-relationship',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "The autumn festival is coming up. I should invite someone to join me.",
        mood: 'thoughtful',
      },
    ],
    nextSceneId: 'autumn-character', // Route to character-specific scenes
  },
  
  // Character-specific autumn scenes
  'autumn-xavier': {
    id: 'autumn-xavier',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "I think I'll spend some time with Xavier today.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Maven! Perfect timing. I was just admiring the autumn decorations.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "They're beautiful, aren't they? Would you like to explore the festival together?",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I'd love that! There's so much to see.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-xavier-resolution',
  },
  
  'autumn-navarre': {
    id: 'autumn-navarre',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "I think I'll spend some time with Navarre today.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Maven! Just the person I wanted to see. The autumn festival is in full swing.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "It is! Would you like to explore it together?",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Absolutely! I know all the best spots. Let me show you around.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-navarre-resolution',
  },
  
  'autumn-etta': {
    id: 'autumn-etta',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "I think I'll spend some time with Etta today.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Maven. Good. I was about to do a strategic review of the autumn festivities.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "That sounds... fun? Maybe we could just enjoy the festival together instead?",
        mood: 'thoughtful',
      },
      {
        character: 'etta',
        text: "Hmm. I suppose hands-on observation could be valuable data collection as well.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'autumn-etta-resolution',
  },
  
  'autumn-senara': {
    id: 'autumn-senara',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "I think I'll spend some time with Senara today.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Maven, hello. I was just observing the fascinating cultural traditions on display.",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "Would you like to explore the festival together? There's so much to see.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I'd appreciate that. Your perspective on these customs would be... valuable to me.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-senara-resolution',
  },
  
  // Resolution scenes that transition to the festival
  'autumn-xavier-resolution': {
    id: 'autumn-xavier-resolution',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "Thanks for spending time with me, Xavier. The autumn festival should be starting soon.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I can't wait! Let's see what activities they have this year.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-intro',
  },
  
  'autumn-navarre-resolution': {
    id: 'autumn-navarre-resolution',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "That was fun, Navarre. We should head to the autumn festival now.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Lead the way! I hear they have some amazing crafts this year.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'autumn-festival-intro',
  },
  
  'autumn-etta-resolution': {
    id: 'autumn-etta-resolution',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "I enjoyed our time together, Etta. Let's check out the autumn festival.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Yes. There are several activities that could benefit from our oversight.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'autumn-festival-intro',
  },
  
  'autumn-senara-resolution': {
    id: 'autumn-senara-resolution',
    background: 'autumn-cityoverlook',
    dialogue: [
      {
        character: 'maven',
        text: "That was lovely, Senara. The autumn festival should be starting.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I'm looking forward to seeing how tradition and innovation blend in these celebrations.",
        mood: 'thoughtful',
      }
    ],
    nextSceneId: 'autumn-festival-intro',
  }
};

export default relationshipScenes;
