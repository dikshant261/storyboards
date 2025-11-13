const { useState, useEffect, useRef } = React;
const Outlet = () => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const [crossBoxOneValue, setCrossBoxOneValue] = useState("");
  const [crossBoxTwoValue, setCrossBoxTwoValue] = useState("");
  const [crossBoxThreeValue, setCrossBoxThreeValue] = useState("");
  const [crossBoxFourValue, setCrossBoxFourValue] = useState("");
  const sceneComponents = [
    StartPage,
    SceneTwo,
    SceneThree,
    SceneFour,
    SceneFive,
    SceneSix,
    SceneSeven,
    SceneEight,
    SceneNine,
    SceneTen,
    SceneEleven,
    SceneTweleve,
    SceneThirteen,
    SceneFourteen,
    SceneFifteen,
    SceneSixteen,
    SceneSeventeen,
    SceneEighteen,
    SceneNineteen,
    ActivityCompleted,
  ];
  console.log("Current Scene:", currentScene);
  const goNext = () =>
    setCurrentScene((prev) =>
      prev < sceneComponents.length - 1 ? prev + 1 : prev
    );
  const goPrev = () => setCurrentScene((prev) => (prev > 0 ? prev - 1 : prev));
  const CurrentScene = sceneComponents[currentScene];
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "outlet",
    },
    /*#__PURE__*/ React.createElement(CurrentScene, {
      goNext: goNext,
      goPrev: goPrev,
      setCrossBoxOneValue: setCrossBoxOneValue,
      setCrossBoxTwoValue: setCrossBoxTwoValue,
      setCrossBoxThreeValue: setCrossBoxThreeValue,
      setCrossBoxFourValue: setCrossBoxFourValue,
      crossBoxOneValue: crossBoxOneValue,
      crossBoxTwoValue: crossBoxTwoValue,
      crossBoxThreeValue: crossBoxThreeValue,
      crossBoxFourValue: crossBoxFourValue,
    }),
    /*#__PURE__*/ React.createElement(RefreshDetector, null)
  );
};
window.Outlet = Outlet;
