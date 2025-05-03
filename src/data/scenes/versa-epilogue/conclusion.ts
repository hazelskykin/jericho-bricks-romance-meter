import { Scene } from '@/types/game';

const conclusion: Record<string, Scene> = {
  'versa-epilogue-accept': {
    id: 'versa-epilogue-accept',
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'maven',
        text: 'We accept. Together, we can create something greater than any of us could individually.',
        mood: 'confident'
      },
      {
        character: 'xavier',
        text: 'I\'m in. Our combined strengths will revolutionize how cities are managed.',
        mood: 'happy'
      },
      {
        character: 'navarre',
        text: 'Count me in! This is going to shake up the entire industry.',
        mood: 'laughing'
      },
      {
        character: 'etta',
        text: 'With clear objectives and our combined talents, success is inevitable.',
        mood: 'confident'
      },
      {
        character: 'senara',
        text: 'The statistical probability of our success is quite high. I find this... satisfying.',
        mood: 'happy'
      },
      {
        character: 'narrator',
        text: 'And so begins a new chapter for you and your team - not as competitors, but as a unified force.'
      },
      {
        character: 'maven',
        text: 'This is just the beginning of our story.',
        mood: 'happy'
      }
    ],
    nextSceneId: 'versa-epilogue-final'
  },
  'versa-epilogue-modify': {
    id: 'versa-epilogue-modify',
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'maven',
        text: 'We\'re interested, but I think we can improve the initiative based on what we\'ve learned in Stonewich.',
        mood: 'thoughtful'
      },
      {
        character: 'maven',
        text: 'The greatest strength we discovered wasn\'t just in combining our perspectives, but in how the citizens of Stonewich contributed to our understanding.',
        mood: 'confident'
      },
      {
        character: 'narrator',
        text: 'Dr. Chen looks intrigued as you outline a more community-integrated approach.'
      },
      {
        text: 'Fascinating. You\'re proposing we extend the synthesis beyond just your team\'s roles, to include citizen perspectives as well?',
        character: 'narrator'
      },
      {
        character: 'maven',
        text: 'Exactly. A true Versa approach should integrate all stakeholders, not just administrators.',
        mood: 'confident'
      },
      {
        text: 'This... is exactly why you were selected, Maven. Your proposal is approved. Let\'s redefine city management together.',
        character: 'narrator'
      },
      {
        character: 'narrator',
        text: 'Your teammates look at you with newfound respect as you prepare to embark on this revolutionary approach.'
      }
    ],
    nextSceneId: 'versa-epilogue-final'
  },
  'versa-epilogue-final': {
    id: 'versa-epilogue-final',
    background: 'happy-ending-epilogue',
    dialogue: [
      {
        character: 'narrator',
        text: 'One year later, your Integrated City Management model has spread to twelve cities across the country.'
      },
      {
        character: 'maven',
        text: 'It\'s amazing what we\'ve accomplished together.',
        mood: 'happy'
      },
      {
        character: 'narrator',
        text: 'As you stand on the rooftop garden of Cybaton\'s new headquarters, you can see the lights of Stonewich in the distance.'
      },
      {
        character: 'maven',
        text: 'From uncertain beginnings to this... I\'ve finally found where I belong.',
        mood: 'happy'
      },
      {
        character: 'narrator',
        text: 'Your journey from an insecure fifth team member to the linchpin of a revolutionary approach to city management is complete.'
      },
      {
        character: 'narrator',
        text: 'But in many ways, it\'s only the beginning.'
      },
      {
        character: 'maven',
        text: 'I am Maven. I am Versa. And I\'m just getting started.',
        mood: 'confident'
      }
    ],
    nextSceneId: 'game-complete'
  },
  'game-complete': {
    id: 'game-complete',
    background: 'cybaton-lobby',
    dialogue: [
      {
        character: 'narrator',
        text: 'Congratulations! You have completed Jericho Bricks and unlocked all content!'
      },
      {
        character: 'narrator',
        text: 'Thank you for playing through all character routes and experiencing the full story.'
      }
    ],
    nextSceneId: 'start'
  }
};

export default conclusion;
