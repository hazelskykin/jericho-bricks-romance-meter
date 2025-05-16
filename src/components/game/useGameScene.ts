
import { useState, useEffect, useMemo, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { allScenes } from '@/data/scenes';
import { CharacterId } from '@/types/game';
import { toast } from 'sonner';
import { assetManager } from '@/utils/assetManager';
import backgrounds from '@/data/backgrounds'; // Direct import instead of dynamic import

/**
 * Custom hook to manage game scene loading and error handling
 */
export const useGameScene = () => {
  const { gameState, handleSceneTransition } = useGame();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallbackTriggered, setFallbackTriggered] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState<CharacterId | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadAttemptedRef = useRef(false);
  
  const { currentScene: sceneId, dialogueIndex, showChoices } = gameState;
  
  // Safely get current scene from available scenes with error handling
  const scene = useMemo(() => {
    try {
      if (!sceneId) {
        setError('Invalid scene ID: undefined or null');
        return null;
      }
      
      const sceneData = allScenes[sceneId];
      
      if (!sceneData) {
        console.error(`Scene not found: ${sceneId}`);
        setError(`Scene "${sceneId}" not found`);
        
        // Only trigger the fallback once
        if (!fallbackTriggered) {
          setFallbackTriggered(true);
          
          // Try to fallback to intro scene after a delay
          setTimeout(() => {
            handleSceneTransition('intro');
          }, 1000);
        }
        
        return null;
      }
      
      setError(null);
      return sceneData;
    } catch (err) {
      console.error('Error getting scene:', err);
      setError(`Error loading scene: ${err}`);
      return null;
    }
  }, [sceneId, fallbackTriggered, handleSceneTransition]);
  
  // Get current dialogue line
  const currentDialogue = scene?.dialogue?.[dialogueIndex];
  
  // Build dialogue history up to current point
  const dialogHistory = scene?.dialogue?.slice(0, dialogueIndex + 1) || [];
  
  // Get choices if we're showing them
  const displayedChoices = showChoices && scene?.choices ? scene.choices : [];
  
  // Update active character when dialogue changes
  useEffect(() => {
    if (currentDialogue?.character && currentDialogue.character !== 'narrator') {
      setActiveCharacter(currentDialogue.character as CharacterId);
    }
  }, [currentDialogue]);
  
  // Debug logging (only when scene changes)
  useEffect(() => {
    console.log(`Scene loading: Current scene: ${sceneId}, dialogue index: ${dialogueIndex}, showing choices: ${showChoices}`);
    
    if (!scene) {
      console.error(`Scene not found: ${sceneId}`);
      toast.error(`Scene "${sceneId}" not found. Please report this error.`);
    } else if (!scene.background) {
      console.warn(`Scene ${sceneId} has no background defined`);
    } else if (!currentDialogue && dialogueIndex < (scene.dialogue?.length || 0)) {
      console.error(`Dialogue line not found at index ${dialogueIndex} in scene ${sceneId}`);
    }
  }, [sceneId, scene, currentDialogue, dialogueIndex]);
  
  // Preload the current scene's background image
  useEffect(() => {
    if (scene?.background) {
      const backgroundId = scene.background;
      // Preload the background image directly from imported backgrounds
      try {
        if (backgrounds && backgrounds[backgroundId]) {
          const imagePath = backgrounds[backgroundId].image;
          console.log(`Preloading background image: ${imagePath} for scene ${sceneId}`);
          assetManager.preloadAssets([imagePath], (loaded, total) => {
            if (loaded === total) {
              console.log(`Successfully preloaded background: ${imagePath}`);
            }
          });
        } else {
          console.warn(`Background not found for ID: ${backgroundId}`);
        }
      } catch (err) {
        console.error(`Error preloading background: ${err}`);
      }
    }
  }, [scene, sceneId]);
  
  // Simplified loading mechanism with timeout protection
  useEffect(() => {
    // Prevent repeated loading attempts for the same scene
    if (loadAttemptedRef.current && loaded) return;
    
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    
    if (scene) {
      // Mark as not loaded when scene changes
      setLoaded(false);
      loadAttemptedRef.current = true;
      
      // Timeout to allow for transition effects and asset loading
      loadingTimeoutRef.current = setTimeout(() => {
        setLoaded(true);
        loadingTimeoutRef.current = null;
        console.log(`Scene ${sceneId} marked as loaded`);
      }, 500);
    }
    
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [scene, sceneId]);

  // Reset loading attempts when scene changes
  useEffect(() => {
    loadAttemptedRef.current = false;
  }, [sceneId]);

  return {
    scene,
    sceneId,
    error,
    loaded,
    currentDialogue,
    dialogHistory,
    displayedChoices,
    showChoices,
    activeCharacter
  };
};
