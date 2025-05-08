
import { Scene } from '../../types/game';

// Import scene collections from different seasons
import prologue from './prologue';
import spring from './spring';
import summer from './summer';
import autumn from './autumn';
import winter from './winter';
import epilogue from './epilogue';
import versaEpilogue from './versa-epilogue';
import happyEndings from './happy-endings';
import mainMenu from './mainMenu';

// Merge all scenes into one collection
export const allScenes: Record<string, Scene> = {
  ...mainMenu,
  ...prologue,
  ...spring,
  ...summer,
  ...autumn,
  ...winter,
  ...epilogue,
  ...versaEpilogue,
  ...happyEndings,
};

export default allScenes;
