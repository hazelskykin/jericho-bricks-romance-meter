
import { Character } from '../types/game';

export const characters: Record<string, Character> = {
  xavier: {
    id: 'xavier',
    name: 'Xavier',
    lastname: 'Chen',
    role: 'Solvitor',
    description: 'The engineering and technological bedrock of the team.',
    affection: 0,
    avatar: '/assets/characters/xavier-neutral.png',
    color: '#4CC2FF',
    temperament: 'Supportive, Tech-savvy, Empathetic',
  },
  navarre: {
    id: 'navarre',
    name: 'Navarre',
    lastname: 'Ellis',
    role: 'Bellfox',
    description: 'A natural networker with a flirtatious and persuasive style.',
    affection: 0,
    avatar: '/assets/characters/navarre-neutral.png',
    color: '#FFB347',
    temperament: 'Charismatic, Persuasive, Gregarious',
  },
  etta: {
    id: 'etta',
    name: 'Etta',
    lastname: 'Montgomery',
    role: 'Diva',
    description: 'Confident to the point of arrogance, with a narrow focus on goals.',
    affection: 0,
    avatar: '/assets/characters/etta-neutral.png',
    color: '#FF5E5B',
    temperament: 'Ambitious, Assertive, Results-oriented',
  },
  senara: {
    id: 'senara',
    name: 'Senara',
    lastname: 'Kapoor',
    role: 'Gnarus',
    description: 'The enigmatic intellectual, a philosopher that bridges knowledge with inquiry.',
    affection: 0,
    avatar: '/assets/characters/senara-neutral.png',
    color: '#9C89FF',
    temperament: 'Intellectual, Reserved, Curious',
  },
};

// Define Maven as a constant with the correct CharacterId type
export const maven: Character = {
  id: 'maven',
  name: 'Maven',
  lastname: 'Gray',
  role: 'Versa',
  description: 'Uncertain of her strengths, dealing with imposter syndrome.',
  affection: 0,
  avatar: '/assets/characters/maven-neutral.png',
  color: '#0D98BA',
  temperament: 'Adaptive, Uncertain, Perceptive',
};

export default characters;
