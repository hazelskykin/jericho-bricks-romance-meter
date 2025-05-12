import { useState, useCallback, useEffect } from 'react';
import { useGame } from '@/context/GameContext';

export type GameStage = 'material-selection' | 'accent-placement' | 'finishing-touch' | 'completed';

export interface PlacedAccent {
  id: string;
  position: {
    x: number;
    y: number;
  };
}

interface UseCrafterGameProps {
  onComplete: (success: boolean) => void;
}

const useCrafterGame = ({ onComplete }: UseCrafterGameProps) => {
  const { gameState } = useGame();
  
  // Game state
  const [gameStage, setGameStage] = useState<GameStage>('material-selection');
  const [selectedBaseMaterial, setSelectedBaseMaterial] = useState<'fabric' | 'metal' | 'wood' | null>(null);
  const [selectedAccent, setSelectedAccent] = useState<string | null>(null);
  const [placedAccents, setPlacedAccents] = useState<PlacedAccent[]>([]);
  
  // Get character initials for the craft
  const characterInitials = useCallback(() => {
    // Always use 'M' for Maven (protagonist)
    const protagonistInitial = 'M';
    
    // Get the initial of the current love interest
    const loveInterestInitial = (() => {
      const { currentLoveInterest } = gameState;
      if (!currentLoveInterest) return '?';
      
      switch (currentLoveInterest) {
        case 'xavier': return 'X';
        case 'navarre': return 'N';
        case 'etta': return 'E';
        case 'senara': return 'S';
        default: return '?';
      }
    })();
    
    return `${protagonistInitial}+${loveInterestInitial}`;
  }, [gameState]);
  
  // Material selection handler
  const selectBaseMaterial = useCallback((material: 'fabric' | 'metal' | 'wood') => {
    setSelectedBaseMaterial(material);
    setGameStage('accent-placement');
  }, []);
  
  // Accent selection handler
  const selectAccent = useCallback((accent: string) => {
    setSelectedAccent(accent);
  }, []);
  
  // Accent placement handler
  const placeAccent = useCallback((x: number, y: number) => {
    if (!selectedAccent) return;
    
    setPlacedAccents(prev => [
      ...prev,
      {
        id: selectedAccent,
        position: { x, y }
      }
    ]);
    
    // Keep the same accent selected for multiple placements
  }, [selectedAccent]);
  
  // Finish craft handler
  const finishCraft = useCallback(() => {
    // Only proceed if we have a base material and at least one accent
    if (!selectedBaseMaterial || placedAccents.length === 0) {
      console.log('Cannot finish craft: missing base material or accents');
      return;
    }
    
    setGameStage('finishing-touch');
  }, [selectedBaseMaterial, placedAccents]);
  
  // Complete game handler
  const completeGame = useCallback(() => {
    setGameStage('completed');
    
    // Delay the completion callback slightly to allow animations to finish
    setTimeout(() => {
      onComplete(true);
    }, 500);
  }, [onComplete]);
  
  return {
    gameState: {
      stage: gameStage,
      baseMaterial: selectedBaseMaterial,
      selectedAccent,
      accents: placedAccents,
    },
    gameStage,
    selectedBaseMaterial,
    selectedAccent,
    placedAccents,
    selectBaseMaterial,
    selectAccent,
    placeAccent,
    finishCraft,
    completeGame,
    characterInitials: characterInitials(),
  };
};

export default useCrafterGame;
