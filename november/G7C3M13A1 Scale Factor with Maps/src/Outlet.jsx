import React from "react";
import "./Outlet.css";
import SceneTwo from "./components/Question/SceneTwo";
import SceneThree from "./components/Question/SceneThree";

const Outlet = () => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const sceneComponents = [SceneTwo, SceneThree];
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
