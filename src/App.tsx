
import React, { useState } from 'react';
import './App.css';
import Index from './pages/Index';
import BackgroundTester from './components/BackgroundTester';
import { Button } from './components/ui/button';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [viewMode, setViewMode] = useState<'game' | 'tester'>('game');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {/* View toggle controls */}
        <div className="fixed top-4 right-4 z-50">
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={viewMode === 'game' ? 'default' : 'outline'} 
              onClick={() => setViewMode('game')}
            >
              Game
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'tester' ? 'default' : 'outline'} 
              onClick={() => setViewMode('tester')}
            >
              Background Tester
            </Button>
          </div>
        </div>
        
        {/* Render current view */}
        {viewMode === 'game' ? <Index /> : <BackgroundTester />}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
