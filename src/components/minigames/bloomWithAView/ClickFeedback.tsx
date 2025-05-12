
import React from 'react';
import { motion } from 'framer-motion';

interface ClickFeedbackProps {
  clickPosition: { x: number, y: number } | null;
}

const ClickFeedback: React.FC<ClickFeedbackProps> = ({ clickPosition }) => {
  if (!clickPosition) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0.8, scale: 0.5 }}
      animate={{ opacity: 0, scale: 2 }}
      transition={{ duration: 0.5 }}
      className="absolute w-8 h-8 rounded-full bg-white/50 pointer-events-none z-40"
      style={{
        left: clickPosition.x - 16,
        top: clickPosition.y - 16,
      }}
    />
  );
};

export default ClickFeedback;
