
import { useEffect } from 'react';
import { toast } from 'sonner';
import { GameState } from './types';
import { useGameStateSetters } from './useGameState';
import { soundManager } from '@/utils/sound';

interface GameHandlersProps {
  gameState: GameState;
  setHiddenItems: React.Dispatch<React.SetStateAction<any[]>>;
  setClickPosition: React.Dispatch<React.SetStateAction<{x: number, y: number} | null>>;
  setShowHint: React.Dispatch<React.SetStateAction<boolean>>;
  setHintCooldown: React.Dispatch<React.SetStateAction<number>>;
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
  gameComplete,
  playSoundSafely,
  onExit
}: GameHandlersProps) {
  const { hiddenItems, clickPosition, hintCooldown } = gameState;
  const { markItemFound, highlightItem, resetHighlights } = useGameStateSetters(gameState);

  // Show click feedback animation
  useEffect(() => {
    if (clickPosition) {
      setTimeout(() => {
        setClickPosition(null);
      }, 500);
    }
  }, [clickPosition, setClickPosition]);
  
  // Handle hint cooldown
  useEffect(() => {
    if (hintCooldown > 0) {
      const timer = setTimeout(() => {
        setHintCooldown(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hintCooldown, setHintCooldown]);

  // Handle clicks on the garden scene
  const handleSceneClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (gameComplete) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setClickPosition({ x, y });
    
    // Play click sound
    playSoundSafely('click');
    
    // Check if click is near any hidden items
    const itemSize = 60; // Increase clickable area size
    let foundItem = false;
    
    hiddenItems.forEach(item => {
      if (item.found) return; // Skip already found items
      
      const distance = Math.sqrt(
        Math.pow(x - item.position.x, 2) + 
        Math.pow(y - item.position.y, 2)
      );
      
      if (distance < itemSize/2) {
        // Found an item!
        setHiddenItems(prev => markItemFound(item.id));
        
        // Play success sound
        playSoundSafely('bloomWithAView-success');
        toast.success(`You found the ${item.name}!`);
        foundItem = true;
      }
    });
    
    if (!foundItem) {
      // Play miss sound if no item was found
      playSoundSafely('item-miss');
    }
  };
  
  // Handle hint button click - improved to highlight an unfound item
  const handleHintClick = () => {
    if (hintCooldown > 0 || gameComplete) return;
    
    // Find unfound items
    const unfoundItems = hiddenItems.filter(item => !item.found);
    if (unfoundItems.length === 0) return;
    
    // Select a random unfound item to highlight
    const randomIndex = Math.floor(Math.random() * unfoundItems.length);
    const itemToHighlight = unfoundItems[randomIndex];
    
    setHiddenItems(prev => 
      prev.map(item => 
        item.id === itemToHighlight.id 
          ? { ...item, highlighted: true }
          : item
      )
    );
    
    setShowHint(true);
    setHintCooldown(10); // 10 second cooldown
    playSoundSafely('hint');
    
    toast.info(`Hint: Look for the ${itemToHighlight.name}!`);
    
    // Remove highlight after 3 seconds
    setTimeout(() => {
      setShowHint(false);
      setHiddenItems(prev => resetHighlights());
    }, 3000);
  };
  
  // Handle exit button properly
  const handleExit = () => {
    if (gameComplete) {
      // Game is already complete, so just exit
      onExit();
    } else {
      // Game is not complete, ask for confirmation
      if (window.confirm("Are you sure you want to exit? Your progress will be lost.")) {
        soundManager.stopMusic(); // Now correctly using the imported soundManager
        onExit();
      }
    }
  };

  return {
    handleSceneClick,
    handleHintClick,
    handleExit
  };
}
