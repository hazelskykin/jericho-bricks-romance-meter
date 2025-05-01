
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
  maven: {
    id: 'maven',
    image: '/assets/characters/maven-chibi.jpeg',  // Updated with available image
    description: 'Cute chibi representation of Maven'
  },
  xavier: {
    id: 'xavier',
    image: '/assets/characters/xavier-chibi.png',  // Updated with available image
    description: 'Cute chibi representation of Xavier'
  },
  navarre: {
    id: 'navarre',
    image: '/assets/characters/navarre-chibi.png',  // Updated with available image
    description: 'Cute chibi representation of Navarre'
  },
  senara: {
    id: 'senara',
    image: '/assets/characters/senara-chibi.png',  // Updated with available image
    description: 'Cute chibi representation of Senara'
  }
};

export default characterChibis;
