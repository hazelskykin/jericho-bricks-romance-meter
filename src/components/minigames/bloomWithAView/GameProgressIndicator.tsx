
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
    <div className="absolute top-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg z-20 shadow-lg">
      <span className="font-medium">Found: {foundItemCount} / {totalItemCount}</span>
    </div>
  );
};

export default GameProgressIndicator;
