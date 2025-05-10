
import { GameState, CharacterId } from '@/types/game';
import { MinigameType } from '@/types/minigames';

// Define interface for affection changes
export interface AffectionChanges {
  [key: string]: Partial<Record<CharacterId, number>>;
}

// Get affection level based on numeric value
export const getAffectionLevel = (affection: number): string => {
  if (affection >= 75) return 'Love';
  if (affection >= 50) return 'Strong';
  if (affection >= 25) return 'Warm';
  if (affection >= 10) return 'Friendly';
  if (affection >= 0) return 'Neutral';
  return 'Cold';
};

// Determine affection changes for a specific minigame
export const getAffectionChangesForMinigame = (minigameType: MinigameType): Partial<Record<CharacterId, number>> => {
  // Default affection changes for each minigame
  const affectionChanges: AffectionChanges = {
    // Spring minigames
    'broomsAway': { 'xavier': 5 },
    'mudFling': { 'navarre': 5 },
    'bloomWithAView': { 'senara': 5 },
    
    // Summer minigames
    'serenade': { 'xavier': 5 },
    'spokenWord': { 'senara': 5 },
    'whatsOnTap': { 'navarre': 5 },
    
    // Autumn minigames
    'tourGuide': { 'etta': 5 },
    'crafter': { 'senara': 5 },
    'memoriesDate': {}, // Special handling based on current love interest
    
    // Winter minigames
    'charityAuction': { 'etta': 5 },
    'galaDance': {}, // Special handling based on current love interest
    'lookingSigns': {} // Special handling based on current love interest
  };
  
  return affectionChanges[minigameType] || {};
};

// Apply a set of affection changes to game state
export const applyAffectionChanges = (
  gameState: GameState,
  changes: Partial<Record<CharacterId, number>>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): void => {
  // Create a new characters object with updated affection values
  const updatedCharacters = { ...gameState.characters };
  
  // Apply each change
  Object.entries(changes).forEach(([characterId, changeValue]) => {
    const charId = characterId as CharacterId;
    if (updatedCharacters[charId] && changeValue) {
      const currentAffection = updatedCharacters[charId].affection || 0;
      updatedCharacters[charId] = {
        ...updatedCharacters[charId],
        affection: Math.max(0, Math.min(100, currentAffection + changeValue))
      };
      
      console.log(`Affection change for ${charId}: ${currentAffection} -> ${updatedCharacters[charId].affection}`);
    }
  });
  
  // Update game state with new affection values
  setGameState(prevState => ({
    ...prevState,
    characters: updatedCharacters
  }));
};

// Special handling for love interest affection in minigames
export const handleLoveInterestAffectionChange = (
  minigameType: MinigameType,
  gameState: GameState,
  success: boolean,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): void => {
  const { currentLoveInterest } = gameState;
  
  // If no love interest is selected, no special handling needed
  if (!currentLoveInterest) {
    return;
  }
  
  // Special love interest minigames and their affection changes
  const loveInterestMinigames: Partial<Record<MinigameType, number>> = {
    'memoriesDate': 8,
    'galaDance': 10,
    'lookingSigns': success ? 15 : -5
  };
  
  // Check if this is a love interest minigame
  if (minigameType in loveInterestMinigames) {
    const affectionChange = loveInterestMinigames[minigameType] || 0;
    
    // Apply the affection change to the current love interest
    applyAffectionChanges(
      gameState,
      { [currentLoveInterest]: affectionChange },
      setGameState
    );
    
    console.log(`Applied love interest affection change for ${currentLoveInterest}: ${affectionChange}`);
  }
};
