
import React from 'react';

interface MudFlingFountainProps {
  fountainIntensity: 'low' | 'medium' | 'high';
}

const MudFlingFountain: React.FC<MudFlingFountainProps> = ({
  fountainIntensity
}) => {
  // Determine animation speed based on intensity
  const animationSpeed = {
    low: 'animate-pulse-slow',
    medium: 'animate-pulse',
    high: 'animate-pulse-fast'
  }[fountainIntensity];

  // Determine size based on intensity
  const sizeClass = {
    low: 'w-16 h-16',
    medium: 'w-20 h-20',
    high: 'w-24 h-24'
  }[fountainIntensity];

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
      <div 
        className={`rounded-full bg-gradient-to-r from-brown-600 to-brown-800 ${sizeClass} ${animationSpeed} flex items-center justify-center`}
        style={{ 
          boxShadow: '0 0 20px rgba(139, 69, 19, 0.5)',
          background: 'radial-gradient(circle, rgba(139,69,19,0.8) 0%, rgba(101,67,33,0.6) 100%)'
        }}
      >
        <div 
          className="absolute inset-0 rounded-full opacity-50"
          style={{ 
            background: 'radial-gradient(circle, rgba(139,69,19,0.4) 0%, rgba(139,69,19,0) 70%)'
          }}
        />
        
        {/* Mud particles */}
        {Array.from({ length: fountainIntensity === 'low' ? 3 : fountainIntensity === 'medium' ? 5 : 8 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-3 h-3 rounded-full bg-amber-800"
            style={{
              animation: `mudParticle${i % 3 + 1} ${1 + Math.random() * 2}s infinite`,
              top: '50%',
              left: '50%',
              opacity: 0.7 + Math.random() * 0.3
            }}
          />
        ))}
      </div>
      
      <style>
        {`
        @keyframes mudParticle1 {
          0% { transform: translate(-50%, -50%); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(${-50 + Math.random() * 100}%, ${-150 + Math.random() * 50}%); opacity: 0; }
        }
        @keyframes mudParticle2 {
          0% { transform: translate(-50%, -50%); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(${-150 + Math.random() * 100}%, ${-100 + Math.random() * 50}%); opacity: 0; }
        }
        @keyframes mudParticle3 {
          0% { transform: translate(-50%, -50%); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(${50 + Math.random() * 100}%, ${-100 + Math.random() * 50}%); opacity: 0; }
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-pulse-fast {
          animation: pulse 1.5s infinite;
        }
        `}
      </style>
    </div>
  );
};

export default MudFlingFountain;
