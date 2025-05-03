
import { Scene } from '../../../types/game';

// Create individual character visit scenes
const characterVisitScenes: Record<string, Scene> = {
  // Xavier visits - using the workstation for one-on-one time
  'spring-visit-xavier': {
    id: 'spring-visit-xavier',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'narrator',
        text: 'You find Xavier at his workstation, surrounded by multiple screens displaying city system diagnostics.',
      },
      {
        character: 'xavier',
        text: "Maven! Perfect timing. I was just looking at the festival's tech requirements. Want to help me plan the setup?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'd love to. What needs to be done?",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "We need to ensure all the smart displays and environmental systems are working for the Blooms & Brooms festival. It's quite a challenge.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'spring-character-selection1', // Return to selection with '1' suffix to indicate Xavier was visited
  },
  
  // Navarre visits - using the workstation for one-on-one time
  'spring-visit-navarre': {
    id: 'spring-visit-navarre',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'narrator',
        text: 'You find Navarre reviewing public relations materials for the upcoming festival.',
      },
      {
        character: 'navarre',
        text: "Maven! Just the person I wanted to see. What do you think of these promotional designs for the festival?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "They look impressive. You've really captured the spirit of spring.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Thanks! I've been working with local artists to blend traditional Stonewich symbolism with our modern approach. Community engagement is essential.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'spring-character-selection2', // Return to selection with '2' suffix to indicate Navarre was visited
  },
  
  // Etta visits - using the workstation for one-on-one time
  'spring-visit-etta': {
    id: 'spring-visit-etta',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'narrator',
        text: 'Etta is meticulously organizing a complex schedule on her workstation.',
      },
      {
        character: 'etta',
        text: "Maven. Good. I could use another perspective on the festival logistics.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I'd be happy to help. What are you working on?",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Resource allocation for the festival. We need to ensure maximum efficiency while maintaining the traditional aspects people expect. It's a precise balance.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'spring-character-selection3', // Return to selection with '3' suffix to indicate Etta was visited
  },
  
  // Senara visits - using the workstation for one-on-one time
  'spring-visit-senara': {
    id: 'spring-visit-senara',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'narrator',
        text: 'You find Senara analyzing historical data about past spring festivals in Stonewich.',
      },
      {
        character: 'senara',
        text: "Maven. Did you know that Stonewich's spring festival has roots dating back over 300 years? The data patterns are fascinating.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I didn't. What have you discovered?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The 'Brooms' portion originally referred to the ritual sweeping away of winter spirits. Now it's become literal city cleaning, but the pattern of community participation remains consistent.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'spring-character-selection4', // Return to selection with '4' suffix to indicate Senara was visited
  }
};

export default characterVisitScenes;
