
import { useContext } from 'react';
import { GameContext, GameProvider } from './GameProvider';
import { GameContextValue } from './types';

// Custom hook to use the game context
export const useGame = (): GameContextValue => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// Re-export the provider for easier imports
export { GameProvider };
