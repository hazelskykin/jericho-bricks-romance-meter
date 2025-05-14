
import React from 'react';
import { Image } from 'lucide-react';
import { PhotoLocation } from '@/hooks/memoriesDate/useMemoriesDateState';
import { soundManager } from '@/utils/sound';

interface LocationSelectionStepProps {
  locations: PhotoLocation[];
  currentLocationIndex: number;
  selectLocation: (index: number) => void;
}

const LocationSelectionStep: React.FC<LocationSelectionStepProps> = ({
  locations,
  currentLocationIndex,
  selectLocation,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl mb-4">Choose your location</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {locations.map((location, index) => (
          <button
            key={location.id}
            className={`relative p-1 border-2 ${currentLocationIndex === index ? 'border-[#9b87f5]' : 'border-transparent'}`}
            onClick={() => {
              selectLocation(index);
              soundManager.playSFX('ui-click', false);
            }}
          >
            <img 
              src={location.src} 
              alt={location.name} 
              className="w-32 h-24 object-cover rounded" 
            />
            <div className="mt-1 text-center text-sm">{location.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationSelectionStep;
