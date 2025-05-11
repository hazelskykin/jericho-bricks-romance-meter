
import React from 'react';
import { Loader2 } from 'lucide-react';

interface GameLoadingStateProps {
  error: string | null;
  sceneId: string;
  onReturnToMenu: () => void;
}

const GameLoadingState: React.FC<GameLoadingStateProps> = ({ error, sceneId, onReturnToMenu }) => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <div className="text-center text-white">
        <Loader2 className="h-16 w-16 mx-auto animate-spin text-[#9b87f5] mb-4" />
        <p>{error || `Scene not found or loading: ${sceneId}`}</p>
        <button 
          onClick={onReturnToMenu} 
          className="mt-4 px-4 py-2 bg-[#9b87f5] rounded-md hover:bg-[#8B5CF6] transition-colors"
        >
          Return to Main Menu
        </button>
      </div>
    </div>
  );
};

export default GameLoadingState;
