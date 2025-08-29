import React from "react";
import car from "../assets/car.png";
import "./Car.css";
import CrossIcon from './CrossIcon';

const CarOne = ({ totalCars = 5, crossCars = 4 }) => {
  // Make array of cars
  console.log(totalCars,crossCars)
  const carsArray = Array(totalCars).fill(0);

  return (
    <div className="car-grid">
      {carsArray.map((_, idx) => {
        const isCrossCar = idx >= totalCars - crossCars; // last N cars get cross
        return (
          <div
            key={idx}
            style={{ position: "relative", display: "inline-block", animationDelay: `${(idx + 1) * 0.3}s` }}
            className="car-wrapper"
          >
            <img src={car} alt="car" className="car" />
            {isCrossCar && (
              <div className="cros-align">
                <CrossIcon />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CarOne;
