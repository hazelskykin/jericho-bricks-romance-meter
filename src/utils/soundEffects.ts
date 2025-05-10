
// Sound utility for managing game sound effects
import { SoundCategory, SoundEffect } from '@/types/assets';

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
  private silenceAudio: HTMLAudioElement | null = null;

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
      if (this.audioAvailable) {
        // Create a silent audio as fallback
        this.createSilenceAudio();
      }
    } catch (e) {
      console.warn('Audio not supported in this environment, all sound will be disabled');
      this.audioAvailable = false;
    }
  }
  
  // Create a silent audio element for fallbacks
  private createSilenceAudio() {
    try {
      // Create silent audio using base64 encoded mp3
      // This is a 0.1 second silent MP3
      const silenceBase64 = 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAXAAAARW5jb2RlZCBieQBMYXZmNTguMjkuMTAwVFlFUgAAAAUAAAAyMDIzVFBFMQAAAAcAAABMYXZmNTgAVERSTQAAAAUAAAAyMDIzVENPTgAAAAsAAABTaWxlbnQgTVAzAFByaXYA0jAAAFRJVDIAAAANAAAAU2lsZW5jZSAwLjFzAENPTU0AAAAPAAAAZW5nAFNpbGVuY2UgMC4xAENPTU0AAAAdAAAATGF2ZjU4LjI5LjEwMCAoTGliYXYgNTguMTgpAENPTQAAAA8AAABlbmcAU2lsZW5jZSAwLjEAL/8=';
      
      const audio = new Audio(silenceBase64);
      audio.loop = false;
      audio.volume = 0;
      this.silenceAudio = audio;
    } catch (e) {
      console.warn('Could not create silence audio', e);
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
        
        // Fix common audio paths issues
        const fixedSrc = this.fixAudioPath(effect.src);
        
        // Add error handling for the load event
        audio.onerror = (e) => {
          console.warn(`Could not load sound: ${fixedSrc}`);
          this.loadErrors[effect.id] = true;
          this.errorCount++;
          
          // Try fallback if provided
          if (effect.fallbackSrc) {
            console.log(`Trying fallback sound: ${effect.fallbackSrc}`);
            audio.src = effect.fallbackSrc;
          } else if (this.silenceAudio) {
            // If no fallback provided, use silence
            // This ensures we still have an audio element that can be played without errors
            this.replaceSoundWithSilence(effect.id, effect.category === 'music');
          }
          
          // Dispatch event to notify components
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('sound-error', { 
              detail: { id: effect.id, src: fixedSrc } 
            }));
          }
        };

        // Add event listeners to improve error handling
        audio.addEventListener('error', () => {
          console.warn(`Error event triggered for sound: ${fixedSrc}`);
          this.loadErrors[effect.id] = true;
          this.errorCount++;
          
          // Dispatch event to notify components
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('sound-error', { 
              detail: { id: effect.id, src: fixedSrc } 
            }));
          }
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
        
        audio.src = fixedSrc;
        audio.preload = 'auto'; // Explicitly set preload
        audio.load(); // Explicitly start loading the audio
      } catch (e) {
        console.warn(`Error initializing sound ${effect.id}:`, e);
        this.loadErrors[effect.id] = true;
        this.errorCount++;
        // Create silent audio as fallback
        this.replaceSoundWithSilence(effect.id, effect.category === 'music');
      }
    });
  }
  
  // Replace a failed sound with silence
  private replaceSoundWithSilence(soundId: string, isMusic: boolean = false) {
    if (!this.silenceAudio) return;
    
    try {
      // Clone the silence audio element for this sound
      const silentAudio = this.silenceAudio.cloneNode() as HTMLAudioElement;
      
      if (isMusic) {
        this.music[soundId] = silentAudio;
      } else {
        this.sounds[soundId] = silentAudio;
      }
    } catch (e) {
      console.error('Failed to create silent audio fallback', e);
    }
  }
  
  // Fix common audio path issues
  private fixAudioPath(src: string): string {
    // Check if path is undefined (should not happen with proper types, but just in case)
    if (!src) {
      return '';
    }
    
    // Check if audio file path needs fixing 
    // (e.g., if path is /assets/audio/sfx/x.mp3 but file is actually /audio/x.mp3)
    if (src.startsWith('/assets/audio/')) {
      return src.replace('/assets/audio/', '/audio/');
    }
    return src;
  }

  play(soundId: string): void {
    // Skip if sound is missing, muted, or audio is not available
    if (this.muted || !this.audioAvailable || !this.sounds[soundId]) {
      // If sound is missing, create a silent audio fallback
      if (!this.sounds[soundId]) {
        this.replaceSoundWithSilence(soundId);
      }
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
          
          // Only mark as error if it's not a user interaction issue
          if (error.name !== 'NotAllowedError') {
            this.loadErrors[soundId] = true;
            
            // Dispatch event to notify components
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('sound-error', { 
                detail: { id: soundId, error } 
              }));
            }
          }
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
          
          // Only mark as error if it's not a user interaction issue
          if (error.name !== 'NotAllowedError') {
            this.loadErrors[musicId] = true;
          }
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
  
  // Expose the manager to window for debugging
  exposeToWindow(): void {
    if (typeof window !== 'undefined') {
      (window as any).soundManager = this;
    }
  }
}

