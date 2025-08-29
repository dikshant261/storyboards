import React from "react";
import car from "../assets/car.png";
import "./Car.css";

const Car = () => {
  return (
    <div>
      <div className="car-align">
        {Array(5).fill(5).map((_,key) => (
          <img src={car} alt="car" className="car" key={key} />
        ))}
      </div>
    </div>
  );
};

export default Car;
