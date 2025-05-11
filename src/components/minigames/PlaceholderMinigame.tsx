
import React from 'react';
import { Button } from '@/components/ui/button';
import MinigameContainer from './common/MinigameContainer';
import { MinigameType } from '@/types/minigames';
import { toast } from 'sonner';
import { SoundToggle } from './common/SoundToggle';

interface PlaceholderMinigameProps {
  minigameType: MinigameType;
  onComplete: (success: boolean, score?: number) => void;
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
  // State to track if auto-completion is in progress
  const [completing, setCompleting] = React.useState(false);

  // Get a user-friendly name for the minigame
  const getMinigameName = () => {
    // Convert camelCase to Title Case with Spaces
    return minigameType
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  };

  // Auto-complete with success after a short delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!completing) {
        setCompleting(true);
        toast.success(`Minigame "${getMinigameName()}" completed successfully`);
        
        // Small delay before actual completion to allow toast to be seen
        setTimeout(() => {
          onComplete(true);
        }, 1000);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [minigameType, onComplete, completing]);

  // Handle manual completion
  const handleCompleteClick = () => {
    if (!completing) {
      setCompleting(true);
      toast.success(`Minigame "${getMinigameName()}" completed successfully`);
      onComplete(true);
    }
  };

  return (
    <MinigameContainer
      title={`${getMinigameName()} (Placeholder)`}
      instructions="This minigame is currently under development. You'll automatically progress in a few seconds."
      onComplete={onComplete}
      onExit={onExit}
      showExitButton={true}
    >
      <div className="flex flex-col items-center justify-center p-8 h-full">
        <div className="mb-8 text-lg text-center">
          <p>This minigame ({minigameType}) is temporarily bypassed for development.</p>
          <div className="mt-6 border border-[#9b87f5]/30 rounded-lg p-4 bg-[#1A1F2C]/70 max-w-md mx-auto">
            <p className="text-sm text-gray-300">
              <strong>Minigame Type:</strong> {minigameType}
            </p>
            <p className="mt-2 text-sm text-gray-300">
              <strong>Auto-completing in:</strong> {completing ? 'Completing...' : 'Just a moment...'}
            </p>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            In the final game, this will be a full minigame experience.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button 
            onClick={handleCompleteClick} 
            className="bg-green-600 hover:bg-green-700"
            disabled={completing}
          >
            {completing ? 'Completing...' : 'Complete Now'}
          </Button>
          <Button 
            onClick={onExit} 
            className="bg-red-600 hover:bg-red-700"
            disabled={completing}
          >
            Exit
          </Button>
          
          {/* Sound toggle */}
          <div className="ml-4">
            <SoundToggle />
          </div>
        </div>
      </div>
    </MinigameContainer>
  );
};

export default PlaceholderMinigame;
