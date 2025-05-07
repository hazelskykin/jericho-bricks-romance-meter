
import { Scene } from '@/types/game';
import winterIntroScenes from './intro';
import winterPlanningScenes from './planning';
import winterActivitiesScenes from './activities';
import winterConclusionScenes from './conclusion';
import relationshipScenes from './relationship';
import teamFutureScenes from './teamfuture';
import winterTransitions from './transitions';

// Combine all winter-related scenes
const winterScenes: Record<string, Scene> = {
  ...winterIntroScenes,
  ...winterPlanningScenes,
  ...winterActivitiesScenes,
  ...winterConclusionScenes,
  ...relationshipScenes,
  ...teamFutureScenes,
  ...winterTransitions,
};

export default winterScenes;
