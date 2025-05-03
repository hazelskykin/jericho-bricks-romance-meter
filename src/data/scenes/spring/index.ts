
import { Scene } from '../../../types/game';
import introScenes from './intro';
import festivalScenes from './festival';
import minigameScenes from './minigames';
import conclusionScenes from './conclusion';
import characterSelections from './characterSelection';
import characterVisits from './characterVisits';
import transitionScenes from './transitions';

const spring: Record<string, Scene> = {
  ...introScenes,
  ...characterSelections,
  ...characterVisits,
  ...festivalScenes,
  ...minigameScenes,
  ...conclusionScenes,
  ...transitionScenes,
};

export default spring;
