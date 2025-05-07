
import { Scene } from '../../../types/game';

const summerMinigameScenes: Record<string, Scene> = {
  // Summer minigame start scenes - these trigger actual minigames
  'summer-serenade-start': {
    id: 'summer-serenade-start',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You approach the interactive music exhibit, ready to test your rhythm skills.",
      },
    ],
    // This triggers the Serenade minigame
    nextSceneId: 'summer-serenade-complete',
  },
  
  'summer-spoken-word-start': {
    id: 'summer-spoken-word-start',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: "You take a seat at the spoken word competition area, ready to craft your poem.",
      },
    ],
    // This triggers the Spoken Word minigame
    nextSceneId: 'summer-spoken-word-complete',
  },
  
  'summer-whats-on-tap-start': {
    id: 'summer-whats-on-tap-start',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: "You put on an apron and take your position behind the beer tent counter.",
      },
    ],
    // This triggers the What's On Tap minigame
    nextSceneId: 'summer-whats-on-tap-complete',
  },
  
  // Minigame completion scenes
  'summer-serenade-complete': {
    id: 'summer-serenade-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Your musical performance comes to an end, drawing applause from the crowd.",
      },
      {
        character: 'xavier',
        text: "That was impressive! Your musical intuition really comes through.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'summer-festival-midway',
  },
  
  'summer-spoken-word-complete': {
    id: 'summer-spoken-word-complete',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: "As you finish your poem, the audience snaps their fingers in appreciation.",
      },
      {
        character: 'senara',
        text: "Your words carry authentic emotion. Quite effective at conveying personal truth.",
        mood: 'neutral',
      },
    ],
    nextSceneId: 'summer-festival-midway',
  },
  
  'summer-whats-on-tap-complete': {
    id: 'summer-whats-on-tap-complete',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "You have a surprising knack for bartending! The customers loved your service.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I enjoyed connecting with people. There's something special about facilitating those moments of enjoyment.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'summer-festival-midway',
  },
  
  // Additional summer activities
  'summer-wine-tasting-intro': {
    id: 'summer-wine-tasting-intro',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "The 'Sips' part of the festival is just as important as the 'Songs'. Local vineyards showcase their finest varieties.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I've never been to a formal wine tasting before.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Then you're in for a treat! Let me show you how it's done.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'summer-whats-on-tap-intro',
  },
  
  // Common midway point after any minigame
  'summer-festival-midway': {
    id: 'summer-festival-midway',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The Summer Songs & Sips festival continues in full swing around you.",
      },
      {
        character: 'maven',
        text: "The festival has such a different energy than the spring one. It feels more relaxed yet vibrant.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Music has this way of bringing people together that's different from other activities.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "And people are definitely connecting! I've already made some promising contacts for future Stonewich promotions.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'summer-festival-activities',
  },
  
  'summer-conclusion-meeting': {
    id: 'summer-conclusion-meeting',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'etta',
        text: "The festival attendance exceeded projections by 12%. Vendor satisfaction ratings were also above benchmark.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "And no technical issues with any of the performances! The cooling systems held up perfectly despite the heat wave.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Several influential visitors mentioned they're looking forward to the autumn festival. We've built good momentum.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The cultural significance ratings showed marked improvement from previous years. People are connecting with the city's musical heritage.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "It seems like we've all contributed something meaningful to make this a success.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'summer-conclusion',
  }
};

export default summerMinigameScenes;
