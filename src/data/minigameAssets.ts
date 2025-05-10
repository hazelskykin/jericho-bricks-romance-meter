
/**
 * List of required graphic assets for all minigames in the Jericho Bricks game
 */

export interface MinigameAsset {
  id: string;
  name: string;
  path: string;
  description: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  minigame: string;
  type: 'image' | 'audio' | 'sprite';
  required: boolean;
}

export const minigameAssets: MinigameAsset[] = [
  // Spring - Brooms Away
  {
    id: 'broomsAway-success',
    name: 'Success Sound',
    path: '/assets/audio/sfx/broomsAway-success.mp3',
    description: 'Chime sound effect for successfully cleaning an area',
    season: 'spring',
    minigame: 'broomsAway',
    type: 'audio',
    required: false
  },
  {
    id: 'broomsAway-loop-gameplay',
    name: 'Gameplay Music Loop',
    path: '/assets/audio/music/broomsAway-loop-gameplay.mp3',
    description: 'Background music loop for the Brooms Away minigame',
    season: 'spring',
    minigame: 'broomsAway',
    type: 'audio',
    required: false
  },
  {
    id: 'broomsAway-loop-drone',
    name: 'Drone Hover Loop',
    path: '/assets/audio/sfx/broomsAway-loop-drone.mp3',
    description: 'Looping hover sound for the cleaning drone',
    season: 'spring',
    minigame: 'broomsAway',
    type: 'audio',
    required: false
  },
  {
    id: 'broomsAway-trash-collected',
    name: 'Trash Collected',
    path: '/assets/audio/sfx/broomsAway-trash-collected.mp3',
    description: 'Sound effect for collecting a trash item',
    season: 'spring',
    minigame: 'broomsAway',
    type: 'audio',
    required: false
  },
  {
    id: 'broomsAway-grid-click',
    name: 'Grid Click',
    path: '/assets/audio/sfx/broomsAway-grid-click.mp3',
    description: 'Soft click for interacting with grid tiles',
    season: 'spring',
    minigame: 'broomsAway',
    type: 'audio',
    required: false
  },
  {
    id: 'broomsAway-incorrect-square',
    name: 'Incorrect Square',
    path: '/assets/audio/sfx/broomsAway-incorrect-square.mp3',
    description: 'Buzzer-like sound for incorrect tile selection',
    season: 'spring',
    minigame: 'broomsAway',
    type: 'audio',
    required: false
  },
  {
    id: 'broom-drone',
    name: 'Broom Drone',
    path: '/assets/minigames/spring/broomsAway/broom-drone.png',
    description: 'Cleaning drone sprite for the Brooms Away minigame',
    season: 'spring',
    minigame: 'broomsAway',
    type: 'image',
    required: true
  },
  {
    id: 'broom-grid',
    name: 'Broom Grid Background',
    path: '/assets/minigames/spring/broomsAway/grid-background.png',
    description: 'Grid background for the cleaning area',
    season: 'spring',
    minigame: 'broomsAway',
    type: 'image',
    required: true
  },
  {
    id: 'broom-trash',
    name: 'Trash Items',
    path: '/assets/minigames/spring/broomsAway/trash-items.png',
    description: 'Sprite sheet with various trash items',
    season: 'spring',
    minigame: 'broomsAway',
    type: 'sprite',
    required: true
  },
  {
    id: 'broom-sound-success',
    name: 'Success Sound',
    path: '/assets/audio/sfx/broom-success.mp3',
    description: 'Sound effect for successfully cleaning an area',
    season: 'spring',
    minigame: 'broomsAway',
    type: 'audio',
    required: false
  },
  
  // Spring - Mud Fling
  {
    id: 'mudFling-loop-gameplay',
    name: 'Gameplay Music Loop',
    path: '/assets/audio/music/mudFling-loop-gameplay.mp3',
    description: 'Background music loop for the Mud Fling minigame',
    season: 'spring',
    minigame: 'mudFling',
    type: 'audio',
    required: false
  },
  {
    id: 'mudFling-hit-boink',
    name: 'Boink Hit Sound',
    path: '/assets/audio/sfx/mudFling-hit-boink.mp3',
    description: 'Funny chibi reaction sound when hit',
    season: 'spring',
    minigame: 'mudFling',
    type: 'audio',
    required: false
  },
  {
    id: 'mudFling-hit-splash',
    name: 'Splash Hit Sound',
    path: '/assets/audio/sfx/mudFling-hit-splash.mp3',
    description: 'Splash effect when mud lands',
    season: 'spring',
    minigame: 'mudFling',
    type: 'audio',
    required: false
  },
  {
    id: 'mudFling-hit-splat',
    name: 'Splat Hit Sound',
    path: '/assets/audio/sfx/mudFling-hit-splat.mp3',
    description: 'Messy mud splat impact sound',
    season: 'spring',
    minigame: 'mudFling',
    type: 'audio',
    required: false
  },
  {
    id: 'mudFling-throw-whoosh',
    name: 'Throw Whoosh',
    path: '/assets/audio/sfx/mudFling-throw-whoosh.mp3',
    description: 'Throwing sound for a mud ball',
    season: 'spring',
    minigame: 'mudFling',
    type: 'audio',
    required: false
  },
  {
    id: 'mudFling-crowdcheer',
    name: 'Crowd Cheer',
    path: '/assets/audio/sfx/mudFling-crowdcheer.mp3',
    description: 'Audience cheer reaction for Mud Fling',
    season: 'spring',
    minigame: 'mudFling',
    type: 'audio',
    required: false
  },
  {
    id: 'mud-ball',
    name: 'Mud Ball',
    path: '/assets/minigames/spring/mudFling/mud-ball.png',
    description: 'Mud ball projectile sprite',
    season: 'spring',
    minigame: 'mudFling',
    type: 'image',
    required: true
  },
  {
    id: 'mud-character-sheet',
    name: 'Character Sprites',
    path: '/assets/minigames/spring/mudFling/characters.png',
    description: 'Sprite sheet for characters in the mud fling minigame',
    season: 'spring',
    minigame: 'mudFling',
    type: 'sprite',
    required: true
  },
  {
    id: 'mud-arena-bg',
    name: 'Arena Background',
    path: '/assets/minigames/spring/mudFling/mud-arena.png',
    description: 'Background image for the mud fling arena',
    season: 'spring',
    minigame: 'mudFling',
    type: 'image',
    required: true
  },
  
  // Spring - Bloom With A View
  // Bloom With A View
  {
    id: 'bloomWithAView-ambience-birdsong',
    name: 'Birdsong Ambience',
    path: '/assets/audio/sfx/bloomWithAView-ambience-birdsong.mp3',
    description: 'Bird chirping ambience for the garden background',
    season: 'spring',
    minigame: 'bloomWithAView',
    type: 'audio',
    required: false
  },
  {
    id: 'bloomWithAView-loop-gameplay',
    name: 'Gameplay Music Loop',
    path: '/assets/audio/music/bloomWithAView-loop-gameplay.mp3',
    description: 'Background music loop for Bloom With A View',
    season: 'spring',
    minigame: 'bloomWithAView',
    type: 'audio',
    required: false
  },
  {
    id: 'bloomWithAView-effect-rustle',
    name: 'Rustle Effect',
    path: '/assets/audio/sfx/bloomWithAView-effect-rustle.mp3',
    description: 'Soft rustling sound for flower interaction',
    season: 'spring',
    minigame: 'bloomWithAView',
    type: 'audio',
    required: false
  },
  {
    id: 'bloomWithAView-success',
    name: 'Success Sound',
    path: '/assets/audio/sfx/bloomWithAView-success.mp3',
    description: 'Twinkle sound for a successful flower placement',
    season: 'spring',
    minigame: 'bloomWithAView',
    type: 'audio',
    required: false
  },
  {
    id: 'bloom-flower-tiles',
    name: 'Flower Tiles',
    path: '/assets/minigames/spring/bloomWithAView/flower-tiles.png',
    description: 'Tiles representing different flowers for the garden display',
    season: 'spring',
    minigame: 'bloomWithAView',
    type: 'sprite',
    required: true
  },
  {
    id: 'bloom-garden-bg',
    name: 'Garden Background',
    path: '/assets/minigames/spring/bloomWithAView/garden-background.png',
    description: 'Background image for the garden display area',
    season: 'spring',
    minigame: 'bloomWithAView',
    type: 'image',
    required: true
  },
  
  // Summer - Serenade
  {
    id: 'serenade-notes',
    name: 'Music Notes',
    path: '/assets/minigames/summer/serenade/music-notes.png',
    description: 'Musical note sprites for the rhythm game',
    season: 'summer',
    minigame: 'serenade',
    type: 'sprite',
    required: true
  },
  {
    id: 'serenade-background',
    name: 'Stage Background',
    path: '/assets/minigames/summer/serenade/stage-background.png',
    description: 'Background image for the music stage',
    season: 'summer',
    minigame: 'serenade',
    type: 'image',
    required: true
  },
  {
    id: 'serenade-hit-markers',
    name: 'Hit Markers',
    path: '/assets/minigames/summer/serenade/hit-markers.png',
    description: 'Markers showing where notes should be hit',
    season: 'summer',
    minigame: 'serenade',
    type: 'image',
    required: true
  },
  {
    id: 'serenade-track-beat1',
    name: 'Beat Track 1',
    path: '/assets/audio/music/serenade-track1.mp3',
    description: 'First music track option for the rhythm game',
    season: 'summer',
    minigame: 'serenade',
    type: 'audio',
    required: false
  },
  {
    id: 'serenade-track-beat2',
    name: 'Beat Track 2',
    path: '/assets/audio/music/serenade-track2.mp3',
    description: 'Second music track option for the rhythm game',
    season: 'summer',
    minigame: 'serenade',
    type: 'audio',
    required: false
  },
  
  // Summer - Spoken Word
  {
    id: 'spoken-word-paper',
    name: 'Paper Background',
    path: '/assets/minigames/summer/spokenWord/paper-background.png',
    description: 'Paper texture background for poem writing',
    season: 'summer',
    minigame: 'spokenWord',
    type: 'image',
    required: true
  },
  {
    id: 'spoken-word-theme-icons',
    name: 'Theme Icons',
    path: '/assets/minigames/summer/spokenWord/theme-icons.png',
    description: 'Icons representing different poem themes',
    season: 'summer',
    minigame: 'spokenWord',
    type: 'sprite',
    required: true
  },
  
  // Summer - What's On Tap
  {
    id: 'whats-on-tap-glasses',
    name: 'Drink Glasses',
    path: '/assets/minigames/summer/whatsOnTap/glasses.png',
    description: 'Different glass types for drinks',
    season: 'summer',
    minigame: 'whatsOnTap',
    type: 'sprite',
    required: true
  },
  {
    id: 'whats-on-tap-ingredients',
    name: 'Drink Ingredients',
    path: '/assets/minigames/summer/whatsOnTap/ingredients.png',
    description: 'Ingredients for mixing drinks',
    season: 'summer',
    minigame: 'whatsOnTap',
    type: 'sprite',
    required: true
  },
  {
    id: 'whats-on-tap-bar-bg',
    name: 'Bar Background',
    path: '/assets/minigames/summer/whatsOnTap/bar-background.png',
    description: 'Background image for the drink mixing area',
    season: 'summer',
    minigame: 'whatsOnTap',
    type: 'image',
    required: true
  },
  
  // Autumn - Tour Guide
  {
    id: 'tour-guide-map',
    name: 'City Map',
    path: '/assets/minigames/autumn/tourGuide/city-map.png',
    description: 'Map of the city for planning tours',
    season: 'autumn',
    minigame: 'tourGuide',
    type: 'image',
    required: true
  },
  {
    id: 'tour-guide-icons',
    name: 'Location Icons',
    path: '/assets/minigames/autumn/tourGuide/location-icons.png',
    description: 'Icons representing different locations in the city',
    season: 'autumn',
    minigame: 'tourGuide',
    type: 'sprite',
    required: true
  },
  {
    id: 'tour-guide-guests',
    name: 'Guest Profiles',
    path: '/assets/minigames/autumn/tourGuide/guest-profiles.png',
    description: 'Profile images for different tour guests',
    season: 'autumn',
    minigame: 'tourGuide',
    type: 'sprite',
    required: true
  },
  
  // Autumn - Crafter
  {
    id: 'crafter-materials',
    name: 'Craft Materials',
    path: '/assets/minigames/autumn/crafter/materials.png',
    description: 'Different materials for crafting items',
    season: 'autumn',
    minigame: 'crafter',
    type: 'sprite',
    required: true
  },
  {
    id: 'crafter-tools',
    name: 'Crafting Tools',
    path: '/assets/minigames/autumn/crafter/tools.png',
    description: 'Tools used for crafting',
    season: 'autumn',
    minigame: 'crafter',
    type: 'sprite',
    required: true
  },
  {
    id: 'crafter-workshop-bg',
    name: 'Workshop Background',
    path: '/assets/minigames/autumn/crafter/workshop-background.png',
    description: 'Background image for the crafting workshop',
    season: 'autumn',
    minigame: 'crafter',
    type: 'image',
    required: true
  },
  
  // Autumn - Memories Date
  {
    id: 'memories-date-locations',
    name: 'Date Locations',
    path: '/assets/minigames/autumn/memoriesDate/locations.png',
    description: 'Images of different date locations in the city',
    season: 'autumn',
    minigame: 'memoriesDate',
    type: 'sprite',
    required: true
  },
  {
    id: 'memories-date-characters',
    name: 'Character Poses',
    path: '/assets/minigames/autumn/memoriesDate/character-poses.png',
    description: 'Special poses for characters during the date minigame',
    season: 'autumn',
    minigame: 'memoriesDate',
    type: 'sprite',
    required: true
  },
  
  // Winter - Charity Auction
  {
    id: 'charity-auction-items',
    name: 'Auction Items',
    path: '/assets/minigames/winter/charityAuction/auction-items.png',
    description: 'Items available in the charity auction',
    season: 'winter',
    minigame: 'charityAuction',
    type: 'sprite',
    required: true
  },
  {
    id: 'charity-auction-bg',
    name: 'Auction Background',
    path: '/assets/minigames/winter/charityAuction/auction-background.png',
    description: 'Background image for the auction event',
    season: 'winter',
    minigame: 'charityAuction',
    type: 'image',
    required: true
  },
  
  // Winter - Gala Dance
  {
    id: 'gala-dance-floor',
    name: 'Dance Floor',
    path: '/assets/minigames/winter/galaDance/dance-floor.png',
    description: 'Dance floor image for the gala event',
    season: 'winter',
    minigame: 'galaDance',
    type: 'image',
    required: true
  },
  {
    id: 'gala-dance-moves',
    name: 'Dance Moves',
    path: '/assets/minigames/winter/galaDance/dance-moves.png',
    description: 'Icons representing different dance moves',
    season: 'winter',
    minigame: 'galaDance',
    type: 'sprite',
    required: true
  },
  {
    id: 'gala-dance-music',
    name: 'Gala Music',
    path: '/assets/audio/music/gala-music.mp3',
    description: 'Music for the gala dance minigame',
    season: 'winter',
    minigame: 'galaDance',
    type: 'audio',
    required: false
  },
  
  // Winter - Looking for Signs
  {
    id: 'looking-signs-clues',
    name: 'Sign Clues',
    path: '/assets/minigames/winter/lookingSigns/sign-clues.png',
    description: 'Visual clues for the signs minigame',
    season: 'winter',
    minigame: 'lookingSigns',
    type: 'sprite',
    required: true
  },
  {
    id: 'looking-signs-scenes',
    name: 'Scene Backgrounds',
    path: '/assets/minigames/winter/lookingSigns/scene-backgrounds.png',
    description: 'Different scene backgrounds for the sign search',
    season: 'winter',
    minigame: 'lookingSigns',
    type: 'sprite',
    required: true
  }
];

/**
 * Get all minigame assets for a specific season
 */
export const getSeasonMinigameAssets = (season: 'spring' | 'summer' | 'autumn' | 'winter') => {
  return minigameAssets.filter(asset => asset.season === season);
};

/**
 * Get all assets for a specific minigame
 */
export const getMinigameAssets = (minigameId: string) => {
  return minigameAssets.filter(asset => asset.minigame === minigameId);
};

/**
 * Get all required assets for a specific minigame
 */
export const getRequiredMinigameAssets = (minigameId: string) => {
  return minigameAssets.filter(asset => asset.minigame === minigameId && asset.required);
};

/**
 * Get all audio assets
 */
export const getAudioAssets = () => {
  return minigameAssets.filter(asset => asset.type === 'audio');
};

export default minigameAssets;
