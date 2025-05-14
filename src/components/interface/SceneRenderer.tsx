
import React from 'react';
import StandardGameView from '../game/StandardGameView';
import CharacterSelectionView from './CharacterSelectionView';
import FestivalActivitiesView from './FestivalActivitiesView';
import MainMenu from '../MainMenu';
import AboutScreen from '../about/AboutScreen';
import MinigameHandler from '../minigames/MinigameHandler';
import { GameState } from '@/types/game';
import { MinigameType } from '@/types/minigames';
import { getFestivalActivities } from '@/data/festivalActivities';
import DevJumpTargets from './DevJumpTargets';

interface SceneRendererProps {
  gameState: GameState;
  activeMinigame: MinigameType | null;
  completeMinigame: (success: boolean, score?: number) => void;
  exitMinigame: () => void;
  handleSceneTransition: (sceneId: string) => void;
  handleNewGame: () => void;
  handleAbout: () => void;
  loadingComplete?: boolean;
  gameStarted?: boolean;
  initialSceneId?: string;
}

const SceneRenderer: React.FC<SceneRendererProps> = ({
  gameState,
  activeMinigame,
  completeMinigame,
  exitMinigame,
  handleSceneTransition,
  handleNewGame,
  handleAbout,
  loadingComplete = true,
  gameStarted = false,
  initialSceneId
}) => {
  // Festival activities data
  const seasonalFestivalActivities = getFestivalActivities(gameState);

  // Handle start screen
  if (gameState.currentScene === 'start') {
    return (
      <>
        <MainMenu onNewGame={handleNewGame} onAbout={handleAbout} loadingComplete={loadingComplete} />
        <DevJumpTargets onJumpToScene={handleSceneTransition} />
      </>
    );
  }

  // Handle about screen
  if (gameState.currentScene === 'about') {
    return <AboutScreen />;
  }

  // Only render MinigameHandler when there is an active minigame
  if (activeMinigame) {
    return (
      <>
        <MinigameHandler
          activeMinigame={activeMinigame}
          completeMinigame={completeMinigame}
          exitMinigame={exitMinigame}
        />
        <DevJumpTargets onJumpToScene={handleSceneTransition} />
      </>
    );
  }

  // Handle character selection scenes - match both plain and numbered versions
  if (gameState.currentScene === 'spring-character-selection' || 
      /^spring-character-selection-\d+$/.test(gameState.currentScene)) {
    return (
      <>
        <CharacterSelectionView 
          season="spring" 
          sceneId={gameState.currentScene}
          gameState={gameState} 
        />
        <DevJumpTargets onJumpToScene={handleSceneTransition} />
      </>
    );
  }
  
  // Handle summer character selection scenes - improved detection
  if (gameState.currentScene === 'summer-character-selection' || 
      /^summer-character-selection-\d+$/.test(gameState.currentScene) ||
      gameState.currentScene === 'summer-visit-character') {
    console.log('Rendering summer character selection view');
    return (
      <>
        <CharacterSelectionView 
          season="summer" 
          sceneId={gameState.currentScene === 'summer-visit-character' ? 'summer-character-selection' : gameState.currentScene}
          gameState={gameState} 
        />
        <DevJumpTargets onJumpToScene={handleSceneTransition} />
      </>
    );
  }

  // Handle festival activities scenes with improved detection
  const festivalScenes = ['spring-festival-activities', 'summer-festival-activities', 'autumn-festival-activities', 'winter-festival-activities'];
  if (festivalScenes.includes(gameState.currentScene)) {
    const season = gameState.currentScene.split('-')[0];
    const activities = seasonalFestivalActivities[gameState.currentScene] || [];
    
    console.log(`Rendering ${season} festival activities view with ${activities.length} activities`);
    
    return (
      <>
        <FestivalActivitiesView 
          sceneId={gameState.currentScene}
          activities={activities}
          season={season}
        />
        <DevJumpTargets onJumpToScene={handleSceneTransition} />
      </>
    );
  }

  // Default case: Show the standard game view for all regular scenes
  return (
    <>
      <StandardGameView />
      <DevJumpTargets onJumpToScene={handleSceneTransition} />
    </>
  );
};

export default SceneRenderer;
