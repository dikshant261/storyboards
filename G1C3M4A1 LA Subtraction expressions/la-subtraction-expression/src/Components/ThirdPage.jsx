import React from "react";
import "./FirstPage.css";
import Car from "./Car";
const ThirdPage = ({ onClose, questionData }) => {
  const handleStart = () => {
    onClose();
  };
  return (
    <div className="container">
      <div className="container-flow">
        <div className="left-flow fade-slide-in">
          <p>
            There are many cars in
            <br /> picture. Some of the
            <br /> cars are crossed
            <br /> showing subtraction.
            <br />
            <div className="adjust-heading">
              Count and complete
              <br /> the subtraction
              <br /> sentence given along
              <br /> with the picture
            </div>
          </p>
        </div>
        <div className="car-container">
          <div className="car-containe-item-one">
            <div className="heading-align fade-slide-in">
              <div
                className="car-box"
                style={{
                  marginLeft: "13vw",
                }}
              ></div>
              <div className="minus-line"></div>
              <div className="car-box"></div>
            </div>
            <div className="bouncy">
              <Car
                totalCars={questionData.totalCars}
                crossCars={questionData.crossCars}
              />
            </div>
            <button className="start-btn fade-slide-in" onClick={handleStart}>
              START
            </button>
          </div>
          <div className="footer-heading">
            <h1>Tap Start to begin…</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
