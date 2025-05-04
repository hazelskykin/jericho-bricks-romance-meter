
import React from 'react';
import { Button } from '@/components/ui/button';

interface ResultsViewProps {
  score: number;
  ordersFulfilled: number;
  onComplete: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  score,
  ordersFulfilled,
  onComplete
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold mb-4">Shift Complete!</div>
      
      <div className="flex items-center justify-center my-4">
        <div className="text-4xl font-bold">{score}</div>
        <div className="text-gray-400 ml-2">points</div>
      </div>
      
      <div className="text-xl mb-2">
        Orders Fulfilled: {ordersFulfilled}
      </div>
      
      <div className="text-xl mb-6">
        {score >= 90 ? "Legendary bartender!" : 
         score >= 70 ? "Great job handling the rush!" : 
         score >= 50 ? "Not bad for your first shift!" : 
         "The customers were patient with you!"}
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

export default ResultsView;
