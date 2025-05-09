
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface MudFlingControlsProps {
  timeRemaining: number;
  team1Score: number;
  team2Score: number;
  selectedBall?: string;
}

const MudFlingControls: React.FC<MudFlingControlsProps> = ({
  timeRemaining,
  team1Score,
  team2Score,
  selectedBall
}) => {
  return (
    <div className="p-2 bg-black/10 backdrop-blur-sm rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-white bg-purple-500 px-3 py-1 rounded-md">
            Your Team: {team1Score}
          </div>
          <div className="text-white bg-red-500 px-3 py-1 rounded-md">
            Opponents: {team2Score}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-white">Time:</span>
          <div className="w-32 h-2.5">
            <Progress value={(timeRemaining / 60) * 100} className="h-2.5" />
          </div>
          <span className="text-white">{timeRemaining}s</span>
        </div>
        
        {selectedBall && (
          <div className="text-white bg-amber-500 px-3 py-1 rounded-md animate-pulse">
            Ready to throw!
          </div>
        )}
      </div>
    </div>
  );
};

export default MudFlingControls;
