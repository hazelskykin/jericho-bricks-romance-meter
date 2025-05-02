
import React, { useState } from 'react';
import BackgroundScene from './BackgroundScene';
import backgrounds from '@/data/backgrounds';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

const BackgroundTester = () => {
  const [currentBackground, setCurrentBackground] = useState<string>(Object.keys(backgrounds)[0]);
  
  const handleBackgroundChange = (bgId: string) => {
    setCurrentBackground(bgId);
    
    // Check if the image exists
    const img = new Image();
    img.src = backgrounds[bgId].image;
    img.onload = () => {
      toast({
        title: "Background loaded",
        description: `Successfully loaded: ${backgrounds[bgId].name}`,
      });
    };
    img.onerror = () => {
      toast({
        title: "Background load error",
        description: `Failed to load: ${backgrounds[bgId].image}`,
        variant: "destructive",
      });
    };
  };
  
  return (
    <div className="min-h-screen relative">
      {/* Render current background */}
      <BackgroundScene backgroundId={currentBackground} />
      
      {/* Controls overlay */}
      <div className="fixed inset-x-0 bottom-0 z-10 p-4 bg-black/40 backdrop-blur-md">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Background Tester</h2>
            <div className="text-white text-right">
              <p className="text-lg font-medium">{backgrounds[currentBackground].name}</p>
              <p className="text-xs opacity-80">{backgrounds[currentBackground].image}</p>
            </div>
          </div>
          
          <Separator className="bg-white/20" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {Object.keys(backgrounds).map((bgId) => (
              <Button 
                key={bgId}
                onClick={() => handleBackgroundChange(bgId)}
                variant={currentBackground === bgId ? "default" : "outline"}
                className={`text-xs ${currentBackground === bgId ? 'bg-primary/90 hover:bg-primary' : 'bg-black/30 hover:bg-black/50 border-white/20'}`}
              >
                {backgrounds[bgId].name}
              </Button>
            ))}
          </div>
          
          <div className="text-white text-sm space-y-1 bg-black/30 p-3 rounded-md">
            <p><strong>Description:</strong> {backgrounds[currentBackground].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundTester;
