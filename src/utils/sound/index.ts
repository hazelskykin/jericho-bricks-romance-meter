
/**
 * Sound Module
 * Exports all sound-related functions and the sound manager instance
 */

import { soundManager } from './soundInstance';

// Re-export the sound manager
export { soundManager };
export { 
  playBackgroundMusicForScene,
  stopBackgroundMusic,
  pauseBackgroundMusic,
  resumeBackgroundMusic
} from './backgroundMusic';

// Initialize game sounds
export const initializeGameSounds = (): void => {
  try {
    soundManager.initialize();
    console.log('Sound system initialized');
  } catch (error) {
    console.error('Failed to initialize sound system:', error);
  }
};

// Expose sound manager to window for debugging
export const exposeSoundManagerToWindow = (): void => {
  try {
    soundManager.exposeToWindow();
  } catch (error) {
    console.error('Failed to expose sound manager to window:', error);
  }
};

// Default export for simpler imports
export default soundManager;
