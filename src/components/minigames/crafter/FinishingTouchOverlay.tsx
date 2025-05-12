
import React, { useEffect, useState } from 'react';
import { PlacedAccent } from '@/hooks/useCrafterGame';
import { Button } from '@/components/ui/button';
import CraftCanvas from './CraftCanvas';
import { motion } from 'framer-motion';

interface FinishingTouchOverlayProps {
  baseMaterial: 'fabric' | 'metal' | 'wood';
  accents: PlacedAccent[];
  characterInitials: string;
  onComplete: () => void;
}

const FinishingTouchOverlay: React.FC<FinishingTouchOverlayProps> = ({ 
  baseMaterial, 
  accents, 
  characterInitials,
  onComplete 
}) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Start animation sequence when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000); // Animation runs for 3 seconds
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1A1F2C]/90 p-6 rounded-lg border-2 border-[#9b87f5] max-w-md text-center"
      >
        <h2 className="text-2xl font-bold text-[#9b87f5] mb-4">Completed Craft</h2>
        
        <div className="relative w-64 h-64 mx-auto mb-4">
          <CraftCanvas 
            baseMaterial={baseMaterial} 
            accents={accents} 
            interactive={false}
            showInitials={animationComplete}
            characterInitials={characterInitials}
          />
          
          {!animationComplete && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ 
                opacity: [1, 0.2, 1],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: 'reverse' 
              }}
            >
              <svg 
                className="w-16 h-16 text-[#9b87f5]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
            </motion.div>
          )}
        </div>
        
        <p className="text-white mb-6">
          {animationComplete
            ? "Your personal touch has been added!" 
            : "Adding your personal signature..."}
        </p>
        
        {animationComplete && (
          <Button 
            onClick={onComplete}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          >
            Close
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default FinishingTouchOverlay;
