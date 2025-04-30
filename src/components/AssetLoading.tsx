
import React from 'react';
import { motion } from 'framer-motion';

interface AssetLoadingProps {
  message?: string;
}

const AssetLoading: React.FC<AssetLoadingProps> = ({ message = 'Loading assets...' }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm">
      <motion.div 
        className="p-6 bg-card rounded-lg border border-primary/20 shadow-lg max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-primary/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-2 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <div className="text-center">
            <h3 className="font-medium text-lg">{message}</h3>
            <p className="text-sm text-muted-foreground mt-1">Please wait while we prepare your experience.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AssetLoading;
