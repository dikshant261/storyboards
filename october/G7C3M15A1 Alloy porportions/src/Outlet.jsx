import React from "react";
import "./Outlet.css";
import SceneOne from "./components/SceneOne";
import SceneTwo from "./components/SceneTwo";
import SceneThree from "./components/SceneThree";
import SceneFour from "./components/SceneFour";
import SceneFive from "./components/SceneFive";
import SceneSix from "./components/SceneSix";
import SceneSeven from "./components/SceneSeven";

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
  return (
    <div className="outlet">
      <CurrentScene goNext={goNext} goPrev={goPrev} />
    </div>
  );
};

export default Outlet;
