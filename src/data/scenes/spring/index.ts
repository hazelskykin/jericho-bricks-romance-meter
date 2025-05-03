
import { Scene } from '../../../types/game';
import introScenes from './intro';
import festivalScenes from './festival';
import minigameScenes from './minigames';
import conclusionScenes from './conclusion';
import characterSelections from './characterSelection';
import characterVisits from './characterVisits';

const spring: Record<string, Scene> = {
  ...introScenes,
  ...characterSelections,
  ...characterVisits,
  ...festivalScenes,
  ...minigameScenes,
  ...conclusionScenes,
};

export default spring;
