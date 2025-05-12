
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { soundManager } from '@/utils/sound';

export interface HiddenItem {
  id: string;
  name: string;
  found: boolean;
  position: {
    x: number;
    y: number;
  };
  highlighted?: boolean; // New property for hint highlighting
}

export function useBloomWithAViewGame(onComplete: (success: boolean) => void, onExit: () => void) {
  // Game config
  const gameDuration = 90; // seconds - increase from 60 to give more time
  
  // Game state
  const [hiddenItems, setHiddenItems] = useState<HiddenItem[]>([
    {
      id: 'rare-orchid',
      name: 'Rare Orchid',
      found: false,
      position: { x: 120, y: 150 }
    },
    {
      id: 'garden-gnome',
      name: 'Garden Gnome',
      found: false,
      position: { x: 300, y: 320 }
    },
    {
      id: 'butterfly',
      name: 'Butterfly',
      found: false,
      position: { x: 180, y: 80 }
    },
    {
      id: 'vintage-watering-can',
      name: 'Vintage Watering Can',
      found: false,
      position: { x: 250, y: 250 }
    },
    {
      id: 'stone-sculpture',
      name: 'Stone Sculpture',
      found: false,
      position: { x: 70, y: 200 }
    }
  ]);
  
  const [clickPosition, setClickPosition] = useState<{x: number, y: number} | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintCooldown, setHintCooldown] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(gameDuration);
  
  // Play sound safely with fallbacks
  const playSoundSafely = (soundId: string) => {
    try {
      console.log(`🔊 Attempting to play sound: ${soundId}`);
      soundManager.playSFX(soundId);
    } catch (error) {
      console.error(`Failed to play sound ${soundId}:`, error);
      
      // Try alternative sound IDs with different capitalization
      try {
        const altSoundId = soundId.replace('bloomWithAView', 'bloomwithAView');
        console.log(`🔊 Trying alternative sound ID: ${altSoundId}`);
        soundManager.playSFX(altSoundId);
      } catch (altError) {
        console.error(`Failed to play alternative sound ${altError}`);
      }
    }
  };
  
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
        setHiddenItems(prev => 
          prev.map(i => i.id === item.id ? { ...i, found: true } : i)
        );
        
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
      playSoundSafely('game-lose');
      toast.error("Time's up!");
      setTimeout(() => {
        onComplete(false);
      }, 2000);
      return;
    }
    
    if (gameComplete) return;
    
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
      playSoundSafely('game-win');
      toast.success("You found all the hidden items!");
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    }
  }, [hiddenItems, gameComplete, onComplete]);
  
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
      setHiddenItems(prev => 
        prev.map(item => ({...item, highlighted: false}))
      );
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
        soundManager.stopMusic(); // Stop music before exiting
        onExit();
      }
    }
  };

  return {
    hiddenItems,
    clickPosition,
    showHint,
    hintCooldown,
    gameComplete,
    timeRemaining,
    handleSceneClick,
    handleHintClick,
    handleExit
  };
}
