
import { Scene } from '../../../types/game';

const summerConclusionScenes: Record<string, Scene> = {
  'summer-conclusion-meeting': {
    id: 'summer-conclusion-meeting',
    background: 'cybaton-meeting-room',
    dialogue: [
      {
        character: 'etta',
        text: "Dr. Voss, our team's work during Summer Songs & Sips festival resulted in increased city revenues by 31% compared to last year.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "We also managed to improve community engagement significantly through the new interactive exhibits.",
        mood: 'confident',
      },
      {
        character: 'narrator',
        text: "Dr. Voss reviews your detailed report with a polite expression.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Your team continues to exceed expectations in Stonewich, individual talents.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: However, you still have not found your stride as a team, and the situation in Stonewich shows signs of destabilization.",
      },
      {
        character: 'xavier',
        text: "What do you mean? The systems and diagnostics I've been monitoring show efficient and stable.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Perhaps my words at the end of your last report were too vague. Let me be more explicit.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: The results you speak of are tangible and undisputed, but they do not provide an accurate portrayal of the city's current situation.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: New technology meant to promote self-service and convenience have made it difficult for people to interact together. The marital and family trends are grim.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: You speak of more interest in the history and culture of Stonewich, but that appears to be a novelty and not something that provides meaning or tangible results.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: What differentiates Stonewich? How does it attract business, visitors, residents that could live or move freely?",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: And our competitors are taking notice of these deficiencies. Cybaton is facing more pressure to review its contracts and threats in many siloed services.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss: Your autumn assignment will begin soon. I expect continued excellence from each you, but I also hope to see something more.",
      },
      {
        character: 'narrator',
        text: "Dr. Voss makes eye contact with you for a long, uncomfortable moment before dismissing the team.",
      },
    ],
    nextSceneId: 'summer-conclusion-debrief',
  }, 
    
  'summer-conclusion-debrief': {
    id: 'summer-conclusion-debrief',
    background: 'cybaton-shuttle',
    dialogue: [
      {
        character: 'narrator',
        text: "The air was thick with tension in the shuttle. Dr. Voss's words seemed to have settled heavily and weighted the team down.",
      },
      {
        character: 'maven',
        text: "Let's talk about what Dr. Voss said. It's clearly bothering all of us.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Fine. I'm angry. Where did marriage and family statistics come from? We are performing beyond expectations, but she's measuring us to some standard I've never heard.",
        mood: 'angry',
      },
      {
        character: 'xavier',
        text: "I can't believe it. I thought the self-service systems were helping people. I had no idea they actually caused people to be more self-isolating and lonely.",
        mood: 'sad',
      },
      {
        character: 'navarre',
        text: "Well, I know I've seen the competitive activity firsthand, but I didn't realize it was on such a scale, not just a petty spat with Morgan.",
        mood: 'sad',
      },
      {
        character: 'maven',
        text: "I think I understand what Dr. Voss was trying to get at.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "Well, spit it out! Does she have some kind of master plan that none of us have seen?!",
        mood: 'angry',
      },
      {
        character: 'xavier',
        text: "I haven't seen any grand architecture or plan like that. If I thought the micro systems I had deployed would destabilize the central control systems, I would have taken precautions.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Xavier, I believe Etta's question was rhetorical out of exasperation. We've been privy to all plans and relevant information for Stonewich.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "Senara is well informed, as expected. There's a different issue here. Did you have something to share, Maven?",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You take a moment to consider before responding. Dr. Voss seemed to take pains to show how shortsighted the team had been in their analysis and metrics.",
      },
      {
        character: 'maven',
        text: "Each of us heard what Dr. Voss said as a criticism of a more narrow perspective, but I think the root of that is we aren't striving toward a vision.",
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: "That's so vague. It sounds like more of the empty motivational speak.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Maven, if you see a pattern that resonates with what Dr. Voss said that the rest of us don't, then you should take a more direct role in autumn.",
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: "That's a great idea.",
        mood: 'neutral',
      },
      {
        character: 'xavier',
        text: "We'll be counting on you, Maven.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: "You're not sure exactly what it is you can do, but you hope you don't let your team down.",
      },
    ],
    nextSceneId: 'season-transition-autumn' // This will lead to the autumn season transition
  }
};

export default summerConclusionScenes;
