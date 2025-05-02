
import { Scene } from '../../types/game';

// Import scene collections from different seasons
import prologue from './prologue';
import spring from './spring';
import mainMenu from './mainMenu';

// Merge all scenes into one collection
const scenes: Record<string, Scene> = {
  ...mainMenu,
  ...prologue,
  ...spring,
  // Future seasons will be added here:
  // ...summer,
  // ...autumn,
  // ...winter,
};

export default scenes;
