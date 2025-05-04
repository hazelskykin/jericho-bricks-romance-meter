
import { Scene } from '../../../../types/game';

const summerFestivalMinigameResultsScenes: Record<string, Scene> = {
  // Result scenes for summer minigames
  'summer-serenade-complete': {
    id: 'summer-serenade-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "That was fantastic! Music has this way of connecting people instantaneously. It's one of the purest forms of communication.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I felt that. When everyone was moving to the same rhythm, it created this sense of unity I hadn't experienced before.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "That's exactly why I love creating these interactive experiences. Technology can help forge those connections, make them more accessible.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-festival-activities',
  },
  
  'summer-spoken-word-complete': {
    id: 'summer-spoken-word-complete',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'senara',
        text: "Interesting choices in your composition. The thematic coherence shows an intuitive understanding of linguistic patterns.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "It was challenging to maintain a consistent theme while also creating something that flowed naturally.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "That's the beauty of it. The constraints force creative solutions. Your mind adapted to find connections between seemingly disparate elements.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'summer-festival-activities',
  },
  
  'summer-whats-on-tap-complete': {
    id: 'summer-whats-on-tap-complete',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "You're a natural! Did you see how people opened up to you while you were serving them?",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "It was surprising how many conversations started just from a simple interaction over a drink order.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "That's the secret to networking - create a simple, comfortable exchange first. Everything builds from there. You just experienced the foundation of how I build connections.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'summer-festival-activities',
  },
};

export default summerFestivalMinigameResultsScenes;
