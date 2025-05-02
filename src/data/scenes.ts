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
        text: 'You all find yourselves at a trendy coffee shop near Cybaton Tower. The atmosphere is relaxed, with soft music playing in the background.',
      },
      {
        character: 'xavier',
        text: 'This was a great idea, Maven. Much better to get to know each other in a casual setting.',
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Absolutely! Work talk can wait. So, what brought everyone to Cybaton's program?",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "I'd rather discuss our approach to Stonewich, but I suppose some... team bonding... is necessary.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The technological challenges attracted me. Stonewich's systems are a fascinating blend of old and new.",
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
        text: "Admit you're still figuring out where you fit in",
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
        text: "Now this is productive. Let's divide the Stonewich files by sector.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I've already analyzed the historical data. The transition points between technology upgrades are particularly interesting.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: 'The community response data is fascinating too. Stonewich residents have high satisfaction rates despite the older tech.',
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "I was hoping we'd do something more... social. But I guess this works too.",
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
        text: "The quantum computing array they're using for city simulations is particularly impressive.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: 'Interesting to see what might eventually be implemented in Stonewich, though probably not during our tenure.',
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Cool tech, but I'm more interested in how people interact with it. The human element is what makes or breaks these systems.",
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
        text: "As ready as I'll ever be. I hear Stonewich has amazing local cuisine. We should explore that when we arrive.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "I've prepared a preliminary schedule for our first week. We should stick to it to ensure optimal productivity.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "I've downloaded all available data on Stonewich's systems. We can review it during transit.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss approaches your group with final instructions.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "Your transport is ready. Remember, you\'re not just maintaining systems in Stonewich—you\'re representing Cybaton. Make us proud."',
      },
    ],
    choices: [
      {
        text: '"We won\'t let you down."',
        affectionChanges: { xavier: 0, navarre: 0, etta: 1, senara: 0 },
        nextSceneId: 'arrival-stonewich',
      },
      {
        text: '"We\'ll do our best as a team."',
        affectionChanges: { xavier: 1, navarre: 1, etta: 0, senara: 0 },
        nextSceneId: 'arrival-stonewich',
      },
      {
        text: '"I\'m looking forward to putting theory into practice."',
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
        text: "It's beautiful... so different from what I expected.",
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
        text: "I'm curious to see their maintenance protocols in action. The reports indicated some innovative workarounds for the legacy systems.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "As the transport lands, you can't help but feel a mix of excitement and nervousness. This is where your journey truly begins.",
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
  
  // Spring Chapter Scenes
  'spring-intro': {
    id: 'spring-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'Two months have passed since your arrival in Stonewich. The city has begun to welcome the spring season.',
      },
      {
        character: 'narrator',
        text: 'The administration team has settled into their roles, though there have been challenges along the way.',
      },
      {
        character: 'maven',
        text: "I'm still trying to find my place here. Everyone else seems to have their specialty.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "As you walk into the office this morning, you find Xavier reviewing reports on his tablet.",
      },
      {
        character: 'xavier',
        text: "Morning, Maven! Have you heard about the Spring festival? It's coming up next week—Blooms & Brooms.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Blooms & Brooms? That sounds interesting.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "It's one of Stonewich's four seasonal festivals. Spring is all about renewal—cleaning up the city and planting new gardens.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Did I hear someone mention the festival? It's a great PR opportunity for us newcomers. We should all participate.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'spring-planning',
  },
  
  'spring-planning': {
    id: 'spring-planning',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'etta',
        text: "If we're going to participate in this festival, we need a strategic approach. It's not just about fun—it's about demonstrating Cybaton's commitment to Stonewich.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The festival has three main activities: Brooms Away, Mud-fling, and the Bloom with a View art fair.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "Brooms Away is a city-wide cleanup effort—but they've gamified it. You identify sensitive tech spots while sweeping away the winter dust.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Mud-fling is hilarious! Teams throw mud at each other while preparing the new garden beds. It gets messy but it's a crowd favorite.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "And the Bloom with a View is an art fair held in the botanical gardens. There's a scavenger hunt component that's quite popular.",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Let's participate in all the activities as a team.",
        affectionChanges: { xavier: 1, navarre: 1, etta: -1, senara: 0 },
        nextSceneId: 'spring-festival-all',
      },
      {
        text: "I'd prefer to focus on one activity and excel at it.",
        affectionChanges: { xavier: 0, navarre: -1, etta: 1, senara: 1 },
        nextSceneId: 'spring-festival-choose',
      },
      {
        text: "What if we divide and conquer? Each person takes one activity.",
        affectionChanges: { xavier: 0, navarre: 0, etta: 1, senara: 1 },
        nextSceneId: 'spring-festival-divide',
      }
    ],
  },
  
  'spring-festival-all': {
    id: 'spring-festival-all',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The day of the festival arrives. Stonewich is bustling with activity as citizens prepare for the spring celebration.",
      },
      {
        character: 'xavier',
        text: "This is exciting! I've read about these traditions but never participated before.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "It's great public relations too. People love seeing their administrators get their hands dirty alongside them.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Let's keep focused. Remember, this is a job, not just a social outing.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What should we try first?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Let's start with Brooms Away.",
        nextSceneId: 'spring-brooms-away-intro',
      },
      {
        text: "Mud-fling looks fun!",
        nextSceneId: 'spring-mud-fling-intro',
      },
      {
        text: "I'd like to explore the Bloom with a View art fair.",
        nextSceneId: 'spring-bloom-view-intro',
      }
    ],
  },
  
  'spring-festival-choose': {
    id: 'spring-festival-choose',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The day of the festival arrives. You've decided to focus your efforts on one activity.",
      },
      {
        character: 'maven',
        text: "I think I'll be more effective if I concentrate on one thing rather than trying to do everything.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "A sensible approach. Quality over quantity.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Which activity should I focus on?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "I'll join the Brooms Away cleanup crew.",
        nextSceneId: 'spring-brooms-away-intro',
      },
      {
        text: "The Mud-fling garden preparation looks interesting.",
        nextSceneId: 'spring-mud-fling-intro',
      },
      {
        text: "I think I'd be most helpful at the Bloom with a View art fair.",
        nextSceneId: 'spring-bloom-view-intro',
      }
    ],
  },
  
  'spring-festival-divide': {
    id: 'spring-festival-divide',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The festival day arrives, and your team has decided to divide and conquer the activities.",
      },
      {
        character: 'etta',
        text: "An efficient approach. I'll oversee the logistics of the main stage events.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "I can help with the tech side of Brooms Away. Some of those systems need careful handling.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "I'll take Mud-fling! It's right up my alley—messy but fun, and great for networking.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I'll document the art installations at Bloom with a View. The historical significance is worth cataloging.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "And I should choose...",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "I'll join Xavier with Brooms Away.",
        affectionChanges: { xavier: 1, navarre: 0, etta: 0, senara: 0 },
        nextSceneId: 'spring-brooms-away-intro',
      },
      {
        text: "I'll team up with Navarre for Mud-fling.",
        affectionChanges: { xavier: 0, navarre: 1, etta: 0, senara: 0 },
        nextSceneId: 'spring-mud-fling-intro',
      },
      {
        text: "I'll help Senara at Bloom with a View.",
        affectionChanges: { xavier: 0, navarre: 0, etta: 0, senara: 1 },
        nextSceneId: 'spring-bloom-view-intro',
      }
    ],
  },
  
  // Brooms Away minigame intro
  'spring-brooms-away-intro': {
    id: 'spring-brooms-away-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The Brooms Away area is set up in the city's main plaza. Citizens are already sweeping away winter dust and marking sensitive technology spots.",
      },
      {
        character: 'xavier',
        text: "This is important work. The winter buildup can cause real problems for the city systems if not properly cleaned.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "How exactly does this work?",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "You use the broom to sweep away dust, but you have to be careful. If you hit a sensitive tech spot, it could malfunction.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "That's what the feather dusters are for—marking those spots for more delicate cleaning later.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Sounds like a challenge. I'm ready to try!",
        mood: 'happy',
      }
    ],
    choices: [
      {
        text: "Start Brooms Away",
        nextSceneId: 'spring-brooms-away-game',
      },
      {
        text: "Actually, let me try something else first.",
        nextSceneId: 'spring-festival-all',
      }
    ],
  },
  
  // Brooms Away minigame
  'spring-brooms-away-game': {
    id: 'spring-brooms-away-game',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Time to test your sweeping skills! Use the broom to clear the dust, and the feather duster to mark sensitive tech spots.",
      }
    ],
    choices: [
      {
        text: "Begin Sweeping",
        nextSceneId: 'spring-brooms-away-start',
      }
    ],
  },
  
  // Special scene to trigger the minigame
  'spring-brooms-away-start': {
    id: 'spring-brooms-away-start',
    background: 'stonewich-cityscape',
    dialogue: [], // Empty dialogue to trigger the minigame
    nextSceneId: 'spring-brooms-away-complete',
  },
  
  // After minigame completion
  'spring-brooms-away-complete': {
    id: 'spring-brooms-away-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "Nice work, Maven! You've got a good eye for the tech spots.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Thanks! It's harder than it looks to tell what's sensitive and what's not.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "That's why we have trained professionals like us. The citizens appreciate the help.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "What else is happening at the festival?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Let's check out Mud-fling next.",
        nextSceneId: 'spring-mud-fling-intro',
      },
      {
        text: "I'd like to see the Bloom with a View art fair.",
        nextSceneId: 'spring-bloom-view-intro',
      },
      {
        text: "I think I've had enough for today.",
        nextSceneId: 'spring-festival-end',
      }
    ],
  },
  
  // Mud-fling minigame intro
  'spring-mud-fling-intro': {
    id: 'spring-mud-fling-intro',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "The Mud-fling area is set up in the community garden. People are laughing and covered in mud as they prepare flower beds.",
      },
      {
        character: 'navarre',
        text: "Now THIS is my kind of event! Nothing builds relationships like getting a little messy together.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "How does it work exactly?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "We form teams and try to hit members of the other team with mud balls. But it's not just chaos—we're actually turning over the soil for spring planting.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "The fountain in the middle cycles on and off, creating mud as it sprays. You grab a mud ball and fling it at the other team!",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Sounds messy but fun. Let's do it!",
        mood: 'happy',
      }
    ],
    choices: [
      {
        text: "Start Mud-fling",
        nextSceneId: 'spring-mud-fling-game',
      },
      {
        text: "Actually, let me try something else first.",
        nextSceneId: 'spring-festival-all',
      }
    ],
  },
  
  // Mud-fling minigame
  'spring-mud-fling-game': {
    id: 'spring-mud-fling-game',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Time for Mud-fling! Select a mud ball, then click where you want to throw it. Try to hit members of the opposing team!",
      }
    ],
    choices: [
      {
        text: "Begin Mud-fling",
        nextSceneId: 'spring-mud-fling-start',
      }
    ],
  },
  
  // Special scene to trigger the minigame
  'spring-mud-fling-start': {
    id: 'spring-mud-fling-start',
    background: 'stonewich-cityscape',
    dialogue: [], // Empty dialogue to trigger the minigame
    nextSceneId: 'spring-mud-fling-complete',
  },
  
  // After minigame completion
  'spring-mud-fling-complete': {
    id: 'spring-mud-fling-complete',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'navarre',
        text: "That was AMAZING! Did you see that shot you made? Right on target!",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'm covered in mud, but that was incredibly fun!",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "That's the spirit! And look—all these flower beds are ready for planting now.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "What else is happening at the festival?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Let's try Brooms Away next.",
        nextSceneId: 'spring-brooms-away-intro',
      },
      {
        text: "I'd like to see the Bloom with a View art fair.",
        nextSceneId: 'spring-bloom-view-intro',
      },
      {
        text: "I think I've had enough for today.",
        nextSceneId: 'spring-festival-end',
      }
    ],
  },
  
  // Bloom with a View minigame intro
  'spring-bloom-view-intro': {
    id: 'spring-bloom-view-intro',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: "The Bloom with a View art fair is set up in the botanical gardens. Artwork and floral displays create a vibrant atmosphere.",
      },
      {
        character: 'senara',
        text: "This event combines art and horticulture—two important cultural aspects of Stonewich.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "It's beautiful. What happens here?",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Local artists display their work, and there's a popular scavenger hunt where participants search for specific items hidden among the displays.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "It encourages people to pay attention to details they might otherwise miss. Quite clever, really.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'd like to try the scavenger hunt!",
        mood: 'happy',
      }
    ],
    choices: [
      {
        text: "Start Bloom with a View",
        nextSceneId: 'spring-bloom-view-game',
      },
      {
        text: "Actually, let me try something else first.",
        nextSceneId: 'spring-festival-all',
      }
    ],
  },
  
  // Bloom with a View minigame
  'spring-bloom-view-game': {
    id: 'spring-bloom-view-game',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: "Can you find all five hidden items in the garden art fair? Click around to discover them!",
      }
    ],
    choices: [
      {
        text: "Begin Scavenger Hunt",
        nextSceneId: 'spring-bloom-view-start',
      }
    ],
  },
  
  // Special scene to trigger the minigame
  'spring-bloom-view-start': {
    id: 'spring-bloom-view-start',
    background: 'city-cafe',
    dialogue: [], // Empty dialogue to trigger the minigame
    nextSceneId: 'spring-bloom-view-complete',
  },
  
  // After minigame completion
  'spring-bloom-view-complete': {
    id: 'spring-bloom-view-complete',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'senara',
        text: "Well done. You found all the items. You have a keen eye for detail.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Thanks! I enjoyed looking at all the artwork too.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The artists integrate Stonewich's history into their work. It's a valuable cultural preservation.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What else is happening at the festival?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Let's try Brooms Away next.",
        nextSceneId: 'spring-brooms-away-intro',
      },
      {
        text: "I want to check out the Mud-fling activity.",
        nextSceneId: 'spring-mud-fling-intro',
      },
      {
        text: "I think I've had enough for today.",
        nextSceneId: 'spring-festival-end',
      }
    ],
  },
  
  // Festival conclusion
  'spring-festival-end': {
    id: 'spring-festival-end',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "As the sun sets on Stonewich, the Spring festival winds down. Citizens are pleased with the clean streets, prepared garden beds, and beautiful art displays.",
      },
      {
        character: 'xavier',
        text: "The first few months have been quite an experience, haven't they?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "And we're just getting started! I've made so many great connections today.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The productivity metrics from today are impressive. We should incorporate these community engagement strategies into our regular operations.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The seasonal traditions here are deeply rooted. Understanding them helps us better integrate our technological solutions.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I feel like I'm starting to find my place here in Stonewich.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'spring-conclusion',
  },
  
  'spring-conclusion': {
    id: 'spring-conclusion',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "As spring continues in Stonewich, your team settles into a rhythm. Each member's strengths become more apparent in different situations.",
      },
      {
        character: 'narrator',
        text: "You've begun to see patterns in how your teammates operate, and found yourself gravitating toward certain approaches.",
      },
      {
        character: 'maven',
        text: "These past few months have taught me so much about everyone... and about myself.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "With spring coming to a close, it's time to prepare for summer—and the next seasonal festival.",
      },
      {
        character: 'narrator',
        text: "But your experiences have already begun to shape your path. Your strongest connections are becoming clear.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'spring-transition',
  },
  
  // Special scene to handle transition between seasons
  'spring-transition': {
    id: 'spring-transition',
    background: 'stonewich-cityscape',
    dialogue: [], // Empty dialogue to trigger season transition
    nextSceneId: 'main-menu', // Temporarily return to main menu until summer content is implemented
  },
  
  // ... keep existing code (maintain about, start and main-menu scenes)

};

export default scenes;
