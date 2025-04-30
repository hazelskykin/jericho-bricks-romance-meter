
interface BackgroundAsset {
  id: string;
  name: string;
  image: string;
  description: string;
  gradient: string;
}

const backgrounds: Record<string, BackgroundAsset> = {
  'cybaton-office': {
    id: 'cybaton-office',
    name: 'Cybaton Office',
    image: '/assets/backgrounds/cybaton-office.jpg',
    description: 'Modern tech infrastructure with retro-futuristic brass accents and digital displays mixed with analog gauges.',
    gradient: 'linear-gradient(to bottom, rgba(26, 31, 44, 0.7), rgba(42, 30, 78, 0.8))'
  },
  'cybaton-meeting-room': {
    id: 'cybaton-meeting-room',
    name: 'Cybaton Meeting Room',
    image: '/assets/backgrounds/cybaton-meeting-room.jpg',
    description: 'Formal setting with a large wooden table inlaid with tech interfaces and wall displays showing city metrics.',
    gradient: 'linear-gradient(to bottom, rgba(28, 32, 53, 0.7), rgba(44, 32, 69, 0.8))'
  },
  'cybaton-library': {
    id: 'cybaton-library',
    name: 'Cybaton Library',
    image: '/assets/backgrounds/cybaton-library.jpg',
    description: 'Physical books and scrolls alongside digital archives with wooden shelving and brass accents.',
    gradient: 'linear-gradient(to bottom, rgba(30, 33, 48, 0.7), rgba(48, 34, 90, 0.8))'
  },
  'cybaton-lab': {
    id: 'cybaton-lab',
    name: 'Cybaton Lab',
    image: '/assets/backgrounds/cybaton-lab.jpg',
    description: 'High-tech equipment with visible mechanical components and glass and brass containment units.',
    gradient: 'linear-gradient(to bottom, rgba(26, 37, 64, 0.7), rgba(42, 32, 96, 0.8))'
  },
  'cybaton-lobby': {
    id: 'cybaton-lobby',
    name: 'Cybaton Lobby',
    image: '/assets/backgrounds/cybaton-lobby.jpg',
    description: 'Grand entrance with a mix of modern architecture and traditional craftsmanship.',
    gradient: 'linear-gradient(to bottom, rgba(31, 34, 53, 0.7), rgba(47, 34, 69, 0.8))'
  },
  'city-cafe': {
    id: 'city-cafe',
    name: 'City Cafe',
    image: '/assets/backgrounds/city-cafe.jpg',
    description: 'Cozy interior with wooden furniture and subtle tech integration alongside traditional cooking methods.',
    gradient: 'linear-gradient(to bottom, rgba(37, 37, 37, 0.7), rgba(53, 41, 69, 0.8))'
  },
  'stonewich-cityscape': {
    id: 'stonewich-cityscape',
    name: 'Stonewich Cityscape',
    image: '/assets/backgrounds/stonewich-cityscape.jpg',
    description: 'Mixture of futuristic buildings and preserved historical architecture with modern transportation systems.',
    gradient: 'linear-gradient(to bottom, rgba(42, 42, 64, 0.7), rgba(74, 42, 80, 0.8))'
  },
};

export default backgrounds;
