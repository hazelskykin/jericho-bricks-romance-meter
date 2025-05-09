
// Sound utility for managing game sound effects
type SoundEffect = {
  id: string;
  src: string;
  volume?: number;
  fallbackSrc?: string;
  category?: 'ui' | 'minigame' | 'dialogue' | 'ambient' | 'music';
  loop?: boolean;
};

class SoundManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  private music: Record<string, HTMLAudioElement> = {};
  private muted: boolean = false;
  private musicMuted: boolean = false;
  private loadErrors: Record<string, boolean> = {};
  private audioAvailable: boolean = true;
  private errorCount: number = 0;
  private masterVolume: number = 1.0;
  private sfxVolume: number = 0.7;
  private musicVolume: number = 0.5;
  private currentMusic: string | null = null;

  constructor() {
    // Initialize with empty sounds
    this.sounds = {};
    this.music = {};
    
    // Try to load mute preference from localStorage
    try {
      const storedMute = localStorage.getItem('soundEffectsMuted');
      this.muted = storedMute === 'true';
      
      const storedMusicMute = localStorage.getItem('musicMuted');
      this.musicMuted = storedMusicMute === 'true';
      
      // Try to load volume settings
      const storedMasterVolume = localStorage.getItem('masterVolume');
      if (storedMasterVolume) {
        this.masterVolume = parseFloat(storedMasterVolume);
      }
      
      const storedSfxVolume = localStorage.getItem('sfxVolume');
      if (storedSfxVolume) {
        this.sfxVolume = parseFloat(storedSfxVolume);
      }
      
      const storedMusicVolume = localStorage.getItem('musicVolume');
      if (storedMusicVolume) {
        this.musicVolume = parseFloat(storedMusicVolume);
      }
    } catch (e) {
      // If localStorage fails, use defaults
      this.muted = false;
      this.musicMuted = false;
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
        
        // Set volume based on category
        if (effect.category === 'music') {
          audio.volume = (effect.volume ?? 1.0) * this.musicVolume * this.masterVolume;
          audio.loop = effect.loop ?? false;
          this.music[effect.id] = audio;
        } else {
          audio.volume = (effect.volume ?? 0.7) * this.sfxVolume * this.masterVolume;
          this.sounds[effect.id] = audio;
        }
        
        audio.src = effect.src;
        audio.load(); // Explicitly start loading the audio
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
      
      // Apply current volume settings
      sound.volume = (sound.volume || 0.7) * this.sfxVolume * this.masterVolume;
      
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
  
  // Play a sound effect with specified category
  playSFX(soundId: string): void {
    this.play(soundId);
  }
  
  // Play background music with looping
  playMusic(musicId: string, volume: number = 0.5, loop: boolean = true): void {
    if (this.musicMuted || !this.audioAvailable || !this.music[musicId]) {
      return;
    }
    
    // Stop any currently playing music
    if (this.currentMusic && this.currentMusic !== musicId) {
      this.stopMusic(this.currentMusic);
    }
    
    try {
      const music = this.music[musicId];
      
      // Configure music properties
      music.loop = loop;
      music.volume = volume * this.musicVolume * this.masterVolume;
      
      // Play the music
      const playPromise = music.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Failed to play music ${musicId}:`, error);
          this.loadErrors[musicId] = true;
        });
      }
      
      // Set as current music
      this.currentMusic = musicId;
    } catch (e) {
      console.warn(`Error playing music ${musicId}:`, e);
      this.loadErrors[musicId] = true;
    }
  }
  
  // Stop specific music track
  stopMusic(musicId: string): void {
    if (!this.music[musicId]) return;
    
    try {
      const music = this.music[musicId];
      music.pause();
      music.currentTime = 0;
      
      if (this.currentMusic === musicId) {
        this.currentMusic = null;
      }
    } catch (e) {
      console.warn(`Error stopping music ${musicId}:`, e);
    }
  }
  
  // Stop all music
  stopAllMusic(): void {
    Object.keys(this.music).forEach(id => {
      this.stopMusic(id);
    });
    this.currentMusic = null;
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
  
  toggleMusicMute(): boolean {
    this.musicMuted = !this.musicMuted;
    
    // Apply mute state to all music
    Object.values(this.music).forEach(music => {
      if (this.musicMuted) {
        music.pause();
      } else if (music === this.music[this.currentMusic || '']) {
        music.play().catch(() => {});
      }
    });
    
    // Store preference in localStorage
    try {
      localStorage.setItem('musicMuted', this.musicMuted.toString());
    } catch (e) {
      console.warn('Could not save music preference to localStorage', e);
    }
    
    return this.musicMuted;
  }
  
  // Set master volume (affects both SFX and music)
  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    
    // Apply to all sounds
    Object.values(this.sounds).forEach(sound => {
      sound.volume = this.sfxVolume * this.masterVolume;
    });
    
    // Apply to all music
    Object.values(this.music).forEach(music => {
      music.volume = this.musicVolume * this.masterVolume;
    });
    
    // Store in localStorage
    try {
      localStorage.setItem('masterVolume', this.masterVolume.toString());
    } catch (e) {
      console.warn('Could not save master volume to localStorage', e);
    }
  }
  
  // Set SFX volume
  setSFXVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    
    // Apply to all sounds
    Object.values(this.sounds).forEach(sound => {
      sound.volume = this.sfxVolume * this.masterVolume;
    });
    
    // Store in localStorage
    try {
      localStorage.setItem('sfxVolume', this.sfxVolume.toString());
    } catch (e) {
      console.warn('Could not save SFX volume to localStorage', e);
    }
  }
  
  // Set music volume
  setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    
    // Apply to all music
    Object.values(this.music).forEach(music => {
      music.volume = this.musicVolume * this.masterVolume;
    });
    
    // Store in localStorage
    try {
      localStorage.setItem('musicVolume', this.musicVolume.toString());
    } catch (e) {
      console.warn('Could not save music volume to localStorage', e);
    }
  }

  isMuted(): boolean {
    return this.muted;
  }
  
  isMusicMuted(): boolean {
    return this.musicMuted;
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

// Organize sounds by category
export type SoundCategory = 'ui' | 'minigame' | 'dialogue' | 'ambient' | 'music';

// Preload all game sounds
export function initializeGameSounds(): void {
  // Only attempt to preload if audio is available
  if (!soundManager.isAudioAvailable()) {
    console.warn('Audio not available - skipping sound initialization');
    return;
  }

  // Default placeholder sound for cases where files are missing
  const silenceSound = '/audio/silence.mp3';

  // Game sound effects
  const gameSounds: SoundEffect[] = [
    // UI Sounds
    { id: 'ui-click', src: '/audio/buttonPress.mp3', category: 'ui', volume: 0.4 },
    { id: 'ui-hover', src: '/audio/softPop.mp3', category: 'ui', volume: 0.2 },
    { id: 'ui-notification', src: '/audio/chime.mp3', category: 'ui', volume: 0.5 },
    { id: 'ui-success', src: '/audio/bellchime.mp3', category: 'ui', volume: 0.5 },
    { id: 'ui-error', src: '/audio/buzz.mp3', category: 'ui', volume: 0.4 },
    
    // Minigame: Mud Fling sounds
    { id: 'mud-select', src: '/audio/itemPickup.mp3', category: 'minigame', volume: 0.4 },
    { id: 'mud-throw', src: '/audio/whoosh.mp3', category: 'minigame', volume: 0.6 },
    { id: 'mud-hit', src: '/audio/wetsplat.mp3', category: 'minigame', volume: 0.5 },
    { id: 'mud-fountain', src: '/audio/water-splash.mp3', category: 'minigame', volume: 0.3 },
    
    // Minigame: Brooms Away sounds
    { id: 'broom-sweep', src: '/audio/softrustle.mp3', category: 'minigame', volume: 0.4 },
    { id: 'spot-flag', src: '/audio/ping.mp3', category: 'minigame', volume: 0.5 },
    { id: 'spot-break', src: '/audio/crumblingPaper.mp3', category: 'minigame', volume: 0.6 },
    
    // Minigame: Bloom With A View sounds
    { id: 'item-found', src: '/audio/twinkle.mp3', category: 'minigame', volume: 0.5 },
    { id: 'item-click', src: '/audio/slideClick.mp3', category: 'minigame', volume: 0.3 },
    { id: 'hint-activate', src: '/audio/twinkleChimes.mp3', category: 'minigame', volume: 0.4 },
    
    // Minigame: What's On Tap sounds
    { id: 'pour-start', src: '/audio/tapPour.mp3', category: 'minigame', volume: 0.5 },
    { id: 'pour-stop', src: '/audio/drinkdowntap.mp3', category: 'minigame', volume: 0.5 },
    { id: 'fizz', src: '/audio/fizz.mp3', category: 'minigame', volume: 0.4 },
    { id: 'order-complete', src: '/audio/purchase.mp3', category: 'minigame', volume: 0.5 },
    
    // Common game sounds
    { id: 'game-win', src: '/audio/fanfare.mp3', category: 'minigame', volume: 0.7 },
    { id: 'game-lose', src: '/audio/missWhoosh.mp3', category: 'minigame', volume: 0.7 },
    { id: 'score-up', src: '/audio/bellding.mp3', category: 'minigame', volume: 0.5 },
    { id: 'click', src: '/audio/buttonPress.mp3', category: 'ui', volume: 0.4 },
    { id: 'win', src: '/audio/fanfare.mp3', category: 'minigame', volume: 0.7 },
    { id: 'error', src: '/audio/buzz.mp3', category: 'ui', volume: 0.4 },
    
    // Ambient background sounds
    { id: 'ambient-city', src: '/audio/doorchime.mp3', category: 'ambient', volume: 0.3, loop: true },
    { id: 'ambient-nature', src: '/audio/birdsong.mp3', category: 'ambient', volume: 0.2, loop: true },
    
    // Music tracks - these would ideally be longer audio files
    { id: 'music-menu', src: '/audio/flourish.mp3', category: 'music', volume: 0.4, loop: true },
    { id: 'game-background', src: '/audio/birdsong.mp3', category: 'music', volume: 0.3, loop: true },
  ];
  
  soundManager.preloadSounds(gameSounds);
}

// Hook to play sounds related to UI interactions
export function useUISound() {
  const playUISound = (soundId: string) => {
    soundManager.playSFX(soundId);
  };
  
  return {
    click: () => playUISound('ui-click'),
    hover: () => playUISound('ui-hover'),
    notification: () => playUISound('ui-notification'),
    success: () => playUISound('ui-success'),
    error: () => playUISound('ui-error')
  };
}
