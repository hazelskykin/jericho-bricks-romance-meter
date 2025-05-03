
import { CharacterId } from '@/types/game';
import { CharacterExpressionSet, MoodType } from '@/types/expressions';

const xavierExpressions: CharacterExpressionSet = {
  neutral: {
    characterId: 'xavier',
    mood: 'neutral',
    image: '/assets/characters/xavier-neutral.png',
    description: 'Xavier with a calm, reliable expression'
  },
  happy: {
    characterId: 'xavier',
    mood: 'happy',
    image: '/assets/characters/xavier-happy.png',
    description: 'Xavier with an enthusiastic, friendly smile'
  },
  sad: {
    characterId: 'xavier',
    mood: 'sad',
    image: '/assets/characters/xavier-sad.png',
    description: 'Xavier with a concerned, empathetic expression'
  },
  angry: {
    characterId: 'xavier',
    mood: 'angry',
    image: '/assets/characters/xavier-angry.png',
    description: 'Xavier with a furrowed brow showing frustration'
  },
  surprised: {
    characterId: 'xavier',
    mood: 'surprised',
    image: '/assets/characters/xavier-surprised.png',
    description: 'Xavier with raised eyebrows and a shocked expression'
  },
  laughing: {
    characterId: 'xavier',
    mood: 'laughing',
    image: '/assets/characters/xavier-laughing.png',
    description: 'Xavier with a warm, supportive laugh'
  },
  shocked: {
    characterId: 'xavier',
    mood: 'shocked',
    image: '/assets/characters/xavier-shocked.png',
    description: 'Xavier with wide eyes and mouth showing complete surprise'
  },
  embarrassed: {
    characterId: 'xavier',
    mood: 'embarrassed',
    image: '/assets/characters/xavier-embarrassed.png',
    description: 'Xavier with a self-conscious expression and slight blush'
  },
  confident: {
    characterId: 'xavier',
    mood: 'confident',
    image: '/assets/characters/xavier-happy.png', // Reusing happy as fallback
    description: 'Xavier with a self-assured, knowledgeable expression'
  },
  thoughtful: {
    characterId: 'xavier',
    mood: 'thoughtful',
    image: '/assets/characters/xavier-neutral.png', // Reusing neutral as fallback
    description: 'Xavier with a contemplative, problem-solving expression'
  }
};

export default xavierExpressions;
