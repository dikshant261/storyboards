import React from "react";
import "./Outlet.css";
import SceneOne from "./components/SceneOne";
import SceneTwo from "./components/SceneTwo";
import SceneThree from "./components/SceneThree";
import SceneFour from "./components/SceneFour";
import SceneFive from "./components/SceneFive";
import SceneSix from "./components/SceneSix";
import SceneSeven from "./components/SceneSeven";
import SceneEight from "./components/SceneEight";
import SceneNine from "./components/SceneNine";
import SceneTen from "./components/SceneTen";
import SceneEleven from "./components/SceneEleven";
import SceneTwelve from "./components/SceneTweleve";
import SceneThirteen from "./components/SceneThirteen";
import SceneFourteen from "./components/SceneFourteen";
import SceneFifteen from "./components/SceneFifteen";
import SceneSixteen from "./components/SceneSixteen";
import RefreshDetector from "./components/RefreshDetector";
const Outlet = () => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const sceneComponents = [SceneOne, SceneTwo, SceneThree, SceneFour, SceneFive, SceneSix, SceneSeven, SceneEight, SceneNine, SceneTen, SceneEleven, SceneTwelve, SceneThirteen, SceneFourteen, SceneFifteen, SceneSixteen];
  console.log("Current Scene:", currentScene);
  const goNext = () => setCurrentScene(prev => prev < sceneComponents.length - 1 ? prev + 1 : prev);
  const goPrev = () => setCurrentScene(prev => prev > 0 ? prev - 1 : prev);
  const CurrentScene = sceneComponents[currentScene];
  return /*#__PURE__*/React.createElement("div", {
    className: "outlet"
  }, /*#__PURE__*/React.createElement(CurrentScene, {
    goNext: goNext,
    goPrev: goPrev
  }), /*#__PURE__*/React.createElement(RefreshDetector, null));
};
export default Outlet;