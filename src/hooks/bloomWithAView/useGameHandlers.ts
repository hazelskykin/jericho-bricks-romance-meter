
import { useCallback } from 'react';
import { HiddenItem } from './types';
import { soundManager } from '@/utils/sound';

interface HandlersProps {
  gameState: {
    hiddenItems: HiddenItem[];
    clickPosition: { x: number, y: number } | null;
    showHint: boolean;
    hintCooldown: number;
    gameComplete: boolean;
    gameExited: boolean;
  };
  setHiddenItems: React.Dispatch<React.SetStateAction<HiddenItem[]>>;
  setClickPosition: React.Dispatch<React.SetStateAction<{ x: number, y: number } | null>>;
  setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
  setHintCooldown: React.Dispatch<React.SetStateAction<number>>;
  setGameExited: React.Dispatch<React.SetStateAction<boolean>>;
  gameComplete: boolean;
  playSoundSafely: (soundId: string) => void;
  onExit: () => void;
}

export function useGameHandlers({
  gameState,
  setHiddenItems,
  setClickPosition,
  setShowHint,
  setHintCooldown,
  setGameExited,
  gameComplete,
  playSoundSafely,
  onExit
}: HandlersProps) {
  // Handle click on the scene
  const handleSceneClick = useCallback((x: number, y: number) => {
    if (gameComplete) return;
    
    // Hide any active hint
    setShowHint(false);
    
    // Set click position for visual feedback
    setClickPosition({ x, y });
    
    // Clear click position after animation
    setTimeout(() => setClickPosition(null), 300);
    
    // Play click sound
    playSoundSafely('bloomWithAView-effect-rustle');
    
    // Check if we hit any items
    setHiddenItems(currentItems => {
      let updatedItems = [...currentItems];
      let foundItem = false;
      
      // Check each item
      updatedItems = updatedItems.map(item => {
        if (item.found) return item; // Skip already found items
        
        // Calculate distance between click and item
        const dx = item.position.x - x;
        const dy = item.position.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If click is close enough, mark as found
        if (distance < 40) {
          console.log(`Found item: ${item.name} at distance ${distance}`);
          foundItem = true;
          playSoundSafely('bloomWithAView-success');
          return { ...item, found: true, highlighted: false };
        }
        
        return { ...item, highlighted: false };
      });
      
      return updatedItems;
    });
  }, [gameComplete, playSoundSafely, setClickPosition, setHiddenItems, setShowHint]);
  
  // Handle hint button click
  const handleHintClick = useCallback(() => {
    if (gameComplete || gameState.hintCooldown > 0) return;
    
    // Enable hint mode
    setShowHint(true);
    
    // Set the hint cooldown
    setHintCooldown(10);
    
    // Start cooldown timer
    const interval = setInterval(() => {
      setHintCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Find an unfound item to highlight
    setHiddenItems(currentItems => {
      const unfoundItems = currentItems.filter(item => !item.found);
      if (unfoundItems.length === 0) return currentItems;
      
      const randomIndex = Math.floor(Math.random() * unfoundItems.length);
      
      return currentItems.map(item => 
        item.id === unfoundItems[randomIndex].id
          ? { ...item, highlighted: true }
          : { ...item, highlighted: false }
      );
    });
  }, [gameComplete, gameState.hintCooldown, setHiddenItems, setHintCooldown, setShowHint]);
  
  // Handle exit button click
  const handleExit = useCallback(() => {
    console.log("Exit button clicked, marking game as exited");
    setGameExited(true);
    
    // Stop any sounds
    try {
      soundManager.stopMusic();
    } catch (err) {
      console.warn('Error stopping music:', err);
    }
    
    // Call the provided exit handler after a short delay
    setTimeout(() => {
      onExit();
    }, 100);
  }, [onExit, setGameExited]);

  return {
    handleSceneClick,
    handleHintClick,
    handleExit
  };
}
