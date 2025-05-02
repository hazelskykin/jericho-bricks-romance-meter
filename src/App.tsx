
import React, { useState } from 'react';
import './App.css';
import Index from './pages/Index';
import BackgroundTester from './components/BackgroundTester';
import ExpandableMenu from './components/ExpandableMenu';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GameProvider } from '@/context/GameContext';

const queryClient = new QueryClient();

function App() {
  const [viewMode, setViewMode] = useState<'game' | 'tester'>('game');
  
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          {/* Expandable menu for view toggle */}
          <ExpandableMenu 
            activeView={viewMode}
            onGameClick={() => setViewMode('game')}
            onTesterClick={() => setViewMode('tester')}
          />
          
          {/* Render current view */}
          {viewMode === 'game' ? <Index /> : <BackgroundTester />}
        </TooltipProvider>
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
