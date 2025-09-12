const Outlet = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentIndexDivide, setCurrentIndexDivide] = React.useState(0);
  const [start, setStart] = React.useState(true);
  const [sceneOne, setSceneOne] = React.useState(false);
  const [sceneTwo, setSceneTwo] = React.useState(false);
  const [nextPart, setNextPart] = React.useState(false);
  const [sceneThree, setSceneThree] = React.useState(false);
  const [sceneFour, setSceneFour] = React.useState(false);
  const [end, setEnd] = React.useState(false);

  const question = [
    [1, 5, 5, 25],
    [1, 6, 2, 12],
    [2, 3, 6, 9],
    [3, 5, 15, 25],
  ];
  const questionDivide = [
    [4, 16, 1, 4],
    [2, 18, 1, 9],
    [6, 15, 2, 5],
    [12, 21, 4, 7],
  ];

  const startClose = () => {
    setStart(false);
    setSceneOne(true);
  };
  const handleSceneOne = () => {
    setSceneOne(false);
    setSceneTwo(true);
  };
  const handleSceneTwo = () => {
    if (currentIndex + 1 === question.length) {
      setSceneTwo(false);
      setNextPart(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSceneTwo(false);
    setSceneOne(true);
  };
  const handlePrevOne = () => {
    if (currentIndex === 0) {
      setSceneOne(false);
      setStart(true);
    } else {
      setCurrentIndex((prev) => prev - 1);
      setSceneOne(false);
      setSceneTwo(true);
    }
  };
  const handlePrevTwo = () => {
    setSceneTwo(false);
    setSceneOne(true);
  };
  const handleDivide = () => {
    setNextPart(false);
    setSceneThree(true);
  };
  const handleSceneThree = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handleSceneFour = () => {
    if (currentIndexDivide + 1 === questionDivide.length) {
      setSceneFour(false);
      setEnd(true);
      return;
    } else {
      setCurrentIndexDivide((prev) => prev + 1);
      setSceneFour(false);
      setSceneThree(true);
    }
  };
  const handlePrevThree = () => {
    if (currentIndexDivide === 0) {
      setSceneThree(false);
      setNextPart(true);
    } else {
      setCurrentIndexDivide((prev) => prev - 1);
      setSceneThree(false);
      setSceneFour(true);
    }
  };
  const handlePrevFour = () => {
    setSceneFour(false);
    setSceneThree(true);
  };

  const currentQuestion = question[currentIndex];
  const currentQuestionDivide = questionDivide[currentIndexDivide];

  return React.createElement(
    "div",
    { className: "outlet" },
    start &&
      React.createElement(StartPage, {
        onClose: startClose,
      }),
    sceneOne &&
      React.createElement(SceneOne, {
        question: currentQuestion,
        onNext: handleSceneOne,
        onPrev: handlePrevOne,
      }),
    sceneTwo &&
      React.createElement(SceneTwo, {
        question: currentQuestion,
        onNext: handleSceneTwo,
        onPrev: handlePrevTwo,
      }),
    nextPart &&
      React.createElement(NextPart, {
        onClose: handleDivide,
      }),
    sceneThree &&
      React.createElement(SceneThree, {
        question: currentQuestionDivide,
        onNext: handleSceneThree,
        onPrev: handlePrevThree,
      }),
    sceneFour &&
      React.createElement(SceneFour, {
        question: currentQuestionDivide,
        onPrev: handlePrevFour,
        onNext: handleSceneFour,
      }),
    end && React.createElement(End, null)
  );
};
window.Outlet=Outlet;