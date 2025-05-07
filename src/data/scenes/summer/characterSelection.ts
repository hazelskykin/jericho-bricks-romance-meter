import { CharacterId } from '@/types/game';
import { generateSeasonCharacterSelections } from '@/utils/generateSeasonCharacterSelections';

const summerCharacterSelections = generateSeasonCharacterSelections(
  'summer',
  ['xavier', 'navarre', 'etta', 'senara'] as CharacterId[],
  'As summer heats up in Stonewich, spend time with your teammates to prepare for the festival.',
  'Who would you like to visit next to support festival preparations and deepen your bonds?'
);

export default summerCharacterSelections;


