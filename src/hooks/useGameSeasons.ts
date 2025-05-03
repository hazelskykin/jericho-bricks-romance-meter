
import { GameState, CharacterId } from '@/types/game';
import { useSeasonsCore } from './seasons/useSeasonsCore';
import { useRouteCompletion } from './seasons/useRouteCompletion';
import { useSeasonProgress } from './seasons/useSeasonProgress';

export function useGameSeasons(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  handleSceneTransition: (nextSceneId: string) => void
) {
  // Use the more focused hooks
  const { handleSeasonTransition } = useSeasonsCore(gameState, setGameState, handleSceneTransition);
  const { completeCharacterRoute, completeVersaRoute, handleGameReset } = useRouteCompletion(gameState, setGameState, handleSceneTransition);
  const { checkSeasonProgress } = useSeasonProgress(handleSeasonTransition);

  // Return all the functions to maintain the same API
  return {
    handleSeasonTransition,
    completeCharacterRoute,
    completeVersaRoute,
    handleGameReset,
    checkSeasonProgress
  };
}
