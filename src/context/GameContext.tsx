
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, Scene, DialogueChoice, CharacterId } from '@/types/game';
import characters from '@/data/characters';
import scenes from '@/data/scenes';
import { useGameScenes } from '@/hooks/useGameScenes';
import { useGameSeasons } from '@/hooks/useGameSeasons';
import { useGameMinigames } from '@/hooks/useGameMinigames';
import { useGameCharacters } from '@/hooks/useGameCharacters';
import { toast } from "@/components/ui/use-toast";

// Re-export the type from the hooks
export type { MinigameType } from '@/hooks/useGameMinigames';

interface GameContextType {
  gameState: GameState;
  currentScene: Scene | undefined;
  currentLine: any;
  handleContinue: () => void;
  handleChoiceSelected: (choice: DialogueChoice) => void;
  handleNewGame: () => void;
  handleAbout: () => void;
  completeCharacterRoute: (characterId: CharacterId) => void;
  handleSceneTransition: (nextSceneId: string) => void;
  
  // New function for scene replay
  replayCurrentScene: () => void;
  
  // Season progression function
  checkSeasonProgress: (sceneId: string) => void;
  
  // Minigame-related functions
  startMinigame: ReturnType<typeof useGameMinigames>['startMinigame'];
  completeMinigame: ReturnType<typeof useGameMinigames>['completeMinigame'];
  exitMinigame: ReturnType<typeof useGameMinigames>['exitMinigame'];
  activeMinigame: ReturnType<typeof useGameMinigames>['activeMinigame'];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'start',
    dialogueIndex: 0,
    characters: JSON.parse(JSON.stringify(characters)), // Deep copy
    sceneHistory: [],
    showChoices: false,
    hasCompletedGame: false, // True once the Versa epilogue is completed
    
    completedRoutes: {
      xavier: false,
      navarre: false,
      etta: false,
      senara: false
    },
    currentSeason: 'prologue',
    viableRoutes: ['xavier', 'navarre', 'etta', 'senara'],
    versaRouteUnlocked: false,
    
    // Add scene state backup for replaying
    sceneStateBackup: null
  });
  
  // Use the dedicated hooks for different game functionalities
  const { currentScene, currentLine, handleContinue, handleChoiceSelected, handleSceneTransition } = 
    useGameScenes(gameState, setGameState);
    
  const { handleSeasonTransition, completeCharacterRoute, handleGameReset, completeVersaRoute, checkSeasonProgress } = 
    useGameSeasons(gameState, setGameState, handleSceneTransition);
    
  const { activeMinigame, startMinigame, completeMinigame, exitMinigame } = 
    useGameMinigames(gameState, setGameState, handleSceneTransition);
    
  const { updateCharacterAffection } = 
    useGameCharacters(gameState, setGameState);

  // Start a new game
  const handleNewGame = () => {
    handleGameReset('new');
  };

  // Show about screen
  const handleAbout = () => {
    handleSceneTransition('about');
  };
  
  // New function to replay the current scene
  const replayCurrentScene = () => {
    if (!currentScene) {
      console.error("Cannot replay: No current scene");
      toast({
        title: "Replay Error",
        description: "Cannot replay scene: No current scene available",
        variant: "destructive"
      });
      return;
    }
    
    // If there's a backup of scene state, restore it first
    if (gameState.sceneStateBackup) {
      // Restore character affections and other state from backup
      setGameState(prev => ({
        ...prev,
        characters: JSON.parse(JSON.stringify(gameState.sceneStateBackup!.characters)),
        dialogueIndex: 0,
        showChoices: false
      }));
    } else {
      // No backup available - just reset dialogue index
      setGameState(prev => ({
        ...prev,
        dialogueIndex: 0,
        showChoices: false
      }));
    }
    
    toast({
      title: "Scene Replay",
      description: "Replaying current scene from the beginning",
      variant: "default"
    });
  };
  
  // Create scene backup when entering a new scene
  React.useEffect(() => {
    // Create a backup of the current state when entering a new scene
    if (gameState.dialogueIndex === 0) {
      setGameState(prev => ({
        ...prev,
        sceneStateBackup: {
          characters: JSON.parse(JSON.stringify(prev.characters)),
        }
      }));
    }
  }, [gameState.currentScene]);
  
  // Auto-advance hidden empty scenes
  React.useEffect(() => {
    if (currentScene && currentScene.dialogue.length === 0 && currentScene.nextSceneId) {
      handleSceneTransition(currentScene.nextSceneId);
    }
  }, [gameState.currentScene, currentScene]);

  const value = {
    gameState,
    currentScene,
    currentLine,
    handleContinue,
    handleChoiceSelected,
    handleNewGame,
    handleAbout,
    completeCharacterRoute,
    handleSceneTransition,
    replayCurrentScene, // Add the new function to the context
    
    // Add the season progression checker
    checkSeasonProgress,
    
    // Minigame functions
    startMinigame,
    completeMinigame,
    exitMinigame,
    activeMinigame
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
