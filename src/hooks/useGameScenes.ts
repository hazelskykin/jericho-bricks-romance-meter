
import { useState, useCallback, useEffect, useRef } from 'react';
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
  const transitionInProgress = useRef<boolean>(false);

  // Debug: Log all available scenes 
  useEffect(() => {
    console.log('Available scenes in allScenes:', Object.keys(allScenes));
  }, []);
  
  // Get the current scene data with error handling
  const currentScene = allScenes[currentSceneId];
  
  // Transition to a new scene with error handling
  const transitionToScene = useCallback(
    (sceneId: string, effect?: string) => {
      // Prevent multiple rapid transitions
      if (transitionInProgress.current) {
        console.log(`Transition already in progress, ignoring request to ${sceneId}`);
        return;
      }
      
      transitionInProgress.current = true;
      setLoading(true);
      console.log(`Attempting to transition from scene [${currentSceneId}] to [${sceneId}]`);
      
      try {
        // Map scene ID if needed
        const mappedSceneId = mapSceneId(sceneId);
        
        // Debug: Check if the scene exists
        console.log(`Checking if scene [${mappedSceneId}] exists:`, Boolean(allScenes[mappedSceneId]));
        
        // Check if scene exists
        if (allScenes[mappedSceneId]) {
          setPreviousSceneId(currentSceneId);
          setCurrentSceneId(mappedSceneId);
          
          if (effect) {
            setTransitionEffect(effect);
          }
          
          console.log(`Scene transition complete, now at [${mappedSceneId}]`);
        } else {
          // Special case for intro scenes to ensure they're found
          if (mappedSceneId === 'intro' || mappedSceneId === 'prologue-intro') {
            console.log(`Special handling for intro scene: using 'intro'`);
            setPreviousSceneId(currentSceneId);
            setCurrentSceneId('intro');
          }
          // Special case for about scene
          else if (mappedSceneId === 'about') {
            console.log(`Special handling for about scene`);
            setPreviousSceneId(currentSceneId);
            setCurrentSceneId('about');
          }
          // Try to handle the error with a fallback
          else {
            const fallbackScene = handleSceneError(mappedSceneId);
            
            if (fallbackScene && allScenes[fallbackScene]) {
              console.log(`Using fallback scene [${fallbackScene}]`);
              setPreviousSceneId(currentSceneId);
              setCurrentSceneId(fallbackScene);
            } else {
              console.error(`No fallback found for scene [${mappedSceneId}]`);
              toast.error(`Failed to find scene "${mappedSceneId}" or a suitable fallback`);
              
              // Default to start as ultimate fallback
              setPreviousSceneId(currentSceneId);
              setCurrentSceneId('start');
            }
          }
        }
      } catch (error) {
        console.error('Error during scene transition:', error);
        toast.error('An error occurred during scene transition');
        
        // Default to start as ultimate fallback
        setPreviousSceneId(currentSceneId);
        setCurrentSceneId('start');
      } finally {
        setLoading(false);
        
        // Add a short delay before allowing another transition
        setTimeout(() => {
          transitionInProgress.current = false;
        }, 200);
      }
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
