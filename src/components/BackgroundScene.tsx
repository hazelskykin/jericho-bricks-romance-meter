
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import backgrounds from '@/data/backgrounds';

interface BackgroundSceneProps {
  backgroundId: string;
}

const BackgroundScene: React.FC<BackgroundSceneProps> = ({ backgroundId }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const background = backgrounds[backgroundId] || backgrounds['cybaton-office'];
  
  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.src = background.image;
    img.onload = () => setIsImageLoaded(true);
    
    return () => {
      img.onload = null;
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
          backgroundImage: `${background.gradient}, url(${background.image})`,
        }}
      >
        {/* Steampunk-Cyberpunk blend overlay pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CiAgPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPgogIDxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30" />
        
        {/* Ambient lighting effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20 mix-blend-overlay" />
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-radial-gradient shadow-inner pointer-events-none" 
             style={{ 
               background: 'radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.4) 100%)',
               boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.5)'
             }} 
        />
        
        {/* Background name indicator - only show when first loading */}
        <AnimatePresence>
          {!isImageLoaded && (
            <motion.div 
              className="absolute top-4 left-4 px-4 py-2 rounded-md bg-black/50 text-white backdrop-blur-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-sm font-medium">{background.name}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default BackgroundScene;
