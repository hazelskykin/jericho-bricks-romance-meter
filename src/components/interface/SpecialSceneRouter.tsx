
import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useEpilogueChecker } from '@/hooks/useEpilogueChecker';

/**
 * Component that handles special scene transitions based on game state
 */
const SpecialSceneRouter: React.FC = () => {
  const { gameState, handleSceneTransition } = useGame();
  const { routeToEpilogue } = useEpilogueChecker(gameState, setGameState => setGameState);

  // Handle special scene transitions
  useEffect(() => {
    const { currentScene, currentLoveInterest } = gameState;
    
    if (currentScene === 'epilogue-route') {
      handleSceneTransition(routeToEpilogue(currentScene));
    } else if (currentScene === 'happy-ending-character' && currentLoveInterest) {
      handleSceneTransition(`happy-ending-${currentLoveInterest}`);
    } else if (['autumn-character', 'winter-planning-character', 'winter-confession-character'].includes(currentScene)) {
      const fallbackMap: Record<string, string> = {
        'autumn-character': 'autumn-festival-introduction',
        'winter-planning-character': 'winter-festival-intro',
        'winter-confession-character': 'team-future-meeting'
      };
      if (currentLoveInterest) {
        const prefix = currentScene.replace('-character', '');
        handleSceneTransition(`${prefix}-${currentLoveInterest}`);
      } else {
        handleSceneTransition(fallbackMap[currentScene]);
      }
    } 
    // Add special handling for winter-planning to auto-transition without requiring player input
    else if (currentScene === 'winter-planning' && gameState.dialogueIndex === 2 && gameState.showChoices && currentLoveInterest) {
      console.log(`Auto-transitioning from winter-planning to winter-planning-character for ${currentLoveInterest}`);
      handleSceneTransition('winter-planning-character');
    }
  }, [gameState.currentScene, gameState.currentLoveInterest, gameState.dialogueIndex, gameState.showChoices, handleSceneTransition, routeToEpilogue]);

  return null; // This component doesn't render anything
};

export default SpecialSceneRouter;
