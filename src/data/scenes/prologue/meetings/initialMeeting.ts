
import { Scene } from '../../../../types/game';

const initialMeetingScenes: Record<string, Scene> = {
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
        mood: 'neutral',
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
      {
        character: 'etta',
        text: "Navarre Ellis? The media darling?",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "A perfect fit for the team's Bellfox.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Seems my reputation proceeds me, like always.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I know I'm a natural Solvitor.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Does everyone know their role already?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Of course. It was determined as part of our assessment results. I'll be your Gnarus.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I see...",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Your anxiety starts to spiral since your results were inconclusive. You start to wonder whether you should actually be here. What if it's all a mistake?",
      },
      {
        character: 'etta',
        text: "Just great. I see a fifth will be adding a lot more chatter if nothing else. My role here is obvious, isn't it?",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "In the traditional team design, there were always four roles - Bellfox, Diva, Gnarus, and Solvitor. Etta must be the Diva.",
      },
      {
        character: 'narrator',
        text: "The uncertainty around your role feels like it may trigger a panic attack. You automatically start to focus on your breathing to help calm down.",
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
      {
        character: 'etta',
        text: "Wait...Navarre Ellis? The media darling?",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "A perfect fit for the team's Bellfox.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Seems my reputation proceeds me, like always.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I know I'm a natural Solvitor.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Does everyone know their role already?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Of course. It was determined as part of our assessment results. I'll be your Gnarus.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I see...",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Your anxiety starts to spiral since your results were inconclusive. You start to wonder whether you should actually be here. What if it's all a mistake?",
      },
      {
        character: 'etta',
        text: "Just great. I see a fifth will be adding a lot more chatter if nothing else. My role here is obvious, isn't it?",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "In the traditional team design, there were always four roles - Bellfox, Diva, Gnarus, and Solvitor. Etta must be the Diva.",
      },
      {
        character: 'narrator',
        text: "The uncertainty around your role feels like it may trigger a panic attack. You automatically start to focus on your breathing to help calm down.",
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
      
      {
        character: 'etta',
        text: "Wait...Navarre Ellis? The media darling?",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "A perfect fit for the team's Bellfox.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Seems my reputation proceeds me, like always.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I know I'm a natural Solvitor.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Does everyone know their role already?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Of course. It was determined as part of our assessment results. I'll be your Gnarus.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I see...",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Your anxiety starts to spiral since your results were inconclusive. You start to wonder whether you should actually be here. What if it's all a mistake?",
      },
      {
        character: 'etta',
        text: "Just great. I see a fifth will be adding a lot more chatter if nothing else. My role here is obvious, isn't it?",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "In the traditional team design, there were always four roles - Bellfox, Diva, Gnarus, and Solvitor. Etta must be the Diva.",
      },
      {
        character: 'narrator',
        text: "The uncertainty around your role feels like it may trigger a panic attack. You automatically start to focus on your breathing to help calm down.",
      },
    ],
    nextSceneId: 'briefing',
  },
};

export default initialMeetingScenes;
