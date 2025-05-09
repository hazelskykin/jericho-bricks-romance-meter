
import { MinigameType } from '@/types/minigames';

// Get the next scene ID after completing a minigame
export const getNextSceneAfterMinigame = (minigameType: MinigameType): string => {
  const sceneMap: Record<MinigameType, string> = {
    // Spring minigames
    broomsAway: 'spring-brooms-away-complete',
    mudFling: 'spring-mud-fling-complete',
    bloomWithAView: 'spring-bloom-view-complete',
    
    // Summer minigames
    serenade: 'summer-serenade-complete',
    spokenWord: 'summer-spoken-word-complete',
    whatsOnTap: 'summer-whats-on-tap-complete',
    
    // Autumn minigames
    tourGuide: 'autumn-tour-guide-complete',
    crafter: 'autumn-crafter-complete',
    memoriesDate: 'autumn-memories-date-complete',
    
    // Winter minigames
    charityAuction: 'winter-charity-auction-complete',
    galaDance: 'winter-gala-dance-complete',
    lookingSigns: 'winter-looking-signs-complete'
  };

  return sceneMap[minigameType] || '';
};

// Get a fallback scene based on minigame type
export const getFallbackSceneForMinigame = (minigameType: MinigameType | null): string => {
  if (!minigameType) return 'start';
  
  if (minigameType.includes('spring')) {
    return 'spring-festival-midway';
  } else if (minigameType.includes('summer')) {
    return 'summer-festival-midway';
  } else if (minigameType.includes('autumn')) {
    return 'autumn-festival-midway';
  } else if (minigameType.includes('winter')) {
    return 'winter-festival-midway';
  }
  
  return 'spring-festival-activities';
};

// Get a fallback scene based on current season
export const getFallbackSceneForSeason = (currentSeason: string): string => {
  if (currentSeason === 'spring') {
    return 'spring-festival-activities';
  } else if (currentSeason === 'summer') {
    return 'summer-festival-activities';
  } else if (currentSeason === 'autumn') {
    return 'autumn-festival-activities';
  } else if (currentSeason === 'winter') {
    return 'winter-festival-activities';
  }
  
  return 'start';
};
