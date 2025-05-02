
import { CharacterId } from '@/types/game';
import { CharacterExpressionSet, MoodType } from '@/types/expressions';

const mavenExpressions: CharacterExpressionSet = {
  neutral: {
    characterId: 'maven',
    mood: 'neutral',
    image: '/assets/characters/maven-neutral.png',
    description: 'Maven with a thoughtful, slightly uncertain expression'
  },
  happy: {
    characterId: 'maven',
    mood: 'happy',
    image: '/assets/characters/maven-happy.png',
    description: 'Maven with a genuine, warm smile'
  },
  sad: {
    characterId: 'maven',
    mood: 'sad',
    image: '/assets/characters/maven-sad.png',
    description: 'Maven with downcast expression showing vulnerability'
  },
  angry: {
    characterId: 'maven',
    mood: 'angry',
    image: '/assets/characters/maven-angry.png',
    description: 'Maven with a frustrated, determined expression'
  },
  surprised: {
    characterId: 'maven',
    mood: 'surprised',
    image: '/assets/characters/maven-surprised.png',
    description: 'Maven with widened eyes showing genuine shock'
  },
  laughing: {
    characterId: 'maven',
    mood: 'laughing',
    image: '/assets/characters/maven-laughing.png',
    description: 'Maven with a hearty, uninhibited laugh showing joy'
  },
  shocked: {
    characterId: 'maven',
    mood: 'shocked',
    image: '/assets/characters/maven-shocked.png',
    description: 'Maven with a completely stunned expression'
  },
  embarrassed: {
    characterId: 'maven',
    mood: 'embarrassed',
    image: '/assets/characters/maven-embarrassed.png',
    description: 'Maven with a sheepish, slightly blushing expression'
  }
};

export default mavenExpressions;
