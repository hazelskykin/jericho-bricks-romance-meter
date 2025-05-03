import { Scene } from '../../../types/game';

const departureScenes: Record<string, Scene> = {
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
  
  'departure-end': {
    id: 'departure-end',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: 'As your shuttle pulls up to the administrative buildings of Stonewich, you take a deep breath. This is it. The beginning of your year-long assignment.',
      },
      {
        character: 'maven',
        text: "I still don't know why Cybaton chose me... but I'll do my best not to let them down.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "Hey Maven, you ready? This is going to be quite the adventure.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: 'You nod, gathering your courage. Whether you belong here or not, this is your chance to prove yourself.',
      },
    ],
    nextSceneId: 'season-transition-spring',
  },
};

export default departureScenes;
