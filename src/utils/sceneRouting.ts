
import { toast } from 'sonner';

// Scene mapping for transitions
const sceneMapping: Record<string, string> = {
  // Spring scenes
  'spring-character-selection': 'spring-character-selection',
  'spring-festival-planning': 'spring-planning',
  'spring-character-path': 'spring-character-visit',
  
  // Summer scenes
  'summer-character-selection': 'summer-character-selection',
  'summer-festival-planning': 'summer-planning',
  'summer-character-path': 'summer-character-visit',
  
  // Autumn scenes
  'autumn-character-path': 'autumn-character-relationship',
  'autumn-festival-introduction': 'autumn-festival-intro',
  
  // Winter scenes
  'winter-planning-character': 'winter-planning',
  'winter-festival-intro': 'winter-festival-introduction',
};

// Error fallbacks for scenes that might not exist
const sceneFallbacks: Record<string, string> = {
  'spring-festival-planning': 'spring-intro',
  'summer-festival-planning': 'summer-intro',
  'autumn-festival-planning': 'autumn-intro',
  'winter-festival-planning': 'winter-intro',
};

/**
 * Maps a requested scene ID to its actual ID in the game data
 * or provides fallbacks for missing scenes
 */
export const mapSceneId = (sceneId: string): string => {
  // Check if we have a direct mapping
  if (sceneId in sceneMapping) {
    console.log(`Mapping scene [${sceneId}] to [${sceneMapping[sceneId]}]`);
    return sceneMapping[sceneId];
  }
  
  // If no mapping exists, return the original ID
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
  
  // No fallback available
  toast.error(`Scene "${sceneId}" not found and no fallback exists`);
  return null;
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
