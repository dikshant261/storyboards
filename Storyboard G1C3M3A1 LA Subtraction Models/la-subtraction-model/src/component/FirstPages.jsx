import React from "react";
import "./FirstPage.css";
import box from '../assets/box.png'
const FirstPages = ({ onClose }) => {
  const handleStart = () => {
    onClose();
  };
  return (
    <div className="container">
      <div className="container-flow">
        <div className="left-flow fade-slide-in">
          <p>
            Hey! Look at this<br/> tower made out of<br/> cubes… 
            
          </p>
          <p>Let’s Subtract 2<br/> using a Cube<br/> Tower.</p>
        </div>
        <div className="car-container">
          <div className="car-containe-item-one">
            {/* <div className="heading-align fade-slide-in">
              <div
                className="car-box"
                style={{
                  marginLeft: "13vw",
                }}
              >
                <p>5</p>
              </div>
              <div className="minus-line"></div>
              <div className="car-box"></div>
            </div> */}
            <div className="bouncy">
              <img src={box} className="box-img"/>
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

export default FirstPages;
