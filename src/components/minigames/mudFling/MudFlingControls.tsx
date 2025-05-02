
import React from 'react';

interface MudFlingControlsProps {
  timeRemaining: number;
  fountainIntensity: 'low' | 'medium' | 'high';
  team1Score: number;
  team2Score: number;
}

const MudFlingControls: React.FC<MudFlingControlsProps> = ({
  timeRemaining,
  fountainIntensity,
  team1Score,
  team2Score
}) => {
  return (
    <div className="mb-4 flex items-center gap-8">
      <div className="flex items-center gap-2">
        <span className="text-white">Time Remaining:</span>
        <span className="font-bold text-yellow-300">{timeRemaining}s</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-white">Fountain:</span>
        <span className={`font-bold ${
          fountainIntensity === 'low' ? 'text-blue-300' :
          fountainIntensity === 'medium' ? 'text-blue-400' :
          'text-blue-500'
        }`}>
          {fountainIntensity === 'low' ? 'Trickling' :
           fountainIntensity === 'medium' ? 'Flowing' :
           'Gushing'}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="font-bold text-[#4CC2FF]">Your Team: {team1Score}</span>
        <span>vs</span>
        <span className="font-bold text-[#FF5E5B]">Opponents: {team2Score}</span>
      </div>
    </div>
  );
};

export default MudFlingControls;
