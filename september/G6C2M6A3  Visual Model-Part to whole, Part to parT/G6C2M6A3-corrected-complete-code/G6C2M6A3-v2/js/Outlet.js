const Outlet = () => {
  const [start, setStart] = React.useState(true);
  const [sceneOne, setSceneOne] = React.useState(false);
  const [sceneTwo, setSceneTwo] = React.useState(false);
  const [sceneThree, setSceneThree] = React.useState(false);
  const [sceneFour, setSceneFour] = React.useState(false);
  const [end, setEnd] = React.useState(false);

  const handleNext = () => {
    setStart(false);
    setSceneOne(true);
  };
  const handlePrev = () => {
    setSceneOne(false);
    setStart(true);
  };
  const handleNextOne = () => {
    setSceneOne(false);
    setSceneTwo(true);
  };
  const handleNextTwo = () => {
    setSceneTwo(false);
    setSceneThree(true);
  };
  const handlePrevTwo = () => {
    setSceneTwo(false);
    setSceneOne(true);
  };
  const handleNextThree = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handlePrevThree = () => {
    setSceneThree(false);
    setSceneTwo(true);
  };
  const handleNextFour = () => {
    setSceneFour(false);
    setEnd(true);
  };
  const handlePrevFour = () => {
    setSceneFour(false);
    setSceneThree(true);
  };

  return React.createElement(
    "div",
    { className: "outlet" },
    start &&
      React.createElement(StartPage, {
        onClose: handleNext,
      }),
    sceneOne &&
      React.createElement(Main, {
        option: ["12:7", "12:19", "7:12", "7:19"],
        correctOption: "7:12",
        question: t("questionOne.question"),
        flag: 0,
        onClose: handlePrev,
        onNext: handleNextOne,
      }),
    sceneTwo &&
      React.createElement(Main, {
        option: ["17:7", "17:12", "7:17", "12:17"],
        correctOption: "17:7",
        question: t("questionTwo.question"),
        flag: 1,
        onClose: handlePrevTwo,
        onNext: handleNextTwo,
      }),
    sceneThree &&
      React.createElement(Main, {
        option: ["7:36", "17:26", "12:36", "17:36"],
        correctOption: "17:36",
        question: t("questionThree.question"),
        flag: 2,
        onClose: handlePrevThree,
        onNext: handleNextThree,
      }),
    sceneFour &&
      React.createElement(Main, {
        option: ["12:36", "36:12", "17:36", "36:7"],
        correctOption: "12:36",
        question: t("questionFour.question"),
        flag: 3,
        onClose: handlePrevFour,
        onNext: handleNextFour,
      }),
    end && React.createElement(ActivityComplete, null)
  );
};
window.Outlet=Outlet;