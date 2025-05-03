
import { Scene } from '@/types/game';
import intro from './intro';
import reflection from './reflection';
import conclusion from './conclusion';

// Merge all versa-epilogue scenes into one collection
const versaEpilogue: Record<string, Scene> = {
  ...intro,
  ...reflection,
  ...conclusion,
};

export default versaEpilogue;
