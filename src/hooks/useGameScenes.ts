
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionInProgress = useRef<boolean>(false);
  const transitionDuration = 300; // milliseconds

  // Debug: Log all available scenes 
  useEffect(() => {
    console.log('Available scenes in allScenes:', Object.keys(allScenes));
    
    // Debug specific summer scenes
    const summerScenes = Object.keys(allScenes).filter(key => key.startsWith('summer-'));
    console.log('Available summer scenes:', summerScenes);
    
    if (!allScenes['summer-character-selection']) {
      console.error('summer-character-selection scene is missing!');
    }
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
      
      // Start transition effect
      setIsTransitioning(true);
      transitionInProgress.current = true;
      setLoading(true);
      console.log(`Attempting to transition from scene [${currentSceneId}] to [${sceneId}]`);
      
      // Debug check for summer character selection
      if (sceneId === 'summer-character-selection') {
        console.log('Trying to transition to summer-character-selection');
        console.log('This scene exists in allScenes:', Boolean(allScenes['summer-character-selection']));
      }
      
      // Delay the actual scene change to allow for transition animation
      setTimeout(() => {
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
            // Special case for summer character selection
            else if (mappedSceneId === 'summer-character-selection') {
              console.log('Special handling for summer character selection scene');
              // Try to force a transition to the character selection
              setPreviousSceneId(currentSceneId);
              // Use a different approach - try to use the GameInterface's direct rendering
              setCurrentSceneId('summer-character-selection');
              toast.info('Transitioning to summer character selection');
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
          
          // Remove the transition effect after it completes
          setTimeout(() => {
            setIsTransitioning(false);
            
            // Add a short delay before allowing another transition
            setTimeout(() => {
              transitionInProgress.current = false;
            }, 200);
          }, transitionDuration);
        }
      }, transitionDuration / 2); // Start scene change halfway through the fade
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
    isTransitioning,
    transitionDuration
  };
};

export default useGameScenes;
