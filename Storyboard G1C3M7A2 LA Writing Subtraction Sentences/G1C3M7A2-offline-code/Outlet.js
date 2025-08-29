const { useState } = React;

const question = [
  ["5", "1", "4"],
  ["9", "3", "6"],
  ["5", "5", "0"],
  ["8", "0", "8"],
  ["8", "6", "2"],
];

const Outlet = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [start, setStart] = useState(true);
  const [main, setMain] = useState(false);

  const handlePage = () => {
    setStart(false);
    setMain(true);
  };

  const handleMain = () => {
    setMain(false);
    if (questionIndex === question.length - 1) {
      window.location.reload();
      return;
    }
    setQuestionIndex((prev) => prev + 1);
    setStart(true);
  };

  const currentQuestion = question[questionIndex];

  return React.createElement(
    "div",
    { className: "outlet" },
    start &&
      React.createElement(StartingPage, {
        question: currentQuestion,
        onNext: handlePage,
      }),
    main &&
      React.createElement(Main, {
        question: currentQuestion,
        onNext: handleMain,
      })
  );
};

window.Outlet = Outlet;
