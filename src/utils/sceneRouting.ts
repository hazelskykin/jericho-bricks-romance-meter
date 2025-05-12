
import { toast } from 'sonner';

// Scene mapping for transitions
const sceneMapping: Record<string, string> = {
  // Prologue scenes
  'prologue-intro': 'intro',
  'team-meeting': 'team-meeting',
  'intro': 'intro', // Explicitly map intro to itself to ensure it's found
  'about': 'about', // Explicitly map about to itself
  
  // Spring scenes
  'spring-character-selection': 'spring-character-selection',
  'spring-festival-planning': 'spring-planning',
  'spring-character-path': 'spring-character-visit',
  'spring-selection': 'spring-selection', // Map to the actual scene we created
  'spring-festival-completion': 'spring-festival-completion',
  'spring-festival-activities': 'spring-festival-activities',
  
  // Spring character selection scenes with visit counts
  'spring-character-selection-1': 'spring-character-selection',
  'spring-character-selection-2': 'spring-character-selection',
  'spring-character-selection-3': 'spring-character-selection',
  'spring-character-selection-4': 'spring-character-selection',
  
  // Summer scenes
  'summer-character-selection': 'summer-character-selection',
  'summer-festival-planning': 'summer-planning',
  'summer-character-path': 'summer-character-visit',
  'summer-visit-character': 'summer-character-selection', // Add this mapping for the transition
  'summer-festival-completion': 'summer-festival-completion', // Add mapping for festival completion
  'summer-festival-activities': 'summer-festival-activities',
  'summer-conclusion-meeting': 'summer-conclusion-meeting',
  
  // Summer character selection scenes with visit counts
  'summer-character-selection-1': 'summer-character-selection',
  'summer-character-selection-2': 'summer-character-selection',
  'summer-character-selection-3': 'summer-character-selection',
  'summer-character-selection-4': 'summer-character-selection',
  
  // Season transitions
  'season-transition-spring': 'season-transition-spring',
  'season-transition-summer': 'season-transition-summer',
  'season-transition-autumn': 'season-transition-autumn',
  'season-transition-winter': 'season-transition-winter',
  
  // Autumn scenes
  'autumn-character-path': 'autumn-character-relationship',
  'autumn-festival-introduction': 'autumn-festival-introduction',
  'autumn-festival-activities': 'autumn-festival-activities',
  'autumn-festival-completion': 'autumn-festival-completion',
  'autumn-conclusion-debrief': 'autumn-conclusion-debrief',
  'autumn-conclusion': 'autumn-conclusion',
  
  // Autumn minigames
  'autumn-crafter-intro': 'autumn-crafter-intro',
  'autumn-crafter-start': 'autumn-crafter-start',
  'autumn-crafter-complete': 'autumn-crafter-complete',
  
  // Winter scenes
  'winter-intro': 'winter-intro',
  'winter-planning': 'winter-planning',
  'winter-festival-intro': 'winter-festival-intro',
  'winter-festival-activities': 'winter-festival-activities',
  'winter-festival-completion': 'winter-festival-completion',
  'winter-charity-auction-intro': 'winter-charity-auction-intro',
  'winter-gala-dance-intro': 'winter-gala-dance-intro',
  'winter-looking-signs-intro': 'winter-looking-signs-intro',
  'winter-conclusion': 'winter-conclusion',
};

// Error fallbacks for scenes that might not exist
const sceneFallbacks: Record<string, string> = {
  'prologue-intro': 'intro',
  'spring-festival-planning': 'spring-intro',
  'summer-festival-planning': 'summer-intro',
  'autumn-festival-planning': 'autumn-intro',
  'winter-festival-planning': 'winter-intro',
  'spring-selection': 'spring-intro', // Fallback to spring-intro if something goes wrong
  'summer-visit-character': 'summer-character-selection', // Add fallback for summer visit
  'summer-festival-completion': 'summer-planning', // Add fallback for festival completion
  'season-transition-autumn': 'autumn-intro', // Fallback for autumn transition
  'season-transition-winter': 'winter-intro', // Fallback for winter transition
  'autumn-festival-completion': 'autumn-intro', // Fallback for autumn festival completion
  'autumn-conclusion-debrief': 'autumn-intro', // Fallback for autumn conclusion
  'winter-festival-completion': 'winter-intro', // Fallback for winter festival completion
  
  // Fallbacks for character selection with visit counts
  'spring-character-selection-1': 'spring-character-selection',
  'spring-character-selection-2': 'spring-character-selection',
  'spring-character-selection-3': 'spring-character-selection',
  'spring-character-selection-4': 'spring-character-selection',
  
  // Fallbacks for summer character selection with visit counts
  'summer-character-selection-1': 'summer-character-selection',
  'summer-character-selection-2': 'summer-character-selection',
  'summer-character-selection-3': 'summer-character-selection',
  'summer-character-selection-4': 'summer-character-selection',
  
  // Fallbacks for autumn minigames
  'autumn-crafter-start': 'autumn-crafter-intro',
  'autumn-crafter-complete': 'autumn-festival-activities',
};

/**
 * Maps a requested scene ID to its actual ID in the game data
 * or provides fallbacks for missing scenes
 */
export const mapSceneId = (sceneId: string): string => {
  // Debug: log all scene mappings
  console.log('Available scene mappings:', Object.keys(sceneMapping));
  
  // Check if we have a direct mapping
  if (sceneId in sceneMapping) {
    console.log(`Mapping scene [${sceneId}] to [${sceneMapping[sceneId]}]`);
    return sceneMapping[sceneId];
  }
  
  // Special case for intro scenes to ensure they're found
  if (sceneId === 'intro' || sceneId === 'prologue-intro') {
    console.log(`Special handling for intro scene: [${sceneId}]`);
    return 'intro';
  }
  
  // If no mapping exists, return the original ID
  console.log(`No mapping for scene [${sceneId}], using as is`);
  return sceneId;
};

/**
 * Handles scene transition errors by providing fallbacks
 */
export const handleSceneError = (sceneId: string): string | null => {
  // Log the error for debugging
  console.error(`Scene transition failed: Target scene [${sceneId}] not found!`);
  
  // Check if we have a fallback for this scene
  if (sceneId in sceneFallbacks) {
    const fallbackScene = sceneFallbacks[sceneId];
    console.log(`Using fallback scene [${fallbackScene}] for missing scene [${sceneId}]`);
    toast.error(`Scene "${sceneId}" not found, redirecting to fallback scene`);
    return fallbackScene;
  }
  
  // Special case for intro scenes to ensure they're found
  if (sceneId === 'intro' || sceneId === 'prologue-intro') {
    console.log(`Special fallback for intro scene: [${sceneId}]`);
    return 'intro';
  }
  
  // Special case for about scene to ensure it's found
  if (sceneId === 'about') {
    console.log(`Special fallback for about scene: [${sceneId}]`);
    return 'about';
  }
  
  // No fallback available
  toast.error(`Scene "${sceneId}" not found and no fallback exists`);
  return 'start'; // Default to start as ultimate fallback
};

/**
 * Generate scene ID for character-specific scenes
 */
export const getCharacterSceneId = (scenePrefix: string, characterId: string): string => {
  // Map the scene prefix and character ID to a scene ID pattern
  const sceneId = `${scenePrefix}-${characterId}`;
  console.log(`Generated character scene ID: ${sceneId}`);
  return sceneId;
};
