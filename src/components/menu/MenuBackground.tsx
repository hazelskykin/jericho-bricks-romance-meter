
import React from 'react';

const MenuBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(/assets/backgrounds/wall-tiles.jpg)',
          filter: 'brightness(0.8)'
        }}
      />
      
      {/* Dark gradient overlay on the right side only */}
      <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-[#1A1F2C]/90 to-transparent z-10" />
      
      {/* Animated particles/stars effect */}
      <div className="absolute inset-0 z-20 opacity-40">
        <div className="stars-bg"></div>
      </div>
      
      {/* Purple glow effects */}
      <div className="absolute bottom-[-50%] right-[-25%] w-[80%] h-[150%] rounded-full bg-[#9b87f5]/10 blur-[100px] z-5" />
      <div className="absolute top-[-50%] right-[-25%] w-[80%] h-[150%] rounded-full bg-[#7E69AB]/10 blur-[100px] z-5" />
    </div>
  );
};

export default MenuBackground;
