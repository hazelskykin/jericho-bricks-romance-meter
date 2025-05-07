
// Sound utility for managing game sound effects
type SoundEffect = {
  id: string;
  src: string;
  volume?: number;
  fallbackSrc?: string;
};

class SoundManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  private muted: boolean = false;
  private loadErrors: Record<string, boolean> = {};
  private audioAvailable: boolean = true;
  private errorCount: number = 0;

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
        audio.onerror = (e) => {
          console.warn(`Could not load sound: ${effect.src}`);
          this.loadErrors[effect.id] = true;
          this.errorCount++;
          
          // Try fallback if provided
          if (effect.fallbackSrc) {
            console.log(`Trying fallback sound: ${effect.fallbackSrc}`);
            audio.src = effect.fallbackSrc;
          }
          
          // Dispatch event to notify components
          window.dispatchEvent(new CustomEvent('sound-error', { 
            detail: { id: effect.id, src: effect.src } 
          }));
        };

        // Add event listeners to improve error handling
        audio.addEventListener('error', () => {
          console.warn(`Error event triggered for sound: ${effect.src}`);
          this.loadErrors[effect.id] = true;
          this.errorCount++;
          
          // Dispatch event to notify components
          window.dispatchEvent(new CustomEvent('sound-error', { 
            detail: { id: effect.id, src: effect.src } 
          }));
        }, false);
        
        audio.volume = effect.volume ?? 0.5; // Default volume 50%
        audio.src = effect.src;
        this.sounds[effect.id] = audio;
      } catch (e) {
        console.warn(`Error initializing sound ${effect.id}:`, e);
        this.loadErrors[effect.id] = true;
        this.errorCount++;
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
          
          // Dispatch event to notify components
          window.dispatchEvent(new CustomEvent('sound-error', { 
            detail: { id: soundId, error } 
          }));
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
  
  // Check if there are any load errors
  hasLoadErrors(): boolean {
    return this.errorCount > 0;
  }
  
  // Get the number of load errors
  getErrorCount(): number {
    return this.errorCount;
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

  // Default placeholder sound for cases where files are missing
  const silenceSound = '/audio/silence.mp3';

  const gameEffects: SoundEffect[] = [
    // Mud Fling sounds
    { id: 'mud-select', src: '/audio/mud-select.mp3', volume: 0.4, fallbackSrc: silenceSound },
    { id: 'mud-throw', src: '/audio/mud-throw.mp3', volume: 0.6, fallbackSrc: silenceSound },
    { id: 'mud-hit', src: '/audio/mud-hit.mp3', volume: 0.5, fallbackSrc: silenceSound },
    { id: 'mud-fountain', src: '/audio/mud-fountain.mp3', volume: 0.3, fallbackSrc: silenceSound },
    
    // Brooms Away sounds
    { id: 'broom-sweep', src: '/audio/broom-sweep.mp3', volume: 0.4, fallbackSrc: silenceSound },
    { id: 'spot-flag', src: '/audio/spot-flag.mp3', volume: 0.5, fallbackSrc: silenceSound },
    { id: 'spot-break', src: '/audio/spot-break.mp3', volume: 0.6, fallbackSrc: silenceSound },
    
    // Bloom With A View sounds
    { id: 'item-found', src: '/audio/item-found.mp3', volume: 0.5, fallbackSrc: silenceSound },
    { id: 'item-click', src: '/audio/item-click.mp3', volume: 0.3, fallbackSrc: silenceSound },
    { id: 'hint-activate', src: '/audio/hint-activate.mp3', volume: 0.4, fallbackSrc: silenceSound },
    
    // Common game sounds
    { id: 'game-win', src: '/audio/game-win.mp3', volume: 0.7, fallbackSrc: silenceSound },
    { id: 'game-lose', src: '/audio/game-lose.mp3', volume: 0.7, fallbackSrc: silenceSound },
    { id: 'score-up', src: '/audio/score-up.mp3', volume: 0.5, fallbackSrc: silenceSound },
  ];
  
  soundManager.preloadSounds(gameEffects);
}
