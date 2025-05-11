
import { MinigameAsset } from '@/types/assets';

// Define minigame assets with proper types
const minigameAssets: MinigameAsset[] = [
  // Spring - Mud Fling
  {
    id: 'mud-arena',
    name: 'Mud Fling Arena',
    src: '/assets/backgrounds/stonewich-cityscape.jpg', // Use a fallback that exists
    description: 'Background for mud fling arena',
    priority: true,
    category: 'background'
  },
  {
    id: 'mud-ball-sprites',
    name: 'Mud Ball Sprites',
    src: '/assets/minigames/spring/mudFling/mudballSprites.png',
    description: 'Animation sprites for mud balls',
    priority: true,
    category: 'ui'
  },
  {
    id: 'mud-splash-sprites',
    name: 'Mud Splash Sprites',
    src: '/assets/minigames/spring/mudFling/mudballSplashSprites.png',
    description: 'Animation sprites for mud splash effects',
    category: 'effect'
  },
  {
    id: 'mud-victory',
    name: 'Mud Victory Splash',
    src: '/assets/minigames/spring/mudFling/splashVictory.png',
    description: 'Victory splash for mud fling game',
    category: 'ui'
  },
  
  // Spring - Brooms Away
  {
    id: 'broom-background',
    name: 'Brooms Away Background',
    src: '/assets/minigames/spring/broomsAway/grid-background.png',
    description: 'Grid background for Brooms Away',
    priority: true,
    category: 'background'
  },
  {
    id: 'broom-drone',
    name: 'Broom Drone',
    src: '/assets/minigames/spring/broomsAway/broom-drone.png',
    description: 'Drone for Brooms Away',
    category: 'character'
  },
  {
    id: 'broom-drone-sprites',
    name: 'Broom Drone Sprites',
    src: '/assets/minigames/spring/broomsAway/dronesprites.png',
    description: 'Sprite sheet for broom drone',
    category: 'character'
  },
  {
    id: 'broom-trash',
    name: 'Broom Trash Items',
    src: '/assets/minigames/spring/broomsAway/trash-items.png',
    description: 'Trash items for Brooms Away',
    category: 'item'
  },
  {
    id: 'broom-ui',
    name: 'Brooms Away UI',
    src: '/assets/minigames/spring/broomsAway/uiElements.png',
    description: 'UI elements for Brooms Away',
    category: 'ui'
  },
  
  // Spring - Bloom With a View
  {
    id: 'bloom-background',
    name: 'Bloom With a View Background',
    src: '/assets/backgrounds/stonewich-cityscape.jpg', // Use a fallback that exists
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
    src: '/assets/minigames/spring/bloomWithAView/hidden_objects_sprites.png',
    description: 'Hidden objects for Bloom With a View',
    category: 'item'
  },
  
  // Summer - Serenade
  {
    id: 'serenade-background',
    name: 'Serenade Background',
    src: '/assets/minigames/summer/serenade/stage-background.png',
    description: 'Stage background for Serenade',
    category: 'background'
  },
  {
    id: 'serenade-notes',
    name: 'Serenade Music Notes',
    src: '/assets/minigames/summer/serenade/music-notes.png',
    description: 'Music notes for Serenade',
    category: 'item'
  },
  {
    id: 'serenade-markers',
    name: 'Serenade Hit Markers',
    src: '/assets/minigames/summer/serenade/hit-markers.png',
    description: 'Hit markers for Serenade',
    category: 'ui'
  },
  
  // Summer - Spoken Word
  {
    id: 'spoken-word-background',
    name: 'Spoken Word Background',
    src: '/assets/minigames/summer/spokenWord/paper-background.png',
    description: 'Paper background for Spoken Word',
    category: 'background'
  },
  {
    id: 'spoken-word-mastery',
    name: 'Spoken Word Mastery Icons',
    src: '/assets/minigames/summer/spokenWord/mastery-icons.png',
    description: 'Mastery icons for Spoken Word',
    category: 'ui'
  },
  {
    id: 'spoken-word-theme',
    name: 'Spoken Word Theme Icons',
    src: '/assets/minigames/summer/spokenWord/theme-icons.png',
    description: 'Theme icons for Spoken Word',
    category: 'ui'
  },
  
  // Summer - What's On Tap
  {
    id: 'on-tap-background',
    name: 'What\'s On Tap Background',
    src: '/assets/minigames/summer/whatsOnTap/bar-background.png',
    description: 'Bar background for What\'s On Tap',
    category: 'background'
  },
  {
    id: 'on-tap-taps',
    name: 'What\'s On Tap Beverage Taps',
    src: '/assets/minigames/summer/whatsOnTap/beverage-taps.png',
    description: 'Beverage taps for What\'s On Tap',
    category: 'item'
  },
  {
    id: 'on-tap-glasses',
    name: 'What\'s On Tap Glasses',
    src: '/assets/minigames/summer/whatsOnTap/glasses.png',
    description: 'Glasses for What\'s On Tap',
    category: 'item'
  },
  {
    id: 'on-tap-ingredients',
    name: 'What\'s On Tap Ingredients',
    src: '/assets/minigames/summer/whatsOnTap/ingredients.png',
    description: 'Ingredients for What\'s On Tap',
    category: 'item'
  },
  
  // Add more assets as needed for autumn and winter minigames
  {
    id: 'tour-guide-map',
    name: 'Tour Guide Map',
    src: '/assets/minigames/autumn/tourGuide/city-map.png',
    description: 'City map for Tour Guide',
    category: 'background'
  },
  {
    id: 'tour-guide-icons',
    name: 'Tour Guide Location Icons',
    src: '/assets/minigames/autumn/tourGuide/location-icons.png',
    description: 'Location icons for Tour Guide',
    category: 'ui'
  }
];

export default minigameAssets;
