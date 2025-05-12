
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
    
    // Function to try multiple sound paths until one works
    const tryPlaySound = async () => {
      const musicPaths = [
        'bloomWithAView-loop-gameplay',
        'bloomwithAView-loop-gameplay',
        'bloom-loop-gameplay',
        'minigame-loop'
      ];
      
      let success = false;
      
      // Try each music path
      for (const path of musicPaths) {
        try {
          console.log(`🎵 Attempting to play music: ${path}`);
          soundManager.playMusic(`${path}.mp3`, { loop: true, volume: 0.7 });
          console.log(`🎵 Successfully started music with path: ${path}`);
          success = true;
          break;
        } catch (err) {
          console.warn(`Failed to play music ${path}:`, err);
        }
      }
      
      if (!success) {
        console.error('Failed to play any background music');
        setSoundLoadAttempts(prev => prev + 1);
        
        if (soundLoadAttempts < 3) {
          // Try again after a delay (sometimes the sound system needs initialization time)
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
      
      // Also try to play ambient sounds
      try {
        setTimeout(() => {
          soundManager.playSFX('bloomWithAView-ambience-birdsong', { volume: 0.5 });
          console.log("🎵 Playing ambient birdsong");
        }, 1000);
      } catch (ambientErr) {
        console.warn("Could not play ambient sounds:", ambientErr);
      }
    };
    
    // Make an initial attempt to play sounds
    tryPlaySound();
    
    // Cleanup function to stop music when component unmounts
    return () => {
      console.log("🎵 Stopping BloomWithAView music");
      soundManager.stopMusic();
      soundManager.stopAllSFX();
    };
  }, []);

  // Safe sound player function
  const playSoundEffect = (soundId: string) => {
    try {
      // Try with original ID first
      soundManager.playSFX(soundId);
    } catch (err) {
      console.warn(`Failed to play sound ${soundId}, trying alternatives`);
      
      // Try alternatives with different casing
      const alternatives = [
        soundId.replace('bloomWithAView', 'bloomwithAView'),
        soundId.replace('With', 'with'),
        soundId.replace('-', '_'),
        // Generic fallback sound if nothing else works
        'click' 
      ];
      
      for (const alt of alternatives) {
        try {
          soundManager.playSFX(alt);
          return; // Stop if any sound plays successfully
        } catch (altErr) {
          // Continue to next alternative
        }
      }
    }
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
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              <span className="text-white text-lg font-medium">{timeRemaining}s</span>
              
              {/* Sound toggle using component */}
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
