
import { Scene } from '../../../types/game';

const characterVisits: Record<string, Scene> = {
  // Xavier visit scene
  'spring-visit-xavier': {
    id: 'spring-visit-xavier',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'narrator',
        text: "You find Xavier at his workstation, surrounded by digital screens showing various city systems.",
      },
      {
        character: 'xavier',
        text: "Maven! Perfect timing. I was just reviewing the plans for the Spring festival's tech setup.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "How's it going? Anything I can help with?",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "Actually, yes. I'm designing an app for the festival that shows event locations and schedules. Would you mind giving me your opinion on the interface?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "I'd be happy to help with the design!",
        affectionChanges: { xavier: 1 },
        nextSceneId: 'spring-visit-xavier-help',
      },
      {
        text: "I'm not very tech-savvy, but I'll try my best.",
        nextSceneId: 'spring-visit-xavier-unsure',
      },
      {
        text: "Maybe we should focus on making sure the existing systems work properly first?",
        affectionChanges: { xavier: -0.5 },
        nextSceneId: 'spring-visit-xavier-practical',
      },
    ],
  },
  
  'spring-visit-xavier-help': {
    id: 'spring-visit-xavier-help',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'xavier',
        text: "That's great! I appreciate your enthusiasm.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I've been thinking about using the city's color scheme for the app, but I'm not sure if that feels festive enough for a spring celebration.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What if we use spring colors like fresh greens and flower pinks? It would feel more seasonal while still being professional.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "That's perfect! You have a good eye for these things.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Working with you is really refreshing, Maven. You bring a different perspective that we need.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "You spend the next hour collaborating with Xavier on the app design. The time flies by as you bounce ideas off each other.",
      },
    ],
    nextSceneId: 'spring-character-selection-1',
  },
  
  'spring-visit-xavier-unsure': {
    id: 'spring-visit-xavier-unsure',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'xavier',
        text: "Don't worry about it! Sometimes a non-technical perspective is exactly what we need.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "What matters is how the app feels to use, not the technical details behind it.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "In that case, I think a simple layout with big buttons might work best for people who are in a hurry during the festival.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "That's actually a great point. I was getting caught up in all the features and might have made it too complicated.",
        mood: 'surprised',
      },
      {
        character: 'narrator',
        text: "Xavier takes your suggestions and simplifies the design. It's more accessible now, which was exactly what was needed.",
      },
    ],
    nextSceneId: 'spring-character-selection-1',
  },
  
  'spring-visit-xavier-practical': {
    id: 'spring-visit-xavier-practical',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'xavier',
        text: "Oh... I guess you're right. I was getting ahead of myself.",
        mood: 'sad',
      },
      {
        character: 'xavier',
        text: "I'm always trying to improve things, but sometimes I do get distracted by new projects.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I didn't mean to discourage you. Your enthusiasm is great, but I just want to make sure we're covered on the basics too.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "No, you made a fair point. Let's run some diagnostics on the city's waste management systems first, since they'll be crucial during the festival.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You help Xavier with the system checks. It's less exciting than designing a new app, but it uncovers a few potential issues that could have caused problems during the festival.",
      },
    ],
    nextSceneId: 'spring-character-selection-1',
  },

  // Navarre visit scene
  'spring-visit-navarre': {
    id: 'spring-visit-navarre',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: "You find Navarre at a popular cafe in the city center. He appears to be charming the staff and several patrons.",
      },
      {
        character: 'navarre',
        text: "Maven! Come join us! I was just getting to know some of Stonewich's finest citizens.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Networking already, I see.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Always! The Spring festival is our chance to make a good impression on the community. First impressions matter, as they say.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "In fact, I could use your help with something. The local business association wants our team to join their pre-festival mixer tonight. Will you come with me?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Sounds fun! I'd love to meet more local people.",
        affectionChanges: { navarre: 1 },
        nextSceneId: 'spring-visit-navarre-agree',
      },
      {
        text: "I'm not really comfortable at those kinds of events.",
        nextSceneId: 'spring-visit-navarre-hesitant',
      },
      {
        text: "Shouldn't we focus on work instead of socializing?",
        affectionChanges: { navarre: -0.5 },
        nextSceneId: 'spring-visit-navarre-refuse',
      },
    ],
  },
  
  'spring-visit-navarre-agree': {
    id: 'spring-visit-navarre-agree',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "That's the spirit! You're going to love these people once you get to know them.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Any tips for making a good impression?",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Just be yourself! But also, let me tell you about the key players you'll want to meet tonight...",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Navarre enthusiastically briefs you on the local business owners and their interests. His knowledge of the social landscape is impressive.",
      },
      {
        character: 'navarre',
        text: "You know, Maven, you've got a natural charm that people respond to. Don't underestimate that.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Later that night, you attend the mixer with Navarre. To your surprise, you find yourself easily conversing with the locals, and even make some valuable connections for the team.",
      },
    ],
    nextSceneId: 'spring-character-selection-2',
  },
  
  'spring-visit-navarre-hesitant': {
    id: 'spring-visit-navarre-hesitant',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "I understand. These events can be overwhelming if you're not used to them.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "It's just not really my strength. I get anxious in big crowds of strangers.",
        mood: 'embarrassed',
      },
      {
        character: 'navarre',
        text: "Everyone has different strengths. Tell you what - why don't you come for just an hour? I'll stay by your side and introduce you to just a few key people.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I guess that doesn't sound too bad...",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Perfect! And if you want to leave after an hour, no questions asked. Deal?",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "You agree to Navarre's compromise. That evening, he keeps his word, serving as a buffer between you and the crowd. To your surprise, you actually enjoy yourself and even stay longer than the promised hour.",
      },
    ],
    nextSceneId: 'spring-character-selection-2',
  },
  
  'spring-visit-navarre-refuse': {
    id: 'spring-visit-navarre-refuse',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "Oh, Maven... this IS work. Building relationships is a crucial part of city management.",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "I just think our time might be better spent on more concrete tasks.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "I respect your opinion, but think about it this way: when the waste management system breaks down, who are you going to call? The person you met and built rapport with, or a stranger?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I hadn't thought of it that way...",
        mood: 'surprised',
      },
      {
        character: 'navarre',
        text: "That's alright. We all have different approaches. I'll represent the team tonight, and I'll make sure to mention your dedication to the technical aspects of our work.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Navarre heads to the mixer without you. The next day, he mentions that several people were asking about 'the new team member' and seemed disappointed you weren't there.",
      },
    ],
    nextSceneId: 'spring-character-selection-2',
  },

  // Etta visit scene
  'spring-visit-etta': {
    id: 'spring-visit-etta',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'narrator',
        text: "You find Etta in the meeting room, reviewing spreadsheets and making notes with fierce concentration.",
      },
      {
        character: 'etta',
        text: "Maven. Did you need something?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I wanted to see how the Spring festival preparations are going from your end.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "I'm calculating the optimal resource allocation for maximum community engagement. The previous years' festivals were inefficient.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Actually, since you're here, I could use an opinion. Should we focus our resources on more cleaning supplies for community cleanup, or more seedlings for the public gardens?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Cleaning supplies - a clean city is the foundation of the festival.",
        affectionChanges: { etta: 1 },
        nextSceneId: 'spring-visit-etta-cleaning',
      },
      {
        text: "Why not balance both? We need clean spaces to plant new gardens.",
        nextSceneId: 'spring-visit-etta-balance',
      },
      {
        text: "Seedlings - focusing on new growth seems more in the spirit of spring.",
        affectionChanges: { etta: -0.5 },
        nextSceneId: 'spring-visit-etta-seedlings',
      },
    ],
  },
  
  'spring-visit-etta-cleaning': {
    id: 'spring-visit-etta-cleaning',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'etta',
        text: "Exactly. Aesthetics are meaningless without proper sanitation and organization.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Plus, once everything is clean, we can better plan where new plantings would have the most impact.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Hmm. A logical progression. I appreciate that you understand the importance of proper sequencing.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Etta makes adjustments to her spreadsheets, occasionally asking for your input on specific allocations.",
      },
      {
        character: 'etta',
        text: "Your assessment was sound, Maven. It's... refreshing to work with someone who values efficiency.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Coming from Etta, this seems like high praise indeed. You continue to work together for another hour, and find a certain satisfaction in the meticulous planning.",
      },
    ],
    nextSceneId: 'spring-character-selection-3',
  },
  
  'spring-visit-etta-balance': {
    id: 'spring-visit-etta-balance',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'etta',
        text: "Balance? That's a vague concept that doesn't help with specific resource allocation.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What I mean is that we should sequence the activities. Cleaning first, then planting. Both are equally important.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Hmm. That's not exactly balance, that's proper procedure.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "And we should ensure resources are appropriate for both phases.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "I suppose that's a reasonable approach, though I was hoping for a more decisive assessment.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You work with Etta to create a two-phase plan for the festival. Though she doesn't seem entirely satisfied with your 'balanced' approach, she does incorporate some of your suggestions.",
      },
    ],
    nextSceneId: 'spring-character-selection-3',
  },
  
  'spring-visit-etta-seedlings': {
    id: 'spring-visit-etta-seedlings',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'etta',
        text: "The spirit of spring? I'm not concerned with abstract concepts. I'm concerned with measurable outcomes.",
        mood: 'angry',
      },
      {
        character: 'maven',
        text: "But public perception matters too. People remember beautiful gardens more than clean streets.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "That's precisely the kind of short-sighted thinking that leads to inefficient city management.",
        mood: 'angry',
      },
      {
        character: 'etta',
        text: "What's the point of planting gardens in trash-strewn parks? Sequencing matters, Maven.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I see your point. I was thinking too much about the end result without considering the process.",
        mood: 'embarrassed',
      },
      {
        character: 'etta',
        text: "At least you can admit when you're wrong. That's... something.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "The conversation with Etta becomes a bit strained after that, but you do learn a great deal about resource allocation and city planning in the process.",
      },
    ],
    nextSceneId: 'spring-character-selection-3',
  },

  // Senara visit scene
  'spring-visit-senara': {
    id: 'spring-visit-senara',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'narrator',
        text: "You find Senara in the Cybaton library, surrounded by both physical books and holographic displays of historical data.",
      },
      {
        character: 'senara',
        text: "Maven. I didn't expect to see you here.",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "I was looking for you, actually. What are you researching?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The historical context of Stonewich's Spring festival. Did you know it dates back over three centuries?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "I'm trying to determine whether some of the original traditions should be reintroduced. There's a dilemma between honoring history and moving forward with new traditions. What's your perspective?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Historical traditions have value and should be preserved.",
        affectionChanges: { senara: 1 },
        nextSceneId: 'spring-visit-senara-traditional',
      },
      {
        text: "We should find a balance between honoring history and creating new traditions.",
        nextSceneId: 'spring-visit-senara-balance',
      },
      {
        text: "Society needs to evolve. We should focus on creating new traditions.",
        affectionChanges: { senara: -0.5 },
        nextSceneId: 'spring-visit-senara-modern',
      },
    ],
  },
  
  'spring-visit-senara-traditional': {
    id: 'spring-visit-senara-traditional',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'senara',
        text: "Interesting. Most people are quick to dismiss historical practices as outdated.",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "There's wisdom in traditions that have endured. They connect us to our past.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Indeed. One such tradition was the 'Spring Makers Fair' where citizens would showcase crafts made from materials gathered during winter.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "It encouraged resourcefulness and community skill-sharing. Concepts that remain valuable.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "That sounds amazing. Could we revive something like that?",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Perhaps. I appreciate your interest in preservation, Maven. Few take the time to look backward before moving forward.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "You spend the next hour discussing historical traditions with Senara. Her usually reserved demeanor softens as she shares her knowledge with someone who genuinely values it.",
      },
    ],
    nextSceneId: 'spring-character-selection-4',
  },
  
  'spring-visit-senara-balance': {
    id: 'spring-visit-senara-balance',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'senara',
        text: "A diplomatic answer. But what does balance look like in practice?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Perhaps we could reintroduce historical elements but present them in modern contexts?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Such as?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Like the spring cleaning traditions, but with modern technology to make it more efficient and engaging.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Hmm. That could work. History isn't meant to be a museum piece, but a living foundation for the present.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Senara shows you some of the historical records she's been studying. Together, you identify several traditions that could be modernized while preserving their core meaning.",
      },
    ],
    nextSceneId: 'spring-character-selection-4',
  },
  
  'spring-visit-senara-modern': {
    id: 'spring-visit-senara-modern',
    background: 'cybaton-library',
    dialogue: [
      {
        character: 'senara',
        text: "A common perspective. But evolution without reference to the past often leads to repeating its mistakes.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "But holding onto outdated traditions can hold society back.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "And who decides what is 'outdated'? Contemporary biases often misinterpret historical wisdom.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I just think we should focus on creating traditions that reflect our current values.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "And what are those values, Maven? And how do you know they're better than what came before?",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Your conversation with Senara becomes a philosophical debate. Though you disagree on some points, you gain a deeper appreciation for her thoughtful approach to change.",
      },
    ],
    nextSceneId: 'spring-character-selection-4',
  },
};

export default characterVisits;
