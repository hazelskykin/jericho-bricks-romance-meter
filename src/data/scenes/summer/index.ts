
import { Scene } from '../../../types/game';
import introScenes from './intro';
import festivalScenes from './festival';

const summer: Record<string, Scene> = {
  ...introScenes,
  ...festivalScenes,
  // Future sections will be added here:
  // ...minigameScenes,
  // ...conclusionScenes,
};

export default summer;
