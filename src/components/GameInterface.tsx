
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

  console.log('GameInterface rendering, activeMinigame:', activeMinigame, 'currentScene:', gameState.currentScene);

  // If we're at the start screen, show main menu
  if (gameState.currentScene === 'start') {
    return <MainMenu onNewGame={handleNewGame} onAbout={handleAbout} />;
  }
  
  // Show about content
  if (gameState.currentScene === 'about') {
    return <AboutScreen />;
  }
  
  // Handle special scenes like character selection for spring season
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
        completionSceneId={remainingChars.length === 0 ? 'spring-festival-planning' : undefined}
      />
    );
  }
  
  // Handle special scenes like character selection for summer season
  if (gameState.currentScene.includes('summer-character-selection')) {
    // Extract suffix from scene ID to identify which characters have been visited
    const suffix = gameState.currentScene.replace('summer-character-selection', '');
    
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
        scenePrefix="summer-visit"
        title="Summer Connections"
        description={
          remainingChars.length > 0
            ? "As summer heats up in Stonewich, spend time with your teammates to prepare for the festival. Who would you like to visit next?"
            : "You've connected with all your teammates. You can proceed to the Summer festival planning."
        }
        completionSceneId='summer-planning'
      />
    );
  }
  
  // Handle special scenes like character selection for autumn season - focused on the romantic interest
  if (gameState.currentScene.includes('autumn-character-selection')) {
    if (gameState.currentLoveInterest) {
      return (
        <CharacterSelectionScene 
          availableCharacters={[gameState.currentLoveInterest]} 
          scenePrefix="autumn"
          title="Autumn Romance"
          description="As autumn arrives in Stonewich, you imagine how you might deepen your connection with someone special to you."
          completionSceneId={`autumn-${gameState.currentLoveInterest}-path`}
        />
      );
    } else {
      // Fallback if no love interest is selected
      handleSceneTransition('autumn-festival-introduction');
      return null;
    }
  }

  // Handle special scenes like character selection for winter season - focused on the romantic interest
  if (gameState.currentScene.includes('winter-character-selection')) {
    if (gameState.currentLoveInterest) {
      return (
        <CharacterSelectionScene 
          availableCharacters={[gameState.currentLoveInterest]} 
          scenePrefix="winter"
          title="Winter Romance"
          description="As winter blankets Stonewich, the festive season acts as a catalyst for a close relationship to change."
          completionSceneId={`winter-${gameState.currentLoveInterest}-confession`}
        />
      );
    } else {
      // Fallback if no love interest is selected
      handleSceneTransition('winter-festival-introduction');
      return null;
    }
  }
  
  // Handle character-specific confession scenes in winter
  if (gameState.currentScene === 'winter-character-confession') {
    if (gameState.currentLoveInterest) {
      handleSceneTransition(`winter-${gameState.currentLoveInterest}-confession`);
    } else {
      handleSceneTransition('winter-festival-activities');
    }
    return null;
  }
  
  // Handle festival activities selection scene for spring
  if (gameState.currentScene === 'spring-festival-activities') {
    // ... keep existing code (spring festival activities)
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
  
  // Handle festival activities selection scene for summer
  if (gameState.currentScene === 'summer-festival-activities') {
    // ... keep existing code (summer festival activities)
    const festivalActivities = [
      {
        id: 'serenade',
        title: 'Serenade',
        description: 'Experience the interactive rhythm game at the music stages',
        color: '#4CC2FF', // Xavier's color
        sceneId: 'summer-serenade-intro',
        available: true
      },
      {
        id: 'spoken-word',
        title: 'Spoken Word',
        description: 'Participate in the poetry competition by crafting your own verses',
        color: '#9C89FF', // Senara's color
        sceneId: 'summer-spoken-word-intro',
        available: true
      },
      {
        id: 'whats-on-tap',
        title: "What's On-Tap?",
        description: 'Work the beer tent and serve drinks to festival attendees',
        color: '#FFB347', // Navarre's color
        sceneId: 'summer-whats-on-tap-intro',
        available: true
      }
    ];
    
    return (
      <FestivalActivitiesScene 
        activities={festivalActivities}
        title="Summer Songs & Sips Festival"
        description="The festival is in full swing! Choose which activities you'd like to experience firsthand."
        completionSceneId="summer-conclusion-meeting"
      />
    );
  }
  
  // Handle festival activities selection scene for autumn
  if (gameState.currentScene === 'autumn-festival-activities') {
    const festivalActivities = [
      {
        id: 'tour-guide',
        title: 'Tour Guide',
        description: 'Match up tour itineraries with guests at the visitor information kiosk',
        color: '#FF5E5B', // Etta's color
        sceneId: 'autumn-tour-guide-intro',
        available: true
      },
      {
        id: 'crafter',
        title: 'Crafter',
        description: 'Create a custom item at the DIY crafting booth',
        color: '#9C89FF', // Senara's color
        sceneId: 'autumn-crafter-intro',
        available: true
      },
      {
        id: 'memories-date',
        title: 'Making Memories Date',
        description: 'Go on a sightseeing date around the city with someone special',
        color: '#0D98BA', // Maven's color
        sceneId: 'autumn-memories-date-intro',
        available: gameState.currentLoveInterest !== undefined
      }
    ];
    
    return (
      <FestivalActivitiesScene 
        activities={festivalActivities}
        title="Autumn Heritage & Handicrafts Festival"
        description="The festival is in full swing! Choose which activities you'd like to experience."
        completionSceneId="autumn-festival-completion"
      />
    );
  }
  
  // Handle festival activities selection scene for winter
  if (gameState.currentScene === 'winter-festival-activities') {
    const festivalActivities = [
      {
        id: 'charity-auction',
        title: 'Charity Auction',
        description: 'Bid on items in the silent auction to support local charities',
        color: '#FFB347', // Navarre's color
        sceneId: 'winter-charity-auction-intro',
        available: true
      },
      {
        id: 'gala-dance',
        title: 'Gala Dance',
        description: 'Dance with someone special at the formal winter gala',
        color: '#4CC2FF', // Xavier's color
        sceneId: 'winter-gala-dance-intro',
        available: gameState.currentLoveInterest !== undefined
      },
      {
        id: 'looking-signs',
        title: 'Looking for Signs',
        description: 'Take a walk with someone special to search for signs of love fortune',
        color: '#9C89FF', // Senara's color
        sceneId: 'winter-looking-signs-intro',
        available: gameState.currentLoveInterest !== undefined
      }
    ];
    
    return (
      <FestivalActivitiesScene 
        activities={festivalActivities}
        title="Winter Gala & Games Festival"
        description="The winter festival is underway! Choose which activities you'd like to experience."
        completionSceneId="winter-festival-completion"
      />
    );
  }
  
  // If a minigame is active, show it
  if (activeMinigame) {
    console.log(`Showing active minigame: ${activeMinigame}`);
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
