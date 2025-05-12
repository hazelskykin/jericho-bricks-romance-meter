
import React from 'react';
import { CharacterId } from '@/types/game';
import AffectionMeter from '@/components/AffectionMeter';
import { useGame } from '@/context/GameContext';

interface AffectionMeterSectionProps {
  showAffection: boolean;
  toggleAffectionMeter: () => void;
}

const AffectionMeterSection: React.FC<AffectionMeterSectionProps> = ({ 
  showAffection, 
  toggleAffectionMeter 
}) => {
  // Access the game context to get character data
  const { gameState } = useGame();
  const { characters } = gameState;

  return (
    <div className="absolute top-4 right-4 z-10">
      <button 
        onClick={toggleAffectionMeter} 
        className="bg-[#9b87f5] hover:bg-[#8B5CF6] p-2 rounded-full mb-2 shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </button>
      
      {Object.entries(characters)
        .filter(([id]) => id !== 'maven') // Filter out the protagonist
        .map(([id, character]) => (
          <div key={id} className="mb-2">
            <AffectionMeter 
              character={character} 
              isOpen={showAffection}
            />
          </div>
        ))}
    </div>
  );
};

export default AffectionMeterSection;
