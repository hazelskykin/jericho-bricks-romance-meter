
import { Scene } from '../../../types/game';
import introScenes from './intro';
import festivalScenes from './festival';
import minigameScenes from './minigames';
import conclusionScenes from './conclusion';

const spring: Record<string, Scene> = {
  ...introScenes,
  ...festivalScenes,
  ...minigameScenes,
  ...conclusionScenes,
};

export default spring;
