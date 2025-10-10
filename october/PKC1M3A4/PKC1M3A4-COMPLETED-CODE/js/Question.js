const Question = [
  {
    image: "assets/marble.png",
    instructionText: "questions.marble.instruction",
    questionText: "questions.marble.question",
    imageCount: 3,
    options: [
      {
        image: "assets/one.png",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        image: "assets/two.png",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        image: "assets/three.png",
        isCorrect: true,
        feedback: "feedback.correct",
      },
      {
        image: "assets/four.png",
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
        image: "assets/one.png",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        image: "assets/five.png",
        isCorrect: true,
        feedback: "feedback.correct",
      },
      {
        image: "assets/zero.png",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
      {
        image: "assets/three.png",
        isCorrect: false,
        feedback: "feedback.incorrect",
      },
    ],
  },
];
window.Question = Question;
