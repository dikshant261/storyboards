import React from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import RefreshDetector from "./components/RefreshDetector";
import SceneTwo from "./components/SquirrelQuestion/SceneTwo";
import SceneThree from "./components/SquirrelQuestion/SceneThree";
import SceneFour from "./components/SquirrelQuestion/SceneFour";
import SceneFive from "./components/SquirrelQuestion/SceneFive";
import SceneSix from "./components/SquirrelQuestion/SceneSix";
import SceneSeven from "./components/SquirrelQuestion/SceneSeven";
import SceneEight from "./components/SquirrelQuestion/SceneEight";
import SceneNine from "./components/SquirrelQuestion/SceneNine";
import SceneTen from "./components/SquirrelQuestion/SceneTen";
import SceneEleven from "./components/SquirrelQuestion/SceneEleven";
import SceneTweleve from "./components/SquirrelQuestion/SceneTweleve";
import SceneThirteen from "./components/SquirrelQuestion/SceneThirteen";
import SceneFourteen from "./components/SquirrelQuestion/SceneFourteen";
import SceneFifteen from "./components/SquirrelQuestion/SceneFifteen";
import SceneSixteen from "./components/SquirrelQuestion/SceneSixteen";
import SceneSeventeen from "./components/SquirrelQuestion/SceneSeventeen";
import SceneEighteen from "./components/SquirrelQuestion/SceneEighteen";
import SceneNineteen from "./components/SquirrelQuestion/SceneNineteen";
import ActivityCompleted from "./components/ActivityCompleted";
const Outlet = () => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const sceneComponents = [StartPage, SceneTwo, SceneThree, SceneFour, SceneFive, SceneSix, SceneSeven, SceneEight, SceneNine, SceneTen, SceneEleven, SceneTweleve, SceneThirteen, SceneFourteen, SceneFifteen, SceneSixteen, SceneSeventeen, SceneEighteen, SceneNineteen, ActivityCompleted];
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