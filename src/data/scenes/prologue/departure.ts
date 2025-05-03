
import { Scene } from '../../../types/game';

const departureScenes: Record<string, Scene> = {
  'departure-lobby': {
    id: 'departure-lobby',
    background: 'cybaton-lobby',
    dialogue: [
      {
        character: 'narrator',
        text: 'The next morning, your team gathers in the grand lobby of Cybaton headquarters, luggage in tow and ready for departure.',
      },
      {
        character: 'narrator',
        text: 'Dr. Elara Voss stands by the entrance, clipboard in hand, checking off final preparations.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "Team Stonewich, I see you\'re all here on time. Excellent start."',
      },
      {
        character: 'etta',
        text: 'I've triple-checked our itinerary. The transit should take approximately three hours, accounting for the morning traffic patterns.',
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss nods approvingly, making a note on her clipboard.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "Remember, you represent Cybaton now. Stonewich has some of our oldest infrastructure integrations, so expect both challenges and opportunities."',
      },
      {
        character: 'xavier',
        text: 'We won\'t let you down, Dr. Voss. The team\'s prepared for whatever comes our way.',
        mood: 'happy',
      },
      {
        character: 'senara',
        text: 'The historical data suggests Stonewich has an excellent balance of traditional values and technological adoption.',
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: 'And I hear their seasonal festivals are legendary! Perfect opportunities to engage with the community.',
        mood: 'happy',
      },
      {
        character: 'maven',
        text: "I'm a little nervous, but excited to learn from everyone and contribute however I can.",
        mood: 'embarrassed',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "An interesting mix of personalities. That\'s why you were selected. Your Cybaton transport is waiting outside."',
      },
      {
        character: 'narrator',
        text: 'Your team picks up their luggage and follows Dr. Voss through the automatic doors to the waiting vehicle.',
      },
      {
        character: 'narrator',
        text: 'Dr. Voss: "I\'ll be monitoring your progress remotely. Monthly reports are expected. Good luck."',
      },
      {
        character: 'narrator',
        text: 'With a formal nod, she steps back as your team boards the sleek transport pod that will take you to Stonewich.',
      },
    ],
    nextSceneId: 'departure-journey',
  },
  
  'departure-journey': {
    id: 'departure-journey',
    background: 'cybaton-office',
    dialogue: [
      {
        character: 'narrator',
        text: 'The transport pod glides smoothly through the city and onto the main transit route to Stonewich.',
      },
      {
        character: 'narrator',
        text: 'Through the panoramic windows, you watch as gleaming skyscrapers give way to rolling countryside.',
      },
      {
        character: 'xavier',
        text: 'So, what made everyone join the Cybaton administrator program?',
        mood: 'neutral',
      },
      {
        character: 'etta',
        text: 'The challenge, of course. Cybaton manages 68% of urban infrastructure worldwide. It's where the real impact happens.',
        mood: 'neutral',
      },
      {
        character: 'navarre',
        text: 'The people! Being at the intersection of technology and community is where the most interesting conversations happen.',
        mood: 'happy',
      },
      {
        character: 'senara',
        text: 'The data. Cities generate fascinating patterns that few get to analyze at this level of access.',
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I... I guess I want to make a difference? Sorry, that sounds so generic.",
        mood: 'embarrassed',
      },
      {
        character: 'xavier',
        text: "Not at all. That's why we're all here in different ways.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: 'The conversation flows easily as the kilometers pass. Before you know it, the transport pod is announcing your arrival.',
      },
    ],
    nextSceneId: 'departure-morning',
  },

  'departure-morning': {
    id: 'departure-morning',
    background: 'stonewich-cityscape',
    dialogue: [
      {
        character: 'senara',
        text: 'Arriving in a new city is always fascinating. So much potential waiting to be unlocked.',
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "It's a little overwhelming, but I'm ready to learn.",
        mood: 'neutral',
      },
      {
        character: 'narrator',
        text: 'As your team settles into Stonewich, you begin your new role as Cybaton administrators...',
      },
      {
        character: 'narrator',
        text: 'The city seems to welcome you, but there are challenges ahead that will test your adaptability.',
      },
    ],
    nextSceneId: 'season-transition-spring', // Transition to spring season after departure
  }
};

export default departureScenes;
