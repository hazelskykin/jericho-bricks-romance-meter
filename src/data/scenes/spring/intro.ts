
import { Scene } from '../../../types/game';

const springIntroScenes: Record<string, Scene> = {
  // Spring season transition scene
  'spring-intro': {
    id: 'spring-intro',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: 'As the weather warms, Stonewich prepares for the Spring Blooms & Brooms Festival, a time of renewal and community beautification efforts.',
      },
      {
        character: 'xavier',
        text: "Spring is one of my favorite times in Stonewich. Everyone comes together to clean up after winter and prepare the city for summer.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "It's an excellent opportunity to demonstrate the effectiveness of our Cybaton systems while engaging the public.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I'm looking forward to experiencing my first festival here.",
        mood: 'happy',
      },
    ],
    nextSceneId: 'spring-character-selection',
  },
};

export default springIntroScenes;
