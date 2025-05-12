
import React from 'react';

interface GameProgressIndicatorProps {
  foundItemCount: number;
  totalItemCount: number;
}

const GameProgressIndicator: React.FC<GameProgressIndicatorProps> = ({
  foundItemCount,
  totalItemCount
}) => {
  return (
    <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg z-20">
      {foundItemCount} / {totalItemCount}
    </div>
  );
};

export default GameProgressIndicator;
