
import { Scene } from '../../../types/game';

const introScenes: Record<string, Scene> = {
  'intro': {
    id: 'intro',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'narrator',
        text: 'The gleaming Cybaton tower stands as a testament to technological innovation, its glass and steel structure reaching into the clear blue sky of downtown Stonewich.',
      },
      {
        character: 'narrator',
        text: 'Inside, the orientation for the new cohort of city administrators is about to begin.',
      },
      {
        character: 'maven',
        text: "I can't believe I'm actually here. How did I even pass the assessment? My results were so...",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'A gentle chime signals the start of the orientation session. The Chief HR Officer, Dr. Elara Voss, steps onto the stage.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "Welcome to Cybaton\'s City Administration Program! You represent the brightest minds, chosen to shape our future."',
      },
      {
        character: 'narrator',
        text: "The room buzzes with excitement. You scan the crowd, wondering who you'll be teamed with.",
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "When I call your name, please join your assigned team coordinator."',
      },
      {
        character: 'narrator',
        text: 'Names are called, groups form. You wait anxiously...',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "And finally, for Stonewich deployment: Xavier Chen, Navarre Ellis, Etta Montgomery, Senara Kapoor... and Maven Gray."',
      },
      {
        character: 'maven',
        text: "Five? That's unusual. Teams are always four...",
        mood: 'surprised',
      },
    ],
    nextSceneId: 'team-meeting',
  }
};

export default introScenes;
