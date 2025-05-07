
// Sound utility for managing game sound effects
type SoundEffect = {
  id: string;
  src: string;
  volume?: number;
};

class SoundManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  private muted: boolean = false;
  private loadErrors: Record<string, boolean> = {};
  private audioAvailable: boolean = true;

  constructor() {
    // Initialize with empty sounds
    this.sounds = {};
    
    // Try to load mute preference from localStorage
    try {
      const storedMute = localStorage.getItem('soundEffectsMuted');
      this.muted = storedMute === 'true';
    } catch (e) {
      // If localStorage fails, default to unmuted
      this.muted = false;
    }

    // Check if audio is generally available in this browser environment
    // This helps for environments where Audio API might be restricted
    try {
      const testAudio = new Audio();
      this.audioAvailable = (typeof testAudio.canPlayType === 'function');
    } catch (e) {
      console.warn('Audio not supported in this environment, all sound will be disabled');
      this.audioAvailable = false;
    }
  }

  preloadSounds(effects: SoundEffect[]): void {
    if (!this.audioAvailable) {
      console.warn('Audio not available in this environment - skipping preload');
      return;
    }

    effects.forEach(effect => {
      try {
        const audio = new Audio();
        
        // Add error handling for the load event
        audio.onerror = () => {
          console.warn(`Could not load sound: ${effect.src}`);
          this.loadErrors[effect.id] = true;
        };

        // Add event listeners to improve error handling
        audio.addEventListener('error', () => {
          console.warn(`Error event triggered for sound: ${effect.src}`);
          this.loadErrors[effect.id] = true;
        }, false);
        
        audio.volume = effect.volume ?? 0.5; // Default volume 50%
        audio.src = effect.src;
        this.sounds[effect.id] = audio;
      } catch (e) {
        console.warn(`Error initializing sound ${effect.id}:`, e);
        this.loadErrors[effect.id] = true;
      }
    });
  }

  play(soundId: string): void {
    // Skip if sound is missing, muted, or audio is not available
    if (this.muted || !this.audioAvailable || !this.sounds[soundId] || this.loadErrors[soundId]) {
      return;
    }
    
    try {
      const sound = this.sounds[soundId];
      
      // Reset the audio to beginning in case it's already playing
      sound.currentTime = 0;
      
      // Play with promise-based error handling (for modern browsers)
      const playPromise = sound.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Failed to play sound ${soundId}:`, error);
          this.loadErrors[soundId] = true;
        });
      }
    } catch (e) {
      console.warn(`Error playing sound ${soundId}:`, e);
      this.loadErrors[soundId] = true;
    }
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    
    // Store preference in localStorage
    try {
      localStorage.setItem('soundEffectsMuted', this.muted.toString());
    } catch (e) {
      console.warn('Could not save sound preference to localStorage', e);
    }
    
    return this.muted;
  }

  isMuted(): boolean {
    return this.muted;
  }

  // Check if audio is generally available
  isAudioAvailable(): boolean {
    return this.audioAvailable;
  }
}

// Export a singleton instance
export const soundManager = new SoundManager();

// Preload all game sounds
export function initializeGameSounds(): void {
  // Only attempt to preload if audio is available
  if (!soundManager.isAudioAvailable()) {
    console.warn('Audio not available - skipping sound initialization');
    return;
  }

  const gameEffects: SoundEffect[] = [
    // Mud Fling sounds
    { id: 'mud-select', src: '/audio/mud-select.mp3', volume: 0.4 },
    { id: 'mud-throw', src: '/audio/mud-throw.mp3', volume: 0.6 },
    { id: 'mud-hit', src: '/audio/mud-hit.mp3', volume: 0.5 },
    { id: 'mud-fountain', src: '/audio/mud-fountain.mp3', volume: 0.3 },
    
    // Brooms Away sounds
    { id: 'broom-sweep', src: '/audio/broom-sweep.mp3', volume: 0.4 },
    { id: 'spot-flag', src: '/audio/spot-flag.mp3', volume: 0.5 },
    { id: 'spot-break', src: '/audio/spot-break.mp3', volume: 0.6 },
    
    // Bloom With A View sounds
    { id: 'item-found', src: '/audio/item-found.mp3', volume: 0.5 },
    { id: 'item-click', src: '/audio/item-click.mp3', volume: 0.3 },
    { id: 'hint-activate', src: '/audio/hint-activate.mp3', volume: 0.4 },
    
    // Common game sounds
    { id: 'game-win', src: '/audio/game-win.mp3', volume: 0.7 },
    { id: 'game-lose', src: '/audio/game-lose.mp3', volume: 0.7 },
    { id: 'score-up', src: '/audio/score-up.mp3', volume: 0.5 },
  ];
  
  soundManager.preloadSounds(gameEffects);
}
