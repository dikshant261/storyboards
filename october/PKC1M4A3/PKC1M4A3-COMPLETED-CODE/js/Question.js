const Question = [
  {
    image: "assets/car.png",
    instructionText: "questions.car.instruction",
    questionText: "questions.car.question",
    imageCount: 3,
    options: [
      {
        text: "One",
        image: null,
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "Two",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "Three",
        isCorrect: true,
        feedback: "feedback.correct",
      },
      {
        text: "Four",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
    ],
  },
  {
    image: "assets/orange.png",
    instructionText: "questions.orange.instruction",
    questionText: "questions.orange.question",
    imageCount: 5,
    options: [
      {
        text: "One",
        image: null,
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "Five",
        isCorrect: true,
        feedback: "feedback.correct",
      },
      {
        text: "Three",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "Four",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
    ],
  },
  {
    image: "assets/apple.png",
    instructionText: "questions.apple.instruction",
    questionText: "questions.apple.question",
    imageCount: 7,
    options: [
      {
        text: "Seven",
        image: null,
        isCorrect: true,
        feedback: "feedback.correct",
      },
      {
        text: "Five",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "Three",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "Four",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
    ],
  },
];
window.Question = Question;
