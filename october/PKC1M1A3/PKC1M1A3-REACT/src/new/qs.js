export const Question = [
  
  // {
  //   audio: {
  //     One: "assets/sound/en/one_en.mp3",
  //     Two: "assets/sound/en/two_en.mp3",
  //     Three: "assets/sound/en/three_en.mp3",
  //     Four: "assets/sound/en/four_en.mp3",
  //     Five: "assets/sound/en/five_en.mp3",
  //     Six: "assets/sound/en/six_en.mp3",
  //     Seven: "assets/sound/en/seven_en.mp3",
  //     Eight: "ssets/sound/en/eight_en.mp3",
  //     Nine: "assets/sound/en/nine_en.mp3",
  //     Ten: "assets/sound/en/ten_en.mp3",
  //   },
  // },
  {
    image: "cat",
    instructionText:
      "Count the cats. Click each cat to keep track as you count.",
    questionText: "How many cats are there:",
    imageCount: 3,
    options: [
      {
        text: "1",
        image: null,
        isCorrect: false,
        feedback: "Oops! That's inCorrect Try Again",
      },
      {
        text: "2",
        isCorrect: false,
        feedback: "Oops! That's inCorrect Try Again",
      },
      {
        text: "3",
        isCorrect: true,
        feedback: "Well Done!",
      },
      {
        text: "4",
        isCorrect: false,
        feedback: "Oops! That's inCorrect Try Again",
      },
    ],
  },
  {
    image: "dog",
    instructionText:
      "Count the dogs. Click each dog to keep track as you count.",
    questionText: "How many dogs are there:",
    imageCount: 5,
    options: [
      {
        text: "1",
        image: null,
        isCorrect: false,
        feedback: "Oops! That's inCorrect Try Again",
      },
      {
        text: "5",
        isCorrect: true,
        feedback: "Well Done!",
      },
      {
        text: "3",
        isCorrect: false,
        feedback: "Oops! That's inCorrect Try Again",
      },
      {
        text: "4",
        isCorrect: false,
        feedback: "Oops! That's inCorrect Try Again",
      },
    ],
  },
  {
    image: "apple",
    instructionText:
      "Count the apples. Click each apples to keep track as you count.",
    questionText: "How many apples are there:",
    imageCount: 7,
    options: [
      {
        text: "7",
        image: null,
        isCorrect: true,
        feedback: "Well Done!",
      },
      {
        text: "5",
        isCorrect: false,
        feedback: "Oops! That's inCorrect Try Again",
      },
      {
        text: "3",
        isCorrect: false,
        feedback: "Oops! That's inCorrect Try Again",
      },
      {
        text: "4",
        isCorrect: false,
        feedback: "Oops! That's inCorrect Try Again",
      },
    ],
  },
];
