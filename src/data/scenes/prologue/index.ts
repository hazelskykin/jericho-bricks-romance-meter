
import { Scene } from '../../../types/game';
import introScenes from './intro';
import teamMeetingScenes from './teamMeeting';
import departureScenes from './departure';
import bonding from './bonding/studySession';

// Debug log all scene IDs from imported files
console.log('Intro scenes:', Object.keys(introScenes));
console.log('Team meeting scenes:', Object.keys(teamMeetingScenes));
console.log('Departure scenes:', Object.keys(departureScenes));
console.log('Bonding scenes:', Object.keys(bonding));

const prologue: Record<string, Scene> = {
  ...introScenes,
  ...teamMeetingScenes,
  ...departureScenes,
  ...bonding,
  'prologue-intro': introScenes['intro'], // Map the prologue-intro explicitly to intro
  'intro': introScenes['intro'], // Make sure intro is directly accessible
  'team-meeting': teamMeetingScenes['team-meeting'] // Make sure team-meeting is directly accessible
};

// Debug logging to help track scene availability
console.log('Available prologue scenes:', Object.keys(prologue));

export default prologue;
