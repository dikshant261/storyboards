import React, { useState } from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import Scene from "./components/Scene";
import SceneTwo from "./components/SceneTwo";
import RefreshDetector from "./components/RefreshDetector";
import ActivityCompleted from "./components/ActivityCompleted";
const Outlet = () => {
  const [start, setStart] = useState(true);
  const [scene, setScene] = useState(false);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [end, setEnd] = useState(false);
  const handleStart = () => {
    setStart(false);
    setScene(true);
  };
  const handleNextOne = () => {
    setScene(false);
    setSceneTwo(true);
  };
  const handleOver = () => {
    setSceneTwo(false);
    setEnd(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "outlet"
  }, start && /*#__PURE__*/React.createElement(StartPage, {
    onClose: handleStart
  }), scene && /*#__PURE__*/React.createElement(Scene, {
    onNext: handleNextOne
  }), sceneTwo && /*#__PURE__*/React.createElement(SceneTwo, {
    onNext: handleOver
  }), end && /*#__PURE__*/React.createElement(ActivityCompleted, null), /*#__PURE__*/React.createElement(RefreshDetector, null));
};
export default Outlet;