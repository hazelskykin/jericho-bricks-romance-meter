
/**
 * A simplified sound management system that doesn't actually load audio files
 * but provides the expected API for the rest of the application
 */

// Sound manager class
class SoundManager {
  private sfxVolume: number = 0.5;
  private musicVolume: number = 0.3;
  private isMuted: boolean = false;
  private musicMuted: boolean = false;
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
  
  // Initialize sounds - SIMPLIFIED to avoid loading real files
  public initialize(): void {
    console.log('Sound system initialized (simplified version - not loading actual audio files)');
    // We're not actually loading any files to avoid 404 errors
  }
  
  // Preload priority sound effects - MODIFIED to not load real files
  private preloadPrioritySounds(): void {
    // We're not attempting to load real files to avoid 404 errors
    console.log('Sound preloading skipped to avoid unnecessary network requests');
  }
  
  // Get or create a sound element - ALWAYS use the silent audio
  private getSoundElement(soundId: string): HTMLAudioElement | null {
    // Always return the silent audio without attempting to load real files
    return this.silentAudio;
  }
  
  // Play a sound effect - just log without trying to play
  public playSFX(soundId: string): void {
    if (this.isMuted) return;
    console.log(`[SOUND] Would play sound effect: ${soundId} (bypassed)`);
  }
  
  // Play music track - just log without trying to play
  public playMusic(musicId: string, options: { loop?: boolean, volume?: number } = {}): void {
    if (this.isMuted || this.musicMuted) return;
    
    this.currentMusic = musicId;
    console.log(`[SOUND] Would play music: ${musicId} (bypassed)`);
  }
  
  // Stop current music
  public stopMusic(): void {
    if (!this.currentMusic) return;
    
    console.log(`[SOUND] Stopped music: ${this.currentMusic}`);
    this.currentMusic = null;
  }
  
  // Pause current music
  public pauseMusic(): void {
    if (!this.currentMusic) return;
    
    console.log(`[SOUND] Paused music: ${this.currentMusic}`);
  }
  
  // Resume current music
  public resumeMusic(): void {
    if (!this.currentMusic || this.isMuted || this.musicMuted) return;
    
    console.log(`[SOUND] Resumed music: ${this.currentMusic}`);
  }
  
  // Change volume
  public setVolume(type: 'sfx' | 'music', volume: number): void {
    if (type === 'sfx') {
      this.sfxVolume = volume;
    } else {
      this.musicVolume = volume;
    }
    
    console.log(`[SOUND] Set ${type} volume to ${volume}`);
  }
  
  // Mute/unmute all sounds
  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    console.log(`[SOUND] ${muted ? 'Muted' : 'Unmuted'} sound system`);
  }
  
  // Mute/unmute music only
  public setMusicMuted(muted: boolean): void {
    this.musicMuted = muted;
    console.log(`[SOUND] ${muted ? 'Muted' : 'Unmuted'} music`);
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
    console.log('Initializing game sound system (simplified version)...');
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
