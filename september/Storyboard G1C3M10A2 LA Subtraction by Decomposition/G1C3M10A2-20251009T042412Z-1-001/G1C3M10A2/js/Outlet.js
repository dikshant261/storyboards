const { useState } = React;

function Outlet() {
  const [sceneOne, setSeceneOne] = useState(true);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [sceneFive, setSceneFive] = useState(false);
  const [sceneSix, setSceneSix] = useState(false);

  // Clear all scene-related session storage on page refresh/close
  React.useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear all scene-related session storage
      sessionStorage.removeItem('sceneOneResult');
      sessionStorage.removeItem('sceneTwoResult');
      sessionStorage.removeItem('sceneThreeResult');
      sessionStorage.removeItem('sceneFourResult');
      sessionStorage.removeItem('sceneFiveResult');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleNextOne = () => {
    setSeceneOne(false);
    setSceneTwo(true);
  };
  const handleNextTwo = () => {
    setSceneTwo(false);
    setSceneThree(true);
  };
  const handleNextThree = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handleNextFour = () => {
    setSceneFour(false);
    setSceneFive(true);
  };
  const handleNextFive = () => {
    setSceneFive(false);
    setSceneSix(true);
  };

  const handlePrevOne = () => {
    setSceneTwo(false);
    setSeceneOne(true);
  };
  const handlePrevTwo = () => {
    setSceneThree(false);
    setSceneTwo(true);
  };
  const handlePrevThree = () => {
    setSceneFour(false);
    setSceneThree(true);
  };
  const handlePrevFour = () => {
    setSceneFive(false);
    setSceneFour(true);
  };
  const handlePrevFive = () => {
    setSceneSix(false);
    setSceneFive(true);
  };

  return React.createElement(
    "div",
    { className: "outlet" },
    sceneOne && React.createElement(SceneOne, { onNext: handleNextOne }),
    sceneTwo &&
      React.createElement(SceneTwo, {
        onNext: handleNextTwo,
        onPrev: handlePrevOne,
      }),
    sceneThree &&
      React.createElement(SceneThree, {
        onNext: handleNextThree,
        onPrev: handlePrevTwo,
      }),
    sceneFour &&
      React.createElement(SceneFour, {
        onPrev: handlePrevThree,
        onNext: handleNextFour,
      }),
    sceneFive &&
      React.createElement(SceneFive, {
        onPrev: handlePrevFour,
        onNext: handleNextFive,
      }),
    sceneSix && React.createElement(SceneSix, { onPrev: handlePrevFive })
  );
}
window.Outlet = Outlet;
