
import { useCallback, useRef } from 'react';
import { soundManager } from '@/utils/sound';

export const useCrafterAudio = () => {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const isMusicPlaying = useRef(false);
  
  // Initialize audio system
  const initializeAudio = useCallback(() => {
    console.log('🎵 Initializing Crafter audio...');
    
    try {
      // Start background music loop
      const musicElement = new Audio('/audio/crafter-loop-gameplay.mp3');
      musicElement.loop = true;
      musicElement.volume = 0.3;
      
      musicElement.addEventListener('canplaythrough', () => {
        console.log('🎵 Crafter background music ready');
        musicElement.play()
          .then(() => {
            console.log('🎵 Successfully started Crafter music');
            isMusicPlaying.current = true;
          })
          .catch(err => {
            console.error('🎵 Error playing Crafter music:', err);
          });
      });
      
      backgroundMusicRef.current = musicElement;
      
    } catch (error) {
      console.error('🎵 Error initializing Crafter audio:', error);
    }
  }, []);
  
  // Play a sound effect
  const playSound = useCallback((soundType: 'hit-block' | 'decor-add' | 'finish-initials' | 'complete-fanfare') => {
    const soundMap: Record<string, string> = {
      'hit-block': 'crafter-hit-block',
      'decor-add': 'crafter-decor-add',
      'finish-initials': 'crafter-finish-initials',
      'complete-fanfare': 'crafter-complete-fanfare',
    };
    
    const soundId = soundMap[soundType];
    if (soundId) {
      soundManager.playSFX(soundId);
    }
  }, []);
  
  // Stop background music
  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current && isMusicPlaying.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
      isMusicPlaying.current = false;
      console.log('🎵 Stopping Crafter music');
    }
  }, []);
  
  // Stop all sounds (for cleanup)
  const stopAllSounds = useCallback(() => {
    stopBackgroundMusic();
  }, [stopBackgroundMusic]);
  
  return {
    initializeAudio,
    playSound,
    stopBackgroundMusic,
    stopAllSounds
  };
};
