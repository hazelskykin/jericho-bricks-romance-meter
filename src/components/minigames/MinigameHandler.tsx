
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
  console.log(`MinigameHandler rendering with activeMinigame: ${activeMinigame}`);
  
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
      return null;
  }
};

export default MinigameHandler;
