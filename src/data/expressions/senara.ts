
import { CharacterId } from '@/types/game';
import { CharacterExpressionSet } from '@/types/expressions';

const senaraExpressions: CharacterExpressionSet = {
  neutral: {
    characterId: 'senara',
    mood: 'neutral',
    image: '/assets/characters/senara-neutral.png',
    description: 'Senara with an analytical, thoughtful expression'
  },
  happy: {
    characterId: 'senara',
    mood: 'happy',
    image: '/assets/characters/senara-happy.jpeg',
    description: 'Senara with a subtle, genuine smile'
  },
  sad: {
    characterId: 'senara',
    mood: 'sad',
    image: '/assets/characters/senara-sad.jpeg',
    description: 'Senara with a pensive, melancholic expression'
  },
  angry: {
    characterId: 'senara',
    mood: 'angry',
    image: '/assets/characters/senara-angry.jpeg',
    description: 'Senara with a cold, precise expression of disapproval'
  },
  surprised: {
    characterId: 'senara',
    mood: 'surprised',
    image: '/assets/characters/senara-surprised.jpeg',
    description: 'Senara with raised eyebrows showing rare emotional reaction'
  },
  laughing: {
    characterId: 'senara',
    mood: 'laughing',
    image: '/assets/characters/senara-laughing.jpeg',
    description: 'Senara with a rare, unguarded moment of genuine laughter'
  },
  shocked: {
    characterId: 'senara',
    mood: 'shocked',
    image: '/assets/characters/senara-shocked.jpeg',
    description: 'Senara with wide-eyed intellectual astonishment'
  },
  embarrassed: {
    characterId: 'senara',
    mood: 'embarrassed',
    image: '/assets/characters/senara-embarrassed.jpeg',
    description: 'Senara with a subtle blush revealing hidden emotions'
  }
};

export default senaraExpressions;
