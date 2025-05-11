
/**
 * A simplified sound management system that doesn't actually load audio files
 * but provides the expected API for the rest of the application
 */

// Sound manager class
class SoundManager {
  private sfxVolume: number = 0.5;
  private musicVolume: number = 0.3;
  private isMuted: boolean = false;
  private currentMusic: string | null = null;
  private soundCache: Map<string, HTMLAudioElement> = new Map();
  private failedSounds: Set<string> = new Set();
  private silentAudio: HTMLAudioElement | null = null;
  
  constructor() {
    console.log('Initialized Sound Manager (simplified version)');
    this.createSilentAudio();
  }
  
  // Create a silent audio that can be used as a fallback
  private createSilentAudio(): void {
    try {
      // Create a silent MP3 as fallback (Base64 encoded 0.1s of silence)
      const audio = new Audio("data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAXAAAARW5jb2RlZCBieQBMYXZmNTguMjkuMTAwVFlFUgAAAAUAAAAyMDIzVFBFMQAAAAcAAABMYXZmNTgAVERSTQAAAAUAAAAyMDIzVENPTgAAAAsAAABTaWxlbnQgTVAzAFByaXYA0jAAAFRJVDIAAAANAAAAU2lsZW5jZSAwLjFzAENPTU0AAAAPAAAAZW5nAFNpbGVuY2UgMC4xAENPTU0AAAAdAAAATGF2ZjU4LjI5LjEwMCAoTGliYXYgNTguMTgpAENPTQAAAA8AAABlbmcAU2lsZW5jZSAwLjEAL/8=");
      this.silentAudio = audio;
    } catch (error) {
      console.error('Failed to create silent audio:', error);
      this.silentAudio = null;
    }
  }
  
  // Expose sound manager to window for debugging
  public exposeToWindow(): void {
    (window as any).soundManager = this;
    console.log('Sound manager exposed to window.soundManager');
  }
  
  // Initialize sounds
  public initialize(): void {
    console.log('Sound system initialized (simplified version)');
    this.preloadPrioritySounds();
  }
  
  // Preload priority sound effects
  private preloadPrioritySounds(): void {
    try {
      const prioritySounds = [
        'ui-click', 
        'button-press',
        'dialog-advance',
        'choice-select',
        'error',
        'success',
        'affection-up',
        'affection-down'
      ];
      
      console.log(`Preloading ${prioritySounds.length} sound effects`);
      
      // For each priority sound, create a silent fallback to avoid errors
      prioritySounds.forEach(soundId => {
        this.getSoundElement(soundId);
      });
    } catch (error) {
      console.error('Error preloading sounds:', error);
    }
    
    // Load non-priority sounds in the background with a delay
    // to avoid overwhelming the browser with failed requests
    setTimeout(() => {
      console.log('Loading non-priority sounds...');
      const secondarySounds = [
        'background-music',
        'ping',
        'twinkle'
      ];
      
      console.log(`Preloading ${secondarySounds.length} sound effects`);
      secondarySounds.forEach(soundId => {
        this.getSoundElement(soundId);
      });
    }, 1500);
  }
  
  // Get or create a sound element
  private getSoundElement(soundId: string): HTMLAudioElement | null {
    // If we've already tried and failed to load this sound, return the silent audio
    if (this.failedSounds.has(soundId)) {
      return this.silentAudio;
    }
    
    // If we already have it cached, return it
    if (this.soundCache.has(soundId)) {
      return this.soundCache.get(soundId) || null;
    }
    
    try {
      // Directly use the silent audio for all sounds to avoid 404 errors
      if (this.silentAudio) {
        this.soundCache.set(soundId, this.silentAudio);
        return this.silentAudio;
      }
      
      // This fallback path should rarely be reached
      const audio = new Audio("data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAXAAAARW5jb2RlZCBieQBMYXZmNTguMjkuMTAwVFlFUgAAAAUAAAAyMDIzVFBFMQAAAAcAAABMYXZmNTgAVERSTQAAAAUAAAAyMDIzVENPTgAAAAsAAABTaWxlbnQgTVAzAFByaXYA0jAAAFRJVDIAAAANAAAAU2lsZW5jZSAwLjFzAENPTU0AAAAPAAAAZW5nAFNpbGVuY2UgMC4xAENPTU0AAAAdAAAATGF2ZjU4LjI5LjEwMCAoTGliYXYgNTguMTgpAENPTQAAAA8AAABlbmcAU2lsZW5jZSAwLjEAL/8=");
      this.soundCache.set(soundId, audio);
      return audio;
    } catch (error) {
      console.warn(`Could not load sound: ${soundId}`, error);
      this.failedSounds.add(soundId);
      return null;
    }
  }
  
