
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Check, Heart } from 'lucide-react';
import { Photo } from '@/hooks/memoriesDate/useMemoriesDateState';

interface PhotoGalleryStepProps {
  photos: Photo[];
  onFinish: () => void;
}

const PhotoGalleryStep: React.FC<PhotoGalleryStepProps> = ({
  photos,
  onFinish
}) => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl mb-4 flex items-center">
        <Heart className="mr-2 text-pink-500" /> Your Memory Album <Heart className="ml-2 text-pink-500" />
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="relative bg-gray-800 p-3 rounded-lg shadow-lg"
          >
            <div className="relative">
              <img 
                src={photo.location.src} 
                alt={photo.location.name} 
                className="w-full h-48 object-cover rounded" 
              />
              <img
                src={photo.frame.src}
                alt={photo.frame.name}
                className="absolute top-0 left-0 w-full h-full object-contain"
                style={{
                  transform: `translate(${photo.framePosition.x - 50}%, ${photo.framePosition.y - 50}%) scale(${photo.frameSize / 200})`
                }}
              />
              <img
                src={photo.sticker.src}
                alt={photo.sticker.name}
                className="absolute"
                style={{
                  top: `${photo.stickerPosition.y}%`,
                  left: `${photo.stickerPosition.x}%`,
                  width: '30%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
            <div className="mt-2 text-center text-sm">
              <div className="font-semibold">{photo.location.name}</div>
              <div className="text-gray-400 text-xs flex items-center justify-center">
                <Camera className="w-3 h-3 mr-1" /> Memory #{index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        onClick={onFinish}
        className="bg-green-700 hover:bg-green-600 mt-6 flex items-center"
      >
        <Check className="mr-2" /> Complete Memory Album
      </Button>
    </div>
  );
};

export default PhotoGalleryStep;
