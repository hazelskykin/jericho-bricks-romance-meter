
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
      }
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
        text: "Aren't we friends? I like to listen I'm a good listener if you want to give me a try.",
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
 
  // Navarre visit scene - Fixed to use the correct background
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
  
  // Etta visits - using the workstation for one-on-one time
  'spring-visit-etta': {
    id: 'spring-visit-etta',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'narrator',
        text: 'Etta is meticulously running complex simulations on her workstation.',
      },
      {
        character: 'etta',
        text: "Maven. Did you need something? I'm kind of busy here.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I wanted to see how the Spring festival preparations are going from your end.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Supplies, vendors, schedules - you name it. There's a million practical and logistical considerations to be finalized.",
        mood: 'neutral',
      },
      {
        character: 'maven',       
        text: "I'd be happy to help. What are you working on?",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "You came by to shadow me, right? I could use an opinion. Should we focus resources on pre-cleaning the venue to be more welcoming or providing more supplies for on-the-day activities for higher engagement?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Cleaning - a clean city is the foundation of the festival.",
        affectionChanges: { etta: -0.5 },
        nextSceneId: 'spring-visit-etta-cleaning',
      },
      {
        text: "Why not balance both? We need clean spaces for people to use for activities.",
        affectionChanges: { etta: 1 },
        nextSceneId: 'spring-visit-etta-balance',
      },
      {
        text: "Activity resources - people will remember what they did together at the event, not how clean it was beforehand.",
        nextSceneId: 'spring-visit-etta-seedlings',
      },
    ],
  },
  
  'spring-visit-etta-cleaning': {
    id: 'spring-visit-etta-cleaning',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'etta',
        text: "Exactly. Aesthetics are meaningless without proper sanitation and organization, but paid staff will need to be deployed.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Oh, right. Volunteers aren't likely to sign-up to do what most consider the responsibility of the sanitation department.",
        mood: 'embarrassed',
      },
      {
        character: 'etta',
        text: "Right. I thought you might have a suggestion, but it's the same dilemma - cleaning doesn't directly contribute to higher engagement, only higher costs.",
        mood: 'angry',
      },
      {
        character: 'etta',
        text: "Let's move on. I was expecting too much that you might have a solution for such an issue.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Etta makes adjustments to her simulations, occasionally asking for your input on specific allocations.",
      },
      {
        character: 'etta',
        text: "Your reasoning was sound, Maven, but conventional. It's important to know where to invest wisely.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Coming from Etta, this seems like high praise indeed. You continue to work together for another hour, and find a certain satisfaction in the meticulous planning although it lacks something in creative innovation.",
      },
    ],
    nextSceneId: 'spring-character-selection-3',
  },
  
  'spring-visit-etta-balance': {
    id: 'spring-visit-etta-balance',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'etta',
        text: "Balance? That's a vague concept that doesn't help with specific resource allocation.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "What I mean is that we should structure activities around both to meet your goal. Both are equally important.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Hmm. That's not exactly balance. The goal is to drive higher engagement.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Then let's make sure resources are appropriate for both phases, and we structure both as activities designed for participation.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Structured activities to clean? Will anyone want to do that? What's your idea exactly?",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "Let's start with a volunteer orientation the day before where volunteers can meet each other, preview the venues, and prep for the festival.",
        mood: 'surprised',
      },
      {
        character: 'narrator',
        text: "You work with Etta to create a two-phase plan for the festival with new activities designed for cleaning and higher volunteer engagement.",
      },
      {
        character: 'etta',
        text: "This is a novel approach and may save some budget on cleaners, but there are risks here too if volunteers don't show up. Your idea is innovative.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "You work with Etta to create a two-phase plan for the festival with new activities designed for cleaning and higher volunteer engagement.",
      },
      {
        character: 'etta',
        text: "This is a novel approach and may save some budget on cleaners, but there are risks here too if volunteers don't show up. Your idea is innovative.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Despite her remarks about risks, she does incorporate some of your suggestions. You feel a quiet pride in providing a practical approach to achieveing the outcomes desired."
      },
    ],
    nextSceneId: 'spring-character-selection-3',
  },
  
  'spring-visit-etta-seedlings': {
    id: 'spring-visit-etta-seedlings',
    background: 'stonewich-workstation',
    dialogue: [
      {
        character: 'etta',
        text: "I'm concerned with measurable outcomes. People's memories are hazy outcomes at best.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "But public perception matters too. People remember the fun they had doing something together more than clean streets.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "The true return on such a plan would be the rate of return visitors to the festival next year.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Can people really make good memories if the venues don't look inviting enough to go? Will the funding for next year get approved if the impact isn't visible from this year?",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I see your point. I was thinking too much about it as an experience and not enough as objective outcomes.",
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
    nextSceneId: 'spring-character-selection-3', // Corrected this ID
  },

  // Senara visit scene
  'spring-visit-senara': {
    id: 'spring-visit-senara',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'narrator',
        text: "You find Senara in the relaxing with a tablet in hand in the Stonewich office and a cup of tea in easy reach.",
      },
      {
        character: 'senara',
        text: "Maven. I didn't expect to see you here. I thought you were shadowing someone today?",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "I was looking for you, actually. I thought I'd shadow you today. What are you researching?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "The historical context of Stonewich's Spring festival. Did you know it dates back over three centuries?",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "I'm trying to determine whether it's the history of the people or the place that have a greater significance to evolving traditions. There's a dilemma between maintaining traditions as historical and moving forward as societal values shift. What's your perspective?",
        mood: 'neutral',
      }
    ],
    choices: [
      {
        text: "Traditions have value and should be preserved. Changing with societal values only chases fads.",
        affectionChanges: { senara: 1 },
        nextSceneId: 'spring-visit-senara-traditional',
      },
      {
        text: "We should find a balance between honoring history and recognizing what is defining for people today.",
        nextSceneId: 'spring-visit-senara-balance',
      },
      {
        text: "Society evolves. Change is inevitable. We should focus on managing the change proactively, not resisting against the ebb of time.",
        affectionChanges: { senara: -0.5 },
        nextSceneId: 'spring-visit-senara-modern',
      },
    ],
  },
    
  'spring-visit-senara-traditional': {
    id: 'spring-visit-senara-traditional',
    background: 'stonewich-office',
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
        text: "That sounds amazing. Perhaps what began as the spring festival transitioned to the autumn with the focus on craftmanship?",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "It would seem so. Over time the city's commerce became more centered on the port trade and shifted the daily cadences of its citizens.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Perhaps the local art fair component of the spring festival is the living remnant of what was once more robust?",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Perhaps. I appreciate your interest in preservation, Maven. Few take the time to look backward before moving forward.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "You spend the next hour discussing historical traditions with Senara. His usually reserved demeanor softens as he shares his knowledge with someone who genuinely values it.",
      },
    ],
    nextSceneId: 'spring-character-selection-4',
  },
  
  'spring-visit-senara-balance': {
    id: 'spring-visit-senara-balance',
    background: 'stonewich-office',
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
        text: "Senara shows you some of the historical records he's been studying. Together, you identify several traditions that could be modernized while preserving their core meaning.",
      },
    ],
    nextSceneId: 'spring-character-selection-4',
  },
  
  'spring-visit-senara-modern': {
    id: 'spring-visit-senara-modern',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'senara',
        text: "A common perspective. But evolution without reference to the past has a dehumanizing effect on society where technology substitutes for community.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "But holding onto outdated traditions can create negative backlash or disengagement.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "And who decides what is 'outdated'? Contemporary biases often misinterpret historical wisdom.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I just think we should focus on being proactive in managing adaptations to traditions that reflect our current values.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "And what are those values, Maven? How do they shape our identity if not within the context of what we've been historically?",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Your conversation with Senara becomes a philosophical debate. Though you disagree on some points, you gain a deeper appreciation for his thoughtful approach to change.",
      },
    ],
    nextSceneId: 'spring-character-selection-4', // Corrected this ID
  }
};

export default characterVisitScenes;
