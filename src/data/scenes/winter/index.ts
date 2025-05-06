
import { Scene } from '../../../types/game';
import introScenes from './intro';
import planningScenes from './planning';
import activitiesScenes from './activities';
import relationshipScenes from './relationship';
import conclusionScenes from './conclusion';

const winter: Record<string, Scene> = {
  ...introScenes,
  ...planningScenes,
  ...activitiesScenes,
  ...relationshipScenes,
  ...conclusionScenes,
};

export default winter;
