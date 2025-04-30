
import { Character } from '../types/game';

export const characters: Record<string, Character> = {
  xavier: {
    id: 'xavier',
    name: 'Xavier',
    role: 'Support & Enabler',
    description: 'The emotional and technological bedrock of the team.',
    affection: 0,
    avatar: '/assets/characters/xavier-placeholder.jpg',
    color: '#87CEEB',
    temperament: 'Supportive, Tech-savvy, Empathetic',
  },
  navarre: {
    id: 'navarre',
    name: 'Navarre',
    role: 'Influencer',
    description: 'A natural networker with a flirtatious and persuasive style.',
    affection: 0,
    avatar: '/assets/characters/navarre-placeholder.jpg',
    color: '#FFB347',
    temperament: 'Charismatic, Persuasive, Gregarious',
  },
  etta: {
    id: 'etta',
    name: 'Etta',
    role: 'Dominator',
    description: 'Confident to the point of arrogance, with a narrow focus on goals.',
    affection: 0,
    avatar: '/assets/characters/etta-placeholder.jpg',
    color: '#FF5E5B',
    temperament: 'Ambitious, Assertive, Results-oriented',
  },
  senara: {
    id: 'senara',
    name: 'Senara',
    role: 'Competence Expert',
    description: 'The enigmatic intellectual, standoffish but trusted for integrity.',
    affection: 0,
    avatar: '/assets/characters/senara-placeholder.jpg',
    color: '#9C89FF',
    temperament: 'Intellectual, Analytical, Reserved',
  },
};

// Define Maven as a constant with the correct CharacterId type
export const maven: Character = {
  id: 'maven',
  name: 'Maven',
  role: 'X Factor',
  description: 'Uncertain of her strengths, dealing with imposter syndrome.',
  affection: 0,
  avatar: '/assets/characters/maven-placeholder.jpg',
  color: '#0D98BA',
  temperament: 'Adaptive, Uncertain, Perceptive',
};

export default characters;
