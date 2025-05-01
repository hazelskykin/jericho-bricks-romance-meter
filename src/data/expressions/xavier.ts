
import { CharacterId } from '@/types/game';
import { CharacterExpressionSet } from '@/types/expressions';

const xavierExpressions: CharacterExpressionSet = {
  neutral: {
    characterId: 'xavier',
    mood: 'neutral',
    image: '/assets/characters/xavier-neutral.jpeg',
    description: 'Xavier with a calm, reliable expression'
  },
  happy: {
    characterId: 'xavier',
    mood: 'happy',
    image: '/assets/characters/xavier-happy.jpeg',
    description: 'Xavier with an enthusiastic, friendly smile'
  },
  sad: {
    characterId: 'xavier',
    mood: 'sad',
    image: '/assets/characters/xavier-sad.jpeg',
    description: 'Xavier with a concerned, empathetic expression'
  },
  angry: {
    characterId: 'xavier',
    mood: 'angry',
    image: '/assets/characters/xavier-angry.jpeg',
    description: 'Xavier with a furrowed brow showing frustration'
  },
  surprised: {
    characterId: 'xavier',
    mood: 'surprised',
    image: '/assets/characters/xavier-surprised.jpeg',
    description: 'Xavier with raised eyebrows and a shocked expression'
  },
  laughing: {
    characterId: 'xavier',
    mood: 'laughing',
    image: '/assets/characters/xavier-laughing.jpeg',
    description: 'Xavier with a warm, supportive laugh'
  },
  shocked: {
    characterId: 'xavier',
    mood: 'shocked',
    image: '/assets/characters/xavier-shocked.jpeg',
    description: 'Xavier with wide eyes and mouth showing complete surprise'
  },
  embarrassed: {
    characterId: 'xavier',
    mood: 'embarrassed',
    image: '/assets/characters/xavier-embarrassed.jpeg',
    description: 'Xavier with a self-conscious expression and slight blush'
  }
};

export default xavierExpressions;
