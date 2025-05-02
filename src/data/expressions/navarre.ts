
import { CharacterId } from '@/types/game';
import { CharacterExpressionSet, MoodType } from '@/types/expressions';

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
    image: '/assets/characters/navarre-happy.png',
    description: 'Navarre with a charming, winning smile'
  },
  sad: {
    characterId: 'navarre',
    mood: 'sad',
    image: '/assets/characters/navarre-sad.png',
    description: 'Navarre with a disappointed, slightly dramatic expression'
  },
  angry: {
    characterId: 'navarre',
    mood: 'angry',
    image: '/assets/characters/navarre-angry.png',
    description: 'Navarre with an indignant, passionate expression'
  },
  surprised: {
    characterId: 'navarre',
    mood: 'surprised',
    image: '/assets/characters/navarre-surprised.png',
    description: 'Navarre with wide eyes and an exaggerated shocked expression'
  },
  laughing: {
    characterId: 'navarre',
    mood: 'laughing',
    image: '/assets/characters/navarre-laughing.png',
    description: 'Navarre with a charismatic, infectious laugh'
  },
  shocked: {
    characterId: 'navarre',
    mood: 'shocked',
    image: '/assets/characters/navarre-shocked.png',
    description: 'Navarre with a theatrical expression of complete shock'
  },
  embarrassed: {
    characterId: 'navarre',
    mood: 'embarrassed',
    image: '/assets/characters/navarre-embarrassed.png',
    description: 'Navarre with rare vulnerability showing through a blush'
  }
};

export default navarreExpressions;
