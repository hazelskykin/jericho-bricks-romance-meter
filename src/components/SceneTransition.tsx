
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface SceneTransitionProps {
  isTransitioning: boolean;
  duration?: number;
}

const SceneTransition: React.FC<SceneTransitionProps> = ({
  isTransitioning,
  duration = 300
}) => {
  // Add a small delay before removing the overlay to ensure it's visible
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (isTransitioning) {
      setVisible(true);
      
      // Hide the overlay after the transition completes
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration + 200); // Add 200ms buffer
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, duration]);

  return (
    <AnimatePresence>
      {(isTransitioning || visible) && (
        <motion.div
          className="fixed inset-0 bg-black z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration / 1000 }}
        />
      )}
    </AnimatePresence>
  );
};

export default SceneTransition;
