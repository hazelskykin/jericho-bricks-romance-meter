
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
  
  constructor() {
    console.log('Initialized Sound Manager (simplified version)');
  }
  
  // Expose sound manager to window for debugging
  public exposeToWindow(): void {
    (window as any).soundManager = this;
    console.log('Sound manager exposed to window.soundManager');
  }
  
  // Initialize sounds
  public initialize(): void {
    console.log('Sound system initialized (simplified version)');
  }
  
  // Play a sound effect
  public playSFX(soundId: string): void {
    if (this.isMuted) return;
    console.log(`[SOUND] Playing sound effect: ${soundId}`);
  }
  
  // Play music track
  public playMusic(musicId: string, options: { loop?: boolean, volume?: number } = {}): void {
    if (this.currentMusic === musicId) return;
    this.currentMusic = musicId;
    console.log(`[SOUND] Playing music: ${musicId}, loop: ${options.loop || false}, volume: ${options.volume || this.musicVolume}`);
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
    if (!this.currentMusic) return;
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
  
  // Generic play method for both sound types
  public play(soundId: string): void {
    this.playSFX(soundId);
  }
}

// Create singleton instance
export const soundManager = new SoundManager();

// Initialize game sounds
export const initializeGameSounds = (): void => {
  soundManager.initialize();
};