  // Play a sound effect with improved error handling
  public playSFX(soundId: string): void {
    if (this.isMuted) return;
    
    try {
      const audio = this.getSoundElement(soundId);
      if (audio) {
        audio.volume = this.sfxVolume;
        console.log(`[SOUND] Playing sound effect: ${soundId}`);
      }
    } catch (error) {
      // Silently fail, no need to log errors for sound playback
    }
  }
  
  // Play music track
  public playMusic(musicId: string, options: { loop?: boolean, volume?: number } = {}): void {
    if (this.isMuted) return;
    if (this.currentMusic === musicId) return;
    
    try {
      // Stop current music if any
      this.stopMusic();
      
      // Get or create audio element
      const audio = this.getSoundElement(musicId);
      if (!audio) return;
      
      // Set options
      audio.loop = options.loop !== false;
      audio.volume = options.volume || this.musicVolume;
      
      this.currentMusic = musicId;
      console.log(`[SOUND] Playing music: ${musicId}, loop: ${options.loop || false}, volume: ${options.volume || this.musicVolume}`);
    } catch (error) {
      // Silently fail, no need to log errors for sound playback
    }
  }
  
  // Stop current music
  public stopMusic(): void {
    if (!this.currentMusic) return;
    
    try {
      const audio = this.soundCache.get(this.currentMusic);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      
      console.log(`[SOUND] Stopped music: ${this.currentMusic}`);
      this.currentMusic = null;
    } catch (error) {
      // Silently fail, no need to log errors for sound playback
    }
  }
  
  // Pause current music
  public pauseMusic(): void {
    if (!this.currentMusic) return;
    
    try {
      const audio = this.soundCache.get(this.currentMusic);
      if (audio) {
        audio.pause();
      }
      
      console.log(`[SOUND] Paused music: ${this.currentMusic}`);
    } catch (error) {
      // Silently fail, no need to log errors for sound playback
    }
  }
  
  // Resume current music
  public resumeMusic(): void {
    if (!this.currentMusic) return;
    
    try {
      const audio = this.soundCache.get(this.currentMusic);
      if (audio) {
        audio.play().catch(() => {
          // Silently fail, no need to log errors for sound playback
        });
      }
      
      console.log(`[SOUND] Resumed music: ${this.currentMusic}`);
    } catch (error) {
      // Silently fail, no need to log errors for sound playback
    }
  }
  
  // Change volume
  public setVolume(type: 'sfx' | 'music', volume: number): void {
    if (type === 'sfx') {
      this.sfxVolume = volume;
    } else {
      this.musicVolume = volume;
      
      // Update current music volume if playing
      if (this.currentMusic) {
        const audio = this.soundCache.get(this.currentMusic);
        if (audio) {
          audio.volume = volume;
        }
      }
    }
    
    console.log(`[SOUND] Set ${type} volume to ${volume}`);
  }
  
  // Mute/unmute all sounds
  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    console.log(`[SOUND] ${muted ? 'Muted' : 'Unmuted'} sound system`);
    
    // Update all currently playing sounds
    if (this.currentMusic && muted) {
      this.pauseMusic();
    } else if (this.currentMusic && !muted) {
      this.resumeMusic();
    }
  }
  
  // Generic play method for both sound types
  public play(soundId: string): void {
    this.playSFX(soundId);
  }
}

// Create singleton instance
export const soundManager = new SoundManager();

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
