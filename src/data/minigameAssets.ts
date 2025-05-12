import { MinigameAsset } from '@/types/assets';

// Define minigame assets with proper types and working fallbacks
const minigameAssets: MinigameAsset[] = [
  // Spring - Bloom With a View - both paths with uppercase and lowercase 'w'
  {
    id: 'bloom-background-1',
    name: 'Bloom With a View Background (Path 1)',
    src: '/assets/minigames/spring/bloomWithAView/garden-background.png',
    description: 'Garden background for Bloom With a View',
    priority: true,
    category: 'background'
  },
  {
    id: 'bloom-background-2',
    name: 'Bloom With a View Background (Path 2)',
    src: '/assets/minigames/spring/bloomwithAView/garden-background.png',
    description: 'Garden background for Bloom With a View',
    priority: true,
    category: 'background'
  },
  {
    id: 'bloom-background-3',
    name: 'Bloom With a View Background JPG (Path 1)',
    src: '/assets/minigames/spring/bloomWithAView/garden-background.jpg',
    description: 'Garden background JPG for Bloom With a View',
    priority: true,
    category: 'background'
  },
  {
    id: 'bloom-background-4',
    name: 'Bloom With a View Background JPG (Path 2)',
    src: '/assets/minigames/spring/bloomwithAView/garden-background.jpg',
    description: 'Garden background JPG for Bloom With a View',
    priority: true,
    category: 'background'
  },
  {
    id: 'bloom-objects-1',
    name: 'Bloom Hidden Objects (Path 1)',
    src: '/assets/minigames/spring/bloomWithAView/hidden-objects.png',
    description: 'Hidden objects for Bloom With a View',
    priority: true,
    category: 'item'
  },
  {
    id: 'bloom-objects-2',
    name: 'Bloom Hidden Objects (Path 2)',
    src: '/assets/minigames/spring/bloomwithAView/hidden-objects.png',
    description: 'Hidden objects for Bloom With a View',
    priority: true,
    category: 'item'
  },
  {
    id: 'bloom-objects-3',
    name: 'Bloom Hidden Objects (Path 3)',
    src: '/assets/minigames/spring/bloomwithAView/hidden_objects_sprites.png',
    description: 'Hidden objects sprites for Bloom With a View',
    priority: true,
    category: 'item'
  },
  {
    id: 'bloom-tiles-1',
    name: 'Bloom Flower Tiles (Path 1)',
    src: '/assets/minigames/spring/bloomWithAView/flower-tiles.png',
    description: 'Flower tiles for Bloom With a View',
    priority: true,
    category: 'item'
  },
  {
    id: 'bloom-tiles-2',
    name: 'Bloom Flower Tiles (Path 2)',
    src: '/assets/minigames/spring/bloomwithAView/flower-tiles.png',
    description: 'Flower tiles for Bloom With a View',
    priority: true,
    category: 'item'
  },
  
  // Try from minigrames (typo in folder name)
  {
    id: 'bloom-background-minigrames',
    name: 'Bloom With a View Background (Minigrames)',
    src: '/assets/minigrames/spring/bloomwithAView/garden-background.png',
    description: 'Garden background from minigrames folder',
    priority: true,
    category: 'background'
  },
  {
    id: 'bloom-objects-minigrames',
    name: 'Bloom Hidden Objects (Minigrames)',
    src: '/assets/minigrames/spring/bloomwithAView/hidden_objects_sprites.png',
    description: 'Hidden objects from minigrames folder',
    priority: true,
    category: 'item'
  },
  {
    id: 'bloom-tiles-minigrames',
    name: 'Bloom Flower Tiles (Minigrames)',
    src: '/assets/minigrames/spring/bloomwithAView/flower-tiles.png',
    description: 'Flower tiles from minigrames folder',
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
  
  // Spring - Bloom With a View
  {
    id: 'bloom-background',
    name: 'Bloom With a View Background',
    src: '/assets/minigames/spring/bloomWithAView/garden-background.png',
    description: 'Garden background for Bloom With a View',
    priority: true,
    category: 'background'
  },
  {
    id: 'bloom-tiles',
    name: 'Bloom Flower Tiles',
    src: '/assets/minigames/spring/bloomWithAView/flower-tiles.png',
    description: 'Flower tiles for Bloom With a View',
    category: 'item'
  },
  {
    id: 'bloom-hidden-objects',
    name: 'Bloom Hidden Objects',
    src: '/assets/minigames/spring/bloomWithAView/hidden-objects.png',
    description: 'Hidden objects for Bloom With a View',
    category: 'item'
  },
  
  // All other minigame assets use the same fallback
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
