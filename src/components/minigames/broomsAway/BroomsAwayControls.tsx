
import React from 'react';
import { Button } from "@/components/ui/button";

interface BroomsAwayControlsProps {
  featherDusters: number;
  brokenSpots: number;
  maxBrokenSpots: number;
  cursorType: 'broom' | 'duster';
  toggleCursor: () => void;
}

const BroomsAwayControls: React.FC<BroomsAwayControlsProps> = ({
  featherDusters,
  brokenSpots,
  maxBrokenSpots,
  cursorType,
  toggleCursor
}) => {
  return (
    <div className="mb-4 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-white">Feather Dusters:</span>
        <span className="font-bold text-yellow-300">{featherDusters}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-white">Broken Spots:</span>
        <span className="font-bold text-red-500">{brokenSpots}/{maxBrokenSpots}</span>
      </div>
      
      <Button 
        variant="outline"
        className="border-[#9b87f5]/30 hover:bg-[#9b87f5]/10"
        onClick={toggleCursor}
      >
        {cursorType === 'broom' ? '🧹 Using Broom' : '🪶 Using Duster'}
      </Button>
    </div>
  );
};

export default BroomsAwayControls;
