import React, { useState } from "react";
import car from "../assets/car.png";
import "./Car.css";
import CrossIcon from "./CrossIcon";

const NUM_CARS = 5;

const CarTwo = ({ counter, setCounter, setShowError, carButtonsDisabled }) => {
  const [crossed, setCrossed] = useState(Array(NUM_CARS).fill(false));

  const handleCarClick = (idx) => {
    setShowError();
    setCrossed((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      // After updating, count how many are crossed
      const newCount = updated.filter(Boolean).length;
      setCounter(newCount);
      return updated;
    });
  };

  return (
    <div>
      {/* You can show the counter here if you want: <div>Counter: {counter}</div> */}
      <div className="car-align">
        {Array(NUM_CARS)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src={car}
                alt="car"
                className="car-md"
                onClick={carButtonsDisabled ? "" : () => handleCarClick(idx)}
              />
              {crossed[idx] && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    pointerEvents: "none",
                    backgroundColor: "rgb(0,0,0,0.3)",
                    width:"100%",
                    height:'100%',
                    borderRadius:"50%"
                  }}
                >
                  <CrossIcon />
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CarTwo;
