import React from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import RefreshDetector from "./components/RefreshDetector";
import SceneTwo from "./components/Question/SceneTwo";
import SceneThree from "./components/Question/SceneThree";
import SceneFour from "./components/Question/SceneFour";
import SceneFive from "./components/Question/SceneFive";
import SceneSix from "./components/Question/SceneSix";
import SceneSeven from "./components/Question/SceneSeven";
import SceneEight from "./components/Question/SceneEight";
import SceneNine from "./components/Question/SceneNine";
import SceneTen from "./components/Question/SceneTen";
import SceneEleven from "./components/Question/SceneEleven";
import SceneTwelve from "./components/Question/SceneTwelve";
import ActivityCompleted from "./components/ActivityCompleted";
import NextQuestion from "./components/NextQuestion";
import SceneThirteen from "./components/Question/SceneThirteen";
import SceneFourteen from "./components/Question/SceneFourteen";
import SceneFifteen from "./components/Question/SceneFifteen";
import SceneSixteen from "./components/Question/SceneSixteen";
import SceneSeventeen from "./components/Question/SceneSeventeen";
import SceneEighteen from "./components/Question/SceneEighteen";
import SceneTwenty from "./components/Question/SceneTwenty";
import SceneNineteen from "./components/Question/SceneNineteen";
const Outlet = () => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const sceneComponents = [StartPage, SceneTwo, SceneThree, SceneFour, SceneFive, SceneSix, SceneSeven, SceneEight, SceneNine, SceneTen, SceneEleven, SceneTwelve, NextQuestion, SceneThirteen, SceneFourteen, SceneFifteen, SceneSixteen, SceneSeventeen, SceneEighteen, SceneNineteen, SceneTwenty, ActivityCompleted];
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