
import { Scene } from '../../../types/game';
import introScenes from './intro';
import activitiesScenes from './activities';
import relationshipScenes from './relationship';
import conclusionScenes from './conclusion';
import seasonTransitionScenes from './transition';

const autumn: Record<string, Scene> = {
  ...introScenes,
  ...activitiesScenes,
  ...relationshipScenes,
  ...conclusionScenes,
  ...seasonTransitionScenes,
};

export default autumn;
