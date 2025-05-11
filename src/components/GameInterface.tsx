
import React, { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';
import MainMenu from './MainMenu';
import AboutScreen from './about/AboutScreen';
import MinigameHandler from './minigames/MinigameHandler';
import StandardGameView from './game/StandardGameView';
import { useEpilogueChecker } from '@/hooks/useEpilogueChecker';
import { allScenes } from '@/data/scenes';
import GameDevMenu from './interface/GameDevMenu';
import CharacterSelectionView from './interface/CharacterSelectionView';
import FestivalActivitiesView from './interface/FestivalActivitiesView';

interface GameInterfaceProps {
  initialSceneId?: string;
  gameStarted?: boolean;
}

const GameInterface: React.FC<GameInterfaceProps> = ({ initialSceneId, gameStarted = false }) => {
  const {
    gameState,
    handleNewGame,
    handleAbout,
    activeMinigame,
    completeMinigame,
    exitMinigame,
    handleSceneTransition
  } = useGame();
  
  const [loadingComplete, setLoadingComplete] = useState(true); // Default to true for asset loading
  const [initialized, setInitialized] = useState(false);

  // Debug the current scene
  useEffect(() => {
    console.log('GameInterface rendering with scene:', gameState.currentScene);
    console.log('Current scene data:', allScenes[gameState.currentScene]);
    
    // Only perform this sync once when the component first loads with an initialSceneId
    if (!initialized && initialSceneId && initialSceneId !== 'start' && gameStarted) {
      console.log(`Initializing GameInterface with scene: ${initialSceneId}`);
      handleSceneTransition(initialSceneId);
      setInitialized(true);
    }
  }, [gameState.currentScene, initialSceneId, handleSceneTransition, initialized, gameStarted]);

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
  }, [gameState.currentScene, gameState.currentLoveInterest, handleSceneTransition, routeToEpilogue]);

  // Dev menu jump targets
  const devJumpTargets = [
    { id: 'spring-intro', label: 'Spring Intro' },
    { id: 'spring-character-selection', label: 'Spring Character Select' },
    { id: 'spring-festival-planning', label: 'Spring Festival Planning' },
    { id: 'summer-intro', label: 'Summer Intro' },
    { id: 'summer-character-selection', label: 'Summer Character Select' },
    { id: 'summer-planning', label: 'Summer Festival Planning' },
    { id: 'autumn-intro', label: 'Autumn Intro' },
    { id: 'autumn-character-path', label: 'Autumn Romance Path' },
    { id: 'autumn-festival-introduction', label: 'Autumn Festival' },
    { id: 'winter-intro', label: 'Winter Intro' },
    { id: 'winter-planning', label: 'Winter Festival Planning' },
    { id: 'winter-planning-character', label: 'Winter Romance Path' },
    { id: 'winter-festival-intro', label: 'Winter Festival' },
    { id: 'epilogue-route', label: 'Epilogue' }
  ];

  // Festival activities data
  const seasonalFestivalActivities: Record<string, any[]> = {
    'spring-festival-activities': [
      { id: 'brooms-away', title: 'Brooms Away!', description: 'Help coordinate the cleanup efforts with the automated drones', color: '#4CC2FF', sceneId: 'spring-brooms-away-intro' },
      { id: 'mud-fling', title: 'Mud Fling', description: 'Participate in the playful mud fling competition at the festival', color: '#FFB347', sceneId: 'spring-mud-fling-intro' },
      { id: 'bloom-view', title: 'Bloom with a View', description: 'Assist residents with planting flowers and creating garden displays', color: '#9C89FF', sceneId: 'spring-bloom-view-intro' }
    ],
    'summer-festival-activities': [
      { id: 'serenade', title: 'Serenade', description: 'Experience the interactive rhythm game at the music stages', color: '#4CC2FF', sceneId: 'summer-serenade-intro' },
      { id: 'spoken-word', title: 'Spoken Word', description: 'Participate in the poetry competition by crafting your own verses', color: '#9C89FF', sceneId: 'summer-spoken-word-intro' },
      { id: 'whats-on-tap', title: "What's On-Tap?", description: 'Work the beer tent and serve drinks to festival attendees', color: '#FFB347', sceneId: 'summer-whats-on-tap-intro' }
    ],
    'autumn-festival-activities': [
      { id: 'tour-guide', title: 'Tour Guide', description: 'Match up tour itineraries with guests', color: '#FF5E5B', sceneId: 'autumn-tour-guide-intro' },
      { id: 'crafter', title: 'Crafter', description: 'Create a custom item at the DIY crafting booth', color: '#9C89FF', sceneId: 'autumn-crafter-intro' },
      { id: 'memories-date', title: 'Making Memories Date', description: 'Go on a sightseeing date with someone special', color: '#0D98BA', sceneId: 'autumn-memories-date-intro', available: gameState.currentLoveInterest !== undefined }
    ],
    'winter-festival-activities': [
      { id: 'charity-auction', title: 'Charity Auction', description: 'Bid on items in the silent auction', color: '#FFB347', sceneId: 'winter-charity-auction-intro' },
      { id: 'gala-dance', title: 'Gala Dance', description: 'Dance with someone special at the gala', color: '#4CC2FF', sceneId: 'winter-gala-dance-intro', available: gameState.currentLoveInterest !== undefined },
      { id: 'looking-signs', title: 'Looking for Signs', description: 'Take a walk to search for signs of love', color: '#9C89FF', sceneId: 'winter-looking-signs-intro', available: gameState.currentLoveInterest !== undefined }
    ]
  };

  if (gameState.currentScene === 'start') {
    return (
      <>
        <MainMenu onNewGame={handleNewGame} onAbout={handleAbout} loadingComplete={loadingComplete} />
        <GameDevMenu jumpTargets={devJumpTargets} onJumpToScene={handleSceneTransition} />
      </>
    );
  }

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
        <GameDevMenu jumpTargets={devJumpTargets} onJumpToScene={handleSceneTransition} />
      </>
    );
  }

  // Handle character selection scenes
  if (gameState.currentScene === 'spring-character-selection') {
    return (
      <>
        <CharacterSelectionView 
          season="spring" 
          sceneId={gameState.currentScene}
          gameState={gameState} 
        />
        <GameDevMenu jumpTargets={devJumpTargets} onJumpToScene={handleSceneTransition} />
      </>
    );
  }
  
  if (gameState.currentScene.includes('summer-character-selection')) {
    return (
      <>
        <CharacterSelectionView 
          season="summer" 
          sceneId={gameState.currentScene}
          gameState={gameState} 
        />
        <GameDevMenu jumpTargets={devJumpTargets} onJumpToScene={handleSceneTransition} />
      </>
    );
  }

  // Handle festival activities
  if (seasonalFestivalActivities[gameState.currentScene]) {
    const season = gameState.currentScene.split('-')[0];
    return (
      <>
        <FestivalActivitiesView 
          sceneId={gameState.currentScene}
          activities={seasonalFestivalActivities[gameState.currentScene]} 
          season={season}
        />
        <GameDevMenu jumpTargets={devJumpTargets} onJumpToScene={handleSceneTransition} />
      </>
    );
  }

  // Default case: Show the standard game view for all regular scenes
  return (
    <>
      <StandardGameView />
      <GameDevMenu jumpTargets={devJumpTargets} onJumpToScene={handleSceneTransition} />
    </>
  );
};

export default React.memo(GameInterface);
