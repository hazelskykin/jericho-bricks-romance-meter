
import { Scene } from '../../../types/game';
import introScenes from './intro';
import festivalScenes from './festival';
import minigameScenes from './minigames';
import conclusionScenes from './conclusion';
import characterSelections from './characterSelection';
import characterVisits from './characterVisits';

const summer: Record<string, Scene> = {
  ...introScenes,
  ...characterSelections,
  ...characterVisits,
  ...festivalScenes,
  ...minigameScenes,
  ...conclusionScenes,
  // Future sections will be added here:
  // ...minigameScenes,
  // ...conclusionScenes,
};

export default summer;
