
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useGame } from '@/context/GameContext';

interface SeasonTransitionProps {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  nextSceneId: string;
}

const seasonColors = {
  spring: {
    border: '#8ED48E',
    text: '#4CAF50',
    bg: 'from-green-50 to-blue-50'
  },
  summer: {
    border: '#FFD54F',
    text: '#FF9800',
    bg: 'from-yellow-50 to-orange-50'
  },
  autumn: {
    border: '#FF8A65',
    text: '#E64A19',
    bg: 'from-orange-50 to-red-50'
  },
  winter: {
    border: '#90CAF9',
    text: '#2196F3',
    bg: 'from-blue-50 to-indigo-50'
  }
};

// Updated to use local season-specific images
const seasonImages = {
  spring: '/assets/backgrounds/spring-transition.jpg',
  summer: '/assets/backgrounds/summer-transition.jpg',
  autumn: '/assets/backgrounds/autumn-transition.jpg',
  winter: '/assets/backgrounds/winter-transition.jpg',
};

const SeasonTransition: React.FC<SeasonTransitionProps> = ({ season, nextSceneId }) => {
  const { handleSceneTransition } = useGame();
  
  const colors = seasonColors[season];
  const bgImage = seasonImages[season];
  
  const onContinue = useCallback(() => {
    handleSceneTransition(nextSceneId);
  }, [handleSceneTransition, nextSceneId]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className={`relative w-[90%] max-w-4xl aspect-video rounded-lg bg-gradient-to-br ${colors.bg} p-1 overflow-hidden`}
        style={{ 
          boxShadow: `0 0 30px ${colors.border}80`,
          border: `4px solid ${colors.border}`
        }}
      >
        {/* Background nature image with overlay */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${bgImage})`,
              opacity: 0.2
            }}
          />
        </div>
        
        {/* Content container */}
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          {/* Season title */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8"
            style={{ color: colors.text }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {season.charAt(0).toUpperCase() + season.slice(1)}
          </motion.h1>
          
          {/* Season description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-700 max-w-2xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            {season === 'spring' && "As winter fades away, Stonewich welcomes the Spring Blooms & Brooms Festival, where the city is renewed through community cleaning and planting efforts."}
            {season === 'summer' && "The heat brings the Summer Songs & Sips Festival, a time for music, refreshment, and social connection throughout Stonewich."}
            {season === 'autumn' && "Leaves turn as Stonewich celebrates the Autumn Handicrafts & Heritage Festival, honoring traditional skills and historical roots."}
            {season === 'winter' && "Snow covers the city during the Winter Games & Gala, where Stonewich enjoys friendly competition and elegant celebration."}
          </motion.p>
          
          {/* Continue button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
          >
            <Button 
              onClick={onContinue}
              className="text-white px-6 py-2 rounded-full"
              style={{ backgroundColor: colors.text }}
            >
              Begin {season.charAt(0).toUpperCase() + season.slice(1)}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SeasonTransition;
