
import { MinigameAsset } from '@/types/assets';

// Define minigame assets with proper types and working fallbacks
const minigameAssets: MinigameAsset[] = [
  // Spring - Bloom With a View - use lowercase 'w' in bloomwithAView
  {
    id: 'bloom-background',
    name: 'Bloom With a View Background',
    src: '/assets/minigames/spring/bloomwithAView/garden-background.jpg',
    description: 'Garden background for Bloom With a View',
    priority: true,
    category: 'background'
  },
  {
    id: 'bloom-objects',
    name: 'Bloom Hidden Objects',
    src: '/assets/minigames/spring/bloomwithAView/hidden-objects.png',
    description: 'Hidden objects for Bloom With a View',
    priority: true,
    category: 'item'
  },
  {
    id: 'bloom-tiles',
    name: 'Bloom Flower Tiles',
    src: '/assets/minigames/spring/bloomwithAView/flower-tiles.png',
    description: 'Flower tiles for Bloom With a View',
    priority: true,
    category: 'item'
  },
  
  // Spring - Mud Fling assets
  {
    id: 'mud-arena',
    name: 'Mud Fling Arena',
    src: '/assets/backgrounds/stonewich-cityscape.jpg', // Use a fallback that exists
    description: 'Background for mud fling arena',
    priority: false,
    category: 'background'
  },
  {
    id: 'mud-ball-sprites',
    name: 'Mud Ball Sprites',
    src: '/assets/backgrounds/stonewich-cityscape.jpg', // Using fallback
    description: 'Animation sprites for mud balls',
    priority: true,
    category: 'ui'
  },
  {
    id: 'mud-splash-sprites',
    name: 'Mud Splash Sprites',
    src: '/assets/backgrounds/stonewich-cityscape.jpg', // Using fallback
    description: 'Animation sprites for mud splash effects',
    category: 'effect'
  },
  {
    id: 'mud-victory',
    name: 'Mud Victory Splash',
    src: '/assets/backgrounds/stonewich-cityscape.jpg', // Using fallback
    description: 'Victory splash for mud fling game',
    category: 'ui'
  },
  
  // Spring - Brooms Away
  {
    id: 'broom-background',
    name: 'Brooms Away Background',
    src: '/assets/backgrounds/stonewich-cityscape.jpg', // Using fallback
    description: 'Grid background for Brooms Away',
    priority: true,
    category: 'background'
  },
  {
    id: 'broom-drone',
    name: 'Broom Drone',
    src: '/assets/backgrounds/stonewich-cityscape.jpg', // Using fallback
    description: 'Drone for Brooms Away',
    category: 'character'
  },
  {
    id: 'broom-drone-sprites',
    name: 'Broom Drone Sprites',
    src: '/assets/backgrounds/stonewich-cityscape.jpg', // Using fallback
    description: 'Sprite sheet for broom drone',
    category: 'character'
  },
  {
    id: 'broom-trash',
    name: 'Broom Trash Items',
    src: '/assets/backgrounds/stonewich-cityscape.jpg', // Using fallback
    description: 'Trash items for Brooms Away',
    category: 'item'
  },
  {
    id: 'broom-ui',
    name: 'Brooms Away UI',
    src: '/assets/backgrounds/stonewich-cityscape.jpg', // Using fallback
    description: 'UI elements for Brooms Away',
    category: 'ui'
  },
  
  // Fallback asset
  {
    id: 'fallback-asset',
    name: 'Fallback Asset',
    src: '/assets/backgrounds/stonewich-cityscape.jpg',
    description: 'Fallback asset for all minigames',
    priority: true,
    category: 'background'
  }
];

export default minigameAssets;
