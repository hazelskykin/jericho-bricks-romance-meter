
import { Scene } from '../../../types/game';

const winterConclusionScenes: Record<string, Scene> = {
  'winter-festival-completion': {
    id: 'winter-festival-completion',
    background: 'winter-transition',
    dialogue: [
      {
        character: 'narrator',
        text: "The Winter Games & Gala comes to a magical conclusion. As the final events wrap up, there's a sense of accomplishment throughout the team.",
      },
      {
        character: 'xavier',
        text: "All systems functioned at optimal capacity throughout the entire festival. It's a new record!",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "And the social media engagement was off the charts. People loved this year's events.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "The organizational structure we implemented was highly efficient. Dr. Voss should be pleased with the results.",
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "We've come so far since we first arrived in Stonewich. It's hard to believe our year is almost over.",
        mood: 'thoughtful',
      },
      {
        character: 'senara',
        text: "We should prepare our final report for Dr. Voss. This could be our last seasonal assessment.",
        mood: 'sad',
      }
    ],
    nextSceneId: 'winter-review-preparation'
  },

  // Annual Review Preparation
  'winter-review-preparation': {
    id: 'winter-review-preparation',
    background: 'stonewich-office',
    dialogue: [
      {
        character: 'maven',
        text: "The annual review is tomorrow. It's hard to believe our year in Stonewich is coming to an end.",
        mood: 'thoughtful',
      },
      {
        character: 'xavier',
        text: "We've accomplished so much together. The systems we've implemented have significantly improved city operations.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Year-end operations are well under way as well as the festival plans.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "We've built real relationships here. They are the envy of our competitors and other communities alike.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "The connective web between people and technology has strengthened considerably in our year here. While most change is subtle, people have adapted readily vastly accelerating the impact.",
        mood: 'neutral',
      }
    ],
    nextSceneId: 'winter-annual-review',
  },

  // Annual Review Scene
  'winter-annual-review': {
    id: 'winter-annual-review',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'narrator',
        text: "Dr. Voss: Good morning, team. It's time for your annual review and future assignments.",
      },
      {
        character: 'narrator',
        text: "The results now speak for themselves. Other cities are clamoring for the innovations in tech, process, and engagement that you spearheaded this year.",
      },
      {
        character: 'narrator',
        text: "Competitive bids have started to decrease and rapidly replaced by collaborative partnership offers.",
      },
      {
        character: 'narrator',
        text: "These results speak well of you both as individual talents and even more so as a collective team. Your place with Cybaton is assured.",
      },
      {
        character: 'narrator',
        text: "Frankly, the results have been... surprising. The team's performance has exceeded our projections by a significant margin.",
      }
    ],
    nextSceneId: 'winter-future-assignments',
  },

  // Future Assignments Scene
  'winter-future-assignments': {
    id: 'winter-future-assignments',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'narrator',
        text: "Now, for your future assignments. Cybaton has several options for your team.",
      },
      {
        character: 'narrator',
        text: "Option one: You remain together as a team and continue your work in Stonewich. The city has requested to extend your contract.",
      },
      {
        character: 'narrator',
        text: "Option two: The team is disbanded, and each of you is assigned to different projects where your individual skills are needed.",
      },
      {
        character: 'narrator',
        text: "Option three: You remain together as a team but are reassigned to a new city that could benefit from your collaborative approach.",
      },
      {
        character: 'narrator',
        text: "The decision will be based on company needs, but I'd like to hear your preferences.",
      }
    ],
    choices: [
      {
        text: "I'd like to stay in Stonewich. We've built something special here.",
        affectionChanges: { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 },
        nextSceneId: 'winter-team-responses'
      },
      {
        text: "I believe our team works well together. We should stay together, wherever we're needed.",
        affectionChanges: { xavier: 0.5, navarre: 0.5, etta: 0.5, senara: 0.5 },
        nextSceneId: 'winter-team-responses'
      },
      {
        text: "I trust Cybaton to place us where we can be most effective.",
        nextSceneId: 'winter-team-responses'
      }
    ]
  },

  'winter-team-responses': {
    id: 'winter-team-responses',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'xavier',
        text: "I believe we've only scratched the surface of what we can accomplish in Stonewich. I'd prefer to stay and continue our work here.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "The connections we've built in Stonewich are valuable. But ultimately, I want us to stay together as a team, wherever that may be.",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "Keeping the team together makes the most sense. We've developed effective collaborative methods.",
        mood: 'happy',
      },
      {
        character: 'senara',
        text: "Our team's unique dynamics would be beneficial in any setting, but there's value in the continuity of remaining in Stonewich.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Thank you for your input. I'll take your preferences into consideration. The final decision will be announced shortly.",
      }
    ],
    nextSceneId: 'winter-confession',
  },
    ]
  }
};

export default winterConclusionScenes;
