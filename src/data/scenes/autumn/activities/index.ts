
import { Scene } from '@/types/game';
import festivalActivities from './festivalActivities';
import crafterScenes from './crafterScenes';
import tourGuideScenes from './tourGuideScenes';
import memoriesDateScenes from './memoriesDateScenes';

const activitiesScenes: Record<string, Scene> = {
  ...festivalActivities,
  ...crafterScenes,
  ...tourGuideScenes,
  ...memoriesDateScenes,
};

export default activitiesScenes;
