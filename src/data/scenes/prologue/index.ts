
import { Scene } from '../../../types/game';
import introScenes from './intro';
import teamMeetingScenes from './teamMeeting';
import departureScenes from './departure';

const prologue: Record<string, Scene> = {
  ...introScenes,
  ...teamMeetingScenes,
  ...departureScenes,
};

export default prologue;
