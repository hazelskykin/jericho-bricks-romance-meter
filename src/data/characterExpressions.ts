import { CharacterId } from '@/types/game';

export type MoodType = 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised';

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
      description: 'Maven with a downcast expression showing vulnerability'
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
      image: '/assets/characters/xavier-grinning.jpeg',
      description: 'Xavier with an enthusiastic, friendly smile'
    },
    sad: {
      characterId: 'xavier',
      mood: 'sad',
      image: '/assets/characters/xavier-crying.jpeg',
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
    }
  },
  etta: {
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
      image: '/assets/characters/senara-happy.png',
      description: 'Senara with a subtle, genuine smile'
    },
    sad: {
      characterId: 'senara',
      mood: 'sad',
      image: '/assets/characters/senara-sad.png',
      description: 'Senara with a pensive, melancholic expression'
    },
    angry: {
      characterId: 'senara',
      mood: 'angry',
      image: '/assets/characters/senara-angry.png',
      description: 'Senara with a cold, precise expression of disapproval'
    },
    surprised: {
      characterId: 'senara',
      mood: 'surprised',
      image: '/assets/characters/senara-surprised.png',
      description: 'Senara with raised eyebrows showing rare emotional reaction'
    }
  }
};

export default characterExpressions;
