
import { CharacterId } from '@/types/game';

export interface ChibiImageData {
  id: CharacterId;
  image: string;
  neutralImage: string;
  description: string;
  width?: string;
}

// Define chibi images for each character
const characterChibis: Record<CharacterId, ChibiImageData> = {
  etta: {
    id: 'etta',
    image: '/assets/characters/etta-chibi.png',
    neutralImage: '/assets/characters/etta-chibi-neutral.png',
    description: 'Cute chibi representation of Etta',
    width: '100px'
  },
  maven: {
    id: 'maven',
    image: '/assets/characters/maven-chibi.png',
    neutralImage: '/assets/characters/maven-chibi-neutral.png',
    description: 'Cute chibi representation of Maven',
    width: '100px'
  },
  xavier: {
    id: 'xavier',
    image: '/assets/characters/xavier-chibi.png',
    neutralImage: '/assets/characters/xavier-chibi-neutral.png',
    description: 'Cute chibi representation of Xavier',
    width: '100px'
  },
  navarre: {
    id: 'navarre',
    image: '/assets/characters/navarre-chibi.png',
    neutralImage: '/assets/characters/navarre-chibi-neutral.png',
    description: 'Cute chibi representation of Navarre',
    width: '100px'
  },
  senara: {
    id: 'senara',
    image: '/assets/characters/senara-chibi.png',
    neutralImage: '/assets/characters/senara-chibi-neutral.png',
    description: 'Cute chibi representation of Senara',
    width: '100px'
  }
};

export default characterChibis;
