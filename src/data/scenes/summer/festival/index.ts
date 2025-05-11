
import { Scene } from '../../../../types/game';
import summerFestivalPlanningScenes from './planning';
import summerFestivalActivitiesScenes from './activities';
import summerFestivalMinigameIntrosScenes from './minigameIntros';
import summerFestivalMinigameResultsScenes from './minigameResults';
import summerFestivalCompletionScenes from './completion';

const summerFestivalScenes: Record<string, Scene> = {
  ...summerFestivalPlanningScenes,
  ...summerFestivalActivitiesScenes,
  ...summerFestivalMinigameIntrosScenes,
  ...summerFestivalMinigameResultsScenes,
  ...summerFestivalCompletionScenes,
};

export default summerFestivalScenes;
