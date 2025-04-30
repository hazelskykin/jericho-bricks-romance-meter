
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundSceneProps {
  backgroundId: string;
}

// Map of background IDs to actual background images
const backgroundMap: Record<string, { image: string, gradient: string }> = {
  'cybaton-office': {
    image: '/assets/backgrounds/cybaton-office.jpg',
    gradient: 'linear-gradient(to bottom, rgba(26, 31, 44, 0.7), rgba(42, 30, 78, 0.8))'
  },
  'cybaton-meeting-room': {
    image: '/assets/backgrounds/cybaton-meeting-room.jpg',
    gradient: 'linear-gradient(to bottom, rgba(28, 32, 53, 0.7), rgba(44, 32, 69, 0.8))'
  },
  'cybaton-library': {
    image: '/assets/backgrounds/cybaton-library.jpg',
    gradient: 'linear-gradient(to bottom, rgba(30, 33, 48, 0.7), rgba(48, 34, 90, 0.8))'
  },
  'cybaton-lab': {
    image: '/assets/backgrounds/cybaton-lab.jpg',
    gradient: 'linear-gradient(to bottom, rgba(26, 37, 64, 0.7), rgba(42, 32, 96, 0.8))'
  },
  'cybaton-lobby': {
    image: '/assets/backgrounds/cybaton-lobby.jpg',
    gradient: 'linear-gradient(to bottom, rgba(31, 34, 53, 0.7), rgba(47, 34, 69, 0.8))'
  },
  'city-cafe': {
    image: '/assets/backgrounds/city-cafe.jpg',
    gradient: 'linear-gradient(to bottom, rgba(37, 37, 37, 0.7), rgba(53, 41, 69, 0.8))'
  },
  'stonewich-cityscape': {
    image: '/assets/backgrounds/stonewich-cityscape.jpg',
    gradient: 'linear-gradient(to bottom, rgba(42, 42, 64, 0.7), rgba(74, 42, 80, 0.8))'
  },
};

const BackgroundScene: React.FC<BackgroundSceneProps> = ({ backgroundId }) => {
  const background = backgroundMap[backgroundId] || {
    image: '/assets/backgrounds/cybaton-office.jpg',
    gradient: 'linear-gradient(to bottom, rgba(26, 31, 44, 0.7), rgba(42, 30, 78, 0.8))'
  };
  
  return (
    <motion.div
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
    </motion.div>
  );
};

export default BackgroundScene;
