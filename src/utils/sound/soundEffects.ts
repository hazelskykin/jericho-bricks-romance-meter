
/**
 * Sound Effects API
 * Provides utility functions for playing sound effects in the application
 */

import soundManager from './soundInstance';

// Initialize game sounds
export const initializeGameSounds = (): void => {
  try {
    console.log('Initializing game sound system...');
    soundManager.initialize();
    return;
  } catch (error) {
    console.error('Failed to initialize sound system:', error);
  }
};

// Export a safe play function that won't crash the app
export const playSoundSafely = (soundId: string) => {
  try {
    soundManager.playSFX(soundId);
  } catch (error) {
    // Silently fail
  }
};

// Expose the sound manager for debugging
export const exposeSoundManagerToWindow = () => {
  soundManager.exposeToWindow();
};

// Export the singleton instance
export { soundManager };
