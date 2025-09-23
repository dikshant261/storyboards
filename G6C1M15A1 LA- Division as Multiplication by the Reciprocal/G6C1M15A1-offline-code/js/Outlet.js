const { useState } = React;
const Outlet = () => {
  const [start, setStart] = useState(true);
  const [sceneOne, setSceneOne] = useState(false);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [sceneFive, setSceneFive] = useState(false);
  const [complete, setComplete] = useState(false);
  const handleStart = () => {
    setStart(false);
    setSceneOne(true);
  };
  const handleNextOne = () => {
    setSceneOne(false);
    setSceneTwo(true);
  };
  const handlePrevOne = () => {
    setSceneOne(false);
    setStart(true);
  };
  const handlePrevTwo = () => {
    setSceneTwo(false);
    setSceneOne(true);
  };
  const handleNextTwo = () => {
    setSceneTwo(false);
    setSceneThree(true);
  };
  const handlePrevThree = () => {
    setSceneThree(false);
    setSceneTwo(true);
  };
  const handleNextThree = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handleNextFour = () => {
    setSceneFour(false);
    setSceneFive(true);
  };
  const handleNextFive = () => {
    setSceneFive(false);
    setComplete(true);
  };
  const handlePrevFour = () => {
    setSceneFour(false);
    setSceneThree(true);
  };
  const handlePrevFive = () => {
    setSceneFive(false);
    setSceneFour(true);
  };
  console.log(sceneFour);
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "outlet",
    },
    start &&
      /*#__PURE__*/ React.createElement(StartPage, {
        onClose: handleStart,
      }),
    sceneOne &&
      /*#__PURE__*/ React.createElement(SceneOne, {
        onNext: handleNextOne,
        onPrev: handlePrevOne,
      }),
    sceneTwo &&
      /*#__PURE__*/ React.createElement(SceneTwo, {
        onPrev: handlePrevTwo,
        onNext: handleNextTwo,
      }),
    sceneThree &&
      /*#__PURE__*/ React.createElement(SceneThree, {
        onPrev: handlePrevThree,
        onNext: handleNextThree,
      }),
    sceneFour &&
      /*#__PURE__*/ React.createElement(SceneFour, {
        onNext: handleNextFour,
        onPrev: handlePrevFour,
      }),
    sceneFive &&
      /*#__PURE__*/ React.createElement(SceneFive, {
        onNext: handleNextFive,
        onPrev: handlePrevFive,
      }),
    complete && /*#__PURE__*/ React.createElement(ActivityCompleted, null)
  );
};
window.Outlet = Outlet;
