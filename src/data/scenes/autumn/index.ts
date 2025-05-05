
import { Scene } from '../../../types/game';
import introScenes from './intro';
import activitiesScenes from './activities';
import relationshipScenes from './relationship';

const autumn: Record<string, Scene> = {
  ...introScenes,
  ...activitiesScenes,
  ...relationshipScenes,
};

export default autumn;
