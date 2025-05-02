
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import backgrounds from '@/data/backgrounds';

interface BackgroundSceneProps {
  backgroundId: string;
}

const BackgroundScene: React.FC<BackgroundSceneProps> = ({ backgroundId }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const background = backgrounds[backgroundId] || backgrounds['cybaton-office'];
  
  // Reset states when background changes
  useEffect(() => {
    setIsImageLoaded(false);
    setImageError(false);
  }, [backgroundId]);
  
  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.src = background.image;
    img.onload = () => {
      setIsImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      console.error(`Failed to load background image: ${background.image}`);
      setImageError(true);
      setIsImageLoaded(true); // Consider it "loaded" even though it errored
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [background.image]);
  
  return (
    <AnimatePresence>
      <motion.div
        key={backgroundId}
        className="fixed inset-0 z-0 bg-cover bg-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{ 
          backgroundImage: imageError 
            ? 'linear-gradient(to bottom, #1A1F2C, #2A1E4E)' 
            : `url(${background.image})`,
        }}
      >
        {/* Subtle pattern overlay - significantly reduced opacity */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CiAgPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPgogIDxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-10" />
        
        {/* Very subtle color overlay - greatly reduced opacity */}
        {!imageError && (
          <div 
            className="absolute inset-0" 
            style={{ 
              background: background.gradient || 'linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.1))',
              mixBlendMode: 'multiply'
            }} 
          />
        )}
        
        {/* Extremely subtle vignette for depth */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            background: 'radial-gradient(circle at center, transparent 80%, rgba(0, 0, 0, 0.15) 100%)',
            boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.1)'
          }} 
        />
        
        {/* Background name indicator or error message */}
        <AnimatePresence>
          {(!isImageLoaded || imageError) && (
            <motion.div 
              className={`absolute top-4 left-4 px-4 py-2 rounded-md backdrop-blur-sm ${imageError ? 'bg-red-500/50' : 'bg-black/50'} text-white`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-sm font-medium">
                {imageError 
                  ? `Error loading: ${background.name} (${background.image})` 
                  : background.name}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default BackgroundScene;
