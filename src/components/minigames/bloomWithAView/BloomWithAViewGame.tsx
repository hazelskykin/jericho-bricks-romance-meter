
import React, { useEffect, useState } from 'react';
import MinigameContainer from '../MinigameContainer';
import { BloomWithAViewScene } from './index';
import BloomWithAViewItemList from './BloomWithAViewItemList';
import GameStatusMessage from '../common/GameStatusMessage';
import { Button } from '@/components/ui/button';
import { useBloomWithAViewGame } from '@/hooks/useBloomWithAViewGame';
import { Search, CheckCircle } from 'lucide-react';
import { soundManager } from '@/utils/sound';
import { toast } from 'sonner';
import SoundToggle from '../common/SoundToggle';

interface BloomWithAViewGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const BloomWithAViewGame: React.FC<BloomWithAViewGameProps> = ({ 
  onComplete, 
  onExit 
}) => {
  // Debug state to track sound loading attempts
  const [soundLoadAttempts, setSoundLoadAttempts] = useState(0);
  
  const {
    hiddenItems,
    clickPosition,
    showHint,
    hintCooldown,
    gameComplete,
    handleSceneClick,
    handleHintClick,
    handleExit,
    checkCompletion
  } = useBloomWithAViewGame(onComplete, onExit);
  
  // Calculate found items count
  const foundItemsCount = hiddenItems.filter(item => item.found).length;
  const totalItems = hiddenItems.length;

  // Check completion on found items change
  useEffect(() => {
    if (foundItemsCount === totalItems) {
      checkCompletion();
    }
  }, [foundItemsCount, totalItems, checkCompletion]);

  // Handle scene click - extracts the coordinates from the event
  const handleGameSceneClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    handleSceneClick(x, y);
  };

  // Start background music when component mounts with improved error handling
  useEffect(() => {
    console.log("🎵 Attempting to load and play BloomWithAView music...");
    
    // Function to try to play the gameplay music
    const tryPlaySound = async () => {
      try {
        console.log('🎵 Playing background music: bloomWithAView-loop-gameplay.mp3');
        soundManager.playMusic('bloomWithAView-loop-gameplay.mp3', { loop: true, volume: 0.7 });
        console.log('🎵 Successfully started music');
      } catch (err) {
        console.warn('Failed to play music:', err);
        setSoundLoadAttempts(prev => prev + 1);
        
        if (soundLoadAttempts < 3) {
          // Try again after a delay
          setTimeout(() => {
            console.log("Retrying music playback...");
            tryPlaySound();
          }, 1000);
        } else {
          toast.error("Could not play game music", {
            description: "Sound effects may be limited",
            duration: 3000
          });
        }
      }
    };
    
    // Make an initial attempt to play sounds
    tryPlaySound();
    
    // Cleanup function to stop music when component unmounts
    return () => {
      console.log("🎵 Stopping BloomWithAView music");
      soundManager.stopMusic();
    };
  }, [soundLoadAttempts]);

  // Handle completion
  const handleCompleteGame = () => {
    onComplete(true);
  };

  return (
    <MinigameContainer
      title="Bloom With A View"
      instructions="Find all the hidden items in the garden scene. Use the hint button if you get stuck!"
      onComplete={onComplete}
      onExit={handleExit}
    >
      <div className="flex flex-col md:flex-row gap-4 h-full">
        {/* Left side: Garden scene */}
        <div className="flex-1 relative">
          <div className="bg-purple-900/20 p-4 rounded-lg mb-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-purple-400" />
              <span className="text-white text-lg font-medium">Found: {foundItemsCount}/{totalItems}</span>
            </div>
            
            {/* Sound toggle at the top */}
            <div>
              <SoundToggle showMusicToggle={true} />
            </div>
          </div>
          
          <BloomWithAViewScene 
            hiddenItems={hiddenItems}
            clickPosition={clickPosition}
            showHint={showHint}
            onClick={handleGameSceneClick}
            foundItemCount={foundItemsCount}
            totalItemCount={totalItems}
          />
          
          <div className="mt-4 flex justify-between items-center">
            <Button 
              onClick={handleHintClick}
              disabled={hintCooldown > 0 || gameComplete}
              className="bg-purple-700 hover:bg-purple-800"
            >
              {hintCooldown > 0 ? `Hint (${hintCooldown}s)` : 'Get Hint'}
            </Button>
            
            <div className="text-sm text-white/70">
              {showHint && "Hint active! Look for the highlighted item."}
            </div>
          </div>
        </div>
        
        {/* Right side: Items list */}
        <div className="w-full md:w-64 shrink-0">
          <BloomWithAViewItemList 
            items={hiddenItems} 
          />
        </div>
      </div>
      
      {gameComplete && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-md text-center">
            <div className="mb-4 flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Success!</h2>
            <p className="text-gray-300 mb-6">You've found all the hidden items!</p>
            <Button onClick={handleCompleteGame} className="px-8">
              Close
            </Button>
          </div>
        </div>
      )}
    </MinigameContainer>
  );
};

export default BloomWithAViewGame;
