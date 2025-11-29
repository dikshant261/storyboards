const Outlet = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [start, setStart] = React.useState(true);
  const [sceneTwo, setSceneTwo] = React.useState(false);
  const [scenethree, setSceneThree] = React.useState(false);
  const [sceneFour, setSceneFour] = React.useState(false);
  const [sceneFive, setSceneFive] = React.useState(false);
  const [sceneSix, setSceneSix] = React.useState(false);
  const [complete, setComplete] = React.useState(false);

  const question = [
    [2, 5, 3],
    [1, 3, 4],
    [4, 5, 3],
    [2, 7, 5],
    [1, 6, 4],
    [3, 10, 3],
  ];
  const numberString = [
    "two_fifth",
    "one_thirds",
    "four_fifths",
    "two_sevenths",
    "one_sixths",
    "three_tenths",
  ];

  const handleSceneTwo = () => {
    setStart(false);
    setSceneTwo(true);
  };
  const handleSceneThree = () => {
    setSceneTwo(false);
    setSceneThree(true);
  };
  const handleSceneFour = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handleSceneFive = () => {
    setSceneFour(false);
    setSceneFive(true);
  };
  const handleSceneSix = () => {
    setSceneFive(false);
    setSceneSix(true);
  };
  const handleSceneSeven = () => {
    if (currentIndex + 1 === question.length) {
      setSceneSix(false);
      setComplete(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSceneSix(false);
      setSceneTwo(true);
    }
  };
  const handlePrevOne = () => {
    if (currentIndex === 0) {
      setSceneTwo(false);
      setStart(true);
    } else {
      setCurrentIndex((prev) => prev - 1);
      setSceneTwo(false);
      setSceneSix(true);
    }
  };
  const handlePrevTwo = () => {
    setSceneThree(false);
    setSceneTwo(true);
  };
  const handlePrevThree = () => {
    setSceneFour(false);
    setSceneThree(true);
  };
  const handlePrevFour = () => {
    setSceneFive(false);
    setSceneFour(true);
  };
  const handlePrevFive = () => {
    setSceneSix(false);
    setSceneFive(true);
  };

  const currentQuestion = question[currentIndex];

  return React.createElement(
    "div",
    { className: "outlet" },
    start &&
    React.createElement(StartPage, {
      onClose: handleSceneTwo,
    }),
    sceneTwo &&
    React.createElement(SceneTwo, {
      question: currentQuestion,
      onNext: handleSceneThree,
      onPrev: handlePrevOne,
    }),
    scenethree &&
    React.createElement(SceneThree, {
      question: currentQuestion,
      onNext: handleSceneFour,
      onPrev: handlePrevTwo,
    }),
    sceneFour &&
    React.createElement(SceneFour, {
      question: currentQuestion,
      flag: 0,
      numberString: t(numberString[currentIndex]),
      onNext: handleSceneFive,
      onPrev: handlePrevThree,
    }),
    sceneFive &&
    React.createElement(SceneFive, {
      question: currentQuestion,
      flag: 1,
      onNext: handleSceneSix,
      onPrev: handlePrevFour,
    }),
    sceneSix &&
    React.createElement(SceneSix, {
      question: currentQuestion,
      flag: 1,
      onNext: handleSceneSeven,
      onPrev: handlePrevFive,
    }),
    complete && React.createElement(ActivityComplete, null)
  );
};
window.Outlet = Outlet;