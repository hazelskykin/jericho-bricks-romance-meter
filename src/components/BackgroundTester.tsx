
import React, { useState } from 'react';
import BackgroundScene from './BackgroundScene';
import backgrounds from '@/data/backgrounds';
import { Button } from '@/components/ui/button';

const BackgroundTester = () => {
  const [currentBackground, setCurrentBackground] = useState<string>(Object.keys(backgrounds)[0]);
  
  return (
    <div className="min-h-screen relative">
      {/* Render current background */}
      <BackgroundScene backgroundId={currentBackground} />
      
      {/* Controls overlay */}
      <div className="fixed inset-x-0 bottom-0 z-10 p-4 bg-black/60 backdrop-blur-sm">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-white">Background Tester</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {Object.keys(backgrounds).map((bgId) => (
              <Button 
                key={bgId}
                onClick={() => setCurrentBackground(bgId)}
                variant={currentBackground === bgId ? "default" : "outline"}
                className="text-xs"
              >
                {backgrounds[bgId].name}
              </Button>
            ))}
          </div>
          
          <div className="text-white text-sm">
            <p><strong>Current:</strong> {backgrounds[currentBackground].name}</p>
            <p><strong>Image Path:</strong> {backgrounds[currentBackground].image}</p>
            <p><strong>Description:</strong> {backgrounds[currentBackground].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundTester;
