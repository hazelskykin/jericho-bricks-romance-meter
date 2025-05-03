
// Sound utility for managing game sound effects
type SoundEffect = {
  id: string;
  src: string;
  volume?: number;
};

class SoundManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  private muted: boolean = false;

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
  }

  preloadSounds(effects: SoundEffect[]): void {
    effects.forEach(effect => {
      const audio = new Audio(effect.src);
      audio.volume = effect.volume ?? 0.5; // Default volume 50%
      this.sounds[effect.id] = audio;
    });
  }

  play(soundId: string): void {
    if (this.muted || !this.sounds[soundId]) return;
    
    try {
      const sound = this.sounds[soundId];
      // Reset the audio to beginning in case it's already playing
      sound.currentTime = 0;
      sound.play().catch(e => console.warn(`Failed to play sound ${soundId}:`, e));
    } catch (e) {
      console.warn(`Error playing sound ${soundId}:`, e);
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
}

// Export a singleton instance
export const soundManager = new SoundManager();

// Preload all game sounds
export function initializeGameSounds(): void {
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
