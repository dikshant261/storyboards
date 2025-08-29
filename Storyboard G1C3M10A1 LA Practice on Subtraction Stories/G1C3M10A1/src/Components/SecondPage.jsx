import React from "react";
import click from "../assets/click.mp3";
import "./FirstPage.css";
import imagetwo from "../assets/imagetwo.png";
const SecondPage = ({ onClose }) => {
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto"; // ensures it's loaded early

  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };

  const handleStart = () => {
    clickHandle();
    onClose();
  };

  return (
    <div className="contianer">
      <div className="container-left">
        <p className="slide-right">
          The picture
          <br /> represents a<br /> subtraction story.
        </p>
        <p className="slide-left">
          Make a subtraction
          <br /> story and build a<br /> subtraction sentence.
        </p>
      </div>
      <div className="container-right">
        <div className="contianer-img-item">
          <div className="image-container">
            <img src={imagetwo} alt="image" className="image scale-up" />
          </div>

        </div>
        <div className="container-left-option ">
          <div className="slide-mid"> 
          <button
            className="start-button"
            onClick={() => {
              handleStart();
            }}
          >
            Start
          </button>
          </div>
        </div>
        <div className="container-left-navigation">
          <h3 className="footer-heading">
            <h2 className="slide-left">Tap Start...</h2>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
