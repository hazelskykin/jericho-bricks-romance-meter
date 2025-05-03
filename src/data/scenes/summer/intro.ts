import { Scene } from '../../../types/game';

const summerIntroScenes: Record<string, Scene> = {
  'summer-intro': {
    id: 'summer-intro',
    background: 'summer-transition',
    dialogue: [
      {
        character: 'narrator',
        text: 'The heat of summer arrives in Stonewich, bringing with it the excitement of the Summer Songs & Sips Festival.',
      },
      {
        character: 'navarre',
        text: "Summer in Stonewich is magical! The social energy is absolutely perfect for networking and making connections.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The increased foot traffic and tourism during summer will be a good stress test for our systems.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "I've upgraded the cooling systems in all the public squares to keep everyone comfortable during the outdoor events.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The historical archives show the Summer Songs & Sips Festival began as a simple harvest blessing ceremony over two hundred years ago.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "After spring's success, I'm excited to see what we can accomplish this season.",
        mood: 'happy',
      },
    ],
    // This would typically point to a summer character selection or planning scene
    nextSceneId: 'summer-planning',
  },
};

export default summerIntroScenes;
