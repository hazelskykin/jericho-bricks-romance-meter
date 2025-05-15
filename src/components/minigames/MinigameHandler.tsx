import React, { useEffect } from 'react';
import { MinigameType } from '@/types/minigames';
import PlaceholderMinigame from './PlaceholderMinigame';
import { toast } from 'sonner';
import BloomWithAViewGame from './bloomWithAView/BloomWithAViewGame';
import CrafterGame from './crafter/CrafterGame';
import SpokenWordGame from './spokenWord/SpokenWordGame';
import LookingSignsGame from './lookingSigns/LookingSignsGame';
import MemoriesDateGame from './memoriesDate/MemoriesDateGame';
import { assetManager } from '@/utils/assetManager';

interface MinigameHandlerProps {
  activeMinigame: MinigameType | null;
  completeMinigame: (success: boolean, score?: number) => void;
  exitMinigame: () => void;
}

/**
 * MinigameHandler component that manages the active minigame
 * Currently implements BloomWithAView, Crafter, SpokenWord, LookingSigns, and MemoriesDate minigames, others use placeholders
 */
const MinigameHandler: React.FC<MinigameHandlerProps> = ({ 
  activeMinigame, 
  completeMinigame, 
  exitMinigame 
}) => {
  console.log(`MinigameHandler rendering with activeMinigame: ${activeMinigame}`);
  
  // Pre-load minigame assets when component mounts
  useEffect(() => {
    if (activeMinigame === 'memoriesDate') {
      console.log('Preloading MemoriesDate assets');
      
      // Preload memoriesDate assets - use individual files
      const assetPaths = [
        '/assets/minigames/autumn/memoriesDate/market-backdrop.png',
        '/assets/minigames/autumn/memoriesDate/overlook-backdrop.png',
        '/assets/minigames/autumn/memoriesDate/boardwalk-backdrop.png',
        '/assets/minigames/autumn/memoriesDate/frames-neon.png',
        '/assets/minigames/autumn/memoriesDate/frames-gears.png',
        '/assets/minigames/autumn/memoriesDate/frames-circle.png',
        '/assets/minigames/autumn/memoriesDate/stickers-bestday.png',
        '/assets/minigames/autumn/memoriesDate/stickers-kitten.png',
        '/assets/minigames/autumn/memoriesDate/stickers-sparklehearts.png',
        '/assets/minigames/autumn/memoriesDate/stickers-sparklegears.png'
      ];
      
      assetManager.preloadAssets(assetPaths, (loaded, total) => {
        console.log(`Loaded ${loaded}/${total} MemoriesDate assets`);
      }).then(() => {
        console.log('All MemoriesDate assets preloaded');
      }).catch(error => {
        console.error('Failed to preload MemoriesDate assets:', error);
        // Continue anyway, the game has fallbacks
      });
    }
    else if (activeMinigame === 'crafter') {
      console.log('Preloading Crafter assets');
      
      // Preload crafter assets - use individual files instead of sprite sheet
      const assetPaths = [
        '/assets/minigames/autumn/crafter/workshop-background.png',
        '/assets/minigames/autumn/crafter/fabricBase.png',
        '/assets/minigames/autumn/crafter/metalBase.png',
        '/assets/minigames/autumn/crafter/woodBase.png',
        '/assets/minigames/autumn/crafter/accents-button.png',
        '/assets/minigames/autumn/crafter/accents-gearcharm.png',
        '/assets/minigames/autumn/crafter/accents-glass.png',
        '/assets/minigames/autumn/crafter/accents-leaf.png',
        '/assets/minigames/autumn/crafter/accents-ribbon.png'
      ];
      
      assetManager.preloadAssets(assetPaths, (loaded, total) => {
        console.log(`Loaded ${loaded}/${total} Crafter assets`);
      }).then(() => {
        console.log('All Crafter assets preloaded');
      }).catch(error => {
        console.error('Failed to preload Crafter assets:', error);
        // Continue anyway, the game has fallbacks
      });
    }
    else if (activeMinigame === 'bloomWithAView') {
      console.log('Preloading BloomWithAView assets');
      
      // Use asset manager to preload assets with specific paths
      const assetPaths = [
        // Garden background (JPG version)
        '/assets/minigames/spring/bloomwithAView/garden-background.jpg',
        // Hidden objects assets
        '/assets/minigames/spring/bloomwithAView/hidden-objects.png',
        // Flower tiles
        '/assets/minigames/spring/bloomwithAView/flower-tiles.png'
      ];
      
      assetManager.preloadAssets(assetPaths, (loaded, total) => {
        console.log(`Loaded ${loaded}/${total} BloomWithAView assets`);
      }).then(() => {
        console.log('All BloomWithAView assets preloaded');
      }).catch(error => {
        console.error('Failed to preload assets:', error);
        // Continue anyway, the game has fallbacks
      });
    }
    else if (activeMinigame === 'spokenWord') {
      console.log('Preloading SpokenWord assets');
      
      // Preload spoken word assets - use sprite sheets instead of individual files
      const assetPaths = [
        '/assets/minigames/summer/spokenWord/paper-background.png',
        '/assets/minigames/summer/spokenWord/theme-icons.png',
        '/assets/minigames/summer/spokenWord/mastery-icons.png'
      ];
      
      assetManager.preloadAssets(assetPaths, (loaded, total) => {
        console.log(`Loaded ${loaded}/${total} SpokenWord assets`);
      }).then(() => {
        console.log('All SpokenWord assets preloaded');
      }).catch(error => {
        console.error('Failed to preload SpokenWord assets:', error);
        // Continue anyway, the game has fallbacks
      });
    }
    else if (activeMinigame === 'lookingSigns') {
      console.log('Preloading LookingSigns assets');
      
      // Preload lookingSigns assets
      const assetPaths = [
        '/assets/minigames/winter/lookingSigns/signs-background.png',
        '/assets/minigames/winter/lookingSigns/sign-clues.png'
      ];
      
      assetManager.preloadAssets(assetPaths, (loaded, total) => {
        console.log(`Loaded ${loaded}/${total} LookingSigns assets`);
      }).then(() => {
        console.log('All LookingSigns assets preloaded');
      }).catch(error => {
        console.error('Failed to preload LookingSigns assets:', error);
        // Continue anyway, the game has fallbacks
      });
    }
    
    // Debug log when minigame changes
    if (activeMinigame) {
      console.log(`MinigameHandler: Starting minigame ${activeMinigame}`);
    }
  }, [activeMinigame]);
  
  // Safety check for invalid minigame type
  useEffect(() => {
    // If we somehow get an invalid minigame type, handle gracefully
    if (activeMinigame && !isValidMinigameType(activeMinigame)) {
      console.error(`Invalid minigame type: ${activeMinigame}`);
      toast.error('Error loading minigame. Returning to game.');
      exitMinigame();
    }
  }, [activeMinigame, exitMinigame]);
  
  // Handle minigame completion with proper completion flag
  const handleMinigameComplete = (success: boolean, score?: number) => {
    console.log(`Minigame ${activeMinigame} completed with success: ${success}, score: ${score}`);
    
    // Use a small delay to ensure proper transition and prevent multiple completions
    setTimeout(() => {
      completeMinigame(success, score);
    }, 500);
  };
  
  // Handle minigame exit - ensure proper cleanup
  const handleExitMinigame = () => {
    console.log(`Exiting minigame ${activeMinigame}`);
    
    // Add small delay to ensure proper transition
    setTimeout(() => {
      exitMinigame();
    }, 100);
  };
  
  if (!activeMinigame) {
    return null;
  }

  // Render the appropriate minigame based on type
  switch (activeMinigame) {
    case 'bloomWithAView':
      return (
        <BloomWithAViewGame
          onComplete={completeMinigame}
          onExit={exitMinigame}
        />
      );
    case 'crafter':
      return (
        <CrafterGame
          onComplete={completeMinigame}
          onExit={exitMinigame}
        />
      );
    case 'spokenWord':
      return (
        <SpokenWordGame
          onComplete={completeMinigame}
          onExit={exitMinigame}
        />
      );
    case 'lookingSigns':
      return (
        <LookingSignsGame
          onComplete={completeMinigame}
          onExit={exitMinigame}
        />
      );
    case 'memoriesDate':
      return (
        <MemoriesDateGame
          onComplete={completeMinigame}
          onExit={exitMinigame}
        />
      );
    default:
      return (
        <PlaceholderMinigame
          minigameType={activeMinigame}
          onComplete={completeMinigame}
          onExit={exitMinigame}
        />
      );
  }
};

// Helper function to validate minigame types
function isValidMinigameType(type: string): boolean {
  const validTypes = [
    // Spring minigames
    'broomsAway', 'mudFling', 'bloomWithAView',
    // Summer minigames
    'serenade', 'spokenWord', 'whatsOnTap',
    // Autumn minigames
    'tourGuide', 'crafter', 'memoriesDate',
    // Winter minigames
    'charityAuction', 'galaDance', 'lookingSigns'
  ];
  
  return validTypes.includes(type);
}

export default MinigameHandler;
