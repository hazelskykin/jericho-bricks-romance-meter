
import { CharacterId } from '@/types/game';
import { CharacterExpressionSet, MoodType } from '@/types/expressions';

const ettaExpressions: CharacterExpressionSet = {
  neutral: {
    characterId: 'etta',
    mood: 'neutral',
    image: '/assets/characters/etta-neutral.png',
    description: 'Etta with a composed, slightly calculating expression'
  },
  happy: {
    characterId: 'etta',
    mood: 'happy',
    image: '/assets/characters/etta-happy.png',
    description: 'Etta with a satisfied, accomplished smile'
  },
  sad: {
    characterId: 'etta',
    mood: 'sad',
    image: '/assets/characters/etta-sad.png',
    description: 'Etta with a controlled, disappointed expression'
  },
  angry: {
    characterId: 'etta',
    mood: 'angry',
    image: '/assets/characters/etta-angry.png',
    description: 'Etta with a sharp, intense stare showing displeasure'
  },
  surprised: {
    characterId: 'etta',
    mood: 'surprised',
    image: '/assets/characters/etta-surprised.png',
    description: 'Etta with slightly widened eyes showing rare genuine surprise'
  },
  laughing: {
    characterId: 'etta',
    mood: 'laughing',
    image: '/assets/characters/etta-laughing.png',
    description: 'Etta with a confident, controlled laugh showing amusement'
  },
  shocked: {
    characterId: 'etta',
    mood: 'shocked',
    image: '/assets/characters/etta-shocked.png',
    description: 'Etta with momentary loss of composure in complete surprise'
  },
  embarrassed: {
    characterId: 'etta',
    mood: 'embarrassed',
    image: '/assets/characters/etta-embarrassed.png',
    description: 'Etta with a slightly flustered expression breaking her usual control'
  }
};

export default ettaExpressions;
