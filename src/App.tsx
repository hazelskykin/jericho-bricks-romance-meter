
import React, { useState, useEffect } from 'react';
import './App.css';
import Index from './pages/Index';
import BackgroundTester from './components/BackgroundTester';
import ExpandableMenu from './components/ExpandableMenu';
import { Button } from "@/components/ui/button";
import { Book } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GameProvider } from '@/context/GameContext';

const queryClient = new QueryClient();

function App() {
  const [viewMode, setViewMode] = useState<'game' | 'tester'>('game');
  
  // Log the view mode for debugging
  useEffect(() => {
    console.log(`App view mode changed to: ${viewMode}`);
  }, [viewMode]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {/* Expandable menu for view toggle and game navigation */}
          <ExpandableMenu 
            activeView={viewMode}
            onGameClick={() => {
              console.log('Switching to Game view');
              setViewMode('game');
            }}
            onTesterClick={() => {
              console.log('Switching to Tester view');
              setViewMode('tester');
            }}
          />
          
          {/* Render current view */}
          {viewMode === 'game' ? <Index /> : <BackgroundTester />}
        </TooltipProvider>
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
