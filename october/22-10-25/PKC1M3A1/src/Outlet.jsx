import React, { useState } from "react";
import "./Outlet.css";
import Scene from "./components/Scene";
import SceneTwo from "./components/SceneTwo";
import SceneThree from "./components/SceneThree";
import SceneFour from "./components/SceneFOur";
import SceneFive from "./components/SceneFive";
import SceneSix from "./components/SceneSix";
const Outlet = () => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const sceneComponents = [
    Scene,
    SceneTwo,
    SceneThree,
    SceneFour,
    SceneFive,
    SceneSix,
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
