
import React, { useEffect } from 'react';
import MinigameContainer from '../MinigameContainer';
import BloomWithAViewScene from './BloomWithAViewScene';
import BloomWithAViewItemList from './BloomWithAViewItemList';
import GameStatusMessage from '../common/GameStatusMessage';
import { Button } from '@/components/ui/button';
import { useBloomWithAViewGame } from '@/hooks/useBloomWithAViewGame';
import { Search, Clock, VolumeX, Volume2 } from 'lucide-react';
import { soundManager } from '@/utils/sound';

interface BloomWithAViewGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const BloomWithAViewGame: React.FC<BloomWithAViewGameProps> = ({ 
  onComplete, 
  onExit 
}) => {
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
  
  // Sound toggle state
  const [isMuted, setIsMuted] = React.useState(false);
  
  // Calculate found items count
  const foundItemsCount = hiddenItems.filter(item => item.found).length;
  const totalItems = hiddenItems.length;

  // Start background music when component mounts
  useEffect(() => {
    try {
      soundManager.playMusic('bloomwithAView-loop-gameplay.mp3', { loop: true });
      
      // Cleanup function to stop music when component unmounts
      return () => {
        soundManager.stopMusic();
      };
    } catch (error) {
      console.error('Failed to play background music:', error);
    }
  }, []);

  // Toggle sound
  const toggleSound = () => {
    setIsMuted(!isMuted);
    soundManager.setMuted(!isMuted);
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
              
              {/* Sound toggle button */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSound}
                className="ml-2"
              >
                {isMuted ? 
                  <VolumeX className="h-5 w-5 text-purple-400" /> : 
                  <Volume2 className="h-5 w-5 text-purple-400" />
                }
              </Button>
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
