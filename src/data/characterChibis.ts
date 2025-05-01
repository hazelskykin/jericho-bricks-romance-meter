
import { CharacterId } from '@/types/game';

export interface ChibiImageData {
  id: CharacterId;
  image: string;
  description: string;
}

// Define chibi images for each character
const characterChibis: Record<CharacterId, ChibiImageData> = {
  etta: {
    id: 'etta',
    image: '/assets/characters/etta-chibi.jpeg',
    description: 'Cute chibi representation of Etta'
  },
  // Placeholder entries for other characters - to be updated when assets are available
  maven: {
    id: 'maven',
    image: '',  // To be added when available
    description: 'Cute chibi representation of Maven'
  },
  xavier: {
    id: 'xavier',
    image: '',  // To be added when available
    description: 'Cute chibi representation of Xavier'
  },
  navarre: {
    id: 'navarre',
    image: '',  // To be added when available
    description: 'Cute chibi representation of Navarre'
  },
  senara: {
    id: 'senara',
    image: '',  // To be added when available
    description: 'Cute chibi representation of Senara'
  }
};

export default characterChibis;
