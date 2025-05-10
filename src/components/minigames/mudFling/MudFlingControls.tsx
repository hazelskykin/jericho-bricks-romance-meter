
import React from 'react';

export interface MudFlingControlsProps {
  timeRemaining: number;
  team1Score: number;
  team2Score: number;
}

const MudFlingControls: React.FC<MudFlingControlsProps> = ({
  timeRemaining,
  team1Score,
  team2Score
}) => {
  return (
    <div className="mud-fling-controls w-full max-w-3xl mt-4 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-purple-100 text-purple-900 px-3 py-1 rounded-md">
            <span className="font-bold">Team 1:</span> {team1Score}
          </div>
          <div className="ml-4 bg-orange-100 text-orange-900 px-3 py-1 rounded-md">
            <span className="font-bold">Team 2:</span> {team2Score}
          </div>
        </div>
        
        <div className="bg-gray-100 text-gray-900 px-3 py-1 rounded-md">
          <span className="font-bold">Time:</span> {timeRemaining}s
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-300">
        <p>Move your mouse to position your character and click to throw mud!</p>
      </div>
    </div>
  );
};

export default MudFlingControls;
