
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MinigameContainer from './MinigameContainer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface HiddenItem {
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
  const itemSize = 40; // Size of the clickable area
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
        <div className="bg-[#1A1F2C]/50 p-4 rounded-lg mb-4 w-full">
          <h3 className="font-medium text-white mb-2">Items to Find:</h3>
          <div className="grid grid-cols-5 gap-4">
            {hiddenItems.map(item => (
              <div 
                key={item.id} 
                className={`text-center p-2 rounded-lg ${item.found ? 'bg-green-800/50 text-white/80' : 'bg-gray-800/50 text-white'}`}
              >
                <span className={item.found ? 'line-through' : ''}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Garden scene */}
        <div 
          className="relative w-full h-[300px] bg-[url('/public/assets/backgrounds/city-cafe.jpg')] bg-cover bg-center rounded-lg cursor-pointer overflow-hidden"
          onClick={handleSceneClick}
        >
          {/* Item hotspots (invisible unless hint is active) */}
          {hiddenItems.map(item => (
            <motion.div 
              key={item.id}
              className={`absolute rounded-full ${item.found ? 'bg-green-500/30' : 'bg-transparent'}`}
              style={{ 
                left: item.position.x - itemSize/2, 
                top: item.position.y - itemSize/2,
                width: itemSize,
                height: itemSize
              }}
              animate={{ 
                scale: showHint && !item.found ? [1, 1.5, 1] : 1,
                opacity: showHint && !item.found ? [0, 0.7, 0] : item.found ? 0.5 : 0
              }}
              transition={{ 
                repeat: showHint && !item.found ? Infinity : 0,
                duration: 1
              }}
            />
          ))}
          
          {/* Click feedback animation */}
          {clickPosition && (
            <motion.div 
              className="absolute w-10 h-10 rounded-full border-2 border-white"
              style={{ 
                left: clickPosition.x - 20, 
                top: clickPosition.y - 20 
              }}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
        
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
          <div className="mt-4 p-3 bg-green-800/70 rounded-lg text-white text-center">
            <h3 className="text-xl font-bold">All Items Found!</h3>
            <p>Great job! You found all the hidden items in the garden.</p>
          </div>
        )}
      </div>
    </MinigameContainer>
  );
};

export default BloomWithAViewGame;
