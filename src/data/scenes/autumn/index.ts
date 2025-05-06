
import { Scene } from '../../../types/game';
import introScenes from './intro';
import activitiesScenes from './activities';
import relationshipScenes from './relationship';
import conclusionScenes from './conclusion';

const autumn: Record<string, Scene> = {
  ...introScenes,
  ...activitiesScenes,
  ...relationshipScenes,
  ...conclusionScenes,
};

export default autumn;
