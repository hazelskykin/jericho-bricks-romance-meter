
import React from 'react';

interface GameStatusMessageProps {
  status: 'playing' | 'won' | 'lost';
  winMessage: string;
  loseMessage: string;
}

const GameStatusMessage: React.FC<GameStatusMessageProps> = ({
  status,
  winMessage,
  loseMessage
}) => {
  if (status === 'playing') return null;
  
  return (
    <div className={`mt-4 p-3 rounded-lg text-white text-center ${
      status === 'won' ? 'bg-green-800/70' : 'bg-red-800/70'
    }`}>
      <h3 className="text-xl font-bold">
        {status === 'won' ? 'You Won!' : 'Game Over'}
      </h3>
      <p>{status === 'won' ? winMessage : loseMessage}</p>
    </div>
  );
};

export default GameStatusMessage;
