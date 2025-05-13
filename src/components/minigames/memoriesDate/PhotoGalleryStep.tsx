
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Photo } from '@/hooks/memoriesDate/useMemoriesDateState';

interface PhotoGalleryStepProps {
  photos: Photo[];
  onComplete: () => void;
}

const PhotoGalleryStep: React.FC<PhotoGalleryStepProps> = ({ photos, onComplete }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Your Memory Album</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {photos.map((photo, index) => (
          <div key={index} className="bg-black p-2 rounded shadow-lg">
            <div className="relative">
              {/* Background */}
              <img 
                src={photo.location.src} 
                alt={photo.location.name} 
                className="w-full h-40 object-cover" 
              />
              
              {/* Frame */}
              <div
                className="absolute"
                style={{ 
                  left: photo.framePosition.x, 
                  top: photo.framePosition.y,
                  width: `${photo.frameSize}px`,
                  height: `${photo.frameSize * 0.75}px`
                }}
              >
                <img 
                  src={photo.frame.src} 
                  alt="Frame" 
                  className="w-full h-full object-contain" 
                />
              </div>
              
              {/* Chibis */}
              <div
                className="absolute"
                style={{ 
                  left: photo.framePosition.x + photo.frameSize * 0.2, 
                  bottom: photo.framePosition.y + photo.frameSize * 0.05,
                  width: `${photo.frameSize * 0.3}px`,
                  height: `${photo.frameSize * 0.4}px`
                }}
              >
                <img 
                  src={`/assets/characters/maven-chibi.png`}
                  alt="Maven" 
                  className="w-full h-full object-contain" 
                />
              </div>
              
              <div
                className="absolute"
                style={{ 
                  left: photo.framePosition.x + photo.frameSize * 0.5, 
                  bottom: photo.framePosition.y + photo.frameSize * 0.05,
                  width: `${photo.frameSize * 0.3}px`,
                  height: `${photo.frameSize * 0.4}px`
                }}
              >
                <img 
                  src={`/assets/characters/${photo.loveInterest}-chibi.png`}
                  alt="Love Interest" 
                  className="w-full h-full object-contain" 
                />
              </div>
              
              {/* Sticker */}
              <div
                className="absolute"
                style={{ 
                  left: photo.stickerPosition.x, 
                  top: photo.stickerPosition.y,
                  width: '60px',
                  height: '60px'
                }}
              >
                <img 
                  src={photo.sticker.src} 
                  alt="Sticker" 
                  className="w-full h-full object-contain" 
                />
              </div>
            </div>
            <div className="mt-2 text-center text-sm">
              At {photo.location.name}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-6 text-center max-w-md">
        <p className="mb-2">You've created a beautiful memory album with your love interest!</p>
        <p>These photos will be a cherished keepsake of your time together at the festival.</p>
      </div>
      
      <Button 
        onClick={onComplete}
        className="px-8 py-2 text-lg"
      >
        Complete <Heart className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
};

export default PhotoGalleryStep;