// Export a singleton instance
export const soundManager = new SoundManager();

// Expose to window for debugging
if (typeof window !== 'undefined') {
  (window as any).soundManager = soundManager;
}

// Preload all game sounds
export function initializeGameSounds(): void {
  // Only attempt to preload if audio is available
  if (!soundManager.isAudioAvailable()) {
    console.warn('Audio not available - skipping sound initialization');
    return;
  }

  console.log('Initializing game sound system...');
  
  // Game sound effects - using silent fallbacks for now since the audio files aren't loading properly
  const silentFallback = 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAXAAAARW5jb2RlZCBieQBMYXZmNTguMjkuMTAwVFlFUgAAAAUAAAAyMDIzVFBFMQAAAAcAAABMYXZmNTgAVERSTQAAAAUAAAAyMDIzVENPTgAAAAsAAABTaWxlbnQgTVAzAFByaXYA0jAAAFRJVDIAAAANAAAAU2lsZW5jZSAwLjFzAENPTU0AAAAPAAAAZW5nAFNpbGVuY2UgMC4xAENPTU0AAAAdAAAATGF2ZjU4LjI5LjEwMCAoTGliYXYgNTguMTgpAENPTQAAAA8AAABlbmcAU2lsZW5jZSAwLjEAL/8=';
  
  const gameSounds: SoundEffect[] = [
    // UI Sounds with fallbacks
    { id: 'ui-click', src: '/audio/buttonPress.mp3', fallbackSrc: silentFallback, category: 'ui', volume: 0.4 },
    { id: 'ui-hover', src: '/audio/softPop.mp3', fallbackSrc: silentFallback, category: 'ui', volume: 0.2 },
    { id: 'ui-notification', src: '/audio/chime.mp3', fallbackSrc: silentFallback, category: 'ui', volume: 0.5 },
    { id: 'ui-success', src: '/audio/bellchime.mp3', fallbackSrc: silentFallback, category: 'ui', volume: 0.5 },
    { id: 'ui-error', src: '/audio/buzz.mp3', fallbackSrc: silentFallback, category: 'ui', volume: 0.4 },
    
    // Minigame: Mud Fling sounds
    { id: 'mud-select', src: '/audio/itemPickup.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.4 },
    { id: 'mud-throw', src: '/audio/whoosh.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.6 },
    { id: 'mud-hit', src: '/audio/wetsplat.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.5 },
    { id: 'mud-fountain', src: '/audio/water-splash.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.3 },
    
    // Minigame: Brooms Away sounds
    { id: 'broom-sweep', src: '/audio/softrustle.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.4 },
    { id: 'spot-flag', src: '/audio/ping.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.5 },
    { id: 'spot-break', src: '/audio/crumblingPaper.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.6 },
    
    // Minigame: Bloom With A View sounds
    { id: 'item-found', src: '/audio/twinkle.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.5 },
    { id: 'item-click', src: '/audio/slideClick.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.3 },
    { id: 'hint-activate', src: '/audio/twinkleChimes.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.4 },
    
    // Minigame: What's On Tap sounds
    { id: 'pour-start', src: '/audio/tapPour.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.5 },
    { id: 'pour-stop', src: '/audio/drinkdowntap.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.5 },
    { id: 'fizz', src: '/audio/fizz.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.4 },
    { id: 'order-complete', src: '/audio/purchase.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.5 },
    
    // Common game sounds
    { id: 'game-win', src: '/audio/fanfare.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.7 },
    { id: 'game-lose', src: '/audio/missWhoosh.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.7 },
    { id: 'score-up', src: '/audio/bellding.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.5 },
    { id: 'click', src: '/audio/buttonPress.mp3', fallbackSrc: silentFallback, category: 'ui', volume: 0.4 },
    { id: 'win', src: '/audio/fanfare.mp3', fallbackSrc: silentFallback, category: 'minigame', volume: 0.7 },
    { id: 'error', src: '/audio/buzz.mp3', fallbackSrc: silentFallback, category: 'ui', volume: 0.4 }
  ];
  
  soundManager.preloadSounds(gameSounds);
  soundManager.exposeToWindow();
  console.log('Sound system initialized');
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
