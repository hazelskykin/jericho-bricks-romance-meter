
import React from 'react';
import MinigameContainer from '../MinigameContainer';
import { useWhatsOnTap } from './useWhatsOnTap';
import InstructionsView from './InstructionsView';
import GamePlayView from './GamePlayView';
import ResultsView from './ResultsView';

interface WhatsOnTapGameProps {
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

const WhatsOnTapGame: React.FC<WhatsOnTapGameProps> = ({ onComplete, onExit }) => {
  const {
    gameStage,
    score,
    orders,
    currentPour,
    pourProgress,
    isPouringActive,
    timeRemaining,
    ordersFulfilled,
    startGame,
    startPour,
    stopPour,
    handleComplete
  } = useWhatsOnTap(onComplete);

  return (
    <MinigameContainer
      title="What's On-Tap?"
      instructions={
        gameStage === 'instructions' 
          ? "Work the festival's Beer Tent and fulfill drink orders. Pour carefully to match customer preferences!"
          : gameStage === 'playing'
          ? "Hold the tap button to pour, release when you think it's perfect. Match the drink to the right order!"
          : "Shift completed!"
      }
      onComplete={handleComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center gap-6">
        {gameStage === 'instructions' && (
          <InstructionsView onStartGame={startGame} />
        )}

        {gameStage === 'playing' && (
          <GamePlayView
            orders={orders}
            currentPour={currentPour}
            pourProgress={pourProgress}
            timeRemaining={timeRemaining}
            score={score}
            ordersFulfilled={ordersFulfilled}
            isPouringActive={isPouringActive}
            onStartPour={startPour}
            onStopPour={stopPour}
          />
        )}

        {gameStage === 'results' && (
          <ResultsView
            score={score}
            ordersFulfilled={ordersFulfilled}
            onComplete={handleComplete}
          />
        )}
      </div>
    </MinigameContainer>
  );
};

export default WhatsOnTapGame;
