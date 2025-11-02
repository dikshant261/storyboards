const Outlet = () => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const sceneComponents = [
    SceneOne,
    SceneTwo,
    SceneThree,
    SceneFour,
    SceneFive,
    SceneSix,
    SceneSeven,
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
    })
  );
};
window.Outlet = Outlet;
