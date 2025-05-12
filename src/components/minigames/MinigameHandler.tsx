
import React, { useEffect } from 'react';
import { MinigameType } from '@/types/minigames';
import PlaceholderMinigame from './PlaceholderMinigame';
import { toast } from 'sonner';
import BloomWithAViewGame from './bloomWithAView/BloomWithAViewGame';
import { assetManager } from '@/utils/assetManager';

interface MinigameHandlerProps {
  activeMinigame: MinigameType | null;
  completeMinigame: (success: boolean, score?: number) => void;
  exitMinigame: () => void;
}

/**
 * MinigameHandler component that manages the active minigame
 * Currently implements BloomWithAView minigame, others use placeholders
 */
const MinigameHandler: React.FC<MinigameHandlerProps> = ({ 
  activeMinigame, 
  completeMinigame, 
  exitMinigame 
}) => {
  console.log(`MinigameHandler rendering with activeMinigame: ${activeMinigame}`);
  
  // Pre-load minigame assets when component mounts
  useEffect(() => {
    if (activeMinigame === 'bloomWithAView') {
      console.log('Preloading BloomWithAView assets');
      
      // Explicitly check if files exist at multiple paths to handle case sensitivity and file extension issues
      const checkFilePaths = async () => {
        const paths = [
          // Garden background - PNG is confirmed by the user
          '/assets/minigames/spring/bloomWithAView/garden-background.png',
          // Hidden objects sprite
          '/assets/minigames/spring/bloomWithAView/hidden-objects.png',
          // Try other possible paths too
          '/assets/minigames/spring/bloomwithAView/garden-background.png',
          '/assets/minigames/spring/bloomwithAView/hidden_objects_sprites.png',
          '/assets/backgrounds/garden-background.png',
        ];
        
        console.log("Checking file paths:", paths);
        
        for (const path of paths) {
          try {
            const response = await fetch(path, { method: 'HEAD' });
            console.log(`Path ${path}: ${response.ok ? 'EXISTS' : 'NOT FOUND'}`);
          } catch (error) {
            console.warn(`Error checking path ${path}:`, error);
          }
        }
      };
      
      // Run the path checking
      checkFilePaths();
      
      // Use asset manager to preload assets with specific paths
      const assetPaths = [
        // PNG background (as confirmed by user)
        '/assets/minigames/spring/bloomWithAView/garden-background.png',
        // Hidden objects assets
        '/assets/minigames/spring/bloomWithAView/hidden-objects.png',
        '/assets/minigames/spring/bloomwithAView/hidden-objects.png'
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
