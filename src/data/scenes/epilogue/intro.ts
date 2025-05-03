
import { Scene } from '@/types/game';

const introScenes: Record<string, Scene> = {
  'epilogue-intro': {
    id: 'epilogue-intro',
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'narrator',
        text: 'After a successful year working in Stonewich, your relationship with your chosen partner has deepened.'
      },
      {
        character: 'maven',
        text: "I've learned so much about myself and what I truly value.",
        mood: 'thoughtful'
      },
      {
        character: 'narrator',
        text: 'Your final evaluation has been completed and sent to Cybaton headquarters.'
      },
    ],
    nextSceneId: 'epilogue-reflection'
  },
  'epilogue-reflection': {
    id: 'epilogue-reflection',
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'narrator',
        text: 'As you reflect on your journey, you realize how much you\'ve grown alongside your partner.'
      },
      {
        character: 'maven',
        text: "It wasn't always easy, but together we've accomplished something meaningful.",
        mood: 'confident'
      }
    ],
    nextSceneId: 'epilogue-conclusion'
  }
};

export default introScenes;
