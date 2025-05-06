
import { Scene } from '@/types/game';

const relationshipScenes: Record<string, Scene> = {
  // Confession scenes for each character
  'winter-confession': {
    id: 'winter-confession',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "While the team waits to hear what their future assignments may be from Cybaton, you have time to ponder more personal matters.",
      },
      {
        character: 'maven',
        text: "I can't help but think about what happens next... and about us. Maybe we should talk.",
        mood: 'thoughtful',
      ,}
    ],
    nextSceneId: 'winter-character-confession',
  },

  // Xavier's confession
  'winter-xavier-confession': {
    id: 'winter-xavier-confession',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'xavier',
        text: "Maven, before we get our assignments for next year, there's something I need to tell you.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "This year in Stonewich has changed me in ways I never expected. I came here focused on technology and systems, but I found something more important.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "I've been asked to lead a team of Solvitors at headquarters to explore my innovations. To help connect people through technology, just like we've connected.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "But none of it means anything without you, Maven. I've fallen in love with you, and whatever happens with the review, I want us to face it together.",
        mood: 'happy',
      }
    ],
    choices: [
      {
        text: "I love you too, Xavier. You've shown me what it means to care deeply about others.",
        affectionChanges: { xavier: 2 },
        nextSceneId: 'winter-xavier-happy'
      },
      {
        text: "I care about you deeply, Xavier, but I'm not ready for anything more right now.",
        affectionChanges: { xavier: -2 },
        nextSceneId: 'winter-xavier-noncommit'
      }
    ]
  },
  'winter-xavier-happy': {
    id: 'winter-xavier-happy',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'xavier',
        text: "You... you love me too? I was so nervous to tell you.",
        mood: 'surprised',
      },
      {
        character: 'xavier',
        text: "The team at headquarters - they're like-minded people, but finding connections with them has been so much easier because of what I learned with you.",
        mood: 'laughing',
      },
      {
        character: 'xavier',
        text: "My dream is to help people connect through technology, but you've shown me that the human element is just as important.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Whatever happens going forward, knowing how you feel gives me confidence that we'll face it together.",
        mood: 'laughing',
      }
    ],
    nextSceneId: 'team-future-meeting',
  },
  'winter-xavier-noncommit': {
    id: 'winter-xavier-noncommit',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'xavier',
        text: "That's understandable, Maven. I'm hopeful for our future, whatever form it takes.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "The team I'm leading at headquarters - they've already made me feel welcome, but it's different from what we have here.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "Let's on what we have here and now. Let me know when you feel ready, and then we can talk more about us.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'team-future-meeting',
  },

  // Navarre's confession
  'winter-navarre-confession': {
    id: 'winter-navarre-confession',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "Maven, I've been thinking a lot about what may come next for me, especially after that situation with Morgan and the job offer in Autumn.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "You know I turned it down then, but I would again. And not just because of the team or Stonewich.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Do you remember the special broadcast for the Winter Gala where Morgan and I interviewed couples about what makes love last?",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Featuring the two of us together was very special to me. Declaring before the world so publicly that you have my heart was humbling and liberating.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "I've found someone who makes me want to stay. Who makes all the networking and connections in the world insignificant compared to one real, meaningful connection.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "I love you, Maven. And I want everyone to know it.",
        mood: 'happy',
      }
    ],
    choices: [
      {
        text: "I love you too, Navarre. You've shown me there's more to life than just following a predetermined path.",
        affectionChanges: { navarre: 2 },
        nextSceneId: 'winter-navarre-happy'
      },
      {
        text: "I care about you deeply, Navarre, but I'm not sure I'm ready yet for anything more.",
        affectionChanges: { navarre: -2 },
        nextSceneId: 'winter-navarre-noncommit'
      }
    ]
  },
  'winter-navarre-happy': {
    id: 'winter-navarre-happy',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "Just like that? No questions about my sincerity or my rumored love life that surround my reputation like a dustcloud?",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "Why would you ask that? Should I be worried?",
        mood: 'surprised',
      },
      {
        character: 'navarre',
        text: "No, I'm happy you showed me such deep and immediate trust. That special broadcast we did together made it clear to everyone. No more speculation, no more rumors.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "This is the happiest I've been, Maven. And I promise, whatever happens going forward, we'll face it together.",
        mood: 'laughing',
      }
    ],
    nextSceneId: 'team-future-meeting',
  },
  'winter-navarre-noncommit': {
    id: 'winter-navarre-noncommit',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'navarre',
        text: "I understand. Taking things slowly is probably wise. But know that my feelings for you are genuine.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "You are worth waiting for, however long it may be. I'm happy to be with you as we are.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "I've stated clearly my intentions toward you to the world. When you're ready, we can talk more about us.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'team-future-meeting',
  },

  // Etta's confession
  'winter-etta-confession': {
    id: 'winter-etta-confession',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'etta',
        text: "Maven, could I speak with you privately? It's about something important. Let's go out.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "I'm not good at this. Expressing... feelings. It's not something I've had much practice with.",
        mood: 'sad',
      },
      {
        character: 'etta',
        text: "My father and I made great progress on our relationship during the Gala, and he views our relationship favorably.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "The arranged marriage has been called off, and I have found a balance in my life that I did not know could be possible.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "I've learned so much from you this year. About balance. About seeing value beyond just achievement.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "What I'm trying to say is... I love you, Maven. And that terrifies me because it's not something I can control or optimize or perfect.",
        mood: 'sad',
      }
    ],
    choices: [
      {
        text: "I love you too, Etta. You don't have to be perfect with me. Just be yourself.",
        affectionChanges: { etta: 2 },
        nextSceneId: 'winter-etta-happy'
      },
      {
        text: "I care about you deeply, Etta, but is the timing right for us now? You're jumping out of one relationship into another.",
        affectionChanges: { etta: -2 },
        nextSceneId: 'winter-etta-noncommit'
      }
    ]
  },
  'winter-etta-happy': {
    id: 'winter-etta-happy',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'etta',
        text: "Are you sure? Despite all my flaws and obsessions and family baggage?",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "Of course I am sure! No one means more to me.",
        mood: "laughing",
      }
      {
        character: 'etta',
        text: "My father was able to see what I see in you. How you've helped me become stronger in ways I didn't know I lacked it before.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "I don't know what I did to deserve you, Maven. But I promise I'll try to be worthy of your love.",
        mood: 'laughing',
      },
      {
        character: 'etta',
        text: "After resolving things with my father and getting through the first annual review, nothing else intimidates me now. Whatever comes next, we'll face it together.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'team-future-meeting',
  },
  'winter-etta-noncommit': {
    id: 'winter-etta-noncommit',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'etta',
        text: "That's... a logical approach. Taking things step by step.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "I'm grateful to you for helping me learn how to stand more confidently on my own.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "I'm free now to choose my path and who I want to spend my life with. If you think we need more time, I can be patient.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "For now, we can focus on what's in front of us. We can revisit this conversation when you feel the time is right.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'team-future-meeting',
  },

  // Senara's confession
  'winter-senara-confession': {
    id: 'winter-senara-confession',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'senara',
        text: "Maven, please sit here next to me. I'd like to share with you something new I've been researching. Something that has not come up in my analytical work before.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I told you before about the floodgate opening and the outpouring of emotions I've been experiencing. I've been studying my own emotional responses. Particularly those I experience in your presence.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "Really? You make it sound like you've constructed a scientific study of stimulus and response.",
        mood: 'surprised',
      },
      {
        character: 'senara',
        text: "Yes, of course. That's the natural step to take when faced with an uncertain environment and undocumented phenomena. I'm glad you thought of it too.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "Then I'm curious to hear your findings as you have no doubt been thorough.",
        mood: 'laughing',
      }
      {
        character: 'senara',
        text: "I must preface my findings by saying this isn't a subject I have expertise in. But I know what I feel is real and significant.",
        mood: 'happy',
      }
      {
        character: 'senara',
        text: "My conclusion, after thorough analysis, is that I've developed passionate feelings for you. A near certainty of love.",
        mood: "happy"     
      }
    ],
    choices: [
      {
        text: "Perhaps we should test that conclusion with additional stimuli?",
        affectionChanges: { senara: 2 },
        nextSceneId: 'winter-senara-happy'
      },
      {
        text: "I reciprocate your feelings, Senara, but I'm not ready to embrace the natural conclusion such feelings generally manifest.",
        affectionChanges: { senara: -2 },
        nextSceneId: 'winter-senara-noncommit'
      }
    ]
  },
  'winter-senara-happy': {
    id: 'winter-senara-happy',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'senara',
        text: "What are you suggesting?",
        mood: 'surprised',
      },
      {
        character: 'maven',
        text: "First, verbal affirmation stimulus. Senara, I love you too.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Yes, this feeling is... overwhelming, in the best possible way.",
        mood: 'laughing',
      },
      {
        character: 'maven',
        text: "That response seems to support validation of your conclusion. How about one more test?",
        mood: 'happy',
      }
      {
        character: 'maven',
        text: "Let's test a physical stiumlus...",
        mood: 'embarrassed',
      }
      {
        character: 'narrator',
        text: "You lean forward and give the lightest, gentlest kiss to Senara on his cheek.",
        mood: 'embarrassed',
      }
      {
        character: 'senara',
        text: "...",
        mood: 'embarrassed',
      }
      {
        character: 'maven',
        text: "I have hoped for this for a long time. I love you, Senara, passionately and fully with all my heart with a certainty that's beyond measure.",
        mood: 'happy',
      }
      {
        character: 'senara',
        text: "Forgive me, but I must borrow another's words as my own are deficit here, yet another experience new to me,",
        mood: 'laughing',
      }
      {
        character: 'senara',
        text: "..it is an ever-fixèd mark, That looks on tempests and is never shaken...if this be error and upon me proved, I never writ, nor no man ever loved.",
        mood: "happy",
      }
    ],
    nextSceneId: 'team-future-meeting',
  },
  'winter-senara-noncommit': {
    id: 'winter-senara-noncommit',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'senara',
        text: "A measured approach. Yes, that makes sense. Emotions are complex and deserve careful consideration.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "I have taken my findings one step farther. I developed and trained an algorithm that helps others navigate such complex emotions.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "I have released it to the Cybaton Oracle as Persephone, an AI diviner that relates guidance for seasons of emotions, the bright and the dark.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "You found a way to share that you're comfortable with? That sounds like it'll be helpful to so many.",
        mood: 'happy',
      }
      {
        character: 'senara',
        text: "Yes, I'm grateful to you. Your perspective has changed my own so much.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "If our current state is the capacity you are comfortable in being with me, I am content.",
        mood: 'happy',
      }
    ],
    nextSceneId: 'team-future-meeting',
  },
};

export default relationshipScenes;
