
import React from 'react';
import backgrounds from '@/data/backgrounds';

interface MenuBackgroundProps {
  backgroundId: string;
}

const MenuBackground: React.FC<MenuBackgroundProps> = ({ backgroundId = 'wall-tiles' }) => {
  const bgData = backgrounds[backgroundId];
  
  return (
    <>
      {/* Background image with pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bgData.image})` }}
      />
      
      {/* Gradient overlay to enhance readability */}
      <div 
        className="absolute inset-0 z-5" 
        style={{ background: bgData.gradient || 'linear-gradient(to bottom, rgba(26, 31, 44, 0.3), rgba(42, 30, 78, 0.6))' }}
      />
      
      {/* Additional stylized overlay for depth */}
      <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-[1px]"></div>
    </>
  );
};

export default MenuBackground;
