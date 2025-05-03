
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface HiddenItem {
  id: string;
  name: string;
  found: boolean;
  position: {
    x: number;
    y: number;
  };
}

export function useBloomWithAViewGame(onComplete: (success: boolean) => void) {
  // Game config
  const gameDuration = 60; // seconds
  
  // Game state
  const [hiddenItems, setHiddenItems] = useState<HiddenItem[]>([
    {
      id: 'item-1',
      name: 'Rare Orchid',
      found: false,
      position: { x: 100, y: 200 }
    },
    {
      id: 'item-2',
      name: 'Garden Gnome',
      found: false,
      position: { x: 500, y: 150 }
    },
    {
      id: 'item-3',
      name: 'Butterfly',
      found: false,
      position: { x: 300, y: 100 }
    },
    {
      id: 'item-4',
      name: 'Vintage Watering Can',
      found: false,
      position: { x: 200, y: 300 }
    },
    {
      id: 'item-5',
      name: 'Stone Sculpture',
      found: false,
      position: { x: 600, y: 250 }
    }
  ]);
  
  const [clickPosition, setClickPosition] = useState<{x: number, y: number} | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintCooldown, setHintCooldown] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  
  // Handle clicks on the garden scene
  const handleSceneClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setClickPosition({ x, y });
    
    // Check if click is near any hidden items
    const itemSize = 40; // Size of the clickable area
    hiddenItems.forEach(item => {
      const distance = Math.sqrt(
        Math.pow(x - item.position.x, 2) + 
        Math.pow(y - item.position.y, 2)
      );
      
      if (distance < itemSize/2 && !item.found) {
        // Found an item!
        setHiddenItems(prev => 
          prev.map(i => i.id === item.id ? { ...i, found: true } : i)
        );
        
        toast.success(`You found the ${item.name}!`);
      }
    });
  };
  
  // Show click feedback animation
  useEffect(() => {
    if (clickPosition) {
      setTimeout(() => {
        setClickPosition(null);
      }, 500);
    }
  }, [clickPosition]);
  
  // Handle hint cooldown
  useEffect(() => {
    if (hintCooldown > 0) {
      const timer = setTimeout(() => {
        setHintCooldown(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hintCooldown]);
  
  // Game timer
  useEffect(() => {
    if (timeRemaining <= 0 && !gameComplete) {
      // Time's up, end the game
      setGameComplete(true);
      setTimeout(() => {
        onComplete(false);
      }, 2000);
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeRemaining, gameComplete, onComplete]);
  
  // Check for game completion
  useEffect(() => {
    const allFound = hiddenItems.every(item => item.found);
    
    if (allFound && !gameComplete) {
      setGameComplete(true);
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    }
  }, [hiddenItems, gameComplete, onComplete]);
  
  // Handle hint button click
  const handleHintClick = () => {
    if (hintCooldown > 0) return;
    
    setShowHint(true);
    setHintCooldown(10); // 10 second cooldown
    
    setTimeout(() => {
      setShowHint(false);
    }, 3000);
  };

  return {
    hiddenItems,
    clickPosition,
    showHint,
    hintCooldown,
    gameComplete,
    timeRemaining,
    handleSceneClick,
    handleHintClick
  };
}
