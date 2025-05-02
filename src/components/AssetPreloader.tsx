
import React, { useState, useEffect } from 'react';
import backgrounds from '@/data/backgrounds';
import characterExpressions from '@/data/characterExpressions';
import characterChibis from '@/data/characterChibis';
import AssetLoading from './AssetLoading';
import { CharacterId } from '@/types/game';

interface AssetPreloaderProps {
  children: React.ReactNode;
}

const AssetPreloader: React.FC<AssetPreloaderProps> = ({ children }) => {
  const [assetsReady, setAssetsReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading game assets...');
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Preload all game assets more efficiently
  useEffect(() => {
    // Helper function to preload an image and track progress
    const preloadImage = (imagePath: string): Promise<boolean> => {
      return new Promise((resolve) => {
        // Skip if no image path
        if (!imagePath) {
          resolve(true);
          return;
        }
        
        const img = new Image();
        img.src = imagePath;
        img.onload = () => resolve(true);
        img.onerror = () => {
          console.error(`Failed to preload image: ${imagePath}`);
          resolve(false);
        };
      });
    };

    const preloadAssets = async () => {
      try {
        // Calculate total assets to preload
        const totalBackgrounds = Object.values(backgrounds).length;
        const characterIds = Object.keys(characterExpressions) as CharacterId[];
        let totalExpressions = 0;
        
        characterIds.forEach(id => {
          const expressions = characterExpressions[id];
          if (expressions) {
            totalExpressions += Object.values(expressions).length;
          }
        });
        
        const totalChibis = Object.values(characterChibis).length;
        const totalAssets = totalBackgrounds + totalExpressions + totalChibis;
        
        let loadedAssets = 0;
        
        // Backgrounds - load first priority
        setLoadingMessage('Loading background scenes...');
        for (const bg of Object.values(backgrounds)) {
          await preloadImage(bg.image);
          loadedAssets++;
          setLoadingProgress(Math.floor((loadedAssets / totalAssets) * 100));
        }
        
        // Chibis - load second priority (small but important for UI)
        setLoadingMessage('Loading character chibis...');
        const chibiPromises = Object.values(characterChibis).map(chibi => {
          return preloadImage(chibi.image).then(() => {
            loadedAssets++;
            setLoadingProgress(Math.floor((loadedAssets / totalAssets) * 100));
          });
        });
        
        await Promise.all(chibiPromises);
        
        // Character expressions - load in parallel batches for better performance
        setLoadingMessage('Loading character portraits...');
        
        // Process characters in batches of 2 to avoid too many concurrent requests
        const batchSize = 2;
        for (let i = 0; i < characterIds.length; i += batchSize) {
          const batchIds = characterIds.slice(i, i + batchSize);
          
          const batchPromises = batchIds.flatMap(id => {
            const moodMap = characterExpressions[id];
            if (!moodMap) return [];
            
            return Object.values(moodMap).map(expression => {
              return preloadImage(expression.image).then(() => {
                loadedAssets++;
                setLoadingProgress(Math.floor((loadedAssets / totalAssets) * 100));
              });
            });
          });
          
          await Promise.all(batchPromises);
        }

        setLoadingMessage('Finalizing game setup...');
        setAssetsReady(true);
      } catch (error) {
        console.error("Error preloading assets:", error);
        // Still set ready even if some assets failed to load
        // The components will handle fallbacks
        setAssetsReady(true);
      }
    };
    
    preloadAssets();
  }, []);

  if (!assetsReady) {
    return <AssetLoading message={loadingMessage} progress={loadingProgress} />;
  }

  return <>{children}</>;
};

export default AssetPreloader;
