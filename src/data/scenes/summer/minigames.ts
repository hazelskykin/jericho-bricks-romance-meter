
import { Scene } from '../../../types/game';

const summerMinigameScenes: Record<string, Scene> = {
  // Summer minigame intro scenes
  'summer-music-game-intro': {
    id: 'summer-music-game-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "Music is a big part of the Summer Songs & Sips festival. We have special interactive exhibits planned.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'm curious to see how technology and music come together in these exhibits.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'summer-music-game-start',
  },
  
  // Placeholder for summer minigame start scenes - these would trigger actual minigames
  'summer-music-game-start': {
    id: 'summer-music-game-start',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You approach the interactive music exhibit, ready to test your skills.",
      },
    ],
    // This would typically trigger a minigame, but for now just continues the story
    nextSceneId: 'summer-music-game-complete',
  },
  
  // Result scenes for minigames
  'summer-music-game-complete': {
    id: 'summer-music-game-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "You enjoyed the interactive music experience at the festival.",
      },
      {
        character: 'xavier',
        text: "That was impressive! Your musical intuition really shines through.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'summer-conclusion',
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
    nextSceneId: 'summer-wine-tasting-game',
  },
  
  'summer-wine-tasting-game': {
    id: 'summer-wine-tasting-game',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: "Under Navarre's guidance, you learn to distinguish different wine varieties and their unique characteristics.",
      },
    ],
    nextSceneId: 'summer-wine-tasting-complete',
  },
  
  'summer-wine-tasting-complete': {
    id: 'summer-wine-tasting-complete',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "You have a surprisingly refined palate! I'm impressed.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I think I'm starting to appreciate the subtleties. It's fascinating how much history and tradition goes into each glass.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Exactly! When people connect over shared experiences like this, it creates lasting memories and relationships.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'summer-conclusion-meeting',
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
