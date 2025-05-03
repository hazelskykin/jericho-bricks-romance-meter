
import { Scene } from '@/types/game';

// Import epilogue scene collections
import introScenes from './intro';
import conclusionScenes from './conclusion';

// Merge all epilogue scenes into one collection
const epilogueScenes: Record<string, Scene> = {
  ...introScenes,
  ...conclusionScenes,
};

export default epilogueScenes;
