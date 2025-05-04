
import React, { useEffect, useState } from 'react';
import BroomsAwayGame from './broomsAway/BroomsAwayGame';
import MudFlingGame from './mudFling/MudFlingGame';
import BloomWithAViewGame from './bloomWithAView/BloomWithAViewGame';
import SerenadeGame from './serenade/SerenadeGame';
import SpokenWordGame from './spokenWord/SpokenWordGame';
import WhatsOnTapGame from './whatsOnTap/WhatsOnTapGame';
import { Button } from '@/components/ui/button';
import MinigameContainer from './MinigameContainer';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface MinigameHandlerProps {
  activeMinigame: string;
  completeMinigame: (success: boolean) => void;
  exitMinigame: () => void;
}

const MinigameHandler: React.FC<MinigameHandlerProps> = ({ 
  activeMinigame, 
  completeMinigame, 
  exitMinigame 
}) => {
  console.log(`MinigameHandler rendering with activeMinigame: ${activeMinigame}`);
  
  // Add loading state
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Use effect for loading simulation and logging
  useEffect(() => {
    console.log(`MinigameHandler mounted with activeMinigame: ${activeMinigame}`);
    
    // Reset states when minigame changes
    setIsLoading(true);
    setLoadError(null);
    
    // Simulate loading time to ensure components have time to initialize
    const timer = setTimeout(() => {
      console.log(`MinigameHandler: Finished loading ${activeMinigame}`);
      setIsLoading(false);
      
      // Show notification that minigame is ready
      toast({
        title: "Minigame Ready",
        description: `${activeMinigame} is ready to play!`,
        duration: 2000,
      });
      
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      console.log(`MinigameHandler unmounting for: ${activeMinigame}`);
    };
  }, [activeMinigame]);

  // If we're in a loading state, show a loading indicator
  if (isLoading) {
    return (
      <MinigameContainer
        title={`Loading ${activeMinigame}`}
        instructions="Please wait while the game loads..."
        onComplete={completeMinigame}
        onExit={exitMinigame}
      >
        <div className="flex flex-col items-center justify-center p-8 h-full">
          <Loader2 className="h-16 w-16 animate-spin text-[#9b87f5] mb-4" />
          <p className="text-white text-lg">Loading minigame...</p>
        </div>
      </MinigameContainer>
    );
  }
  
  // If there was a loading error, show error UI
  if (loadError) {
    return (
      <MinigameContainer
        title="Error Loading Minigame"
        instructions="There was a problem loading the minigame."
        onComplete={completeMinigame}
        onExit={exitMinigame}
      >
        <div className="flex flex-col items-center justify-center p-8 h-full">
          <div className="mb-8 text-lg text-center text-red-500">
            <p>{loadError}</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => window.location.reload()} className="bg-purple-600 hover:bg-purple-700">
              Reload Page
            </Button>
            <Button onClick={exitMinigame} className="bg-red-600 hover:bg-red-700">
              Exit
            </Button>
          </div>
        </div>
      </MinigameContainer>
    );
  }
  
  // Fallback component when no matching minigame is found
  const MinigameStartPrompt = () => (
    <MinigameContainer
      title={`Play ${activeMinigame}`}
      instructions="Click the button below to start the game!"
      onComplete={completeMinigame}
      onExit={exitMinigame}
    >
      <div className="flex flex-col items-center justify-center p-8 h-full">
        <div className="mb-8 text-lg text-center">
          Ready to play <span className="font-bold text-[#9b87f5]">{activeMinigame}</span>?
        </div>
        <div className="flex gap-4">
          <Button onClick={() => completeMinigame(true)} className="bg-green-600 hover:bg-green-700">
            Complete Game (Success)
          </Button>
          <Button onClick={() => completeMinigame(false)} className="bg-yellow-600 hover:bg-yellow-700">
            Complete Game (Failure)
          </Button>
          <Button onClick={exitMinigame} className="bg-red-600 hover:bg-red-700">
            Exit
          </Button>
        </div>
      </div>
    </MinigameContainer>
  );
  
  // Render the appropriate minigame based on activeMinigame
  try {
    console.log(`Attempting to render minigame component: ${activeMinigame}`);
    
    // Create a helper function to safely render minigame components
    const renderMinigameOrFallback = () => {
      // Use explicit type check to avoid issues with string comparison
      switch (activeMinigame) {
        // Spring minigames
        case 'broomsAway':
          console.log('Rendering BroomsAwayGame');
          return <BroomsAwayGame onComplete={completeMinigame} onExit={exitMinigame} />;
        case 'mudFling':
          console.log('Rendering MudFlingGame');
          return <MudFlingGame onComplete={completeMinigame} onExit={exitMinigame} />;
        case 'bloomWithAView':
          console.log('Rendering BloomWithAViewGame');
          return <BloomWithAViewGame onComplete={completeMinigame} onExit={exitMinigame} />;
        
        // Summer minigames
        case 'serenade':
          console.log('Rendering SerenadeGame');
          return <SerenadeGame onComplete={completeMinigame} onExit={exitMinigame} />;
        case 'spokenWord':
          console.log('Rendering SpokenWordGame');
          return <SpokenWordGame onComplete={completeMinigame} onExit={exitMinigame} />;
        case 'whatsOnTap':
          console.log('Rendering WhatsOnTapGame');
          return <WhatsOnTapGame onComplete={completeMinigame} onExit={exitMinigame} />;
        
        default:
          console.warn(`No matching minigame component found for: "${activeMinigame}"`);
          return <MinigameStartPrompt />;
      }
    };
    
    // Render the appropriate minigame or fallback
    return renderMinigameOrFallback();
  } catch (error) {
    console.error(`Error rendering minigame ${activeMinigame}:`, error);
    return (
      <MinigameContainer
        title="Error Loading Minigame"
        instructions="There was a problem loading the minigame component."
        onComplete={completeMinigame}
        onExit={exitMinigame}
      >
        <div className="flex flex-col items-center justify-center p-8 h-full">
          <div className="mb-8 text-lg text-center text-red-500">
            <p>Failed to load the minigame component. Please try again.</p>
            <p className="text-sm mt-4">Technical details: {error instanceof Error ? error.message : String(error)}</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={exitMinigame} className="bg-red-600 hover:bg-red-700">
              Exit
            </Button>
          </div>
        </div>
      </MinigameContainer>
    );
  }
};

export default MinigameHandler;
