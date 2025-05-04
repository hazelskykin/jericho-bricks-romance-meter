
import React from 'react';
import { Button } from '@/components/ui/button';
import { SongOption } from './useSerenade';

interface SerenadeResultsViewProps {
  song: SongOption;
  score: number;
  maxScore: number;
  onComplete: () => void;
}

const SerenadeResultsView: React.FC<SerenadeResultsViewProps> = ({
  song,
  score,
  maxScore,
  onComplete
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold mb-4" style={{ color: song.color }}>
        {song.title}
      </div>
      
      <div className="flex items-center justify-center my-4">
        <div className="text-4xl font-bold">{score}</div>
        <div className="text-gray-400 ml-2">/ {maxScore}</div>
      </div>
      
      <div className="text-xl mb-6">
        {score >= 90 ? "Amazing performance!" : 
         score >= 70 ? "Great rhythm!" : 
         score >= 50 ? "Not bad!" : 
         "Keep practicing!"}
      </div>
      
      <Button 
        onClick={onComplete}
        className="bg-[#9b87f5] hover:bg-[#7E69AB]"
      >
        Continue
      </Button>
    </div>
  );
};

export default SerenadeResultsView;
