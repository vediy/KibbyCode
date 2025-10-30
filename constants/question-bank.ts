export interface Question {
  question: string;
  options: string[];
  correct: number; // index of the correct option
}

// A full question bank organized by level/difficulty
export const questionBank: Record<number, Question[]> = {
  1: [
    {
      question: "We need to calculate how many steel beams we have to build our first building!\n\nx is the amount of beams there are, and 3 new beams arrived today. If x = 5, then what is the value of x + 3?",
      options: ["7", "5", "2", "8"],
      correct: 3,
    }
  ],
  2: [
    {
      question: "We're coding machines to do our building for us, but we don't know how to work it! We want to make the machine place a bunch of bricks over and over again, the same way each time.\n\nWhat should I use to do this?",
      options: ["A repeater", "A loop", "A big block of code", "Use your own hands!"],
      correct: 1,
    },
  ],
  3: [
    {
      question: "We're trying to make a cool new website for our city! What coding language is probably going to be the most helpful for us to know if we want to make our website look pretty?",
      options: ["CSS", "Python", "Assembly", "Java"],
      correct: 0,
    },
  ],
  4: [
    {
      question: "We're facing issues with the city's power, and we need you to help!\n\nThe current power lines are listed in an array, and we're having troubles with the 4th power line.\n\nWhat index is it in the array?",
      options: ["1", "4", "3", "2"],
      correct: 2,
    },
  ],
  5: [
    {
      question: "Little Johnny is learning programming, and thinks that OOP is just a funny word that doesn't mean anything. Let's let Johnny know that OOP actually stands for:",
      options: [
        "Old Ornate Programs",
        "Object Oriented Programming",
        "Oval Oscillating Places",
        "One Orbital Plane",
      ],
      correct: 1,
    },
  ],
};