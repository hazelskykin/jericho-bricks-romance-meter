
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
        
        // Check file extension and try with png if jpeg fails
        const tryImageWithFallback = (path: string, tryPng: boolean = false): void => {
          const img = new Image();
          
          img.onload = () => resolve(true);
          img.onerror = () => {
            if (tryPng && path.toLowerCase().endsWith('.jpeg')) {
              // If jpeg fails, try png
              const pngPath = path.substring(0, path.length - 5) + '.png';
              console.log(`Trying fallback image: ${pngPath}`);
              
              const pngImg = new Image();
              pngImg.onload = () => resolve(true);
              pngImg.onerror = () => resolve(false);
              pngImg.src = pngPath;
            } else if (tryPng && path.toLowerCase().endsWith('.jpg')) {
              // If jpg fails, try png
              const pngPath = path.substring(0, path.length - 4) + '.png';
              console.log(`Trying fallback image: ${pngPath}`);
              
              const pngImg = new Image();
              pngImg.onload = () => resolve(true);
              pngImg.onerror = () => resolve(false);
              pngImg.src = pngPath;
            } else {
              // No more fallbacks
              resolve(false);
            }
          };
          
          img.src = path;
        };
        
        tryImageWithFallback(imagePath, true);
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
        const failedAssets: string[] = [];
        
        // Priority 1: Immediately load wall-tiles for main menu and any critical backgrounds
        setLoadingMessage('Loading interface backgrounds...');
        const criticalBackgrounds = ['wall-tiles'];
        
        for (const bgId of criticalBackgrounds) {
          const bg = backgrounds[bgId];
          if (bg) {
            const success = await preloadImage(bg.image);
            if (!success) {
              failedAssets.push(bg.image);
            }
            loadedAssets++;
            setLoadingProgress(Math.floor((loadedAssets / totalAssets) * 100));
          }
        }
        
        // Priority 2: Load character chibis for main menu
        setLoadingMessage('Loading character chibis...');
        const chibiPromises = Object.values(characterChibis).map(async chibi => {
          const success = await preloadImage(chibi.image);
          if (!success) {
            failedAssets.push(chibi.image);
          }
          loadedAssets++;
          setLoadingProgress(Math.floor((loadedAssets / totalAssets) * 100));
        });
        
        await Promise.all(chibiPromises);
        
        // Priority 3: Load remaining backgrounds
        setLoadingMessage('Loading background scenes...');
        const remainingBackgrounds = Object.values(backgrounds).filter(
          bg => !criticalBackgrounds.includes(bg.id)
        );
        
        for (const bg of remainingBackgrounds) {
          const success = await preloadImage(bg.image);
          if (!success) {
            failedAssets.push(bg.image);
          }
          loadedAssets++;
          setLoadingProgress(Math.floor((loadedAssets / totalAssets) * 100));
        }
        
        // Priority 4: Neutral character expressions first
        setLoadingMessage('Loading character portraits...');
        const neutralExpressionsPromises = characterIds.map(async id => {
          const neutralExpression = characterExpressions[id]?.neutral;
          if (neutralExpression) {
            const success = await preloadImage(neutralExpression.image);
            if (!success) {
              failedAssets.push(neutralExpression.image);
            }
            loadedAssets++;
            setLoadingProgress(Math.floor((loadedAssets / totalAssets) * 100));
          }
        });
        
        await Promise.all(neutralExpressionsPromises);
        
        // Priority 5: Remaining character expressions in batches
        const moodTypes: (keyof typeof characterExpressions[CharacterId])[] = [
          'happy', 'sad', 'angry', 'surprised', 'laughing', 'shocked', 'embarrassed', 'thoughtful', 'confident'
        ];
        
        // Process moods in batches for better resource management
        for (const mood of moodTypes) {
          const moodExpressionsPromises = characterIds.map(async id => {
            const expression = characterExpressions[id]?.[mood];
            if (expression) {
              const success = await preloadImage(expression.image);
              if (!success) {
                failedAssets.push(expression.image);
              }
              // Still increment asset count even if the image failed to load
              loadedAssets++;
              setLoadingProgress(Math.floor((loadedAssets / totalAssets) * 100));
            }
          });
          
          await Promise.all(moodExpressionsPromises);
        }

        if (failedAssets.length > 0) {
          console.warn(`Failed to load ${failedAssets.length} assets. Game will use fallbacks.`);
        }

        setLoadingMessage('Finalizing game setup...');
        setAssetsReady(true);
      } catch (error) {
        console.warn("Error preloading assets, continuing anyway:", error);
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
