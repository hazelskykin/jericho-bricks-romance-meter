
import { Scene } from '../types/game';

const scenes: Record<string, Scene> = {
  intro: {
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
        text: 'I can't believe I'm actually here. How did I even pass the assessment? My results were so...',
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'A gentle chime signals the start of the orientation session. The Chief HR Officer, Dr. Elara Voss, steps onto the stage.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "Welcome to Cybaton's City Administration Program! You represent the brightest minds, chosen to shape our future."',
      },
      {
        character: 'narrator',
        text: 'The room buzzes with excitement. You scan the crowd, wondering who you'll be teamed with.',
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
        text: 'Five? That's unusual. Teams are always four...',
        mood: 'surprised',
      },
    ],
    nextSceneId: 'team-meeting',
  },
  
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
        text: 'Hey everyone! I'm Xavier. Looks like we'll be working together in Stonewich.',
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
        text: '"Hi, I'm Maven. I'm excited to work with you all."',
        affectionChanges: { xavier: 1, navarre: 1, etta: 0, senara: 0 },
        nextSceneId: 'team-meeting-response-friendly',
      },
      {
        text: '"Maven Gray. I'm not sure why I'm here either, but I'll do my best."',
        affectionChanges: { xavier: 1, navarre: 0, etta: -1, senara: 1 },
        nextSceneId: 'team-meeting-response-honest',
      },
      {
        text: '"Maven. My assessment results were... unconventional. That's probably why I'm the fifth wheel."',
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
        text: 'Let's stay focused. We should review the Stonewich briefing materials first.',
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: 'I've already studied them. The city's systems are stable but outdated.',
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
        text: 'Hey, we're all figuring things out. I'm sure there's a good reason you're with us.',
        mood: 'happy',
      },
      {
        character: 'etta',
        text: 'Hmm, interesting. Five-person teams aren't standard protocol.',
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: 'They're testing something new. Your profile must have shown potential that fits with their hypothesis.',
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: 'Well, whatever the reason, welcome aboard! We'll make it work.',
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
        text: 'Great. An experimental addition. Let's hope it doesn't compromise our efficiency.',
        mood: 'angry',
      },
      {
        character: 'xavier',
        text: 'Come on, Etta. Every team has unique dynamics. I'm sure Maven brings valuable perspective.',
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
        text: 'So that's why... I'm the wild card.',
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
        text: 'You all find yourselves at a trendy coffee shop near Cybaton Tower. The atmosphere is relaxed, with soft music playing in the background.',
      },
      {
        character: 'xavier',
        text: 'This was a great idea, Maven. Much better to get to know each other in a casual setting.',
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: 'Absolutely! Work talk can wait. So, what brought everyone to Cybaton's program?',
        mood: 'happy',
      },
      {
        character: 'etta',
        text: 'I'd rather discuss our approach to Stonewich, but I suppose some... team bonding... is necessary.',
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: 'The technological challenges attracted me. Stonewich's systems are a fascinating blend of old and new.',
        mood: 'neutral',
      },
    ],
    choices: [
      {
        text: 'Share your story about wanting to make a difference in city management',
        affectionChanges: { xavier: 1, navarre: 0, etta: 1, senara: 1 },
        nextSceneId: 'departure-preparation',
      },
      {
        text: 'Admit you're still figuring out where you fit in',
        affectionChanges: { xavier: 2, navarre: 1, etta: -1, senara: 0 },
        nextSceneId: 'departure-preparation',
      },
      {
        text: 'Deflect and ask Xavier about his background instead',
        affectionChanges: { xavier: 2, navarre: 0, etta: 0, senara: -1 },
        nextSceneId: 'departure-preparation',
      },
    ],
  },
  
  'study-session': {
    id: 'study-session',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'narrator',
        text: 'The Cybaton research library is quiet and serene. Holographic displays and physical books line the walls.',
      },
      {
        character: 'etta',
        text: 'Now this is productive. Let's divide the Stonewich files by sector.',
        mood: 'happy',
      },
      {
        character: 'senara',
        text: 'I've already analyzed the historical data. The transition points between technology upgrades are particularly interesting.',
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: 'The community response data is fascinating too. Stonewich residents have high satisfaction rates despite the older tech.',
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: 'I was hoping we'd do something more... social. But I guess this works too.',
        mood: 'sad',
      },
    ],
    choices: [
      {
        text: 'Focus on the seasonal festival planning data',
        affectionChanges: { xavier: 0, navarre: 2, etta: 0, senara: 0 },
        nextSceneId: 'departure-preparation',
      },
      {
        text: 'Examine the infrastructure maintenance records',
        affectionChanges: { xavier: 1, navarre: -1, etta: 1, senara: 2 },
        nextSceneId: 'departure-preparation',
      },
      {
        text: 'Look into resident complaint patterns',
        affectionChanges: { xavier: 1, navarre: 1, etta: 1, senara: 0 },
        nextSceneId: 'departure-preparation',
      },
    ],
  },
  
  'rd-tour': {
    id: 'rd-tour',
    background: 'cybaton-lab',
    dialogue: [
      {
        character: 'narrator',
        text: 'The R&D floor is a wonderland of cutting-edge technology and experiments. Prototypes and holographic models fill the open workspace.',
      },
      {
        character: 'xavier',
        text: 'This is amazing! I could spend days exploring all these innovations.',
        mood: 'happy',
      },
      {
        character: 'senara',
        text: 'The quantum computing array they're using for city simulations is particularly impressive.',
        mood: 'happy',
      },
      {
        character: 'etta',
        text: 'Interesting to see what might eventually be implemented in Stonewich, though probably not during our tenure.',
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: 'Cool tech, but I'm more interested in how people interact with it. The human element is what makes or breaks these systems.',
        mood: 'neutral',
      },
    ],
    choices: [
      {
        text: 'Ask about adaptive interfaces for different user needs',
        affectionChanges: { xavier: 1, navarre: 1, etta: 0, senara: 0 },
        nextSceneId: 'departure-preparation',
      },
      {
        text: 'Inquire about the balance between automation and human oversight',
        affectionChanges: { xavier: 0, navarre: 0, etta: 1, senara: 1 },
        nextSceneId: 'departure-preparation',
      },
      {
        text: 'Wonder if any of these innovations could be retrofitted for Stonewich',
        affectionChanges: { xavier: 2, navarre: 0, etta: 1, senara: 2 },
        nextSceneId: 'departure-preparation',
      },
    ],
  },
  
  'departure-preparation': {
    id: 'departure-preparation',
    background: 'cybaton-lobby',
    dialogue: [
      {
        character: 'narrator',
        text: 'The next morning arrives quickly. You meet your team in the Cybaton lobby, luggage in hand, ready for the journey to Stonewich.',
      },
      {
        character: 'xavier',
        text: 'Morning everyone! Ready for our big adventure?',
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: 'As ready as I'll ever be. I hear Stonewich has amazing local cuisine. We should explore that when we arrive.',
        mood: 'happy',
      },
      {
        character: 'etta',
        text: 'I've prepared a preliminary schedule for our first week. We should stick to it to ensure optimal productivity.',
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: 'I've downloaded all available data on Stonewich's systems. We can review it during transit.',
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss approaches your group with final instructions.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "Your transport is ready. Remember, you're not just maintaining systems in Stonewich—you're representing Cybaton. Make us proud."',
      },
    ],
    choices: [
      {
        text: '"We won't let you down."',
        affectionChanges: { xavier: 0, navarre: 0, etta: 1, senara: 0 },
        nextSceneId: 'arrival-stonewich',
      },
      {
        text: '"We'll do our best as a team."',
        affectionChanges: { xavier: 1, navarre: 1, etta: 0, senara: 0 },
        nextSceneId: 'arrival-stonewich',
      },
      {
        text: '"I'm looking forward to putting theory into practice."',
        affectionChanges: { xavier: 0, navarre: 0, etta: 0, senara: 1 },
        nextSceneId: 'arrival-stonewich',
      },
    ],
  },
  
  'arrival-stonewich': {
    id: 'arrival-stonewich',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'After a comfortable journey, your transport descends towards Stonewich. The city spreads out below—a harmonious blend of historic architecture and modern technology.',
      },
      {
        character: 'maven',
        text: 'It's beautiful... so different from what I expected.',
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: 'Look at those green spaces integrated with the tech hubs! Stonewich was one of the first cities to pioneer that approach.',
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: 'And check out the marketplace district! Those must be preparations for their Spring festival—what did they call it? Blooms and Brooms?',
        mood: 'happy',
      },
      {
        character: 'etta',
        text: 'Our administrative hub is in that central tower. We should head there first to meet the current team.',
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: 'I'm curious to see their maintenance protocols in action. The reports indicated some innovative workarounds for the legacy systems.',
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'As the transport lands, you can't help but feel a mix of excitement and nervousness. This is where your journey truly begins.',
      },
      {
        character: 'narrator',
        text: 'What will you make of this opportunity? And how will your relationships with your teammates develop over the coming months?',
      },
      {
        character: 'narrator',
        text: 'Only time will tell...',
      },
    ],
    nextSceneId: 'main-menu',
  },
  
  'main-menu': {
    id: 'main-menu',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'End of prologue. Thank you for playing the demo of Jericho Bricks!',
      },
    ],
    choices: [
      {
        text: 'Return to Main Menu',
        nextSceneId: 'start',
      },
    ],
  },
  
  'start': {
    id: 'start',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'narrator',
        text: 'Welcome to Jericho Bricks!',
      },
    ],
    choices: [
      {
        text: 'New Game',
        nextSceneId: 'intro',
      },
      {
        text: 'About',
        nextSceneId: 'about',
      },
    ],
  },
  
  'about': {
    id: 'about',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'narrator',
        text: 'Jericho Bricks is a visual novel where you play as Maven, a new recruit in the Cybaton city administration program.',
      },
      {
        character: 'narrator',
        text: 'Your choices will affect your relationships with your teammates, each of whom is a potential romance option.',
      },
      {
        character: 'narrator',
        text: 'Explore the city of Stonewich, navigate workplace challenges, and maybe find love along the way!',
      },
    ],
    choices: [
      {
        text: 'Back to Main Menu',
        nextSceneId: 'start',
      },
    ],
  },
};

export default scenes;
