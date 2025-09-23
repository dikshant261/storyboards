import React, { useState } from "react";
import "./Outlet.css";
import SceneOne from "./components/SceneOne";
const Outlet = () => {
  const [start, setStart] = useState(true);
  const handleStart = () => {};
  return (
    <div className="outlet">{start && <SceneOne onSatrt={handleStart} />}</div>
  );
};

export default Outlet;
