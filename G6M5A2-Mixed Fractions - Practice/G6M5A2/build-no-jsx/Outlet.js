import React, { useState } from "react";
import "./Outlet.css";
import SceneOne from "./components/SceneOne";
import SceneTwo from "./components/SceneTwo";
import SceneThree from "./components/SceneThree";
import { Questions } from "./components/qs";
const Outlet = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const sceneComponents = [SceneOne, SceneTwo, SceneThree];
  const goNextScene = () => setCurrentScene(prev => prev < sceneComponents.length - 1 ? prev + 1 : prev);
  const goPrevScene = () => setCurrentScene(prev => prev > 0 ? prev - 1 : prev);
  const goNextQuestion = () => {
    if (questionIndex + 1 === Questions.length) {
      window.location.reload();
    }
    setQuestionIndex(prev => prev < Questions.length - 1 ? prev + 1 : prev);
    setCurrentScene(0);
  };
  const CurrentScene = sceneComponents[currentScene];
  return /*#__PURE__*/React.createElement("div", {
    className: "outlet"
  }, /*#__PURE__*/React.createElement(CurrentScene, {
    goNext: goNextScene,
    goPrev: goPrevScene,
    goNextQuestion: goNextQuestion,
    question: Questions[questionIndex] // send current question only
  }));
};
export default Outlet;