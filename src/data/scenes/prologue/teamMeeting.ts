import { Scene } from '../../../types/game';

const teamMeetingScenes: Record<string, Scene> = {
  'team-meeting': {
    id: 'team-meeting',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'narrator',
        text: 'You gather in a sleek meeting room with your new teammates. The air is thick with anticipation and uncertainty.',
      },
      {
        character: 'xavier',
        text: "Hey everyone! I'm Xavier. Looks like we'll be working together in Stonewich.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: 'Navarre Ellis. Charmed to meet you all. Stonewich, huh? Old tech, but classic vibes.',
        mood: 'happy',
      },
      {
        character: 'etta',
        text: 'Etta Montgomery. I expected a more cutting-edge assignment, but I suppose Stonewich has its challenges.',
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: 'Senara. I look forward to our collaboration.',
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'All eyes turn to you, the unexpected fifth member.',
      },
    ],
    choices: [
      {
        text: '"Hi, I\'m Maven. I\'m excited to work with you all."',
        affectionChanges: { xavier: 1, navarre: 1, etta: 0, senara: 0 },
        nextSceneId: 'team-meeting-response-friendly',
      },
      {
        text: '"Maven Gray. I\'m not sure why I\'m here either, but I\'ll do my best."',
        affectionChanges: { xavier: 1, navarre: 0, etta: -1, senara: 1 },
        nextSceneId: 'team-meeting-response-honest',
      },
      {
        text: '"Maven. My assessment results were... unconventional. That\'s probably why I\'m the fifth wheel."',
        affectionChanges: { xavier: 0, navarre: -1, etta: -1, senara: 1 },
        nextSceneId: 'team-meeting-response-self-deprecating',
      },
    ],
  },
  
  'team-meeting-response-friendly': {
    id: 'team-meeting-response-friendly',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'xavier',
        text: 'Great to have you, Maven! Five minds are better than four, right?',
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: 'Absolutely! The more the merrier. And speaking of merry, we should all grab drinks after this to celebrate our team formation.',
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Let's stay focused. We should review the Stonewich briefing materials first.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "I've already studied them. The city's systems are stable but outdated.",
        mood: 'neutral',
      },
    ],
    nextSceneId: 'briefing',
  },
  
  'team-meeting-response-honest': {
    id: 'team-meeting-response-honest',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'xavier',
        text: "Hey, we're all figuring things out. I'm sure there's a good reason you're with us.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Hmm, interesting. Five-person teams aren't standard protocol.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "They're testing something new. Your profile must have shown potential that fits with their hypothesis.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Well, whatever the reason, welcome aboard! We'll make it work.",
        mood: 'neutral',
      },
    ],
    nextSceneId: 'briefing',
  },
  
  'team-meeting-response-self-deprecating': {
    id: 'team-meeting-response-self-deprecating',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'etta',
        text: "Great. An experimental addition. Let's hope it doesn't compromise our efficiency.",
        mood: 'angry',
      },
      {
        character: 'xavier',
        text: "Come on, Etta. Every team has unique dynamics. I'm sure Maven brings valuable perspective.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: 'Unconventional can be good! Keeps things interesting.',
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: 'Inconclusive results often indicate complex thinking patterns. That could be beneficial.',
        mood: 'neutral',
      },
    ],
    nextSceneId: 'briefing',
  },
  
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
    ],
    choices: [
      {
        text: 'Suggest going out for coffee as a team',
        affectionChanges: { xavier: 1, navarre: 2, etta: -1, senara: 0 },
        nextSceneId: 'coffee-shop',
      },
      {
        text: 'Propose reviewing the Stonewich files together',
        affectionChanges: { xavier: 0, navarre: -1, etta: 2, senara: 1 },
        nextSceneId: 'study-session',
      },
      {
        text: 'Ask if anyone wants to visit the Cybaton R&D floor',
        affectionChanges: { xavier: 2, navarre: 0, etta: 0, senara: 1 },
        nextSceneId: 'rd-tour',
      },
    ],
  },
  
  'coffee-shop': {
    id: 'coffee-shop',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: 'You all head to a small cafe near Cybaton headquarters. The atmosphere is relaxed, a welcome contrast to the corporate environment.',
      },
      {
        character: 'navarre',
        text: "Great suggestion, Maven! Nothing like coffee and conversation to build team chemistry.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "This place has the best pastries too. Anyone want to split a cinnamon roll?",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "I suppose some informal team building could be beneficial. I'll have an espresso.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Tea for me. But I did bring some Stonewich materials we could review while we're here.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I'm just glad we can all relax a bit before the assignment starts.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: 'The conversation flows easily, and you learn more about your teammates. Xavier is passionate about tech ethics, Navarre has connections everywhere, Etta is intensely ambitious, and Senara is brilliantly analytical but private.',
      },
      {
        character: 'narrator',
        text: 'By the end of the evening, you feel more connected to the team and ready for tomorrow\'s departure.',
      }
    ],
    nextSceneId: 'departure-morning',
  },
  
  'study-session': {
    id: 'study-session',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'narrator',
        text: 'You all gather in the Cybaton research library. Digital displays and holographic projections illuminate the space.',
      },
      {
        character: 'etta',
        text: "Excellent choice, Maven. Let's make sure we're fully prepared for the Stonewich assignment.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I've already compiled notes on their primary systems. We should focus on integration points and maintenance history.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "I found some interesting community feedback on Stonewich's tech. The residents actually seem to like the older systems.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Politics are crucial too. Stonewich has a strong community council that we'll need to work with.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'The team works late into the evening, analyzing Stonewich\'s systems and history. You develop a deeper understanding of the city and its needs.',
      },
      {
        character: 'narrator',
        text: 'By the time you leave, you feel well-prepared for tomorrow\'s departure, and you notice approving glances from both Etta and Senara.',
      }
    ],
    nextSceneId: 'departure-morning',
  },
  
  'rd-tour': {
    id: 'rd-tour',
    background: 'cybaton-lab',
    dialogue: [
      {
        character: 'narrator',
        text: 'You suggest visiting Cybaton\'s R&D floor, and Xavier\'s eyes light up immediately.',
      },
      {
        character: 'xavier',
        text: "That's a brilliant idea! I can show you some of the prototypes we might be testing in Stonewich.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Sure, why not? Maybe there's something shiny I can convince the higher-ups to let us deploy.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "As long as it's relevant to our assignment, I suppose it could be useful.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "I'm interested in the atmospheric particulate monitoring system they're developing.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'Xavier leads the tour enthusiastically, showing off everything from maintenance drones to community engagement interfaces.',
      },
      {
        character: 'xavier',
        text: "And this is my favorite project - an AI system that helps predict infrastructure needs before problems arise.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "This is amazing, Xavier. You really know your stuff.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: 'The evening flies by with fascinating technology demonstrations. You notice Xavier beaming at your interest, while Senara quietly takes detailed notes.',
      },
      {
        character: 'narrator',
        text: 'By the end of the tour, you feel more excited about the possibilities in Stonewich, and you\'ve definitely strengthened your connection with Xavier.',
      }
    ],
    nextSceneId: 'departure-morning',
  }
};

export default teamMeetingScenes;
