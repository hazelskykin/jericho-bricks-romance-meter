
interface BackgroundAsset {
  id: string;
  name: string;
  image: string;
  description: string;
  gradient: string;
}

const backgrounds: Record<string, BackgroundAsset> = {
  'wall-tiles': {
    id: 'wall-tiles',
    name: 'Wall Tiles',
    image: '/assets/backgrounds/wall-tiles.png',
    description: 'Decorative wall tiles with geometric patterns and a subtle steampunk influence.',
    gradient: 'linear-gradient(to bottom, rgba(26, 31, 44, 0.2), rgba(42, 30, 78, 0.3))'
  },
  'cybaton-office': {
    id: 'cybaton-office',
    name: 'Cybaton Office',
    image: '/assets/backgrounds/cybaton-office.jpg',
    description: 'Modern tech infrastructure with retro-futuristic brass accents and digital displays mixed with analog gauges.',
    gradient: 'linear-gradient(to bottom, rgba(26, 31, 44, 0.1), rgba(42, 30, 78, 0.2))'
  },
  'cybaton-meeting-room': {
    id: 'cybaton-meeting-room',
    name: 'Cybaton Meeting Room',
    image: '/assets/backgrounds/cybaton-meeting-room.jpg',
    description: 'Formal setting with a large wooden table inlaid with tech interfaces and wall displays showing city metrics.',
    gradient: 'linear-gradient(to bottom, rgba(28, 32, 53, 0.1), rgba(44, 32, 69, 0.2))'
  },
  'cybaton-library': {
    id: 'cybaton-library',
    name: 'Cybaton Library',
    image: '/assets/backgrounds/cybaton-library.jpg',
    description: 'Physical books and scrolls alongside digital archives with wooden shelving and brass accents.',
    gradient: 'linear-gradient(to bottom, rgba(30, 33, 48, 0.1), rgba(48, 34, 90, 0.2))'
  },
  'cybaton-lab': {
    id: 'cybaton-lab',
    name: 'Cybaton Lab',
    image: '/assets/backgrounds/cybaton-lab.jpg',
    description: 'High-tech equipment with visible mechanical components and glass and brass containment units.',
    gradient: 'linear-gradient(to bottom, rgba(26, 37, 64, 0.1), rgba(42, 32, 96, 0.2))'
  },
  'cybaton-lobby': {
    id: 'cybaton-lobby',
    name: 'Cybaton Lobby',
    image: '/assets/backgrounds/cybaton-lobby.jpg',
    description: 'Grand entrance with a mix of modern architecture and traditional craftsmanship.',
    gradient: 'linear-gradient(to bottom, rgba(31, 34, 53, 0.1), rgba(47, 34, 69, 0.2))'
  },
  'city-cafe': {
    id: 'city-cafe',
    name: 'City Cafe',
    image: '/assets/backgrounds/city-cafe.jpg',
    description: 'Cozy interior with wooden furniture and subtle tech integration alongside traditional cooking methods.',
    gradient: 'linear-gradient(to bottom, rgba(37, 37, 37, 0.1), rgba(53, 41, 69, 0.2))'
  },
  'stonewich-cityscape': {
    id: 'stonewich-cityscape',
    name: 'Stonewich Cityscape',
    image: '/assets/backgrounds/stonewich-cityscape.jpg',
    description: 'Mixture of futuristic buildings and preserved historical architecture with modern transportation systems.',
    gradient: 'linear-gradient(to bottom, rgba(42, 42, 64, 0.1), rgba(74, 42, 80, 0.2))'
  },
  'stonewich-office': {
    id: 'stonewich-office',
    name: 'Stonewich Office',
    image: '/assets/backgrounds/stonewich-office.jpg',
    description: 'The team\'s primary workspace in Stonewich with a blend of modern amenities and local architectural elements.',
    gradient: 'linear-gradient(to bottom, rgba(35, 38, 56, 0.1), rgba(62, 48, 84, 0.2))'
  },
  'stonewich-workstation': {
    id: 'stonewich-workstation',
    name: 'Stonewich Workstation',
    image: '/assets/backgrounds/stonewich-workstation.jpg',
    description: 'A quieter corner of the Stonewich office, perfect for one-on-one discussions and focused work sessions.',
    gradient: 'linear-gradient(to bottom, rgba(32, 36, 52, 0.1), rgba(58, 42, 78, 0.2))'
  },
};

export default backgrounds;
