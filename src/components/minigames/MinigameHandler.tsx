
import React from 'react';
import BroomsAwayGame from './broomsAway/BroomsAwayGame';
import MudFlingGame from './mudFling/MudFlingGame';
import BloomWithAViewGame from './bloomWithAView/BloomWithAViewGame';
import SerenadeGame from './serenade/SerenadeGame';
import SpokenWordGame from './spokenWord/SpokenWordGame';
import WhatsOnTapGame from './whatsOnTap/WhatsOnTapGame';

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
  switch (activeMinigame) {
    // Spring minigames
    case 'broomsAway':
      return <BroomsAwayGame onComplete={completeMinigame} onExit={exitMinigame} />;
    case 'mudFling':
      return <MudFlingGame onComplete={completeMinigame} onExit={exitMinigame} />;
    case 'bloomWithAView':
      return <BloomWithAViewGame onComplete={completeMinigame} onExit={exitMinigame} />;
    
    // Summer minigames
    case 'serenade':
      return <SerenadeGame onComplete={completeMinigame} onExit={exitMinigame} />;
    case 'spokenWord':
      return <SpokenWordGame onComplete={completeMinigame} onExit={exitMinigame} />;
    case 'whatsOnTap':
      return <WhatsOnTapGame onComplete={completeMinigame} onExit={exitMinigame} />;
    
    default:
      return null;
  }
};

export default MinigameHandler;
