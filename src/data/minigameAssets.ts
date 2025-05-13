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
    id: 'hidden-objects-wateringcan',
    name: 'Watering Can',
    src: '/assets/minigames/spring/bloomwithAView/hidden-objects-wateringcan.png',
    description: 'Watering can hidden object',
    priority: true,
    category: 'item'
  },
  {
    id: 'hidden-objects-gloves',
    name: 'Gardening Gloves',
    src: '/assets/minigames/spring/bloomwithAView/hidden-objects-gloves.png',
    description: 'Gardening gloves hidden object',
    priority: true,
    category: 'item'
  },
  {
    id: 'hidden-objects-beedrone',
    name: 'Bee Drone',
    src: '/assets/minigames/spring/bloomwithAView/hidden-objects-beedrone.png',
    description: 'Bee drone hidden object',
    priority: true,
    category: 'item'
  },
  {
    id: 'hidden-objects-seedpacket',
    name: 'Seed Packet',
    src: '/assets/minigames/spring/bloomwithAView/hidden-objects-seedpacket.png',
    description: 'Seed packet hidden object',
    priority: true,
    category: 'item'
  },
  {
    id: 'hidden-objects-butterfly',
    name: 'Butterfly',
    src: '/assets/minigames/spring/bloomwithAView/hidden-objects-butterfly.png',
    description: 'Butterfly hidden object',
    priority: true,
    category: 'item'
  },
  {
    id: 'flower-tiles',
    name: 'Flower Tiles',
    src: '/assets/minigames/spring/bloomwithAView/flower-tiles.png',
    description: 'Flower tiles for Bloom With a View',
    priority: false,
    category: 'item'
  },
  
  // Individual flower tiles
  {
    id: 'flower-tiles-1',
    name: 'Flower Tile 1',
    src: '/assets/minigames/spring/bloomwithAView/flower-tiles-1.png',
    description: 'Individual flower tile 1',
    priority: true,
    category: 'item'
  },
  {
    id: 'flower-tiles-2',
    name: 'Flower Tile 2',
    src: '/assets/minigames/spring/bloomwithAView/flower-tiles-2.png',
    description: 'Individual flower tile 2',
    priority: true,
    category: 'item'
  },
  {
    id: 'flower-tiles-3',
    name: 'Flower Tile 3',
    src: '/assets/minigames/spring/bloomwithAView/flower-tiles-3.png',
    description: 'Individual flower tile 3',
    priority: true,
    category: 'item'
  },
  {
    id: 'flower-tiles-4',
    name: 'Flower Tile 4',
    src: '/assets/minigames/spring/bloomwithAView/flower-tiles-4.png',
    description: 'Individual flower tile 4',
    priority: true,
    category: 'item'
  },
  {
    id: 'flower-tiles-5',
    name: 'Flower Tile 5',
    src: '/assets/minigames/spring/bloomwithAView/flower-tiles-5.png',
    description: 'Individual flower tile 5',
    priority: true,
    category: 'item'
  },
  {
    id: 'flower-tiles-6',
    name: 'Flower Tile 6',
    src: '/assets/minigames/spring/bloomwithAView/flower-tiles-6.png',
    description: 'Individual flower tile 6',
    priority: true,
    category: 'item'
  },
  {
    id: 'flower-tiles-7',
    name: 'Flower Tile 7',
    src: '/assets/minigames/spring/bloomwithAView/flower-tiles-7.png',
    description: 'Individual flower tile 7',
    priority: true,
    category: 'item'
  },
  {
    id: 'flower-tiles-8',
    name: 'Flower Tile 8',
    src: '/assets/minigames/spring/bloomwithAView/flower-tiles-8.png',
    description: 'Individual flower tile 8',
    priority: true,
    category: 'item'
  },
  
  // Winter - Looking Signs assets
  {
    id: 'signs-background',
    name: 'Looking Signs Background',
    src: '/assets/minigames/winter/lookingSigns/signs-background.png',
    description: 'Background for Looking Signs minigame',
    priority: true,
    category: 'background'
  },
  // Good luck signs
  {
    id: 'sign-clues-coin',
    name: 'Coin Sign',
    src: '/assets/minigames/winter/lookingSigns/sign-clues-coin.png',
    description: 'Good luck coin sign',
    priority: true,
    category: 'item'
  },
  {
    id: 'sign-clues-bird',
    name: 'Bird Sign',
    src: '/assets/minigames/winter/lookingSigns/sign-clues-bird.png',
    description: 'Good luck bird sign',
    priority: true,
    category: 'item'
  },
  {
    id: 'sign-clues-heartcharm',
    name: 'Heart Charm Sign',
    src: '/assets/minigames/winter/lookingSigns/sign-clues-heartcharm.png',
    description: 'Good luck heart charm sign',
    priority: true,
    category: 'item'
  },
  // Bad luck signs
  {
    id: 'sign-clues-brokenclock',
    name: 'Broken Clock Sign',
    src: '/assets/minigames/winter/lookingSigns/sign-clues-brokenclock.png',
    description: 'Bad luck broken clock sign',
    priority: true,
    category: 'item'
  },
  {
    id: 'sign-clues-blackcat',
    name: 'Black Cat Sign',
    src: '/assets/minigames/winter/lookingSigns/sign-clues-blackcat.png',
    description: 'Bad luck black cat sign',
    priority: true,
    category: 'item'
  },
  {
    id: 'sign-clues-evileye',
    name: 'Evil Eye Sign',
    src: '/assets/minigames/winter/lookingSigns/sign-clues-evileye.png',
    description: 'Bad luck evil eye sign',
    priority: true,
    category: 'item'
  },
  
  // Summer - Spoken Word assets
  {
    id: 'paper-background',
    name: 'Paper Background',
    src: '/assets/minigames/summer/spokenWord/paper-background.png',
    description: 'Paper background for Spoken Word',
    priority: true,
    category: 'background'
  },
  // Theme icons
  {
    id: 'theme-icons-nature',
    name: 'Nature Theme Icon',
    src: '/assets/minigames/summer/spokenWord/theme-icons-nature.png',
    description: 'Nature theme icon',
    priority: true,
    category: 'ui'
  },
  {
    id: 'theme-icons-human',
    name: 'Human Connection Theme Icon',
    src: '/assets/minigames/summer/spokenWord/theme-icons-human.png',
    description: 'Human connection theme icon',
    priority: true,
    category: 'ui'
  },
  {
    id: 'theme-icons-technology',
    name: 'Technology Theme Icon',
    src: '/assets/minigames/summer/spokenWord/theme-icons-technology.png',
    description: 'Technology theme icon',
    priority: true,
    category: 'ui'
  },
  {
    id: 'theme-icons-mysticism',
    name: 'Mysticism Theme Icon',
    src: '/assets/minigames/summer/spokenWord/theme-icons-mysticism.png',
    description: 'Mysticism theme icon',
    priority: true,
    category: 'ui'
  },
  // Mastery icons
  {
    id: 'mastery-icons-laureate',
    name: 'Laureate Mastery Icon',
    src: '/assets/minigames/summer/spokenWord/mastery-icons-laureate.png',
    description: 'Laureate mastery rank icon',
    priority: true,
    category: 'ui'
  },
  {
    id: 'mastery-icons-lyricist',
    name: 'Lyricist Mastery Icon',
    src: '/assets/minigames/summer/spokenWord/mastery-icons-lyricist.png',
    description: 'Lyricist mastery rank icon',
    priority: true,
    category: 'ui'
  },
  {
    id: 'mastery-icons-wordsmith',
    name: 'Wordsmith Mastery Icon',
    src: '/assets/minigames/summer/spokenWord/mastery-icons-wordsmith.png',
    description: 'Wordsmith mastery rank icon',
    priority: true,
    category: 'ui'
  },
  {
    id: 'mastery-icons-acolyte',
    name: 'Acolyte Mastery Icon',
    src: '/assets/minigames/summer/spokenWord/mastery-icons-acolyte.png',
    description: 'Acolyte mastery rank icon',
    priority: true,
    category: 'ui'
  },
  
  // Autumn - Crafter assets
  {
    id: 'crafter-workshop-background',
    name: 'Crafter Workshop Background',
    src: '/assets/minigames/autumn/crafter/workshop-background.png',
    description: 'Workshop background for Crafter minigame',
    priority: true,
    category: 'background'
  },
  {
    id: 'crafter-fabric-base',
    name: 'Fabric Base',
    src: '/assets/minigames/autumn/crafter/fabricBase.png',
    description: 'Fabric base material',
    priority: true,
    category: 'item'
  },
  {
    id: 'crafter-metal-base',
    name: 'Metal Base',
    src: '/assets/minigames/autumn/crafter/metalBase.png',
    description: 'Metal base material',
    priority: true,
    category: 'item'
  },
  {
    id: 'crafter-wood-base',
    name: 'Wood Base',
    src: '/assets/minigames/autumn/crafter/woodBase.png',
    description: 'Wood base material',
    priority: true,
    category: 'item'
  },
  // Accent items
  {
    id: 'crafter-accent-leaf',
    name: 'Leaf Accent',
    src: '/assets/minigames/autumn/crafter/accents-leaf.png',
    description: 'Autumn leaf accent',
    priority: true,
    category: 'item'
  },
  {
    id: 'crafter-accent-button',
    name: 'Button Accent',
    src: '/assets/minigames/autumn/crafter/accents-button.png',
    description: 'Button accent',
    priority: true,
    category: 'item'
  },
  {
    id: 'crafter-accent-glass',
    name: 'Glass Shard Accent',
    src: '/assets/minigames/autumn/crafter/accents-glass.png',
    description: 'Glass shard accent',
    priority: true,
    category: 'item'
  },
  {
    id: 'crafter-accent-gearcharm',
    name: 'Gear Charm Accent',
    src: '/assets/minigames/autumn/crafter/accents-gearcharm.png',
    description: 'Gear charm accent',
    priority: true,
    category: 'item'
  },
  {
    id: 'crafter-accent-ribbon',
    name: 'Ribbon Accent',
    src: '/assets/minigames/autumn/crafter/accents-ribbon.png',
    description: 'Ribbon accent',
    priority: true,
    category: 'item'
  },
  
  // Autumn - Memories Date assets
  {
    id: 'memories-market-backdrop',
    name: 'Market Backdrop',
    src: '/assets/minigames/autumn/memoriesDate/market-backdrop.png',
    description: 'Market backdrop for Memories Date',
    priority: true,
    category: 'background'
  },
  {
    id: 'memories-overlook-backdrop',
    name: 'City Overlook Backdrop',
    src: '/assets/minigames/autumn/memoriesDate/overlook-backdrop.png',
    description: 'City overlook backdrop for Memories Date',
    priority: true,
    category: 'background'
  },
  {
    id: 'memories-boardwalk-backdrop',
    name: 'Boardwalk Backdrop',
    src: '/assets/minigames/autumn/memoriesDate/boardwalk-backdrop.png',
    description: 'Boardwalk backdrop for Memories Date',
    priority: true,
    category: 'background'
  },
  // Photo frames
  {
    id: 'memories-frame-neon',
    name: 'Neon Frame',
    src: '/assets/minigames/autumn/memoriesDate/frames-neon.png',
    description: 'Neon photo frame',
    priority: true,
    category: 'item'
  },
  {
    id: 'memories-frame-gears',
    name: 'Gear Frame',
    src: '/assets/minigames/autumn/memoriesDate/frames-gears.png',
    description: 'Gear-themed photo frame',
    priority: true,
    category: 'item'
  },
  {
    id: 'memories-frame-circle',
    name: 'Circle Frame',
    src: '/assets/minigames/autumn/memoriesDate/frames-circle.png',
    description: 'Circle-shaped photo frame',
    priority: true,
    category: 'item'
  },
  // Stickers
  {
    id: 'memories-sticker-bestday',
    name: 'Best Day Sticker',
    src: '/assets/minigames/autumn/memoriesDate/stickers-bestday.png',
    description: 'Best Day Ever sticker',
    priority: true,
    category: 'item'
  },
  {
    id: 'memories-sticker-kitten',
    name: 'Kitten Sticker',
    src: '/assets/minigames/autumn/memoriesDate/stickers-kitten.png',
    description: 'Cute kitten sticker',
    priority: true,
    category: 'item'
  },
  {
    id: 'memories-sticker-sparklehearts',
    name: 'Sparkle Hearts Sticker',
    src: '/assets/minigames/autumn/memoriesDate/stickers-sparklehearts.png',
    description: 'Sparkly hearts sticker',
    priority: true,
    category: 'item'
  },
  {
    id: 'memories-sticker-sparklegears',
    name: 'Sparkle Gears Sticker',
    src: '/assets/minigames/autumn/memoriesDate/stickers-sparklegears.png',
    description: 'Sparkly gears sticker',
    priority: true,
    category: 'item'
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
