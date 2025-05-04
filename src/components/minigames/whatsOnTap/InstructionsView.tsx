
import React from 'react';
import { Beer, CupSoda } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InstructionsViewProps {
  onStartGame: () => void;
}

const InstructionsView: React.FC<InstructionsViewProps> = ({ onStartGame }) => {
  return (
    <div className="text-gray-300 text-center max-w-md">
      <p className="mb-4">
        Customers will place orders for three types of drinks:
      </p>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col items-center">
          <Beer size={32} className="mb-2 text-amber-400" />
          <p><b>Beer</b>: Pour just right to minimize foam (around 90%)</p>
        </div>
        
        <div className="flex flex-col items-center">
          <CupSoda size={32} className="mb-2 text-yellow-300" />
          <p><b>Lemonade</b>: Match the customer's ice preference</p>
        </div>
        
        <div className="flex flex-col items-center">
          <CupSoda size={32} className="mb-2 text-pink-400" />
          <p><b>Seltzer</b>: Hit the sweet spot in the middle for perfect flavor</p>
        </div>
      </div>
      
      <Button 
        onClick={onStartGame}
        className="bg-[#9b87f5] hover:bg-[#7E69AB] text-lg px-8 py-3"
      >
        Start Shift
      </Button>
    </div>
  );
};

export default InstructionsView;
