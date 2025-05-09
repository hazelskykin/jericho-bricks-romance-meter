
import { Scene } from '../../../../types/game';

const briefingScenes: Record<string, Scene> = {
  'briefing': {
    id: 'briefing',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'narrator',
        text: 'A holographic display activates in the center of the table, showing a detailed map of Stonewich city.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss enters the room with a tablet in hand.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "Stonewich is one of our oldest partnerships. Thirty years into a ninety-nine-year contract. The technology is stable but aging."',
      },
      {
        character: 'narrator',
        text: 'The hologram zooms in on various districts, highlighting infrastructure systems.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "Your team has been assigned there because each of you brings something unique to the table."',
      },
      {
        character: 'narrator',
        text: 'She looks directly at you.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "Especially you, Maven. Your assessment showed remarkable adaptability across multiple domains, though not mastery in any single one."',
      },
      {
        character: 'maven',
        text: "So that's why... I'm the wild card.",
        mood: 'surprised',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss nods with a smile.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "You leave for Stonewich tomorrow morning. I suggest you all get to know each other better before then."',
      },
      {
        character: 'narrator',
        text: "You feel conflicted. You're reassured that it's not a mistake, but you're still uncertain what you can bring beyond what the others do.",
      },
      {
        character: 'narrator',
        text: "You decide that this will just be something you'll need to figure out for yourself as you go and decide to be proactive.",
      },
    ],
    choices: [
      {
        text: 'Suggest going out for coffee as a team',
        affectionChanges: { xavier: 0.5, navarre: 2, etta: -1, senara: -0.5 },
        nextSceneId: 'coffee-shop',
      },
      {
        text: 'Propose reviewing the Stonewich files together',
        affectionChanges: { xavier: 0, navarre: -1, etta: 2, senara: 0 },
        nextSceneId: 'study-session',
      },
      {
        text: 'Ask if anyone wants to visit the Cybaton R&D floor',
        affectionChanges: { xavier: 2, navarre: 0, etta: 0, senara: 1 },
        nextSceneId: 'rd-tour',
      },
    ],
  },
};

export default briefingScenes;
