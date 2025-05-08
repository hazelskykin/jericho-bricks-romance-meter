
import React, { useState, useEffect } from 'react';
import { backgrounds } from '../data/backgrounds';
import { characterExpressions } from '../data/characterExpressions';
import { toast } from 'sonner';

interface AssetPreloaderProps {
  onComplete: () => void;
  priorityOnly?: boolean;
}

// Define which assets should be loaded first
const PRIORITY_ASSETS = {
  backgrounds: ['stonewich-cityscape', 'cybaton-office', 'cybaton-lobby'],
  characters: ['maven-neutral', 'xavier-neutral', 'navarre-neutral', 'etta-neutral', 'senara-neutral']
};

export const AssetPreloader = ({ onComplete, priorityOnly = false }: AssetPreloaderProps) => {
  const [loaded, setLoaded] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Create a cache to store loaded images
  const imageCache = React.useRef<Map<string, HTMLImageElement>>(new Map());

  useEffect(() => {
    const imagesToLoad: string[] = [];
    
    // Add priority background images
    PRIORITY_ASSETS.backgrounds.forEach(bgKey => {
      const bg = backgrounds.find(b => b.id === bgKey);
      if (bg) imagesToLoad.push(bg.src);
    });
    
    // Add priority character images
    PRIORITY_ASSETS.characters.forEach(charKey => {
      const char = Object.values(characterExpressions)
        .flat()
        .find(expression => expression.id === charKey);
      
      if (char) imagesToLoad.push(char.src);
    });

    // If not priority only, add all other assets
    if (!priorityOnly) {
      // Add remaining background images
      backgrounds.forEach(bg => {
        if (!PRIORITY_ASSETS.backgrounds.includes(bg.id)) {
          imagesToLoad.push(bg.src);
        }
      });
      
      // Add remaining character expressions
      Object.values(characterExpressions).flat().forEach(expression => {
        if (!PRIORITY_ASSETS.characters.includes(expression.id)) {
          imagesToLoad.push(expression.src);
        }
      });
    }

    setTotal(imagesToLoad.length);
    
    // Create a function to load images in batches
    const loadImagesBatch = (urls: string[], batchSize: number = 5) => {
      let completed = 0;
      
      const loadBatch = (startIndex: number) => {
        const endIndex = Math.min(startIndex + batchSize, urls.length);
        const currentBatch = urls.slice(startIndex, endIndex);
        
        Promise.all(
          currentBatch.map(url => {
            // Check if image is already in cache
            if (imageCache.current.has(url)) {
              return Promise.resolve();
            }
            
            return new Promise<void>((resolve, reject) => {
              const img = new Image();
              img.onload = () => {
                imageCache.current.set(url, img);
                setLoaded(prev => prev + 1);
                resolve();
              };
              img.onerror = () => {
                console.error(`Failed to load image: ${url}`);
                reject(new Error(`Failed to load image: ${url}`));
              };
              img.src = url;
            });
          })
        )
        .then(() => {
          completed += currentBatch.length;
          if (completed < urls.length) {
            loadBatch(endIndex);
          } else {
            console.log('All images loaded successfully!');
            onComplete();
          }
        })
        .catch(err => {
          console.error('Error loading images:', err);
          setError('Failed to load some assets. Please refresh the page.');
          toast.error('Failed to load some assets');
        });
      };
      
      loadBatch(0);
    };
    
    loadImagesBatch(imagesToLoad);
  }, [onComplete, priorityOnly]);

  // Make the cache accessible globally
  if (typeof window !== 'undefined') {
    (window as any).gameImageCache = imageCache.current;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-dark-purple bg-opacity-90 z-50">
      <div className="text-white text-2xl mb-4">Loading Game Assets</div>
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-purple to-bright-purple transition-all duration-300 ease-out"
          style={{ width: `${total > 0 ? (loaded / total) * 100 : 0}%` }}
        />
      </div>
      <div className="text-white mt-2">
        {loaded} / {total} assets loaded
      </div>
      {error && (
        <div className="text-red-500 mt-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default AssetPreloader;
