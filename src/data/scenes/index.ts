
import { Scene } from '../../types/game';

// Import scene collections from different seasons
import prologue from './prologue';
import spring from './spring';
import summer from './summer';
import autumn from './autumn';
import winter from './winter';
import mainMenu from './mainMenu';
import versaEpilogue from './versa-epilogue';

// Merge all scenes into one collection
const scenes: Record<string, Scene> = {
  ...mainMenu,
  ...prologue,
  ...spring,
  ...summer,
  ...autumn,
  ...winter,
  ...versaEpilogue,
};

export default scenes;
