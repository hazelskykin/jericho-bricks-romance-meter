
import React from 'react';

export interface MudFlingFountainProps {
  fountainIntensity?: 'low' | 'medium' | 'high';
}

const MudFlingFountain: React.FC<MudFlingFountainProps> = ({ 
  fountainIntensity = 'medium' 
}) => {
  // Change fountain appearance based on intensity
  const getIntensityStyles = () => {
    switch (fountainIntensity) {
      case 'low':
        return {
          height: '40px',
          opacity: 0.5,
          animationDuration: '3s'
        };
      case 'high':
        return {
          height: '80px',
          opacity: 0.9,
          animationDuration: '1s'
        };
      case 'medium':
      default:
        return {
          height: '60px',
          opacity: 0.7,
          animationDuration: '2s'
        };
    }
  };
  
  const styles = getIntensityStyles();

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      {/* Fountain base */}
      <div className="w-40 h-40 bg-brown-900 rounded-full relative">
        {/* Mud splash animation */}
        <div 
          className="absolute left-1/2 bottom-1/2 transform -translate-x-1/2 w-20 animate-pulse"
          style={{
            height: styles.height,
            opacity: styles.opacity,
            animationDuration: styles.animationDuration
          }}
        >
          <div className="w-full h-full bg-gradient-to-t from-brown-700 to-brown-500 rounded-full" />
        </div>
        
        {/* Fountain details */}
        <div className="absolute inset-0 border-8 border-brown-800 rounded-full" />
      </div>
    </div>
  );
};

export default MudFlingFountain;
