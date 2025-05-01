
import { CharacterId } from '@/types/game';
import { CharacterExpressionSet } from '@/types/expressions';

const navarreExpressions: CharacterExpressionSet = {
  neutral: {
    characterId: 'navarre',
    mood: 'neutral',
    image: '/assets/characters/navarre-neutral.png',
    description: 'Navarre with a confident, slightly flirtatious expression'
  },
  happy: {
    characterId: 'navarre',
    mood: 'happy',
    image: '/assets/characters/navarre-happy.jpeg',
    description: 'Navarre with a charming, winning smile'
  },
  sad: {
    characterId: 'navarre',
    mood: 'sad',
    image: '/assets/characters/navarre-sad.jpeg',
    description: 'Navarre with a disappointed, slightly dramatic expression'
  },
  angry: {
    characterId: 'navarre',
    mood: 'angry',
    image: '/assets/characters/navarre-angry.jpeg',
    description: 'Navarre with an indignant, passionate expression'
  },
  surprised: {
    characterId: 'navarre',
    mood: 'surprised',
    image: '/assets/characters/navarre-surprised.jpeg',
    description: 'Navarre with wide eyes and an exaggerated shocked expression'
  },
  laughing: {
    characterId: 'navarre',
    mood: 'laughing',
    image: '/assets/characters/navarre-laughing.jpeg',
    description: 'Navarre with a charismatic, infectious laugh'
  },
  shocked: {
    characterId: 'navarre',
    mood: 'shocked',
    image: '/assets/characters/navarre-shocked.jpeg',
    description: 'Navarre with a theatrical expression of complete shock'
  },
  embarrassed: {
    characterId: 'navarre',
    mood: 'embarrassed',
    image: '/assets/characters/navarre-embarassed.jpeg',
    description: 'Navarre with rare vulnerability showing through a blush'
  }
};

export default navarreExpressions;
