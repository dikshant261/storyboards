import React from "react";
import "./FirstPage.css";
import Car from "./Car";
const SecondPage = ({ onClose }) => {
  const handleStart = () => {
    onClose();
  };
  return (
    <div className="container">
      <div className="container-flow">
        <div className="left-flow fade-slide-in">
          <p>
            Hey! Look at the
            <br /> picture.
            <br />
            <div className="adjust-heading">
              Let’s complete the
              <br /> subtraction
              <br /> sentence using
              <br /> the information in
              <br />
              the picture.
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
              <div className="car-box">
                <p>2</p>
              </div>
            </div>
            <div className="bouncy">
              <Car totalCars={6} crossCars={2} />
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

export default SecondPage;
