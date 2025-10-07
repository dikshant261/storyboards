import React from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import RefreshDetector from "./components/RefreshDetector";

const Outlet = () => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const sceneComponents = [StartPage];
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
      <RefreshDetector />
    </div>
  );
};

export default Outlet;
