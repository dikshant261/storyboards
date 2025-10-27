import React, { useState } from "react";
import "./Outlet.css";
import Scene from "./components/Scene";
import SceneTwo from "./components/SceneTwo";
import SceneThree from "./components/SceneThree";
import SceneFour from "./components/SceneFour";
import SceneFive from "./components/SceneFive";
import SceneSix from "./components/SceneSix";
import LetsUseOtherHand from "./components/LetUseOtherHand";
import SceneSeven from "./components/SceneSeven";
import SceneEight from "./components/SceneEight";
import SceneNine from "./components/SceneNine";
import SceneTen from "./components/SceneTen";
import SceneEleven from "./components/SceneEleven";
const Outlet = () => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const sceneComponents = [Scene, SceneTwo, SceneThree, SceneFour, SceneFive, SceneSix, LetsUseOtherHand, SceneSeven, SceneEight, SceneNine, SceneTen, SceneEleven];
  console.log("Current Scene:", currentScene);
  const goNext = () => setCurrentScene(prev => prev < sceneComponents.length - 1 ? prev + 1 : prev);
  const goPrev = () => setCurrentScene(prev => prev > 0 ? prev - 1 : prev);
  const CurrentScene = sceneComponents[currentScene];
  return /*#__PURE__*/React.createElement("div", {
    className: "outlet"
  }, /*#__PURE__*/React.createElement(CurrentScene, {
    goNext: goNext,
    goPrev: goPrev
  }));
};
export default Outlet;