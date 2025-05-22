
import React, { useEffect, useState, useRef } from 'react';
import backgrounds from '../data/backgrounds';
import { fixAssetPath } from '../utils/assetUtilities';
import { assetManager } from '../utils/assetManager';

interface BackgroundSceneProps {
  src?: string;
  backgroundId?: string;
  alt?: string;
  className?: string;
  transitionDuration?: number;
  priority?: boolean;
}

const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  src,
  backgroundId,
  alt = 'Background scene',
  className = '',
  transitionDuration = 500,
  priority = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Get actual source based on either direct src or backgroundId
  useEffect(() => {
    try {
      let imagePath = '';
      
      if (backgroundId && backgrounds && backgrounds[backgroundId]) {
        const bgData = backgrounds[backgroundId];
        imagePath = typeof bgData === 'string' ? bgData : bgData.image;
        
        if (imagePath) {
          setCurrentSrc(fixAssetPath(imagePath));
        } else {
          console.warn(`Image path is empty for backgroundId: ${backgroundId}`);
          setCurrentSrc('/assets/backgrounds/stonewich-cityscape.jpg');
        }
      } else if (src) {
        setCurrentSrc(fixAssetPath(src));
      } else {
        // Use default background if neither src nor backgroundId is provided
        console.warn(`No background source provided, using default`);
        setCurrentSrc('/assets/backgrounds/stonewich-cityscape.jpg');
      }
    } catch (error) {
      console.error(`Error setting background source:`, error);
      // Use default background on error
      setCurrentSrc('/assets/backgrounds/stonewich-cityscape.jpg');
    }
  }, [backgroundId, src]);

  // Load the image when src changes
  useEffect(() => {
    if (!currentSrc) return;
    
    const loadImage = async () => {
      try {
        // Preload the image
        await assetManager.preloadAssets([currentSrc]);
        
        // Mark as loaded
        setIsLoaded(true);
        
        // Force visibility after a short delay
        setTimeout(() => {
          setIsVisible(true);
        }, 50);
      } catch (error) {
        console.error(`Error loading background image: ${currentSrc}`, error);
        // Still mark as loaded to show something
        setIsLoaded(true);
        setIsVisible(true);
      }
    };
    
    loadImage();
  }, [currentSrc]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-900 z-10">
      <img
        ref={imgRef}
        src={currentSrc || '/assets/backgrounds/stonewich-cityscape.jpg'}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover z-20 ${className} transition-opacity duration-500
          ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => {
          setIsLoaded(true);
          setIsVisible(true);
        }}
        onError={(e) => {
          console.error(`Error on image element: ${currentSrc}`);
          if (currentSrc !== '/assets/backgrounds/stonewich-cityscape.jpg') {
            setCurrentSrc('/assets/backgrounds/stonewich-cityscape.jpg');
          }
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-gray-900 flex items-center justify-center text-white">
          <p>Loading background...</p>
        </div>
      )}
    </div>
  );
};

export default BackgroundScene;
