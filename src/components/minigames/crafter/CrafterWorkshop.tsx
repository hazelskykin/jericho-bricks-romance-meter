
import React from 'react';
import BaseMaterialSelector from './BaseMaterialSelector';
import AccentSelector from './AccentSelector';
import CraftCanvas from './CraftCanvas';
import FinishingTouchOverlay from './FinishingTouchOverlay';
import { Button } from '@/components/ui/button';
import { GameStage, PlacedAccent } from '@/hooks/useCrafterGame';

interface CrafterWorkshopProps {
  gameStage: GameStage;
  selectedBaseMaterial: 'fabric' | 'metal' | 'wood' | null;
  placedAccents: PlacedAccent[];
  onBaseMaterialSelect: (material: 'fabric' | 'metal' | 'wood') => void;
  onAccentSelect: (accent: string) => void;
  onAccentPlace: (x: number, y: number) => void;
  onFinishCraft: () => void;
  onCompleteCraft: () => void;
  onExitWorkshop: () => void;
  characterInitials: string;
}

const CrafterWorkshop: React.FC<CrafterWorkshopProps> = ({
  gameStage,
  selectedBaseMaterial,
  placedAccents,
  onBaseMaterialSelect,
  onAccentSelect,
  onAccentPlace,
  onFinishCraft,
  onCompleteCraft,
  onExitWorkshop,
  characterInitials,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <div 
        className="w-full h-full min-h-[550px] bg-contain bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url(/assets/minigames/autumn/crafter/workshop-background.png)' }}
      >
        {/* Material Selection Stage */}
        {gameStage === 'material-selection' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-white mb-4 text-shadow">Select a Base Material</h2>
            <BaseMaterialSelector onSelect={onBaseMaterialSelect} />
          </div>
        )}
        
        {/* Accent Placement Stage - Redesigned layout with accents on the sides */}
        {gameStage === 'accent-placement' && (
          <div className="absolute inset-0 flex">
            {/* Left side accents panel */}
            <div className="w-1/4 p-3 bg-[#1A1F2C]/80 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-white mb-2 text-center">Accents</h3>
              <AccentSelector onSelect={onAccentSelect} vertical={true} />
            </div>
            
            {/* Center craft canvas */}
            <div className="flex-grow flex flex-col items-center justify-center">
              <div className="relative bg-transparent mb-4">
                <CraftCanvas 
                  baseMaterial={selectedBaseMaterial!} 
                  accents={placedAccents} 
                  onPlaceAccent={onAccentPlace}
                  interactive={true}
                />
              </div>
              <Button 
                onClick={onFinishCraft}
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white mt-4"
                disabled={placedAccents.length === 0}
              >
                View Completed Craft
              </Button>
            </div>
          </div>
        )}
        
        {/* Finishing Touch Stage */}
        {gameStage === 'finishing-touch' && (
          <FinishingTouchOverlay 
            baseMaterial={selectedBaseMaterial!}
            accents={placedAccents}
            characterInitials={characterInitials}
            onComplete={onCompleteCraft}
          />
        )}
        
        {/* Completed Craft Stage */}
        {gameStage === 'completed' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-[#1A1F2C]/80 p-6 rounded-lg border-2 border-[#9b87f5] max-w-md">
              <h2 className="text-2xl font-bold text-[#9b87f5] mb-4 text-center">Your Craft is Complete!</h2>
              
              <div className="relative w-64 h-64 mx-auto mb-4">
                <CraftCanvas 
                  baseMaterial={selectedBaseMaterial!} 
                  accents={placedAccents} 
                  interactive={false}
                  showInitials={true}
                  characterInitials={characterInitials}
                />
              </div>
              
              <p className="text-white text-center mb-6">
                You've created a beautiful craft with the perfect personal touch!
              </p>
              
              <div className="flex justify-center">
                <Button 
                  onClick={onExitWorkshop}
                  className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
                >
                  Leave Workshop
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrafterWorkshop;
