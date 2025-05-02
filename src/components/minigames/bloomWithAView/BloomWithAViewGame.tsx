
import React, { useState, useEffect } from 'react';
import MinigameContainer from '../MinigameContainer';
import { Button } from '@/components/ui/button';
import BloomWithAViewScene from './BloomWithAViewScene';
import BloomWithAViewItemList from './BloomWithAViewItemList';
import GameStatusMessage from '../common/GameStatusMessage';
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

interface BloomWithAViewGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const BloomWithAViewGame: React.FC<BloomWithAViewGameProps> = ({ onComplete, onExit }) => {
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
  
  // Check for game completion
  useEffect(() => {
    const allFound = hiddenItems.every(item => item.found);
    
    if (allFound && !gameComplete) {
      setGameComplete(true);
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    }
  }, [hiddenItems]);
  
  // Handle hint button click
  const handleHintClick = () => {
    if (hintCooldown > 0) return;
    
    setShowHint(true);
    setHintCooldown(10); // 10 second cooldown
    
    setTimeout(() => {
      setShowHint(false);
    }, 3000);
  };
  
  return (
    <MinigameContainer
      title="Bloom with a View"
      instructions="Find all 5 hidden items in the garden art fair. Click around to discover them!"
      onComplete={onComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center">
        {/* Items to find list */}
        <BloomWithAViewItemList items={hiddenItems} />
        
        {/* Garden scene */}
        <BloomWithAViewScene 
          hiddenItems={hiddenItems} 
          clickPosition={clickPosition}
          showHint={showHint}
          onClick={handleSceneClick}
        />
        
        {/* Hint button */}
        <div className="mt-4">
          <Button
            variant="outline"
            className="border-[#9b87f5]/30 hover:bg-[#9b87f5]/10"
            onClick={handleHintClick}
            disabled={hintCooldown > 0}
          >
            {hintCooldown > 0 ? `Hint (${hintCooldown}s)` : 'Get Hint'}
          </Button>
        </div>
        
        {/* Game completion message */}
        {gameComplete && (
          <GameStatusMessage 
            status="won"
            winMessage="Great job! You found all the hidden items in the garden."
            loseMessage="" // Not used in this game
          />
        )}
      </div>
    </MinigameContainer>
  );
};

export default BloomWithAViewGame;
