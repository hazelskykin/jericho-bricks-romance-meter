
import React from 'react';

interface DebugModeIndicatorProps {
  debugMode: boolean;
}

const DebugModeIndicator: React.FC<DebugModeIndicatorProps> = ({ debugMode }) => {
  if (!debugMode) return null;
  
  return (
    <div className="absolute top-16 left-4 bg-red-600/80 text-white px-4 py-2 rounded-lg z-40 shadow-lg">
      Missing image assets - Using debug mode
    </div>
  );
};

export default DebugModeIndicator;
