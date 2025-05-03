
import React from 'react';
import BroomsAwayGame from './broomsAway/BroomsAwayGame';
import MudFlingGame from './mudFling/MudFlingGame';
import BloomWithAViewGame from './bloomWithAView/BloomWithAViewGame';

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
    case 'broomsAway':
      return <BroomsAwayGame onComplete={completeMinigame} onExit={exitMinigame} />;
    case 'mudFling':
      return <MudFlingGame onComplete={completeMinigame} onExit={exitMinigame} />;
    case 'bloomWithAView':
      return <BloomWithAViewGame onComplete={completeMinigame} onExit={exitMinigame} />;
    default:
      return null;
  }
};

export default MinigameHandler;
