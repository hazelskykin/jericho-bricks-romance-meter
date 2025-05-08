import React, { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import MainMenu from './MainMenu';
import CharacterSelectionScene from './CharacterSelectionScene';
import FestivalActivitiesScene from './FestivalActivitiesScene';
import { CharacterId } from '@/types/game';
import AboutScreen from './about/AboutScreen';
import MinigameHandler from './minigames/MinigameHandler';
import StandardGameView from './game/StandardGameView';
import { useEpilogueChecker } from '@/hooks/useEpilogueChecker';

const GameInterface: React.FC = () => {
  const { 
    gameState, 
    handleNewGame,
    handleAbout,
    activeMinigame,
    completeMinigame,
    exitMinigame,
    handleSceneTransition
  } = useGame();

  const { routeToEpilogue } = useEpilogueChecker(gameState, setGameState => setGameState);

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

  if (gameState.currentScene === 'start') {
    return <MainMenu onNewGame={handleNewGame} onAbout={handleAbout} />;
  }

  if (gameState.currentScene === 'about') {
    return <AboutScreen />;
  }

  if (activeMinigame) {
    return (
      <MinigameHandler 
        activeMinigame={activeMinigame}
        completeMinigame={completeMinigame}
        exitMinigame={exitMinigame}
      />
    );
  }

  const seasonalCharacterSelection = (season: 'spring' | 'summer') => {
    const suffix = gameState.currentScene.replace(`${season}-character-selection`, '');
    const visitedChars: CharacterId[] = [];
    if (suffix.includes('1')) visitedChars.push('xavier');
    if (suffix.includes('2')) visitedChars.push('navarre');
    if (suffix.includes('3')) visitedChars.push('etta');
    if (suffix.includes('4')) visitedChars.push('senara');
    const remainingChars = (['xavier', 'navarre', 'etta', 'senara'] as CharacterId[]).filter(
      char => !visitedChars.includes(char)
    );
    return (
      <CharacterSelectionScene 
        availableCharacters={remainingChars}
        scenePrefix={`${season}-visit`}
        title={`${season.charAt(0).toUpperCase() + season.slice(1)} Connections`}
        description={
          remainingChars.length > 0
            ? `Spend time with your teammates. Who would you like to visit next?`
            : `You've visited all your teammates. You can proceed to the ${season.charAt(0).toUpperCase() + season.slice(1)} festival planning.`
        }
        completionSceneId={remainingChars.length === 0 ? `${season}-festival-planning` : undefined}
      />
    );
  };

  if (gameState.currentScene.includes('spring-character-selection')) return seasonalCharacterSelection('spring');
  if (gameState.currentScene.includes('summer-character-selection')) return seasonalCharacterSelection('summer');

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

  if (seasonalFestivalActivities[gameState.currentScene]) {
    const season = gameState.currentScene.split('-')[0];
    return (
      <FestivalActivitiesScene 
        activities={seasonalFestivalActivities[gameState.currentScene]}
        title={`${season.charAt(0).toUpperCase() + season.slice(1)} Festival`}
        description={`Choose which activities you'd like to experience during the ${season} festival.`}
        completionSceneId={`${season}-festival-completion`}
      />
    );
  }

  return <StandardGameView />;
};

export default React.memo(GameInterface);
