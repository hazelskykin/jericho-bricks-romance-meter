
import React, { useState, useEffect } from 'react';
import './App.css';
import Index from './pages/Index';
import BackgroundTester from './components/BackgroundTester';
import ExpandableMenu from './components/ExpandableMenu';
import Glossary from './components/Glossary';
import { Button } from "@/components/ui/button";
import { Book } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GameProvider, useGame } from '@/context/GameContext';

const queryClient = new QueryClient();

// Game scene observer component to handle minigame transitions
const GameSceneObserver = () => {
  const { gameState, startMinigame } = useGame();

  // Monitor scene changes to detect when to trigger minigames
  useEffect(() => {
    const currentScene = gameState.currentScene;
    
    // Check if we need to start a minigame based on the scene
    if (currentScene === 'spring-brooms-away-start') {
      startMinigame('broomsAway');
    } else if (currentScene === 'spring-mud-fling-start') {
      startMinigame('mudFling');
    } else if (currentScene === 'spring-bloom-view-start') {
      startMinigame('bloomWithAView');
    } else if (currentScene === 'spring-transition') {
      // Transition to summer season
      // This is where we would handle season transition
    }
  }, [gameState.currentScene]);

  return null; // This component doesn't render anything
};

function App() {
  const [viewMode, setViewMode] = useState<'game' | 'tester'>('game');
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {/* Scene observer for minigame transitions */}
          <GameSceneObserver />
          
          {/* Glossary dialog */}
          <Glossary open={glossaryOpen} onOpenChange={setGlossaryOpen} />
          
          {/* Expandable menu for view toggle */}
          <ExpandableMenu 
            activeView={viewMode}
            onGameClick={() => setViewMode('game')}
            onTesterClick={() => setViewMode('tester')}
          />
          
          {/* Glossary button */}
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 right-4 z-50 bg-[#1A1F2C] border-[#9b87f5]/30 hover:bg-[#2A2045] text-white"
            onClick={() => setGlossaryOpen(true)}
          >
            <Book className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          
          {/* Render current view */}
          {viewMode === 'game' ? <Index /> : <BackgroundTester />}
        </TooltipProvider>
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
