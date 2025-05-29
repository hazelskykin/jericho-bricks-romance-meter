
import { useState, useEffect, useMemo, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { allScenes } from '@/data/scenes';
import { CharacterId } from '@/types/game';
import { assetManager } from '@/utils/assetManager';

/**
 * Custom hook to manage game scene loading and error handling
 */
export const useGameScene = () => {
  const { gameState, handleSceneTransition } = useGame();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallbackTriggered, setFallbackTriggered] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState<CharacterId | null>(null);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const backgroundTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
  
  // Preload the current scene's background image with enhanced error handling
  useEffect(() => {
    if (scene?.background) {
      const backgroundPath = `/assets/backgrounds/${scene.background}.jpg`;
      console.log(`Preloading background image: ${scene.background} for scene ${sceneId}`);
      setBackgroundReady(false);
      
      // Clear any existing background timeout
      if (backgroundTimeoutRef.current) {
        clearTimeout(backgroundTimeoutRef.current);
      }
      
      // Check if already cached first
      if (assetManager.hasAsset(backgroundPath)) {
        console.log(`Background already cached: ${backgroundPath}`);
        setBackgroundReady(true);
        return;
      }
      
      // Preload the image
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = backgroundPath;
      
      image.onload = () => {
        console.log(`Successfully preloaded background: ${backgroundPath}`);
        assetManager.forceAssetSuccess(backgroundPath);
        setBackgroundReady(true);
      };

      image.onerror = () => {
        console.error(`Failed to preload background: ${backgroundPath}`);
        
        // Force background to be ready after a timeout regardless of load status
        backgroundTimeoutRef.current = setTimeout(() => {
          console.log(`Forcing background ready state for: ${backgroundPath}`);
          assetManager.forceAssetSuccess(backgroundPath);
          setBackgroundReady(true);
        }, 2000);
      };
      
      // Add a fallback timeout in case neither onload nor onerror fire
      backgroundTimeoutRef.current = setTimeout(() => {
        console.log(`Background load timeout reached for: ${backgroundPath}`);
        assetManager.forceAssetSuccess(backgroundPath);
        setBackgroundReady(true);
      }, 4000);
    }
    
    return () => {
      if (backgroundTimeoutRef.current) {
        clearTimeout(backgroundTimeoutRef.current);
      }
    };
  }, [scene, sceneId]);
  
  // Simple loading mechanism
  useEffect(() => {
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    
    if (scene) {
      // Mark as not loaded initially
      setLoaded(false);
      
      // Allow a short time for resources to load
      loadingTimeoutRef.current = setTimeout(() => {
        setLoaded(true);
        loadingTimeoutRef.current = null;
        console.log(`Scene ${sceneId} marked as loaded`);
      }, 300); // Reduced from 500ms since we're not preloading characters
    }
    
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [scene, sceneId]);

  return {
    scene,
    sceneId,
    error,
    loaded,
    currentDialogue,
    dialogHistory,
    displayedChoices,
    showChoices,
    activeCharacter,
    backgroundReady
  };
};
