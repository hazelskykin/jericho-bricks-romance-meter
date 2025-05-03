import React from 'react';
import { useGame } from '@/context/GameContext';
import MainMenu from './MainMenu';
import CharacterSelectionScene from './CharacterSelectionScene';
import FestivalActivitiesScene from './FestivalActivitiesScene';
import { CharacterId } from '@/types/game';
import AboutScreen from './about/AboutScreen';
import MinigameHandler from './minigames/MinigameHandler';
import StandardGameView from './game/StandardGameView';

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

  // If we're at the start screen, show main menu
  if (gameState.currentScene === 'start') {
    return <MainMenu onNewGame={handleNewGame} onAbout={handleAbout} />;
  }
  
  // Show about content
  if (gameState.currentScene === 'about') {
    return <AboutScreen />;
  }
  
  // Handle special scenes like character selection
  if (gameState.currentScene.includes('spring-character-selection')) {
    // Extract suffix from scene ID to identify which characters have been visited
    const suffix = gameState.currentScene.replace('spring-character-selection', '');
    
    // Parse the suffix to determine visited characters
    let visitedChars: CharacterId[] = [];
    if (suffix) {
      // Convert the suffix numbering scheme to character IDs
      if (suffix.includes('1')) visitedChars.push('xavier');
      if (suffix.includes('2')) visitedChars.push('navarre');
      if (suffix.includes('3')) visitedChars.push('etta');
      if (suffix.includes('4')) visitedChars.push('senara');
    }
    
    // Determine remaining characters - ensure we're working with properly typed arrays
    const remainingChars = (['xavier', 'navarre', 'etta', 'senara'] as CharacterId[]).filter(
      char => !visitedChars.includes(char)
    );
    
    // Always show the character selection screen, even if no characters remain
    return (
      <CharacterSelectionScene 
        availableCharacters={remainingChars}
        scenePrefix="spring-visit"
        title="Spring Connections"
        description={
          remainingChars.length > 0
            ? "As spring begins in Stonewich, take time to connect with your teammates. Who would you like to visit next?"
            : "You've visited all your teammates. You can proceed to the Spring festival planning."
        }
      />
    );
  }
  
  // Handle festival activities selection scene
  if (gameState.currentScene === 'spring-festival-activities') {
    const festivalActivities = [
      {
        id: 'brooms-away',
        title: 'Brooms Away!',
        description: 'Help coordinate the cleanup efforts with the automated drones',
        color: '#4CC2FF', // Xavier's color
        sceneId: 'spring-brooms-away-intro',
        available: true
      },
      {
        id: 'mud-fling',
        title: 'Mud Fling',
        description: 'Participate in the playful mud fling competition at the festival',
        color: '#FFB347', // Navarre's color
        sceneId: 'spring-mud-fling-intro',
        available: true
      },
      {
        id: 'bloom-view',
        title: 'Bloom with a View',
        description: 'Assist residents with planting flowers and creating garden displays',
        color: '#9C89FF', // Senara's color
        sceneId: 'spring-bloom-view-intro',
        available: true
      }
    ];
    
    return (
      <FestivalActivitiesScene 
        activities={festivalActivities}
        title="Spring Blooms & Brooms Festival"
        description="The festival is in full swing! Choose which activities you'd like to experience firsthand."
        completionSceneId="spring-festival-completion"
      />
    );
  }
  
  // If a minigame is active, show it
  if (activeMinigame) {
    return (
      <MinigameHandler 
        activeMinigame={activeMinigame}
        completeMinigame={completeMinigame}
        exitMinigame={exitMinigame}
      />
    );
  }
  
  // Otherwise show standard game interface with dialogue, choices, etc.
  return <StandardGameView />;
};

export default React.memo(GameInterface);
