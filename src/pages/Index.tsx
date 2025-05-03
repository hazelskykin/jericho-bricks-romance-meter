
import React from 'react';
import Game from '@/components/Game';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import BackgroundTester from '@/components/BackgroundTester';

const Index = () => {
  const [viewMode, setViewMode] = useState<'game' | 'tester'>('game');
  
  return (
    <div className="min-h-screen">
      {viewMode === 'game' ? (
        <>
          <Game />
          <Button
            size="sm"
            variant="outline"
            className="fixed top-4 right-4 z-50"
            onClick={() => setViewMode('tester')}
          >
            Background Tester
          </Button>
        </>
      ) : (
        <>
          <BackgroundTester />
          <Button
            size="sm"
            variant="outline"
            className="fixed top-4 right-4 z-50"
            onClick={() => setViewMode('game')}
          >
            Game View
          </Button>
        </>
      )}
    </div>
  );
};

export default Index;
