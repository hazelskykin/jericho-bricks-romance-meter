
import React, { useEffect } from 'react';
import BroomsAwayGame from './broomsAway/BroomsAwayGame';
import MudFlingGame from './mudFling/MudFlingGame';
import BloomWithAViewGame from './bloomWithAView/BloomWithAViewGame';
import SerenadeGame from './serenade/SerenadeGame';
import SpokenWordGame from './spokenWord/SpokenWordGame';
import WhatsOnTapGame from './whatsOnTap/WhatsOnTapGame';
import { Button } from '@/components/ui/button';
import MinigameContainer from './MinigameContainer';

interface MinigameHandlerProps {
  activeMinigame: string;
  completeMinigame: (success: boolean) => void;
  exitMinigame: () => void;
}

const MinigameHandler: React.FC<MinigameHandlerProps> = ({ 
  activeMinigame, 
  completeMinigame, 
  exitMinigame 
}) => {
  console.log(`MinigameHandler rendering with activeMinigame: ${activeMinigame}`);
  
  // Use effect to log when the minigame component mounts
  useEffect(() => {
    console.log(`MinigameHandler mounted with activeMinigame: ${activeMinigame}`);
    return () => {
      console.log(`MinigameHandler unmounting for: ${activeMinigame}`);
    };
  }, [activeMinigame]);
  
  // Fallback component for minigame loading issues
  const MinigameStartPrompt = () => (
    <MinigameContainer
      title={`Play ${activeMinigame}`}
      instructions="Click the button below to start the game!"
      onComplete={completeMinigame}
      onExit={exitMinigame}
    >
      <div className="flex flex-col items-center justify-center p-8 h-full">
        <div className="mb-8 text-lg text-center">
          Ready to play <span className="font-bold text-[#9b87f5]">{activeMinigame}</span>?
        </div>
        <div className="flex gap-4">
          <Button onClick={() => completeMinigame(true)} className="bg-green-600 hover:bg-green-700">
            Start Game
          </Button>
          <Button onClick={exitMinigame} className="bg-red-600 hover:bg-red-700">
            Exit
          </Button>
        </div>
      </div>
    </MinigameContainer>
  );
  
  switch (activeMinigame) {
    // Spring minigames
    case 'broomsAway':
      console.log('Rendering BroomsAwayGame');
      return <BroomsAwayGame onComplete={completeMinigame} onExit={exitMinigame} />;
    case 'mudFling':
      console.log('Rendering MudFlingGame');
      return <MudFlingGame onComplete={completeMinigame} onExit={exitMinigame} />;
    case 'bloomWithAView':
      console.log('Rendering BloomWithAViewGame');
      return <BloomWithAViewGame onComplete={completeMinigame} onExit={exitMinigame} />;
    
    // Summer minigames
    case 'serenade':
      console.log('Rendering SerenadeGame');
      return <SerenadeGame onComplete={completeMinigame} onExit={exitMinigame} />;
    case 'spokenWord':
      console.log('Rendering SpokenWordGame');
      return <SpokenWordGame onComplete={completeMinigame} onExit={exitMinigame} />;
    case 'whatsOnTap':
      console.log('Rendering WhatsOnTapGame');
      return <WhatsOnTapGame onComplete={completeMinigame} onExit={exitMinigame} />;
    
    default:
      console.error(`No matching minigame component found for: ${activeMinigame}`);
      // Provide a fallback UI to help debug and ensure users don't get stuck
      return <MinigameStartPrompt />;
  }
};

export default MinigameHandler;
