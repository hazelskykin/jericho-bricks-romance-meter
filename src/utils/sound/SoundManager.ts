/**
 * Sound Manager Class
 * Core class handling sound effects and music playback
 */

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
  private currentBackgroundType: string | null = null;
  private loopingSounds: Map<string, HTMLAudioElement> = new Map();
  
  constructor() {
    console.log('Initialized Sound Manager');
    this.createSilentAudio();
    this.createMusicPlayer();
  }
  
  // Create a silent audio that can be used as a fallback
  private createSilentAudio(): void {
    try {
      // Create a silent MP3 as fallback (Base64 encoded 0.1s of silence)
      const audio = new Audio("data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAXAAAARW5jb2RlZCBieQBMYXZmNTguMjkuMTAwVFlFUgAAAAUAAAAyMDIzVFBFMQAAAAcAAABMYXZmNTgAVERSTQAAAAUAAAAyMDIzVENPTgAAAAsAAABTaWxlbnQgTVAzAFByaXYA0jAAAFRJVDIAAAANAAAAU2lsZW5jZSAwLjFzAENPTU0AAAAPAAAAZW5nAFNpbGVuY2UgMC4xAENPTU0AAAAdAAAATGF2ZjU4LjI5LjEwMCAoTGliYXYgNTguMTgpAENPQQAAAA8AAABlbmcAU2lsZW5jZSAwLjEAL/8=");
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
    // Check if sound is already cached
    if (this.soundCache.has(soundId)) {
      return this.soundCache.get(soundId) || null;
    }
    
    // Check if we've tried and failed to load this sound before
    if (this.failedSounds.has(soundId)) {
      return this.silentAudio;
    }
    
    try {
      // For minigame-specific sounds, try to load and cache
      const audio = new Audio(`/audio/${soundId}.mp3`);
      this.soundCache.set(soundId, audio);
      return audio;
    } catch (error) {
      console.error(`Failed to create audio for ${soundId}:`, error);
      this.failedSounds.add(soundId);
      return this.silentAudio;
    }
  }
  
  // Play a sound effect
  public playSFX(soundId: string, loop: boolean = false): void {
    if (this.isMuted) return;
    
    try {
      // If we're already looping this sound, just return
      if (loop && this.loopingSounds.has(soundId)) {
        return;
      }
      
      const audio = this.getSoundElement(soundId);
      if (!audio) {
        console.log(`[SOUND] Would play sound effect: ${soundId} (no audio element)`);
        return;
      }
      
      // Reset the audio to beginning
      audio.currentTime = 0;
      
      // Set volume and loop property
      audio.volume = this.sfxVolume;
      audio.loop = loop;
      
      // Play the sound
      audio.play().catch(err => {
        console.error(`Error playing sound ${soundId}:`, err);
      });
      
      // Store looping sounds so we can stop them later
      if (loop) {
        this.loopingSounds.set(soundId, audio);
      }
      
      console.log(`[SOUND] Playing sound effect: ${soundId}${loop ? ' (looping)' : ''}`);
    } catch (error) {
      console.error(`Error playing sound ${soundId}:`, error);
    }
  }
  
  // Stop a looping sound effect
  public stopSFX(soundId: string): void {
    try {
      const loopingSound = this.loopingSounds.get(soundId);
      if (loopingSound) {
        loopingSound.pause();
        loopingSound.currentTime = 0;
        this.loopingSounds.delete(soundId);
        console.log(`[SOUND] Stopped looping sound: ${soundId}`);
      }
    } catch (error) {
      console.error(`Error stopping sound ${soundId}:`, error);
    }
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
    // Extract the background type (e.g., "cybaton", "stonewich")
    let newBackgroundType = null;
    let musicTrack = null;
    
    if (backgroundId.startsWith('cybaton-')) {
      newBackgroundType = 'cybaton';
      musicTrack = 'bgm-cybaton.mp3';
    } else if (backgroundId.startsWith('stonewich-')) {
      newBackgroundType = 'stonewich';
      musicTrack = 'bgm-stonewich.mp3';
    } else if (backgroundId === 'happy-ending-epilogue') {
      newBackgroundType = 'epilogue';
      musicTrack = 'bgm-endgame.mp3';
    } else if (backgroundId === 'city-cafe') {
      newBackgroundType = 'city';
      musicTrack = 'bgm-city.mp3';
    }
    
    // If no specific background type is identified, use the city music as fallback
    if (!newBackgroundType && !this.currentMusic) {
      console.log(`[MUSIC] Using city music as fallback for background: ${backgroundId}`);
      newBackgroundType = 'fallback';
      musicTrack = 'bgm-city.mp3';
    }
    
    // If background type changed or we're entering a new background type
    if (newBackgroundType !== this.currentBackgroundType) {
      // If we were playing music for a different background type, stop it
      if (this.currentBackgroundType && (!newBackgroundType || this.currentBackgroundType !== newBackgroundType)) {
        console.log(`[MUSIC] Stopping music due to background type change: ${this.currentBackgroundType} -> ${newBackgroundType}`);
        this.stopMusic();
      }
      
      // Update current background type
      this.currentBackgroundType = newBackgroundType;
      
      // Play new music if applicable
      if (musicTrack) {
        this.playMusic(musicTrack);
      }
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

// Export the class
export default SoundManager;
