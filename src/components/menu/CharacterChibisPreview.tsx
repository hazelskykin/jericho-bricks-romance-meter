
import React, { useEffect, useState } from 'react';
import { CharacterId, ChibiImageData } from '@/types/game';

interface CharacterChibisPreviewProps {
  characterChibis: Record<CharacterId, ChibiImageData>;
  loadingComplete: boolean;
}

const CharacterChibisPreview: React.FC<CharacterChibisPreviewProps> = ({ characterChibis, loadingComplete }) => {
  const [activeCharacterIds, setActiveCharacterIds] = useState<CharacterId[]>([]);
  
  useEffect(() => {
    if (loadingComplete) {
      // Stagger character appearances
      const timeouts: NodeJS.Timeout[] = [];
      const characters: CharacterId[] = ['maven', 'xavier', 'navarre', 'etta', 'senara'];
      
      characters.forEach((id, index) => {
        const timeout = setTimeout(() => {
          setActiveCharacterIds(prev => [...prev, id]);
        }, index * 300); // 300ms delay between each character
        
        timeouts.push(timeout);
      });
      
      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
  }, [loadingComplete]);
  
  return (
    <div className="relative h-[220px] w-[500px]">
      {Object.entries(characterChibis).map(([id, data]) => {
        const isActive = activeCharacterIds.includes(id as CharacterId);
        const characterId = id as CharacterId;
        
        return (
          <div 
            key={id}
            className={`absolute transition-all duration-500 ease-out ${getPositionClass(characterId)} ${
              isActive 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: isActive ? `${getCharacterIndex(characterId) * 0.2}s` : '0s' }}
          >
            <img 
              src={data.image} 
              alt={`${id} chibi`} 
              className="h-auto drop-shadow-lg"
              style={{ width: data.width || '100px' }}
            />
          </div>
        );
      })}
    </div>
  );
};

// Helper function to get character position class
const getPositionClass = (characterId: CharacterId): string => {
  switch (characterId) {
    case 'maven':
      return 'left-[50%] bottom-0 transform -translate-x-1/2 z-30';
    case 'xavier':
      return 'left-[15%] bottom-0 transform -translate-x-1/2 z-20';
    case 'navarre':
      return 'left-[30%] bottom-0 transform -translate-x-1/2 z-20';
    case 'etta':
      return 'left-[70%] bottom-0 transform -translate-x-1/2 z-20';
    case 'senara':
      return 'left-[85%] bottom-0 transform -translate-x-1/2 z-20';
    default:
      return 'left-0 bottom-0';
  }
};

// Helper function to get character index for animation delay
const getCharacterIndex = (characterId: CharacterId): number => {
  const indices: Record<CharacterId, number> = {
    'maven': 0,
    'xavier': 1,
    'navarre': 2,
    'etta': 3,
    'senara': 4
  };
  
  return indices[characterId] || 0;
};

export default CharacterChibisPreview;
