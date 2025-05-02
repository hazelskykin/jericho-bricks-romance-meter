
import React, { useState, useEffect } from 'react';
import backgrounds from '@/data/backgrounds';
import characterExpressions from '@/data/characterExpressions';
import AssetLoading from './AssetLoading';

interface AssetPreloaderProps {
  children: React.ReactNode;
}

const AssetPreloader: React.FC<AssetPreloaderProps> = ({ children }) => {
  const [assetsReady, setAssetsReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading game assets...');

  // Preload all game assets
  useEffect(() => {
    const preloadAssets = async () => {
      setLoadingMessage('Loading background scenes...');
      // Load all background images
      const backgroundPromises = Object.values(backgrounds).map((bg) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = bg.image;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      });
      
      await Promise.all(backgroundPromises);
      
      setLoadingMessage('Loading character portraits...');
      // Load all character expression images
      const expressionPromises = Object.values(characterExpressions).flatMap(moodMap => 
        Object.values(moodMap).map(expression => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = expression.image;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          });
        })
      );
      
      await Promise.all(expressionPromises);
      
      setLoadingMessage('Finalizing game setup...');
      setAssetsReady(true);
    };
    
    preloadAssets();
  }, []);

  if (!assetsReady) {
    return <AssetLoading message={loadingMessage} />;
  }

  return <>{children}</>;
};

export default AssetPreloader;
