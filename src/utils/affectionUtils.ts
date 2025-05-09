
import { CharacterId, GameState } from '@/types/game';
import { AffectionChanges } from '@/types/minigames';

// Helper to determine affection level based on value
export const getAffectionLevel = (value: number): string => {
  if (value <= -15) return 'Hostile';
  if (value <= -5) return 'Cold';
  if (value <= 5) return 'Neutral';
  if (value <= 15) return 'Friendly';
  if (value <= 25) return 'Close';
  if (value <= 35) return 'Very Close';
  return 'Intimate';
};

// Get affection changes for a specific minigame
export const getAffectionChangesForMinigame = (minigameType: string): Partial<Record<CharacterId, number>> => {
  const affectionChanges: AffectionChanges = {
    // Spring minigames
    broomsAway: { xavier: 1, senara: 1 },
    mudFling: { navarre: 1, etta: 1 },
    bloomWithAView: { navarre: 0.5, etta: 0.5, senara: 0.5 },
    
    // Summer minigames  
    serenade: { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 },
    spokenWord: { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 },
    whatsOnTap: { navarre: 1, xavier: 0.5, etta: 0.5, senara: 0.5 },
      
    // Autumn minigames
    tourGuide: { etta: 1, senara: 0.5, xavier: 0.5 },
    crafter: { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 },
    
    // Winter minigames
    charityAuction: { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 },
    lookingSigns: {}  // Special case handled separately
  };

  return affectionChanges[minigameType] || {};
};

// Apply affection changes to characters
export const applyAffectionChanges = (
  gameState: GameState,
  affectionChanges: Partial<Record<CharacterId, number>>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): void => {
  if (Object.keys(affectionChanges).length === 0) return;
  
  // Create a safe copy of characters
  const updatedCharacters = JSON.parse(JSON.stringify(gameState.characters));
  
  // Apply each change safely
  Object.entries(affectionChanges).forEach(([charId, change]) => {
    const characterId = charId as CharacterId;
    if (updatedCharacters[characterId]) {
      const currentAffection = updatedCharacters[characterId].affection || 0;
      updatedCharacters[characterId].affection = currentAffection + change;
    }
  });
  
  // Update game state with new character affection values
  setGameState(prev => ({
    ...prev,
    characters: updatedCharacters
  }));
};

// Handle special case for love interest-specific affection changes
export const handleLoveInterestAffectionChange = (
  minigameType: string,
  gameState: GameState,
  success: boolean,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): void => {
  const currentLoveInterest = gameState.currentLoveInterest;
  if (!currentLoveInterest) return;
  
  // Special case for specific minigames that focus on the love interest
  if (minigameType === 'memoriesDate') {
    // Major boost to the current love interest
    const updatedCharacters = { ...gameState.characters };
    const currentAffection = updatedCharacters[currentLoveInterest].affection;
    updatedCharacters[currentLoveInterest] = {
      ...updatedCharacters[currentLoveInterest],
      affection: currentAffection + 2
    };
    
    setGameState(prev => ({
      ...prev,
      characters: updatedCharacters
    }));
  } else if (minigameType === 'galaDance') {
    // Major boost to the current love interest
    const updatedCharacters = { ...gameState.characters };
    const currentAffection = updatedCharacters[currentLoveInterest].affection;
    updatedCharacters[currentLoveInterest] = {
      ...updatedCharacters[currentLoveInterest],
      affection: currentAffection + 1.5
    };
    
    setGameState(prev => ({
      ...prev,
      characters: updatedCharacters
    }));
  } else if (minigameType === 'lookingSigns') {
    // Handle special case for lookingSigns
    if (!success) {
      // Failing has a significant negative effect
      const updatedCharacters = { ...gameState.characters };
      const currentAffection = updatedCharacters[currentLoveInterest].affection;
      const newAffection = Math.max(0, currentAffection - 2);
      
      updatedCharacters[currentLoveInterest] = {
        ...updatedCharacters[currentLoveInterest],
        affection: newAffection
      };
      
      setGameState(prev => ({
        ...prev,
        characters: updatedCharacters
      }));
    } else {
      // Success gives a boost
      const updatedCharacters = { ...gameState.characters };
      const currentAffection = updatedCharacters[currentLoveInterest].affection;
      updatedCharacters[currentLoveInterest] = {
        ...updatedCharacters[currentLoveInterest],
        affection: currentAffection + 1
      };
      
      setGameState(prev => ({
        ...prev,
        characters: updatedCharacters
      }));
    }
  }
};
