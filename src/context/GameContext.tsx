import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, Scene, DialogueChoice, CharacterId } from '@/types/game';
import characters from '@/data/characters';
import scenes from '@/data/scenes';
import { showAffectionChange } from '@/components/AffectionChangeToast';
import { showRelationshipMilestone } from '@/components/RelationshipMilestone';

interface GameContextType {
  gameState: GameState;
  currentScene: Scene | undefined;
  currentLine: any;
  handleContinue: () => void;
  handleChoiceSelected: (choice: DialogueChoice) => void;
  handleNewGame: () => void;
  handleAbout: () => void;
  completeCharacterRoute: (characterId: CharacterId) => void;
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

// Affection threshold to achieve a "Happy Ending"
const HAPPY_ENDING_THRESHOLD = 8;

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentScene: 'start',
    dialogueIndex: 0,
    characters: JSON.parse(JSON.stringify(characters)), // Deep copy
    sceneHistory: [],
    showChoices: false,
    hasCompletedGame: false, // True once the Versa epilogue is completed
    
    // New properties
    completedRoutes: {
      xavier: false,
      navarre: false,
      etta: false,
      senara: false
    },
    currentSeason: 'prologue',
    viableRoutes: ['xavier', 'navarre', 'etta', 'senara'],
    versaRouteUnlocked: false
  });
  
  const currentScene: Scene | undefined = scenes[gameState.currentScene];
  const currentLine = currentScene?.dialogue[gameState.dialogueIndex];
  
  // Handle dialogue advancement
  const handleContinue = () => {
    if (!currentScene) return;
    
    if (gameState.dialogueIndex < currentScene.dialogue.length - 1) {
      // More dialogue in this scene
      setGameState(prev => ({
        ...prev,
        dialogueIndex: prev.dialogueIndex + 1
      }));
    } else {
      // End of dialogue for this scene
      if (currentScene.choices) {
        // Show choices
        setGameState(prev => ({ ...prev, showChoices: true }));
      } else if (currentScene.nextSceneId) {
        // Move to next scene
        handleSceneTransition(currentScene.nextSceneId);
      }
    }
  };

  // Handle choice selection
  const handleChoiceSelected = (choice: DialogueChoice) => {
    // Apply affection changes
    if (choice.affectionChanges) {
      const updatedCharacters = { ...gameState.characters };
      
      Object.entries(choice.affectionChanges).forEach(([charId, change]) => {
        if (updatedCharacters[charId]) {
          updatedCharacters[charId] = {
            ...updatedCharacters[charId],
            affection: updatedCharacters[charId].affection + change
          };

          // Show toast for significant affection changes
          if (Math.abs(change) >= 1) {
            showAffectionChange({
              characterId: charId as CharacterId,
              changeAmount: change
            });
          }
        }
      });
      
      setGameState(prev => ({
        ...prev,
        characters: updatedCharacters
      }));
    }

    // Move to next scene
    if (choice.nextSceneId) {
      handleSceneTransition(choice.nextSceneId);
    }
  };

  // Handle scene transitions
  const handleSceneTransition = (nextSceneId: string) => {
    setGameState(prev => ({
      ...prev,
      currentScene: nextSceneId,
      dialogueIndex: 0,
      showChoices: false,
      sceneHistory: [...prev.sceneHistory, prev.currentScene]
    }));
  };

  // Handle season transitions
  const handleSeasonTransition = (newSeason: GameState['currentSeason']) => {
    // Update the current season
    setGameState(prev => ({
      ...prev,
      currentSeason: newSeason
    }));

    // Handle specific season transition logic
    switch (newSeason) {
      case 'spring':
        // Logic for starting spring season
        break;
        
      case 'summer':
        // At the end of spring, identify the two characters with lowest affection
        const affectionRanking = Object.entries(gameState.characters)
          .filter(([charId]) => charId !== 'maven')
          .sort(([, charA], [, charB]) => charB.affection - charA.affection);
        
        // Keep only the top two characters as viable routes
        const viableCharacters = affectionRanking
          .slice(0, 2)
          .map(([charId]) => charId as CharacterId);
        
        setGameState(prev => ({
          ...prev,
          viableRoutes: viableCharacters
        }));
        
        // Show notification about narrowing down options
        showRelationshipMilestone({
          characterId: 'maven',
          milestoneText: "You've narrowed down your potential connections.",
          level: "Spring Complete"
        });
        break;
        
      case 'autumn':
        // At the end of summer, identify the character with highest affection
        const topCharacter = Object.entries(gameState.characters)
          .filter(([charId]) => charId !== 'maven' && gameState.viableRoutes.includes(charId as CharacterId))
          .sort(([, charA], [, charB]) => charB.affection - charA.affection)[0];
        
        if (topCharacter) {
          const [charId] = topCharacter;
          
          setGameState(prev => ({
            ...prev,
            currentLoveInterest: charId as CharacterId
          }));
          
          // Show notification about focusing on one relationship
          showRelationshipMilestone({
            characterId: charId as CharacterId,
            milestoneText: "Your relationship with this character deepens.",
            level: "Romance Route"
          });
        }
        break;
        
      case 'winter':
        // Logic for starting winter season
        break;
        
      case 'epilogue':
        // Logic for starting epilogue based on final affection score
        if (gameState.currentLoveInterest) {
          const finalAffection = gameState.characters[gameState.currentLoveInterest].affection;
          
          // Determine if happy ending or try again ending
          if (finalAffection >= HAPPY_ENDING_THRESHOLD) {
            // Happy ending achieved, mark character route as completed
            completeCharacterRoute(gameState.currentLoveInterest);
          } else {
            // Try again ending
            handleGameReset('incomplete');
          }
        }
        break;
    }
  };

  // Handle character route completion
  const completeCharacterRoute = (characterId: CharacterId) => {
    if (characterId === 'maven') return;
    
    setGameState(prev => ({
      ...prev,
      completedRoutes: {
        ...prev.completedRoutes,
        [characterId]: true
      }
    }));
    
    // Show notification about completing the route
    showRelationshipMilestone({
      characterId,
      milestoneText: "You've completed this character's story!",
      level: "Happy Ending"
    });
    
    // Check if all routes are completed to unlock Versa route
    const updatedCompletedRoutes = {
      ...gameState.completedRoutes,
      [characterId]: true
    };
    
    const allRoutesCompleted = Object.values(updatedCompletedRoutes).every(completed => completed);
    
    if (allRoutesCompleted) {
      // Unlock Versa route
      setGameState(prev => ({
        ...prev,
        versaRouteUnlocked: true
      }));
      
      // Show notification about unlocking Versa route
      showRelationshipMilestone({
        characterId: 'maven',
        milestoneText: "You've unlocked the Versa route!",
        level: "All Routes Complete"
      });
    }
    
    // Return to main menu
    setTimeout(() => {
      handleSceneTransition('start');
    }, 3000);
  };
  
  // Complete the Versa route and game
  const completeVersaRoute = () => {
    setGameState(prev => ({
      ...prev,
      hasCompletedGame: true
    }));
    
    // Show notification about completing the game
    showRelationshipMilestone({
      characterId: 'maven',
      milestoneText: "You've completed the game and unlocked your potential as Versa.",
      level: "Game Complete"
    });
    
    // Return to main menu
    setTimeout(() => {
      handleSceneTransition('start');
    }, 3000);
  };

  // Handle game reset (new game or try again)
  const handleGameReset = (type: 'new' | 'incomplete') => {
    // Keep completed routes and Versa unlock status, but reset current game state
    setGameState(prev => ({
      ...prev,
      currentScene: 'intro',
      dialogueIndex: 0,
      characters: JSON.parse(JSON.stringify(characters)), // Reset characters
      sceneHistory: ['start'],
      showChoices: false,
      currentSeason: 'prologue',
      viableRoutes: ['xavier', 'navarre', 'etta', 'senara'],
      currentLoveInterest: undefined
    }));
    
    if (type === 'incomplete') {
      // Show "try again" message
      showRelationshipMilestone({
        characterId: 'maven',
        milestoneText: "Try again. Your potential has not reached its limits. Become the Versa.",
        level: "Try Again"
      });
    }
  };

  // Start a new game
  const handleNewGame = () => {
    handleGameReset('new');
  };

  // Show about screen
  const handleAbout = () => {
    handleSceneTransition('about');
  };
  
  // Auto-advance hidden empty scenes
  React.useEffect(() => {
    if (currentScene && currentScene.dialogue.length === 0 && currentScene.nextSceneId) {
      handleSceneTransition(currentScene.nextSceneId);
    }
  }, [gameState.currentScene]);

  const value = {
    gameState,
    currentScene,
    currentLine,
    handleContinue,
    handleChoiceSelected,
    handleNewGame,
    handleAbout,
    completeCharacterRoute
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
