
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
  private musicPlayer: HTMLAudioElement | null = null;
  
  constructor() {
    console.log('Initialized Sound Manager');
    this.createSilentAudio();
    this.createMusicPlayer();
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
  
  // Create a music player
  private createMusicPlayer(): void {
    try {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = this.musicVolume;
      this.musicPlayer = audio;
      
      // Add event listeners for debugging
      audio.addEventListener('play', () => {
        console.log(`[MUSIC] Started playing: ${audio.src.split('/').pop()}`);
      });
      
      audio.addEventListener('pause', () => {
        console.log(`[MUSIC] Paused: ${audio.src.split('/').pop()}`);
      });
      
      audio.addEventListener('error', (e) => {
        console.error(`[MUSIC] Error playing: ${audio.src.split('/').pop()}`, e);
      });
      
    } catch (error) {
      console.error('Failed to create music player:', error);
      this.musicPlayer = null;
    }
  }
  
  // Expose sound manager to window for debugging
  public exposeToWindow(): void {
    (window as any).soundManager = this;
    console.log('Sound manager exposed to window.soundManager');
  }
  
  // Initialize sounds
  public initialize(): void {
    console.log('Sound system initialized');
    // We're not preloading any files to avoid unnecessary network requests
  }
  
  // Get or create a sound element
  private getSoundElement(soundId: string): HTMLAudioElement | null {
    // Always return the silent audio without attempting to load real files
    return this.silentAudio;
  }
  
  // Play a sound effect - just log without trying to play
  public playSFX(soundId: string): void {
    if (this.isMuted) return;
    console.log(`[SOUND] Would play sound effect: ${soundId} (bypassed)`);
  }
  
  // Play music track
  public playMusic(musicId: string, options: { loop?: boolean, volume?: number } = {}): void {
    if (this.isMuted || this.musicMuted || !this.musicPlayer) return;
    
    // If we're already playing this track, don't restart it
    if (this.currentMusic === musicId) {
      if (this.musicPlayer.paused) {
        this.musicPlayer.play().catch(err => {
          console.error(`Error resuming music ${musicId}:`, err);
        });
      }
      return;
    }
    
    this.currentMusic = musicId;
    
    try {
      // Set options
      this.musicPlayer.loop = options.loop !== undefined ? options.loop : true;
      if (options.volume !== undefined) {
        this.musicPlayer.volume = options.volume;
      } else {
        this.musicPlayer.volume = this.musicVolume;
      }
      
      // Set source and play
      this.musicPlayer.src = `/audio/${musicId}`;
      this.musicPlayer.play().catch(err => {
        console.error(`Error playing music ${musicId}:`, err);
      });
      
      console.log(`[MUSIC] Playing track: ${musicId}`);
    } catch (error) {
      console.error(`Error starting music ${musicId}:`, error);
    }
  }
  
  // Play background music based on scene background
  public playBackgroundMusicForScene(backgroundId: string): void {
    if (backgroundId.startsWith('cybaton-')) {
      this.playMusic('bgm-cybaton.mp3');
    } else if (backgroundId.startsWith('stonewich-')) {
      this.playMusic('bgm-stonewich.mp3');
    } else if (backgroundId === 'happy-ending-epilogue') {
      this.playMusic('bgm-endgame.mp3');
    }
  }
  
  // Stop current music
  public stopMusic(): void {
    if (!this.musicPlayer || !this.currentMusic) return;
    
    try {
      this.musicPlayer.pause();
      this.musicPlayer.currentTime = 0;
      console.log(`[MUSIC] Stopped music: ${this.currentMusic}`);
      this.currentMusic = null;
    } catch (error) {
      console.error('Error stopping music:', error);
    }
  }
  
  // Pause current music
  public pauseMusic(): void {
    if (!this.musicPlayer || !this.currentMusic) return;
    
    try {
      this.musicPlayer.pause();
      console.log(`[MUSIC] Paused music: ${this.currentMusic}`);
    } catch (error) {
      console.error('Error pausing music:', error);
    }
  }
  
  // Resume current music
  public resumeMusic(): void {
    if (!this.musicPlayer || !this.currentMusic || this.isMuted || this.musicMuted) return;
    
    try {
      this.musicPlayer.play().catch(err => {
        console.error(`Error resuming music:`, err);
      });
      console.log(`[MUSIC] Resumed music: ${this.currentMusic}`);
    } catch (error) {
      console.error('Error resuming music:', error);
    }
  }
  
  // Change volume
  public setVolume(type: 'sfx' | 'music', volume: number): void {
    if (type === 'sfx') {
      this.sfxVolume = volume;
    } else {
      this.musicVolume = volume;
      if (this.musicPlayer) {
        this.musicPlayer.volume = volume;
      }
    }
    
    console.log(`[SOUND] Set ${type} volume to ${volume}`);
  }
  
  // Mute/unmute all sounds
  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.pauseMusic();
    } else if (!this.musicMuted) {
      this.resumeMusic();
    }
    console.log(`[SOUND] ${muted ? 'Muted' : 'Unmuted'} sound system`);
  }
  
  // Mute/unmute music only
  public setMusicMuted(muted: boolean): void {
    this.musicMuted = muted;
    if (muted) {
      this.pauseMusic();
    } else if (!this.isMuted) {
      this.resumeMusic();
    }
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

// Play background music based on scene background
export const playBackgroundMusicForScene = (backgroundId: string) => {
  try {
    soundManager.playBackgroundMusicForScene(backgroundId);
  } catch (error) {
    console.error('Error playing background music:', error);
  }
};
