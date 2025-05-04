
import { Scene } from '../../../types/game';

// Create individual character visit scenes for summer
const characterVisitScenes: Record<string, Scene> = {
  // Xavier visits - using the workstation for one-on-one time
  'summer-visit-xavier': {
    id: 'summer-visit-xavier',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'narrator',
        text: "Xavier has taken you to the rooftop of a municipal building where you have a good view of the city's skyline.",
      },
      {
        character: 'xavier',
        text: "Maven! Isn't this a beautiful view? I never tire of it.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Yes, very, but I have to wonder what we are doing here? I don't mean to sound like Etta, but is there a point to this location?",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "You do sound a bit like Etta! She must be rubbing off on you.",
        mood: 'laughing',
      },
      {
        character: 'xavier',
        text: "To answer your question, yes, actually. I indeed have a reason to bring us up here. Two even.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Oh? Now I'm curious.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "My first reason is related to the summer festival. This is the best spot for me to have eyes directly on the drones I need to synchronize for the stage shows, cooling, and maintenance routines.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "And the second, well, it might be a bit selfish.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Xavier's usually bright demeanor seems dimmed as he shares the second reason quietly, uncertainty clear on his face.",
      },
    ],
    choices: [
      {
        text: "Synchronizing drone routines? That sounds more like drone playtime. Count me in!",
        affectionChanges: { xavier: -1 }, // Choice emphasizes keeping things light, professional and fun with Xavier
        nextSceneId: 'summer-visit-xavier-technical', 
      },
      {
        text: "I'm not sure if there's much I can do, but did you want to talk about whatever is bothering you?",
        affectionChanges: { xavier: 1 }, // Choice indicates your desire to care more deeply about Xavier as a person
        nextSceneId: 'summer-visit-xavier-personal', 
      },
    ],
  },
  
  'summer-visit-xavier-technical': {
    id: 'summer-visit-xavier-technical',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "That's great! I appreciate your enthusiasm. It's a beautiful day whenever I get to work with the drones.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "You've gotten much better at the technical stuff. Do you think we should keep the drones unobstrusive or should we incorporate some visual displays for some entertainment value?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I can tell you have something wild in mind. What if we kept them unobtrusive most of the time so we don't take attention away from the performing acts, but liven things up sporadically for some novelty?",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "That's perfect! Let's start testing some some of these choreography configurations.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "You have some great dance moves. Your perspective on incorporating them into the drones routines is like music in motion.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "You spend the afternoon with Xavier on the drone routines. The time flies by.",
      },
    ],
    nextSceneId: 'summer-character-selection-1',
  },
  
  'summer-visit-xavier-personal': {
    id: 'summer-visit-xavier-personal',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'xavier',
        text: "Don't worry about it. I've got it under control.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Aren't we friends? I like to think I'm a good listener if you want to give me a try.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "Well, I'm not sure what to say. I just needed some time away from the office. Isn't that selfish?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Not at all. You are always the person everyone turns to first with a problem. You're always there with a smile to overpower Etta's frowns. You can take a break when you need to.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "It feels selfish. I should be happy to help everyone out, and I really do enjoy working with everyone, even Etta. I guess it's hard to describe except as maybe loneliness?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "You are loved by everyone, Xavier. There's no reason to feel lonely.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Xavier didn't say anything more, and the conversation felt unfinished leaving an awkward air between the two of you.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You spend the next several hours quietly working together to map drone routines and timings. Xavier seemed lost in his thoughts.",
      },
    ],
    nextSceneId: 'summer-character-selection-1',
  },
  
  // Navarre visit scene - Summer version
  'summer-visit-navarre': {
    id: 'summer-visit-navarre',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: "You find Navarre at an outdoor patio of a trendy bistro, engaged in an animated conversation with a group of well-dressed locals.",
      },
      {
        character: 'navarre',
        text: "Maven! Perfect timing. I was just telling these fine people about our plans for the Summer Songs & Sips festival.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I see you're working the connections as usual.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Of course! Though today has been... interesting. Ran into Morgan Thornfield earlier.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Thornfield? From the competing management company?",
        mood: 'surprised',
      },
      {
        character: 'navarre',
        text: "The very same. She's been spreading some unsavory rumors about our festival plans. I could use your help deciding how to handle this situation.",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Let's focus on the logistics. What venues need to be secured and what connections do we need to prioritize?",
        affectionChanges: { navarre: -0.5 },
        nextSceneId: 'summer-visit-navarre-technical',
      },
      {
        text: "Tell me more about this rivalry with Morgan. Maybe I can help you navigate this social minefield.",
        affectionChanges: { navarre: 1 },
        nextSceneId: 'summer-visit-navarre-personal',
      },
    ],
  },
  
  'summer-visit-navarre-technical': {
    id: 'summer-visit-navarre-technical',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "All business today, I see. Alright, let's talk strategy.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I figure the best way to counter rumors is to deliver an exceptional festival experience.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "You're right. We need to secure the riverside pavilion for the headline performances and the vineyard estate for the tasting events.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What about local musicians? Have we confirmed the lineup?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "That's where things get tricky. Morgan has been approaching our confirmed acts with better offers. We need to shore up those relationships.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You spend the afternoon with Navarre, mapping out a strategic plan for venue arrangements and artist relations. Though he maintains his professional demeanor, you notice his smile doesn't quite reach his eyes when Lissa's name comes up.",
      },
    ],
    nextSceneId: 'summer-character-selection-2',
  },
  
  'summer-visit-navarre-personal': {
    id: 'summer-visit-navarre-personal',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "Morgan and I have... history. We studied together at the Academy before Cybaton recruited me.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "And now you're competitors. That must be awkward.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "More than awkward. She takes it personally. Every success I have is somehow a slight against her.",
        mood: 'sad',
      },
      {
        character: 'navarre',
        text: "She's telling people our sound equipment is substandard, that we've cut corners on the quality of refreshments... anything to diminish our event.",
        mood: 'angry',
      },
      {
        character: 'maven',
        text: "Why is she so determined to undermine you specifically?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Because... we were more than classmates once. And when Cybaton chose me over her, she took it as a betrayal.",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "I had no idea you carried this weight while making everything look so effortless.",
        mood: 'surprised',
      },
      {
        character: 'navarre',
        text: "That's part of the job, isn't it? Everyone sees the charming socialite, but nobody sees the calculations behind every smile and handshake.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You spend the afternoon listening to Navarre open up about the personal toll of his public persona. For perhaps the first time, you see beyond his polished exterior to the genuine person underneath.",
      },
    ],
    nextSceneId: 'summer-character-selection-2',
  },
  
  // Etta visits for summer
  'summer-visit-etta': {
    id: 'summer-visit-etta',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'narrator',
        text: "You find Etta analyzing budget projections for the summer festival with intense focus.",
      },
      {
        character: 'etta',
        text: "Maven. Did you need something? I'm in the middle of optimizing our resource allocation.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I came to see if you needed any assistance with the summer festival preparations.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Actually, your timing is... acceptable. I could use a second opinion.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Happy to help. What are you working on?",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "I just received a call from my father. He wants me to prioritize showcasing Watanabe Industries' new sound equipment at the festival.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You notice Etta's normally perfect posture is slightly rigid, her hands tense on the keyboard.",
      }
    ],
    choices: [
      {
        text: "Let's analyze the technical specifications and cost-benefit ratio of using their equipment.",
        affectionChanges: { etta: -0.5 },
        nextSceneId: 'summer-visit-etta-technical',
      },
      {
        text: "It sounds like there's more to this situation than just equipment choices.",
        affectionChanges: { etta: 1 },
        nextSceneId: 'summer-visit-etta-personal',
      },
    ],
  },
  
  'summer-visit-etta-technical': {
    id: 'summer-visit-etta-technical',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'etta',
        text: "Yes, let's focus on the metrics. That's what matters.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Do we have the specs for their equipment? We should compare it against alternatives.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Here they are. Their amplification system is 12% more energy-efficient, but costs 30% more than our current provider.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What about sound quality? That's crucial for a music festival.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Comparable, possibly marginally better in outdoor settings. But not enough to justify the cost increase in my assessment.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You work with Etta to create a detailed analysis of various sound equipment options. Though she doesn't say it directly, you sense her relief at having objective data to counter her father's pressure.",
      },
      {
        character: 'etta',
        text: "Your analytical skills are improving, Maven. This report will be... useful.",
        mood: 'neutral',
      },
    ],
    nextSceneId: 'summer-character-selection-3',
  },
  
  'summer-visit-etta-personal': {
    id: 'summer-visit-etta-personal',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'etta',
        text: "What are you implying?",
        mood: 'angry',
      },
      {
        character: 'maven',
        text: "Nothing negative. Just that you seem tense about your father's request.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "I'm not... It's just... complicated.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Family expectations often are.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "My father expects the Watanabe name to open doors. He expects me to leverage my position to benefit the family business.",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "And you don't feel comfortable with that.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "It's a conflict of interest. I was selected for this position based on merit, not my family connections. I refuse to blur those lines.",
        mood: 'angry',
      },
      {
        character: 'etta',
        text: "But every time I say no, I'm reminded of how I've disappointed him yet again. How I'm not the dutiful daughter he expected.",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "It takes integrity to maintain those boundaries. I admire that about you.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You sit with Etta as she opens up about the weight of family expectations. Though she quickly composes herself and returns to her professional demeanor, there's a new understanding between you.",
      },
    ],
    nextSceneId: 'summer-character-selection-3',
  },
  
  // Senara visits for summer
  'summer-visit-senara': {
    id: 'summer-visit-senara',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: "You find Senara in a quiet corner of the office, surrounded by historical texts and digital displays showing intricate neural pathway diagrams.",
      },
      {
        character: 'senara',
        text: "Maven. I didn't expect company today.",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "What are you working on? It looks fascinating.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "I'm studying historical musical patterns from Stonewich's past summer festivals and their neurological impact on listeners.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "My analysis suggests certain chord progressions produce a 37% increase in dopamine release when performed at sunset versus midday.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "That's... remarkably specific. How can you tell?",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "My neural interfacing allows me to process patterns that others might miss. But sometimes I wonder if my conclusions are truly mine or just the algorithms my parents had implanted.",
        mood: 'sad',
      }
    ],
    choices: [
      {
        text: "Let's focus on applying your research to optimize the festival schedule for maximum impact.",
        affectionChanges: { senara: -0.5 },
        nextSceneId: 'summer-visit-senara-technical',
      },
      {
        text: "Tell me more about these neural enhancements. How do they affect your sense of self?",
        affectionChanges: { senara: 1 },
        nextSceneId: 'summer-visit-senara-personal',
      },
    ],
  },
  
  'summer-visit-senara-technical': {
    id: 'summer-visit-senara-technical',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'senara',
        text: "A practical approach. Very well.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Your insights could help us create a truly memorable experience for attendees.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "According to my analysis, we should schedule the string quartet at sunset, followed by percussion-heavy ensembles as night falls.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "And what about the wine tasting events? Is there an optimal time for those?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Mid-afternoon provides the optimal balance of light, temperature, and taste sensitivity. I can show you the data.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You spend hours with Senara, creating an intricate schedule based on their remarkable insights. Though focused on the technical aspects, you occasionally catch them watching your reactions with what seems like curiosity.",
      },
    ],
    nextSceneId: 'summer-character-selection-4',
  },
  
  'summer-visit-senara-personal': {
    id: 'summer-visit-senara-personal',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'senara',
        text: "You... want to know about that? Most people prefer to ignore the augmentations.",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "I'm interested in you as a person. That includes understanding how you experience the world.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "My parents were pioneers in neural enhancement. They believed they were giving me a gift—expanded cognitive capacity, pattern recognition beyond human baseline.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "But sometimes I process information so differently from others that I feel... disconnected. Like I'm observing humanity rather than participating in it.",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "Do you ever resent them for making that choice for you?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "How can I? They gave me abilities that make me valuable. But I often wonder—if I find beauty in a musical pattern because of mathematical precision rather than emotional resonance, am I really experiencing beauty at all?",
        mood: 'thoughtful',
      },
      {
        character: 'maven',
        text: "Perhaps there's beauty in both approaches. Different paths to appreciation don't make your experience less valid.",
        mood: 'thoughtful',
      },
      {
        character: 'senara',
        text: "An intriguing perspective. I... appreciate you listening, Maven. Few people ask these questions.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "You spend the afternoon in philosophical conversation with Senara. As you talk, you notice their typically rigid posture gradually relaxing, as if unburdened by sharing these deeply personal thoughts.",
      },
    ],
    nextSceneId: 'summer-character-selection-4',
  },
};

export default characterVisitScenes;
