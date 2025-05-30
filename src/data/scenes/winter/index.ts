
import { Scene } from '../../../types/game';
import introScenes from './intro';
import planningScenes from './planning';
import activitiesScenes from './activities';
import conclusionScenes from './conclusion';
import relationshipScenes from './relationship';
import teamFutureScenes from './teamfuture';
import winterTransitions from './transitions';
import seasonTransitionScenes from './transition';
import festivalScenes from './festival';
import minigameScenes from './minigames';

const winter: Record<string, Scene> = {
  ...introScenes,
  ...planningScenes,
  ...activitiesScenes,
  ...conclusionScenes,
  ...relationshipScenes,
  ...teamFutureScenes,
  ...winterTransitions,
  ...seasonTransitionScenes,
  ...festivalScenes,
  ...minigameScenes,
};

export default winter;
