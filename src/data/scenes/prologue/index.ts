
import { Scene } from '../../../types/game';
import introScenes from './intro';
import teamMeetingScenes from './teamMeeting';
import departureScenes from './departure';
import bonding from './bonding/studySession';

const prologue: Record<string, Scene> = {
  ...introScenes,
  ...teamMeetingScenes,
  ...departureScenes,
  ...bonding,
  'prologue-intro': introScenes['intro'], // Add explicit mapping for prologue-intro
};

export default prologue;
