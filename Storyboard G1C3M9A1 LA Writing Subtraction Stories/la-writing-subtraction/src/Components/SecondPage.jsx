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
          The picture and
          <br /> subtraction
          <br /> sentence
          <br /> represents a<br /> subtraction story
        </p>
        <p className="slide-left">
          Write a subtraction <br />
          story.{" "}
        </p>
      </div>
      <div className="container-right">
        <div className="contianer-img-item">
          <div className="image-container">
            <img src={imagetwo} alt="image" className="image scale-up" />
          </div>
          <div className="align-box">
            <div className="image-box slide-right">6</div>
            <div className="minus-line"></div>
            <div className="image-box slide-mid">4</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5vw",
              }}
            >
              <div className="minus-line"></div>
              <div className="minus-line"></div>
            </div>
            <div className="image-box slide-right">2</div>
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
