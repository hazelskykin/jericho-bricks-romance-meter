
import { Scene } from '@/types/game';
import winterIntroScenes from './intro';
import winterPlanningScenes from './planning';
import winterActivitiesScenes from './activities';
import winterConclusionScenes from './conclusion';
import relationshipScenes from './relationship';
import winterTransitionScenes from './transition';
import teamFutureScenes from './teamfuture';

// Combine all winter-related scenes
const winterScenes: Record<string, Scene> = {
  ...winterIntroScenes,
  ...winterPlanningScenes,
  ...winterActivitiesScenes,
  ...winterConclusionScenes,
  ...relationshipScenes,
  ...winterTransitionScenes,
  ...teamFutureScenes,
};

export default winterScenes;
