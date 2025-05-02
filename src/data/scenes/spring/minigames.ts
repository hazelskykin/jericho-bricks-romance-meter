
import { Scene } from '../../../types/game';

const springMinigameScenes: Record<string, Scene> = {
  // Brooms Away minigame intro
  'spring-brooms-away-intro': {
    id: 'spring-brooms-away-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The Brooms Away area is set up in the city's main plaza. Citizens are already sweeping away winter dust and marking sensitive technology spots.",
      },
      {
        character: 'xavier',
        text: "This is important work. The winter buildup can cause real problems for the city systems if not properly cleaned.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "How exactly does this work?",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "You use the broom to sweep away dust, but you have to be careful. If you hit a sensitive tech spot, it could malfunction.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "That's what the feather dusters are for—marking those spots for more delicate cleaning later.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Sounds like a challenge. I'm ready to try!",
        mood: 'happy',
      }
    ],
    choices: [
      {
        text: "Start Brooms Away",
        nextSceneId: 'spring-brooms-away-game',
      },
      {
        text: "Actually, let me try something else first.",
        nextSceneId: 'spring-festival-all',
      }
    ],
  },
  
  // Brooms Away minigame
  'spring-brooms-away-game': {
    id: 'spring-brooms-away-game',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Time to test your sweeping skills! Use the broom to clear the dust, and the feather duster to mark sensitive tech spots.",
      }
    ],
    choices: [
      {
        text: "Begin Sweeping",
        nextSceneId: 'spring-brooms-away-start',
      }
    ],
  },
  
  // Special scene to trigger the minigame
  'spring-brooms-away-start': {
    id: 'spring-brooms-away-start',
    background: 'stonewich-cityscape',
    dialogue: [], // Empty dialogue to trigger the minigame
    nextSceneId: 'spring-brooms-away-complete',
  },
  
  // After minigame completion
  'spring-brooms-away-complete': {
    id: 'spring-brooms-away-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "Nice work, Maven! You've got a good eye for the tech spots.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Thanks! It's harder than it looks to tell what's sensitive and what's not.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "That's why we have trained professionals like us. The citizens appreciate the help.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "What else is happening at the festival?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Let's check out Mud-fling next.",
        nextSceneId: 'spring-mud-fling-intro',
      },
      {
        text: "I'd like to see the Bloom with a View art fair.",
        nextSceneId: 'spring-bloom-view-intro',
      },
      {
        text: "I think I've had enough for today.",
        nextSceneId: 'spring-festival-end',
      }
    ],
  },
  
  // Mud-fling minigame intro
  'spring-mud-fling-intro': {
    id: 'spring-mud-fling-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The Mud-fling area is set up in the community garden. People are laughing and covered in mud as they prepare flower beds.",
      },
      {
        character: 'navarre',
        text: "Now THIS is my kind of event! Nothing builds relationships like getting a little messy together.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "How does it work exactly?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "We form teams and try to hit members of the other team with mud balls. But it's not just chaos—we're actually turning over the soil for spring planting.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "The fountain in the middle cycles on and off, creating mud as it sprays. You grab a mud ball and fling it at the other team!",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Sounds messy but fun. Let's do it!",
        mood: 'happy',
      }
    ],
    choices: [
      {
        text: "Start Mud-fling",
        nextSceneId: 'spring-mud-fling-game',
      },
      {
        text: "Actually, let me try something else first.",
        nextSceneId: 'spring-festival-all',
      }
    ],
  },
  
  // Mud-fling minigame
  'spring-mud-fling-game': {
    id: 'spring-mud-fling-game',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Time for Mud-fling! Select a mud ball, then click where you want to throw it. Try to hit members of the opposing team!",
      }
    ],
    choices: [
      {
        text: "Begin Mud-fling",
        nextSceneId: 'spring-mud-fling-start',
      }
    ],
  },
  
  // Special scene to trigger the minigame
  'spring-mud-fling-start': {
    id: 'spring-mud-fling-start',
    background: 'stonewich-cityscape',
    dialogue: [], // Empty dialogue to trigger the minigame
    nextSceneId: 'spring-mud-fling-complete',
  },
  
  // After minigame completion
  'spring-mud-fling-complete': {
    id: 'spring-mud-fling-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'navarre',
        text: "That was AMAZING! Did you see that shot you made? Right on target!",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'm covered in mud, but that was incredibly fun!",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "That's the spirit! And look—all these flower beds are ready for planting now.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "What else is happening at the festival?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Let's try Brooms Away next.",
        nextSceneId: 'spring-brooms-away-intro',
      },
      {
        text: "I'd like to see the Bloom with a View art fair.",
        nextSceneId: 'spring-bloom-view-intro',
      },
      {
        text: "I think I've had enough for today.",
        nextSceneId: 'spring-festival-end',
      }
    ],
  },
  
  // Bloom with a View minigame intro
  'spring-bloom-view-intro': {
    id: 'spring-bloom-view-intro',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: "The Bloom with a View art fair is set up in the botanical gardens. Artwork and floral displays create a vibrant atmosphere.",
      },
      {
        character: 'senara',
        text: "This event combines art and horticulture—two important cultural aspects of Stonewich.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "It's beautiful. What happens here?",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Local artists display their work, and there's a popular scavenger hunt where participants search for specific items hidden among the displays.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "It encourages people to pay attention to details they might otherwise miss. Quite clever, really.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'd like to try the scavenger hunt!",
        mood: 'happy',
      }
    ],
    choices: [
      {
        text: "Start Bloom with a View",
        nextSceneId: 'spring-bloom-view-game',
      },
      {
        text: "Actually, let me try something else first.",
        nextSceneId: 'spring-festival-all',
      }
    ],
  },
  
  // Bloom with a View minigame
  'spring-bloom-view-game': {
    id: 'spring-bloom-view-game',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: "Can you find all five hidden items in the garden art fair? Click around to discover them!",
      }
    ],
    choices: [
      {
        text: "Begin Scavenger Hunt",
        nextSceneId: 'spring-bloom-view-start',
      }
    ],
  },
  
  // Special scene to trigger the minigame
  'spring-bloom-view-start': {
    id: 'spring-bloom-view-start',
    background: 'city-cafe',
    dialogue: [], // Empty dialogue to trigger the minigame
    nextSceneId: 'spring-bloom-view-complete',
  },
  
  // After minigame completion
  'spring-bloom-view-complete': {
    id: 'spring-bloom-view-complete',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'senara',
        text: "Well done. You found all the items. You have a keen eye for detail.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Thanks! I enjoyed looking at all the artwork too.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The artists integrate Stonewich's history into their work. It's a valuable cultural preservation.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What else is happening at the festival?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Let's try Brooms Away next.",
        nextSceneId: 'spring-brooms-away-intro',
      },
      {
        text: "I want to check out the Mud-fling activity.",
        nextSceneId: 'spring-mud-fling-intro',
      },
      {
        text: "I think I've had enough for today.",
        nextSceneId: 'spring-festival-end',
      }
    ],
  }
};

export default springMinigameScenes;
