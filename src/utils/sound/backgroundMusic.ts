
/**
 * Background Music API
 * Utility functions for managing background music based on game scenes
 */

import soundManager from './soundInstance';

// Play background music based on scene background
export const playBackgroundMusicForScene = (backgroundId: string) => {
  try {
    soundManager.playBackgroundMusicForScene(backgroundId);
  } catch (error) {
    console.error('Error playing background music:', error);
  }
};

// Stop the current background music
export const stopBackgroundMusic = () => {
  try {
    soundManager.stopMusic();
  } catch (error) {
    console.error('Error stopping background music:', error);
  }
};

// Pause the current background music
export const pauseBackgroundMusic = () => {
  try {
    soundManager.pauseMusic();
  } catch (error) {
    console.error('Error pausing background music:', error);
  }
};

// Resume the current background music
export const resumeBackgroundMusic = () => {
  try {
    soundManager.resumeMusic();
  } catch (error) {
    console.error('Error resuming background music:', error);
  }
};
