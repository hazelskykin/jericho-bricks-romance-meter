
import React from 'react';
import { Button } from '@/components/ui/button';
import MinigameContainer from './common/MinigameContainer';
import { MinigameType } from '@/types/minigames';
import { toast } from 'sonner';

interface PlaceholderMinigameProps {
  minigameType: MinigameType;
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

/**
 * A placeholder component that replaces all minigame implementations
 * to allow for smooth game progression without loading actual minigames
 */
const PlaceholderMinigame: React.FC<PlaceholderMinigameProps> = ({
  minigameType,
  onComplete,
  onExit
}) => {
  // Auto-complete with success after a short delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      toast.success(`Minigame "${minigameType}" completed successfully`);
      onComplete(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [minigameType, onComplete]);

  return (
    <MinigameContainer
      title={`${minigameType} (Placeholder)`}
      instructions="This minigame is currently under development."
      onComplete={onComplete}
      onExit={onExit}
    >
      <div className="flex flex-col items-center justify-center p-8 h-full">
        <div className="mb-8 text-lg text-center">
          <p>This minigame is temporarily bypassed for development.</p>
          <p className="mt-4 text-sm text-gray-400">
            You'll automatically progress in a few seconds.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button onClick={() => onComplete(true)} className="bg-green-600 hover:bg-green-700">
            Complete Now
          </Button>
          <Button onClick={onExit} className="bg-red-600 hover:bg-red-700">
            Exit
          </Button>
        </div>
      </div>
    </MinigameContainer>
  );
};

export default PlaceholderMinigame;
