
import { Scene } from '@/types/game';

const intro: Record<string, Scene> = {
  'versa-epilogue-intro': {
    id: 'versa-epilogue-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'After mastering each role and completing your journey with each team member, you find yourself at a crossroads.'
      },
      {
        character: 'maven',
        text: 'I\'ve seen so many different paths, experienced so many perspectives...',
        mood: 'thoughtful'
      },
      {
        character: 'narrator',
        text: 'The city of Stonewich seems different now - as if you\'re seeing it through multiple pairs of eyes at once.'
      },
      {
        character: 'maven',
        text: 'I understand now why I was chosen as the fifth member. My adaptability wasn\'t a lack of identity - it was my strength all along.',
        mood: 'confident'
      },
      {
        character: 'narrator',
        text: 'A message appears on your device. It\'s from Cybaton headquarters.'
      }
    ],
    nextSceneId: 'versa-epilogue-message'
  },
  'versa-epilogue-message': {
    id: 'versa-epilogue-message',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'narrator',
        text: '"To Maven, the Versa - Your unique journey has proven our hypothesis. You are ready for the next phase."'
      },
      {
        character: 'maven',
        text: 'The next phase? What does that mean?',
        mood: 'surprised'
      },
      {
        character: 'narrator',
        text: 'The message continues: "Report to Cybaton HQ for your true assignment. The team roles were not just positions - they were aspects of a complete city administrator."'
      },
      {
        character: 'maven',
        text: 'So this whole time... we weren\'t competing against each other? We were meant to complement each other?',
        mood: 'shocked'
      }
    ],
    nextSceneId: 'versa-epilogue-reflection'
  },
};

export default intro;
