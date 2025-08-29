import React from "react";
import "./FirstPage.css";
import Car from "./Car";
const FirstPages = ({ onClose }) => {
  const handleStart = () => {
    onClose();
  };
  return (
    <div className="container">
      <div className="container-flow">
        <div className="left-flow fade-slide-in">
          <p>
            Hey! Look at the
            <br /> images of 5 cars.
            <br />
            <div className="adjust-heading">
              Let’s Subtract 3<br /> using pictures of
              <br /> objects.
            </div>
          </p>
        </div>
        <div className="car-container">
          <div className="car-containe-item-one">
            <div className="heading-align fade-slide-in">
              <h2>Subtracting 3 from 5 gives</h2>
              <div className="car-box"></div>
            </div>
             <div className="fade-slide-in"><Car /></div> 
            
          </div>
          <div className="footer-heading">
            <h1>Tap Start to begin…</h1>
          </div>
        </div>
      </div>
      <button className="start-btn fade-slide-in" onClick={handleStart}>
        START
      </button>
    </div>
  );
};

export default FirstPages;
