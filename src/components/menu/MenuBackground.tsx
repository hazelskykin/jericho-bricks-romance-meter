
import React from 'react';

const MenuBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C]/70 to-[#0D0D14]/90 z-10" />
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(/assets/backgrounds/wall-tiles.jpg)',
          filter: 'blur(3px) brightness(0.6)'
        }}
      />
      
      {/* Animated particles/stars effect */}
      <div className="absolute inset-0 z-20 opacity-40">
        <div className="stars-bg"></div>
      </div>
      
      {/* Purple glow effects */}
      <div className="absolute bottom-[-50%] left-[-25%] w-[150%] h-[150%] rounded-full bg-[#9b87f5]/10 blur-[100px] z-5" />
      <div className="absolute top-[-50%] right-[-25%] w-[150%] h-[150%] rounded-full bg-[#7E69AB]/10 blur-[100px] z-5" />
    </div>
  );
};

export default MenuBackground;
