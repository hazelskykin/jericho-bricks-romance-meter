
import { Scene } from '../../../../types/game';

const coffeeShopScenes: Record<string, Scene> = {
  'coffee-shop': {
    id: 'coffee-shop',
    background: 'city-cafe',
    dialogue: [
      {
        character: 'narrator',
        text: 'You all head to a small cafe near Cybaton headquarters. The atmosphere is relaxed, a welcome contrast to the corporate environment.',
      },
      {
        character: 'navarre',
        text: "Great suggestion, Maven! Nothing like coffee and conversation to build team chemistry.",
        mood: 'happy',
      },
      {
        character: 'xavier',
        text: "This place has the best pastries too. Anyone want to split a cinnamon roll?",
        mood: 'happy',
      },
      {
        character: 'etta',
        text: "I suppose some informal team building is to be expected. I'll have an espresso.",
        mood: 'neutral',
      },
      {
        character: 'senara',
        text: "Tea for me.",
        mood: 'neutral',
      },
      {
        character: 'maven',
        text: "I must admit that I am relieved to get an assignment and know who my team will be.",
        mood: 'happy',
      },
      {
        character: 'navarre',
        text: "Let's grab this center table.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "Your team no sooner sits down, than several patrons and the barista walk over to personally greet Navarre.",
      },
      {
        character: 'navarre',
        text: "It's good to see all of you too. Today I am here with my new Cybaton team. We'll be heading for Stonewich tomorrow.",
        mood: 'happy',
      },
      {
        character: 'narrator',
        text: "The people congratulate the team and quietly dissipate, leaving you and the others free to get to know one another.",
      },
      {
        character: 'narrator',
        text: 'The conversation flows easily, and you learn more about your teammates. Xavier is passionate about tech ethics, Navarre has connections everywhere, Etta is intensely ambitious, and Senara is brilliantly analytical but private.',
      },
      {
        character: 'narrator',
        text: "By the end of the evening, you feel more connected to the team and ready for tomorrow's departure. You feel Navarre's smile has gotten friendlier when you look his way.",
      }
    ],
    nextSceneId: 'departure-lobby', // Updated to go to the lobby scene first
  }
};

export default coffeeShopScenes;
