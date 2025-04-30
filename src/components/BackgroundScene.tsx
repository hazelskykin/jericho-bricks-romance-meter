
import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundSceneProps {
  backgroundId: string;
}

// Map of background IDs to actual background images/colors
const backgroundMap: Record<string, string> = {
  'cybaton-office': 'linear-gradient(to bottom, #1a1f2c, #2a1e4e)',
  'cybaton-meeting-room': 'linear-gradient(to bottom, #1c2035, #2c2045)',
  'cybaton-library': 'linear-gradient(to bottom, #1e2130, #30225a)',
  'cybaton-lab': 'linear-gradient(to bottom, #1a2540, #2a2060)',
  'cybaton-lobby': 'linear-gradient(to bottom, #1f2235, #2f2245)',
  'city-cafe': 'linear-gradient(to bottom, #252525, #352945)',
  'stonewich-cityscape': 'linear-gradient(to bottom, #2a2a40, #4a2a50)',
};

const BackgroundScene: React.FC<BackgroundSceneProps> = ({ backgroundId }) => {
  const backgroundStyle = backgroundMap[backgroundId] || 'linear-gradient(to bottom, #1a1f2c, #2a1e4e)';
  
  return (
    <motion.div
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ background: backgroundStyle }}
    >
      {/* Optional overlay pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMCI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDUgNVpNNiA0TDQgNloiIHN0cm9rZT0iIzIyMiIgb3BhY2l0eT0iMC4wMiI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20" />
      
      {/* Scene-specific decorative elements could be added conditionally here */}
    </motion.div>
  );
};

export default BackgroundScene;
