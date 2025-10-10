const Question = [
  {
    image: "assets/cat.png",
    instructionText: "questions.cat.instruction",
    questionText: "questions.cat.question",
    imageCount: 3,
    options: [
      {
        text: "1",
        image: null,
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "2",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "3",
        isCorrect: true,
        feedback: "feedback.correct",
      },
      {
        text: "4",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
    ],
  },
  {
    image: "assets/dog.png",
    instructionText: "questions.dog.instruction",
    questionText: "questions.dog.question",
    imageCount: 5,
    options: [
      {
        text: "1",
        image: null,
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "5",
        isCorrect: true,
        feedback: "feedback.correct",
      },
      {
        text: "3",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "4",
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
        text: "7",
        image: null,
        isCorrect: true,
        feedback: "feedback.correct",
      },
      {
        text: "5",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "3",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        text: "4",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
    ],
  },
];
window.Question = Question;
