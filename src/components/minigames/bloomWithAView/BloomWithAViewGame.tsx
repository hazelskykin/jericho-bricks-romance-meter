
import React, { useEffect, useState } from 'react';
import MinigameContainer from '../MinigameContainer';
import BloomWithAViewScene from './BloomWithAViewScene';
import BloomWithAViewItemList from './BloomWithAViewItemList';
import GameStatusMessage from '../common/GameStatusMessage';
import { Button } from '@/components/ui/button';
import { useBloomWithAViewGame } from '@/hooks/useBloomWithAViewGame';
import { Search, Clock } from 'lucide-react';
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
    timeRemaining,
    handleSceneClick,
    handleHintClick,
    handleExit
  } = useBloomWithAViewGame(onComplete, onExit);
  
  // Calculate found items count
  const foundItemsCount = hiddenItems.filter(item => item.found).length;
  const totalItems = hiddenItems.length;

  // Start background music when component mounts with improved error handling
  useEffect(() => {
    console.log("🎵 Attempting to load and play BloomWithAView music...");
    
    // Function to try to play the gameplay music
    const tryPlaySound = async () => {
      try {
        console.log('🎵 Playing background music: bloomWithAView-loop-gameplay');
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
  }, []);

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
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              <span className="text-white text-lg font-medium">{timeRemaining}s</span>
              
              <SoundToggle showMusicToggle={true} />
            </div>
          </div>
          
          <BloomWithAViewScene 
            hiddenItems={hiddenItems}
            clickPosition={clickPosition}
            showHint={showHint}
            onClick={handleSceneClick}
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
        <GameStatusMessage 
          status={foundItemsCount === totalItems ? 'won' : 'lost'}
          winMessage="Congratulations! You found all the hidden items in the garden!"
          loseMessage="Time's up! Better luck next time."
        />
      )}
    </MinigameContainer>
  );
};

export default BloomWithAViewGame;
