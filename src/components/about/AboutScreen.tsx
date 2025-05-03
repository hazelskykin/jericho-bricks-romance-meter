
import React from 'react';
import { Button } from "@/components/ui/button";
import BackgroundScene from '../BackgroundScene';
import { useGame } from '@/context/GameContext';

const AboutScreen: React.FC = () => {
  const { handleSceneTransition } = useGame();

  return (
    <>
      <BackgroundScene backgroundId="cybaton-office" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-lg bg-black/70 rounded-lg p-8 m-4 backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-4 text-white">About Jericho Bricks</h1>
          <p className="text-gray-200 mb-3">
            Jericho Bricks is a visual novel where you play as Maven, a new recruit in the Cybaton city administration program.
          </p>
          <p className="text-gray-200 mb-3">
            Your choices will affect your relationships with your teammates, each of whom is a potential romance option.
          </p>
          <p className="text-gray-200 mb-6">
            Explore the city of Stonewich, navigate workplace challenges, and maybe find love along the way!
          </p>
          <div className="flex justify-end">
            <Button 
              onClick={() => handleSceneTransition('start')} 
              className="px-4 py-2 bg-primary rounded text-white hover:bg-primary/80 transition-colors"
            >
              Back to Main Menu
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutScreen;
