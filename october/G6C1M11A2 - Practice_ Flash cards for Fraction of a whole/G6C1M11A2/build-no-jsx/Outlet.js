import React, { useState } from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import RefreshDetector from "./components/RefreshDetector";
import SceneOne from "./components/SceneOne";
import HintSlide from "./components/HintSlide";
import ActivityComplete from "./components/ActivityComplete";
const Outlet = () => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const [hintSlide, setHintSlide] = useState(false);
  const sceneComponents = [StartPage, SceneOne, ActivityComplete];
  console.log("Current Scene:", currentScene);
  const goNext = () => setCurrentScene(prev => prev < sceneComponents.length - 1 ? prev + 1 : prev);
  const goPrev = () => setCurrentScene(prev => prev > 0 ? prev - 1 : prev);
  const CurrentScene = sceneComponents[currentScene];
  return /*#__PURE__*/React.createElement("div", {
    className: "outlet"
  }, CurrentScene === SceneOne ? /*#__PURE__*/React.createElement(SceneOne, {
    goNext: goNext,
    goPrev: goPrev,
    close: () => setHintSlide(true)
  }) : /*#__PURE__*/React.createElement(CurrentScene, {
    goNext: goNext,
    goPrev: goPrev
  }), hintSlide && /*#__PURE__*/React.createElement(HintSlide, {
    close: () => setHintSlide(false)
  }), /*#__PURE__*/React.createElement(RefreshDetector, null));
};
export default Outlet;