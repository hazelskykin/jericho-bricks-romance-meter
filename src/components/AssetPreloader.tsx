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

  useEffect(() => {
    const preloadImage = (src: string): Promise<boolean> => {
      return new Promise(resolve => {
        if (!src) return resolve(true);
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    };

    const batchPreload = async (assets: string[], label: string, loadedRef: { current: number }, total: number) => {
      setLoadingMessage(`Loading ${label}...`);
      for (const src of assets) {
        await preloadImage(src);
        loadedRef.current++;
        setLoadingProgress(Math.floor((loadedRef.current / total) * 100));
      }
    };

    const preloadAssets = async () => {
      const loadedRef = { current: 0 };
      const bgList = Object.values(backgrounds);
      const criticalBg = bgList.filter(bg => bg.id === 'wall-tiles');
      const otherBg = bgList.filter(bg => bg.id !== 'wall-tiles');
      const chibis = Object.values(characterChibis).map(c => c.image);
      const charIds = Object.keys(characterExpressions) as CharacterId[];

      const neutral = charIds.map(id => characterExpressions[id]?.neutral?.image).filter(Boolean);
      const moods = ['happy', 'sad', 'angry', 'surprised', 'laughing', 'shocked', 'embarrassed', 'thoughtful', 'confident'] as const;
      const expressions = charIds.flatMap(id =>
        moods.map(mood => characterExpressions[id]?.[mood]?.image).filter(Boolean)
      );

      const totalAssets = criticalBg.length + chibis.length + otherBg.length + neutral.length + expressions.length;

      await batchPreload(criticalBg.map(b => b.image), 'interface backgrounds', loadedRef, totalAssets);
      await batchPreload(chibis, 'character chibis', loadedRef, totalAssets);
      await batchPreload(otherBg.map(b => b.image), 'background scenes', loadedRef, totalAssets);
      await batchPreload(neutral, 'neutral expressions', loadedRef, totalAssets);
      await batchPreload(expressions, 'character portraits', loadedRef, totalAssets);

      setLoadingMessage('Finalizing game setup...');
      setAssetsReady(true);
    };

    preloadAssets().catch(err => {
      console.warn('Asset preload failed:', err);
      setAssetsReady(true);
    });
  }, []);

  if (!assetsReady) {
    return <AssetLoading message={loadingMessage} progress={loadingProgress} />;
  }

  return <>{children}</>;
};

export default AssetPreloader;
