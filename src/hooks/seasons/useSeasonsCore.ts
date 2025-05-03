
import { useCallback } from 'react';
import { GameState, CharacterId } from '@/types/game';
import { usePrologueHandlers } from './usePrologueHandlers';
import { useSpringSeasonHandlers } from './useSpringSeasonHandlers';
import { useSummerSeasonHandlers } from './useSummerSeasonHandlers';
import { useAutumnSeasonHandlers } from './useAutumnSeasonHandlers';
import { useWinterSeasonHandlers } from './useWinterSeasonHandlers';
import { useEpilogueHandlers } from './useEpilogueHandlers';
import { useVersaEpilogueHandlers } from './useVersaEpilogueHandlers';

// Core season transition hook that delegates to season-specific hooks
export function useSeasonsCore(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  // Import handlers from season-specific hooks
  const { handlePrologueTransition } = usePrologueHandlers();
  const { handleSpringTransition } = useSpringSeasonHandlers();
  const { handleSummerTransition } = useSummerSeasonHandlers(gameState, setGameState);
  const { handleAutumnTransition } = useAutumnSeasonHandlers(gameState, setGameState);
  const { handleWinterTransition } = useWinterSeasonHandlers(gameState, setGameState);
  const { handleEpilogueTransition } = useEpilogueHandlers(gameState, setGameState, handleSceneTransition);
  const { handleVersaEpilogueTransition } = useVersaEpilogueHandlers(gameState, setGameState, handleSceneTransition);

  // Handle transition to a new season
  const handleSeasonTransition = useCallback((newSeason: GameState['currentSeason']) => {
    // Update the current season
    setGameState(prev => ({
      ...prev,
      currentSeason: newSeason
    }));

    // Handle specific season transition logic
    switch (newSeason) {
      case 'prologue':
        handlePrologueTransition();
        break;
        
      case 'spring':
        handleSpringTransition();
        break;
        
      case 'summer':
        handleSummerTransition();
        break;
        
      case 'autumn':
        handleAutumnTransition();
        break;
        
      case 'winter':
        handleWinterTransition();
        break;
        
      case 'epilogue':
        handleEpilogueTransition();
        break;
      
      case 'versa-epilogue':
        handleVersaEpilogueTransition();
        break;
    }
  }, [gameState.characters, gameState.viableRoutes, gameState.currentLoveInterest, 
      handlePrologueTransition, handleSpringTransition, handleSummerTransition, 
      handleAutumnTransition, handleWinterTransition, handleEpilogueTransition, 
      handleVersaEpilogueTransition]);

  return {
    handleSeasonTransition
  };
}
