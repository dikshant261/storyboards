import React, { useState } from "react";
import "./Outlet.css";
import SceneOne from "./components/SceneOne";
import SceneTwo from "./components/SceneTwo";
import SceneThree from "./components/SceneThree";
import RefreshDetector from "./components/RefreshDetector";
import SceneFour from "./components/SceneFour";
import SceneFive from "./components/SceneFive";
import SceneSix from "./components/SceneSix";
import SceneSeven from "./components/SceneSeven";
import SceneEight from "./components/SceneEight";
import SceneNine from "./components/SceneNine";
import SceneTen from "./components/SceneTen";
const Outlet = () => {
  const [start, setStart] = useState(true);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [sceneFive, setSceneFive] = useState(false);
  const [sceneSix, setSceneSix] = useState(false);
  const [sceneSeven, setSceneSeven] = useState(false);
  const [sceneEight, setSceneEight] = useState(false);
  const [sceneNine, setSceneNine] = useState(false);
  const [sceneTen, setSceneTen] = useState(false);
  const handleStart = () => {
    setStart(false);
    setSceneTwo(true);
  };
  const handlePrev = () => {
    setSceneTwo(false);
    setStart(true);
  };
  const handleNextTwo = () => {
    setSceneTwo(false);
    setSceneThree(true);
  };
  const handlePrevTwo = () => {
    setSceneThree(false);
    setSceneTwo(true);
  };
  const handleNextThree = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handlePrevThree = () => {
    setSceneFour(false);
    setSceneThree(true);
  };
  const handleNextFour = () => {
    setSceneFour(false);
    setSceneFive(true);
  };
  const handlePrevFour = () => {
    setSceneFive(false);
    setSceneFour(true);
  };
  const handleNextFive = () => {
    setSceneFive(false);
    setSceneSix(true);
  };
  const handlePrevFive = () => {
    setSceneSix(false);
    setSceneFive(true);
  };
  const handleNextSix = () => {
    setSceneSix(false);
    setSceneSeven(true);
  };
  const handlePrevSix = () => {
    setSceneSeven(false);
    setSceneSix(true);
  };
  const handleNextSeven = () => {
    setSceneSeven(false);
    setSceneEight(true);
  };
  const handlePrevSeven = () => {
    setSceneEight(false);
    setSceneSeven(true);
  };
  const handleNextEight = () => {
    setSceneEight(false);
    setSceneNine(true);
  };
  const handlePrevEight = () => {
    setSceneNine(false);
    setSceneEight(true);
  };
  const handleNextNine = () => {
    setSceneNine(false);
    setSceneTen(true);
  };
  const handlePrevNine = () => {
    setSceneTen(false);
    setSceneNine(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "outlet"
  }, start && /*#__PURE__*/React.createElement(SceneOne, {
    onSatrt: handleStart
  }), sceneTwo && /*#__PURE__*/React.createElement(SceneTwo, {
    onPrev: handlePrev,
    onNext: handleNextTwo
  }), sceneThree && /*#__PURE__*/React.createElement(SceneThree, {
    onPrev: handlePrevTwo,
    onNext: handleNextThree
  }), sceneFour && /*#__PURE__*/React.createElement(SceneFour, {
    onPrev: handlePrevThree,
    onNext: handleNextFour
  }), sceneFive && /*#__PURE__*/React.createElement(SceneFive, {
    onPrev: handlePrevFour,
    onNext: handleNextFive
  }), sceneSix && /*#__PURE__*/React.createElement(SceneSix, {
    onPrev: handlePrevFive,
    onNext: handleNextSix
  }), sceneSeven && /*#__PURE__*/React.createElement(SceneSeven, {
    onPrev: handlePrevSix,
    onNext: handleNextSeven
  }), sceneEight && /*#__PURE__*/React.createElement(SceneEight, {
    onPrev: handlePrevSeven,
    onNext: handleNextEight
  }), sceneNine && /*#__PURE__*/React.createElement(SceneNine, {
    onPrev: handlePrevEight,
    onNext: handleNextNine
  }), sceneTen && /*#__PURE__*/React.createElement(SceneTen, {
    onPrev: handlePrevNine
  }), /*#__PURE__*/React.createElement(RefreshDetector, null));
};
export default Outlet;