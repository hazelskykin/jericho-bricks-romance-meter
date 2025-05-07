import { CharacterId } from '@/types/game';
import { generateSeasonCharacterSelections } from '@/utils/generateSeasonCharacterSelections';

const springCharacterSelections = generateSeasonCharacterSelections(
  'spring',
  ['xavier', 'navarre', 'etta', 'senara'] as CharacterId[],
  'As spring begins in Stonewich, take time to connect with your teammates before the festival.',
  'Who would you like to visit next to learn more about their role in the festival preparations?'
);

export default springCharacterSelections;

