
import React, { useState, useEffect } from 'react';
import Game from '../components/Game';
import AssetPreloader from '../components/AssetPreloader';

const Index: React.FC = () => {
  const [priorityAssetsLoaded, setPriorityAssetsLoaded] = useState(false);
  
  return (
    <div className="w-full h-screen bg-black">
      {!priorityAssetsLoaded ? (
        <AssetPreloader 
          onComplete={() => setPriorityAssetsLoaded(true)}
          priorityOnly={true}
        />
      ) : (
        <Game />
      )}
    </div>
  );
};

export default Index;
