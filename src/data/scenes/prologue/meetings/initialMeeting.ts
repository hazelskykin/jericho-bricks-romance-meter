
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
        text: "Etta Montgomery. I expected a more cutting-edge assignment. Stonewich wasn't one I had prepared a plan for. There's so much to do.",
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
        text: "Hi, I'm Maven. I'm excited to work with you all.",
        affectionChanges: { xavier: 0.5, navarre: 1, etta: 0.5, senara: 0 },
        nextSceneId: 'team-meeting-response-friendly',
      },
      {
        text: "Maven Gray. I'm not sure why I'm here either, but I'll do my best.",
        affectionChanges: { xavier: 1, navarre: 0, etta: 0, senara: 0.5 },
        nextSceneId: 'team-meeting-response-honest',
      },
      {
        text: "Maven. My assessment results were... unconventional. That's probably why I'm the fifth wheel.",
        affectionChanges: { xavier: -0.5, navarre: -1, etta: -1, senara: 1 },
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
        text: 'Five minds are better than four, right?',
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
        character: 'maven',
        text: "Already? How is that possible? We were just notified of the assignment moments ago.",
        mood: 'surprised',
      },
      {
        character: 'xavier',
        text: "He's probably like me. I have a wearable Cybaton Oracle interface that's been feeding me all the Stonewich systems information and diagnostics as soon as I heard it.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "That's promising to hear. Wait...did you say your name was Navarre Ellis? The media darling?",
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
        text: "I know I'm a natural Solvitor. Ready to design, build and fix tech anytime.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Does everyone know their role already?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Of course. It was determined as part of our assessment results. I'll be your Gnarus, your guide to knowledge mundane and arcane.",
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
        text: "In the traditional team design, there were always four roles - Bellfox, Diva, Gnarus, and Solvitor.",
      },
      {
        character: 'narrator',
        text: "If Navarre was the Bellfox, Xavier the Solvitor, and Senara the Gnarus, then Etta...",
      },
      {
        character: 'etta',
        text: "Diva.",
        mood: 'angry',
      },
      {
        character: 'narrator',
        text: "The uncertainty around your role feels like it may trigger a panic attack. You try not to be obvious but can't help wondering if you have time to start a calming ritual on your bionic to help calm down.",
      },
      {
        character: 'navarre',
        text: "Just relax! You're part of the team now.",
        mood: 'laughing',
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
        text: "Hmm, interesting. Five-person teams aren't standard protocol, for good reason in terms of efficiency.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "They're testing something new. Your profile showed potential that fits with their hypothesis.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "How do you know that? How do you know what's on my profile?",
        mood: 'surprised',
      },
      {
        character: 'xavier',
        text: "Any of us can access the team profiles now that we've been assigned. Don't you have a wearable too?",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "Yes, but I haven't used it that way.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Well, whatever the reason, welcome aboard! We'll make it work.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Wait...did you say your name was Navarre Ellis? The media darling?",
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
        text: "I know I'm a natural Solvitor. Ready to design, build and fix tech anytime.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Does everyone know their role already?",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "Of course. It was determined as part of our assessment results. I'll be your Gnarus, your guide to knowledge mundane and arcane.",
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
        text: "In the traditional team design, there were always four roles - Bellfox, Diva, Gnarus, and Solvitor.",
      },
      {
        character: 'narrator',
        text: "If Navarre was the Bellfox, Xavier the Solvitor, and Senara the Gnarus, then Etta...",
      },
      {
        character: 'etta',
        text: "Diva.",
        mood: 'angry',
      },
      {
        character: 'narrator',
        text: "The uncertainty around your role feels like it may trigger a panic attack. You try not to be obvious as you wonder if you have time to start a calming ritual on your bionic.",
      },
      {
        character: 'xavier',
        text: "Oh! Is that one of the new bionic harmonizers? I modified mine so that it'll cycle depending on biometrics without the need for a trigger. I can help you with that sometime, if you want.",
        mood: 'happy',
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
        text: "Come on, Etta. Every team has unique dynamics. I'm sure Maven brings a valuable perspective.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Unconventional isn't always bad. Keeps things interesting.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: 'Inconclusive results on the assessment often indicate complex thinking patterns. That could be beneficial.',
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Or just poor clarity of thinking. Wait...did you say your name was Navarre Ellis? The media darling?",
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
        text: "I know I'm a natural Solvitor. Ready to design, build and fix tech anytime.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Does everyone know their role already?",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "Of course. It was determined as part of our assessment results. I'll be your Gnarus, your guide to knowledge mundane and arcane.",
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
        text: "In the traditional team design, there were always four roles - Bellfox, Diva, Gnarus, and Solvitor.",
      },
      {
        character: 'narrator',
        text: "If Navarre was the Bellfox, Xavier the Solvitor, and Senara the Gnarus, then Etta...",
      },
      {
        character: 'etta',
        text: "Diva. D-I-V-A!",
        mood: 'angry',
      },
      {
        character: 'narrator',
        text: "The uncertainty around your role feels like it may trigger a panic attack. Is there time to start a calming ritual on your bionic?",
      },
      {
        character: 'senara',
        text: "Dr. Voss will be here in a moment...",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Do all Gnarus read minds too?",
        mood: 'surprised',
      },
      {
        character: 'narrator',
        text: "Senara merely looked back at you with an enigmatic smile.",
      },
    ],
    nextSceneId: 'briefing',
  },
};

export default initialMeetingScenes;
