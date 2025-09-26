const {useState,useEffect}=React;
const question = [[3, 4, 2, "one"], [1, 2, 3, "two"], [2, 5, 7, "three"], [3, 7, 5, "four"], [5, 6, 2, "five"]];
const Outlet = () => {
  const [start, setStart] = useState(true);
  const [sceneOne, setSceneOne] = useState(false);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [sceneFive, setSceneFive] = useState(false);
  const [hintSlide, setHintSlide] = useState(false);
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
  const handlePrevFour = () => {
    setSceneFour(false);
    setSceneThree(true);
  };
  const handleNextFour = () => {
    setSceneFour(false);
    setSceneFive(true);
  };
  const handlePrevFive = () => {
    setSceneFive(false);
    setSceneFour(true);
  };
  const handleNextFive = () => {
    setSceneFive(false);
    setComplete(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "outlet"
  }, start && /*#__PURE__*/React.createElement(StartPage, {
    onClose: handleStart
  }), sceneOne && /*#__PURE__*/React.createElement(SceneOne, {
    onPrev: handlePrevOne,
    onNext: handleNextOne,
    question: question[0],
    setHintSlide: () => {
      setHintSlide(true);
    }
  }), sceneTwo && /*#__PURE__*/React.createElement(SceneOne, {
    onPrev: handlePrevTwo,
    onNext: handleNextTwo,
    question: question[1],
    setHintSlide: () => {
      setHintSlide(true);
    }
  }), sceneThree && /*#__PURE__*/React.createElement(SceneOne, {
    onPrev: handlePrevThree,
    onNext: handleNextThree,
    question: question[2],
    setHintSlide: () => {
      setHintSlide(true);
    }
  }), sceneFour && /*#__PURE__*/React.createElement(SceneOne, {
    onPrev: handlePrevFour,
    onNext: handleNextFour,
    question: question[3],
    setHintSlide: () => {
      setHintSlide(true);
    }
  }), sceneFive && /*#__PURE__*/React.createElement(SceneOne, {
    onPrev: handlePrevFive,
    onNext: handleNextFive,
    question: question[4],
    setHintSlide: () => {
      setHintSlide(true);
    }
  }), hintSlide && /*#__PURE__*/React.createElement(HintSlide, {
    onClose: () => setHintSlide(false)
  }), complete && /*#__PURE__*/React.createElement(ActivityCompleted, null), /*#__PURE__*/React.createElement(RefreshDetector, null));
};
window.Outlet=Outlet;