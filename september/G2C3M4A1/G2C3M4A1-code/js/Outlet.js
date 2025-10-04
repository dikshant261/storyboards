const {useState}=React;
const Outlet = () => {
  const [start, setStart] = useState(true);
  const [scenOne, setSceneOne] = useState(false);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [sceneFive, setSceneFive] = useState(false);
  const [sceneSix, setSceneSix] = useState(false);
  const [sceneSeven, setSceneSeven] = useState(false);
  const [sceneEight, setSceneEight] = useState(false);
  const [sceneNine, setSceneNine] = useState(false);
  const [sceneTen, setSceneTen] = useState(false);
  const [sceneEleven, setSceneEleven] = useState(false);
  const [sceneTweleve, setSceneTweleve] = useState(false);
  const [lesson, setLesson] = useState(false);
  const handleStart = () => {
    setStart(false);
    setSceneOne(true);
  };
  const handleNext = () => {
    setSceneOne(false);
    setSceneTwo(true);
  };
  const handleNextTwo = () => {
    setSceneTwo(false);
    setSceneThree(true);
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
    setSceneSix(true);
  };
  const handleNextSix = () => {
    setSceneSix(false);
    setSceneSeven(true);
  };
  const handleNextSeven = () => {
    setSceneSeven(false);
    setSceneEight(true);
  };
  const handleNextEight = () => {
    setSceneEight(false);
    setSceneNine(true);
  };
  const handleNextNine = () => {
    setSceneNine(false);
    setSceneTen(true);
  };
  const handleNextTen = () => {
    setSceneTen(false);
    setSceneEleven(true);
  };
  const handleNextEleven = () => {
    setSceneEleven(false);
    setSceneTweleve(true);
  };
  const handleNextEnd = () => {
    setSceneTweleve(false);
    setLesson(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "outlet"
  }, start && /*#__PURE__*/React.createElement(StartPage, {
    onStart: handleStart
  }), scenOne && /*#__PURE__*/React.createElement(SceneOne, {
    onNext: handleNext
  }), sceneTwo && /*#__PURE__*/React.createElement(SceneTwo, {
    onNext: handleNextTwo
  }), sceneThree && /*#__PURE__*/React.createElement(SceneThree, {
    onNext: handleNextThree
  }), sceneFour && /*#__PURE__*/React.createElement(SceneFour, {
    onNext: handleNextFour
  }), sceneFive && /*#__PURE__*/React.createElement(SceneFive, {
    onNext: handleNextFive
  }), sceneSix && /*#__PURE__*/React.createElement(SceneSix, {
    onNext: handleNextSix
  }), sceneSeven && /*#__PURE__*/React.createElement(SceneSeven, {
    onNext: handleNextSeven
  }), sceneEight && /*#__PURE__*/React.createElement(SceneEight, {
    onNext: handleNextEight
  }), sceneNine && /*#__PURE__*/React.createElement(SceneNine, {
    onNext: handleNextNine
  }), sceneTen && /*#__PURE__*/React.createElement(SceneTen, {
    onNext: handleNextTen
  }), sceneEleven && /*#__PURE__*/React.createElement(SceneEleven, {
    onNext: handleNextEleven
  }), sceneTweleve && /*#__PURE__*/React.createElement(SceneTwelve, {
    onNext: handleNextEnd
  }), lesson && /*#__PURE__*/React.createElement(HalfLesson, null));
};
window.Outlet=Outlet;