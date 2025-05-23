
import { useState, useEffect, useMemo, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { allScenes } from '@/data/scenes';
import { CharacterId } from '@/types/game';

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
  
  // Preload the current scene's background image
  useEffect(() => {
    if (scene?.background) {
      console.log(`Preloading background image: ${scene.background} for scene ${sceneId}`);
      
      // Preload the image
      const image = new Image();
      image.src = `/assets/backgrounds/${scene.background}.jpg`;
      
      image.onload = () => {
        console.log(`Successfully preloaded background: /assets/backgrounds/${scene.background}.jpg`);
      };

      image.onerror = () => {
        console.error(`Failed to preload background: /assets/backgrounds/${scene.background}.jpg`);
      };
    }
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
      }, 500);
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
    activeCharacter
  };
};
