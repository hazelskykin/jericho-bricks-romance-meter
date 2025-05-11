
import { GameState, CharacterId } from "@/types/game";
import { MinigameType } from "@/types/minigames";

export interface GameContextValue {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  handleSceneTransition: (nextSceneId: string) => void;
  handleNewGame: () => void;
  handleAbout: () => void;
  handleSeasonTransition: (season: string) => void;
  completeCharacterRoute: (characterId: CharacterId) => void;
  completeVersaRoute: () => void;
  handleGameReset: () => void;
  checkSeasonProgress: (sceneId: string) => void;
  activeMinigame: MinigameType | null;
  startMinigame: (minigameType: MinigameType, returnSceneId?: string) => void;
  completeMinigame: (success: boolean, score?: number) => void;
  exitMinigame: () => void;
  routeToEpilogue: (currentSceneId: string) => string;
  handleDialogueClick: () => void;
  handleChoiceClick: (choiceIndex: number) => void;
  replayCurrentScene: () => void;
}
