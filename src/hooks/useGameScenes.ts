
import { useState, useCallback, useEffect } from 'react';
import { allScenes } from '../data/scenes';
import { toast } from 'sonner';
import { mapSceneId, handleSceneError } from '../utils/sceneRouting';

interface UseGameScenesProps {
  initialScene?: string;
}

const useGameScenes = ({ initialScene = 'start' }: UseGameScenesProps = {}) => {
  const [currentSceneId, setCurrentSceneId] = useState<string>(initialScene);
  const [previousSceneId, setPreviousSceneId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [transitionEffect, setTransitionEffect] = useState<string | null>(null);

  // Get the current scene data
  const currentScene = allScenes[currentSceneId];
  
  // Transition to a new scene with error handling
  const transitionToScene = useCallback(
    (sceneId: string, effect?: string) => {
      setLoading(true);
      console.log(`Attempting to transition from scene [${currentSceneId}] to [${sceneId}]`);
      
      // Map scene ID if needed
      const mappedSceneId = mapSceneId(sceneId);
      
      // Check if scene exists
      if (allScenes[mappedSceneId]) {
        setPreviousSceneId(currentSceneId);
        setCurrentSceneId(mappedSceneId);
        
        if (effect) {
          setTransitionEffect(effect);
        }
        
        console.log(`Scene transition complete, now at [${mappedSceneId}]`);
      } else {
        // Try to handle the error with a fallback
        const fallbackScene = handleSceneError(mappedSceneId);
        
        if (fallbackScene && allScenes[fallbackScene]) {
          setPreviousSceneId(currentSceneId);
          setCurrentSceneId(fallbackScene);
        }
      }
      
      setLoading(false);
    },
    [currentSceneId]
  );
  
  // Handle special scene transitions
  useEffect(() => {
    if (currentSceneId.includes('special-transition')) {
      const specialEffect = currentSceneId.split(':')[1];
      const targetScene = currentSceneId.split(':')[2];
      
      console.log(`Special scene detected: ${targetScene}`);
      
      if (specialEffect && targetScene) {
        setTransitionEffect(specialEffect);
        
        // Wait for transition effect to complete
        const timer = setTimeout(() => {
          transitionToScene(targetScene);
          setTransitionEffect(null);
        }, 1500); // Adjust timing based on your transition duration
        
        return () => clearTimeout(timer);
      }
    }
  }, [currentSceneId, transitionToScene]);

  return {
    currentScene,
    currentSceneId,
    previousSceneId,
    transitionToScene,
    loading,
    transitionEffect,
    setTransitionEffect,
  };
};

export default useGameScenes;
