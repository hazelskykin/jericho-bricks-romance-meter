
import { Scene } from '@/types/game';

const reflection: Record<string, Scene> = {
  'versa-epilogue-reflection': {
    id: 'versa-epilogue-reflection',
    background: 'photo-1470071459604-3b5ec3a7fe05',
    dialogue: [
      {
        character: 'narrator',
        text: 'As you prepare to depart for Cybaton HQ, you reflect on what you\'ve learned from each of your teammates.'
      },
      {
        character: 'maven',
        text: 'From Xavier, I learned the importance of support and technological integration.',
        mood: 'thoughtful'
      },
      {
        character: 'maven',
        text: 'Navarre taught me how connections and communication are the lifeblood of city management.',
        mood: 'thoughtful'
      },
      {
        character: 'maven',
        text: 'From Etta, I learned that ambition and results-oriented thinking drive progress.',
        mood: 'thoughtful'
      },
      {
        character: 'maven',
        text: 'And Senara showed me the value of deep knowledge and analytical thinking.',
        mood: 'thoughtful'
      },
      {
        character: 'maven',
        text: 'Together, these perspectives make a complete picture.',
        mood: 'happy'
      }
    ],
    nextSceneId: 'versa-epilogue-team-reunion'
  },
  'versa-epilogue-team-reunion': {
    id: 'versa-epilogue-team-reunion',
    background: 'cybaton-lobby',
    dialogue: [
      {
        character: 'narrator',
        text: 'To your surprise, when you arrive at Cybaton HQ, you find all your former teammates waiting.'
      },
      {
        character: 'xavier',
        text: 'Maven! You made it. We were all called here too.',
        mood: 'happy'
      },
      {
        character: 'navarre',
        text: 'Looks like our little experiment in Stonewich was more connected than we thought.',
        mood: 'laughing'
      },
      {
        character: 'etta',
        text: 'I knew there was something special about our team composition. It was too... intentional.',
        mood: 'confident'
      },
      {
        character: 'senara',
        text: 'The data patterns suggested this outcome, though I couldn\'t be certain until now.',
        mood: 'neutral'
      },
      {
        character: 'narrator',
        text: 'A Cybaton executive approaches your reunited group.'
      }
    ],
    nextSceneId: 'versa-epilogue-revelation'
  },
  'versa-epilogue-revelation': {
    id: 'versa-epilogue-revelation',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'narrator',
        text: 'The executive, Dr. Elara Chen, stands before your team with a holographic display of Stonewich.'
      },
      {
        text: 'Welcome, team. Your work in Stonewich has confirmed what we hypothesized - the future of city administration isn\'t in specialized roles, but in integrated perspectives.',
        character: 'narrator'
      },
      {
        character: 'maven',
        text: 'So the separate roles were...',
        mood: 'surprised'
      },
      {
        text: 'A construct. A way to develop specialized skillsets that could later be synthesized. Maven, as our Versa candidate, you\'ve demonstrated the ability to integrate all these perspectives.',
        character: 'narrator'
      },
      {
        character: 'maven',
        text: 'What happens now?',
        mood: 'thoughtful'
      },
      {
        text: 'Now, we offer you all the opportunity to be part of our new Integrated City Management Initiative. Together, with Maven as your synthesis point, you\'ll pioneer a new approach to urban administration.',
        character: 'narrator'
      }
    ],
    nextSceneId: 'versa-epilogue-decision'
  },
  'versa-epilogue-decision': {
    id: 'versa-epilogue-decision',
    background: 'photo-1500673922987-e212871fec22',
    dialogue: [
      {
        character: 'narrator',
        text: 'Your team looks to you, waiting for your response to this unexpected proposition.'
      },
      {
        character: 'maven',
        text: 'I think we all know the answer to this.',
        mood: 'confident'
      }
    ],
    choices: [
      {
        text: "Accept the initiative and lead the team forward",
        nextSceneId: "versa-epilogue-accept"
      },
      {
        text: "Propose modifications to the initiative based on your experiences",
        nextSceneId: "versa-epilogue-modify"
      }
    ]
  }
};

export default reflection;
