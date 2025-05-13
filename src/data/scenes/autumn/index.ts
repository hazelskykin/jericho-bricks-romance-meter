
import { Scene } from '../../../types/game';
import introScenes from './intro';
import festivalScenes from './festival';
import minigameScenes from './minigames';
import transitionScenes from './transition';
import conclusionScenes from './conclusion';
import relationshipScenes from './relationship';

const autumn: Record<string, Scene> = {
  ...introScenes,
  ...festivalScenes,
  ...minigameScenes,
  ...transitionScenes,
  ...conclusionScenes,
  ...relationshipScenes,
};

// Debug logging
console.log('Available autumn scenes:', Object.keys(autumn));

export default autumn;
