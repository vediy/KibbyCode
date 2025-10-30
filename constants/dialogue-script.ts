import { ImageSourcePropType } from "react-native";

export interface DialogueLine {
  name: string;
  text: string;
  sprite?: ImageSourcePropType;
  requiresInput?: boolean; // 👈 new field to tell DialogueBox to ask for input
}

export const dialogues: Record<number, DialogueLine[]> = {
  1: [
    { name: "Kibby", text: "Hey, my name is Kibby, and I'm here to help you out!", sprite: require("@/assets/images/kibby.png"), },
    { name: "Kibby", text: "You see, you're here to turn this empty plot of land behind me into a city!", sprite: require("@/assets/images/kibby.png"), },
    { name: "Kibby", text: "And to do this, we're going to use our awesome computer programming skills to organize everything behind the scenes.", sprite: require("@/assets/images/kibby.png"), },
    { name: "Kibby", text: "Before we start, though, we need a name for this place... Any ideas?", sprite: require("@/assets/images/kibby.png"), requiresInput: true}
  ],
  2: [
    { name: "Kibby", text: "Nice work! {cityName} is already coming together!", sprite: require("@/assets/images/kibby.png"),},
    { name: "Kibby", text: "We’ll need more power and water soon. Keep solving problems... :P", sprite: require("@/assets/images/kibby.png"), },
  ],
  3: [
    { name: "Kibby", text: "Holy cow, this city is growin' fast! Keep up the good work!", sprite: require("@/assets/images/kibby.png"), },
    { name: "Kibby", text: "Let’s add some infrastructure to keep people happy :0", sprite: require("@/assets/images/kibby.png"), },
  ],
  4: [
    { name: "Kibby", text: "Incredible! The roads are expanding, and new citizens are arriving!", sprite: require("@/assets/images/kibby.png"), },
  ],
  5: [
    { name: "Kibby", text: "The power plant is now online, and {cityName} is thriving! Great job!! :D", sprite: require("@/assets/images/kibby.png"), },
  ],
};