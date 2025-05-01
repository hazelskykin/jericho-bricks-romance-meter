
import { CharacterId } from '@/types/game';

export type MoodType = 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'laughing' | 'shocked' | 'embarrassed';

export interface CharacterExpression {
  characterId: CharacterId;
  mood: MoodType;
  image: string;
  description: string;
}

const characterExpressions: Record<CharacterId, Record<MoodType, CharacterExpression>> = {
  maven: {
    neutral: {
      characterId: 'maven',
      mood: 'neutral',
      image: '/assets/characters/maven-neutral.jpeg',
      description: 'Maven with a thoughtful, slightly uncertain expression'
    },
    happy: {
      characterId: 'maven',
      mood: 'happy',
      image: '/assets/characters/maven-happy.jpeg',
      description: 'Maven with a genuine, warm smile'
    },
    sad: {
      characterId: 'maven',
      mood: 'sad',
      image: '/assets/characters/maven-sad.jpeg',
      description: 'Maven with a downcast expression showing vulnerability'
    },
    angry: {
      characterId: 'maven',
      mood: 'angry',
      image: '/assets/characters/maven-angry.jpeg',
      description: 'Maven with a frustrated, determined expression'
    },
    surprised: {
      characterId: 'maven',
      mood: 'surprised',
      image: '/assets/characters/maven-surprised.jpeg',
      description: 'Maven with widened eyes showing genuine shock'
    },
    laughing: {
      characterId: 'maven',
      mood: 'laughing',
      image: '/assets/characters/maven-laughing.jpeg',
      description: 'Maven with a hearty, uninhibited laugh showing joy'
    },
    shocked: {
      characterId: 'maven',
      mood: 'shocked',
      image: '/assets/characters/maven-shocked.jpeg',
      description: 'Maven with a completely stunned expression'
    },
    embarrassed: {
      characterId: 'maven',
      mood: 'embarrassed',
      image: '/assets/characters/maven-embarrassed.jpeg',
      description: 'Maven with a sheepish, slightly blushing expression'
    }
  },
  xavier: {
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
  },
  navarre: {
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
  },
  etta: {
    neutral: {
      characterId: 'etta',
      mood: 'neutral',
      image: '/assets/characters/etta-neutral.jpeg',
      description: 'Etta with a composed, slightly calculating expression'
    },
    happy: {
      characterId: 'etta',
      mood: 'happy',
      image: '/assets/characters/etta-happy.jpeg',
      description: 'Etta with a satisfied, accomplished smile'
    },
    sad: {
      characterId: 'etta',
      mood: 'sad',
      image: '/assets/characters/etta-sad.jpeg',
      description: 'Etta with a controlled, disappointed expression'
    },
    angry: {
      characterId: 'etta',
      mood: 'angry',
      image: '/assets/characters/etta-angry.jpeg',
      description: 'Etta with a sharp, intense stare showing displeasure'
    },
    surprised: {
      characterId: 'etta',
      mood: 'surprised',
      image: '/assets/characters/etta-surprised.jpeg',
      description: 'Etta with slightly widened eyes showing rare genuine surprise'
    },
    laughing: {
      characterId: 'etta',
      mood: 'laughing',
      image: '/assets/characters/etta-laughing.jpeg',
      description: 'Etta with a confident, controlled laugh showing amusement'
    },
    shocked: {
      characterId: 'etta',
      mood: 'shocked',
      image: '/assets/characters/etta-shocked.jpeg',
      description: 'Etta with momentary loss of composure in complete surprise'
    },
    embarrassed: {
      characterId: 'etta',
      mood: 'embarrassed',
      image: '/assets/characters/etta-embarrassed.jpeg',
      description: 'Etta with a slightly flustered expression breaking her usual control'
    }
  },
  senara: {
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
  }
};

export default characterExpressions;
