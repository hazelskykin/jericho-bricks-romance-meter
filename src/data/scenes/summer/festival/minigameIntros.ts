
import { Scene } from '../../../../types/game';

const summerFestivalMinigameIntrosScenes: Record<string, Scene> = {
  // Summer minigame intro scenes
  'summer-serenade-intro': {
    id: 'summer-serenade-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "The four main stages each showcase a different musical style. Each one reflects something about our team's personalities, in a way.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I can see the crowds are really getting into the music. It's a beautiful sight.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Why not try the interactive rhythm experience? You can select a stage and follow along with the music.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "That sounds like fun! I'll give it a try.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-serenade-start',
  },
  
  'summer-spoken-word-intro': {
    id: 'summer-spoken-word-intro',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'senara',
        text: "Poetry is a fascinating linguistic construct. The way words can be arranged to create both meaning and rhythm simultaneously.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I've never written poetry before, but I've always appreciated it.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The spoken word competition allows participants to choose from different stanza options to create a coherent poem. Would you like to try?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I think I would. It might help me understand the artistic side of Stonewich better.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-spoken-word-start',
  },
  
  'summer-whats-on-tap-intro': {
    id: 'summer-whats-on-tap-intro',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "The beer tents are always the heart of the social scene at the festival! Want to try your hand at serving?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I've never done anything like that before.",
        mood: 'surprised',
      },
      {
        character: 'navarre',
        text: "It's simple! Just pour the right drinks with the right amount of foam, ice, or flavoring. You'll be surprised how quickly you can read what people want.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Alright, I'll give it a shot. It could be fun to be on the other side of the counter for once.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-whats-on-tap-start',
  },
};

export default summerFestivalMinigameIntrosScenes;
