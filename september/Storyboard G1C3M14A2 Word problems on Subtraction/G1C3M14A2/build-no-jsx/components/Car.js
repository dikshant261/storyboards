import React from "react";
import pencil from "../assets/pencil.png";
import "./Car.css";
import CrossIcon from "./CrossIcon";
const CarOne = ({
  totalCars = 5,
  crossCars = 4
}) => {
  // Make array of cars
  const carsArray = Array(totalCars).fill(0);
  return /*#__PURE__*/React.createElement("div", {
    className: "car-grid"
  }, carsArray.map((_, idx) => {
    const isCrossCar = idx >= totalCars - crossCars; // last N cars get cross
    return /*#__PURE__*/React.createElement("div", {
      key: idx,
      style: {
        position: "relative",
        display: "inline-block"
      },
      className: "car-wrapper"
    }, /*#__PURE__*/React.createElement("img", {
      src: pencil,
      alt: "car",
      className: "car"
    }), isCrossCar && /*#__PURE__*/React.createElement("div", {
      className: "cros-align"
    }, /*#__PURE__*/React.createElement(CrossIcon, null)));
  }));
};
export default CarOne;