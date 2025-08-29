import React, { useEffect, useState } from "react";

import "./FrameOne.css";
import imageone from "../assets/imageone.png";
import click from "../assets/click.mp3";
import Option from "./Option";
import wrong from "../assets/wrong.mp3";
import right from "../assets/correct.mp3";
const FrameOne = ({ onNext }) => {
  const [sideHeadingOne, setSideHeadingOne] = useState(true);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [stepFive, setStepFive] = useState(false);
  const [arrowAnimation, setArrowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setArrowAnimation(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  //audio variables
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto"; // ensures it's loaded early

  //wrong audio variables
  const clickWrong = new Audio(wrong);
  clickWrong.preload = "auto";

  //right audio variable
  const clickRight = new Audio(right);
  clickRight.preload = "auto";
  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };

  const wrongHandle = () => {
    clickWrong.currentTime = 0;
    clickWrong.play();
  };

  const rightHandle = () => {
    clickRight.currentTime = 0;
    clickRight.play();
  };
  const handleStepOne = () => {
    clickHandle();
    setSideHeadingOne(false);
    setStepOne(true);
  };

  const handleOptionOne = (num) => {
    if (num === 1) {
      rightHandle();
      setStepOne(false);
      setStepTwo(true);
    } else {
      wrongHandle();
    }
  };
  const handleOptionTwo = (num) => {
    if (num === 2) {
      rightHandle();
      setStepTwo(false);
      setStepThree(true);
    } else {
      wrongHandle();
    }
  };
  const handleOptionThree = (num) => {
    if (num === 1) {
      rightHandle();
      setStepThree(false);
      setStepFour(true);
    } else {
      wrongHandle();
    }
  };
  const handleStory = () => {
    clickHandle();
    setStepFour(false);
    setStepFive(true);
  };
  const handleNext = () => {
    clickHandle();
    setStepFive(false);
    setArrowAnimation(false);
    onNext();
  };
  return (
    <div className="frame-contianer">
      <div className="frame-container-left">
        {sideHeadingOne && (
          <p className="slide-left">
            A subtraction story
            <br /> tells the total
            <br /> number, what is
            <br /> taken away and
            <br />
            what remains.
          </p>
        )}
        {stepOne && (
          <div className="slide-right">
            <p
              style={{
                fontWeight: 900,
                textAlign: "left",
              }}
            >
              Step 1: Write
              <br /> about the total
              <br /> number.
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              Choose the option
              <br /> that matches the
              <br /> story in the picture.
            </p>
          </div>
        )}
        {stepTwo && (
          <div className="slide-mid">
            <p
              style={{
                textAlign: "left",
              }}
            >
              Step 1: Write about
              <br /> the total number.
              <br /> ✅
            </p>
            <p
              style={{
                fontWeight: 900,
                textAlign: "left",
              }}
            >
              <b>
                Step 2: Write
                <br /> about how much
                <br /> is taken away.
              </b>
            </p>
            <p
              style={{
                marginTop: "3vw",
                textAlign: "left",
              }}
            >
              Choose the option <br />
              that matches the
              <br /> story in the picture.
            </p>
          </div>
        )}
        {stepThree && (
          <div className="slide-left">
            <p
              style={{
                textAlign: "left",
              }}
            >
              Step 1: Write about
              <br /> the total number.
              <br /> ✅
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              Step 2: Write
              <br /> about how much
              <br /> is taken away.
              <br />✅
            </p>
            <p
              style={{
                fontWeight: "900",
                textAlign: "left",
              }}
            >
              <b>
                Step 3: Write
                <br /> about how many
                <br /> remain.
              </b>
            </p>
            <p
              style={{
                marginTop: "2vw",
                textAlign: "left",
              }}
            >
              Choose the option <br />
              that matches the
              <br /> story in the picture.
            </p>
          </div>
        )}
        {stepFour && (
          <div className="slide-right">
            <p
              style={{
                textAlign: "left",
              }}
            >
              Step 1: Write about
              <br /> the total number.
              <br /> ✅
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              Step 2: Write
              <br /> about how much
              <br /> is taken away.
              <br />✅
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              <b>
                Step 3: Write
                <br /> about how many
                <br /> remain.
                <br />✅
              </b>
            </p>
            <p
              style={{
                marginTop: "2vw",
                textAlign: "left",
              }}
            >
              Write all these
              <br /> steps together in
              <br /> the form of story.{" "}
            </p>
          </div>
        )}
        {stepFive && (
          <div className="slide-mid">
            <p
              style={{
                fontWeight: 800,
                textAlign: "left",
                marginBottom: "2vw",
              }}
            >
              Make a note of
              <br /> this subtraction
              <br /> story.
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              Remember the <br />
              steps:{" "}
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              <b>Step 1</b>: Write about
              <br /> the total number.
              <br /> ✅
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              <b>Step 2</b>: Write
              <br /> about how much
              <br /> is taken away.
              <br />✅
            </p>
            <p
              style={{
                textAlign: "left",
              }}
            >
              <b>Step 3</b>: Write
              <br /> about how many
              <br /> remain.✅
            </p>
          </div>
        )}
      </div>
      <div className="frame-container-right">
        <div className="frame-contianer-img-item">
          {stepFive && (
            <div className="story scale-up">
              <p>
                6 children were playing.
                <br />
                2 children left the game, then
                <br /> 4 children remained.
              </p>
            </div>
          )}
          <div className="frame-image-container">
            <img src={imageone} alt="image" className="frame-image scale-up" />
          </div>
          <div
            className="frame-align-box"
            style={{
              position: "relative",
            }}
          >
            <div
              className={`${
                stepOne ? "box-size" : ""
              } frame-image-box slide-left`}
            >
              6
            </div>
            <div className="frame-minus-line"></div>
            <div
              className={`${
                stepTwo ? "box-size" : ""
              } frame-image-box slide-right`}
            >
              2
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5vw",
              }}
            >
              <div className="frame-minus-line slide-up"></div>
              <div className="frame-minus-line slide-right"></div>
            </div>
            <div
              className={`${
                stepThree ? "box-size" : ""
              } frame-image-box slide-left`}
            >
              4
            </div>
            {sideHeadingOne && arrowAnimation &&(
              <div>
                <div className={`${arrowAnimation?"show-in":""}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="10.9 8.9 1.2 1.2"
                    className="arrow-align-one"
                  >
                    <path
                      d="M 12 9 Q 11 9 11 10"
                      stroke="gold"
                      stroke-width="0.06"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className={`${arrowAnimation?"show-in":""}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="10.9 8.9 1.2 1.2"
                    className="arrow-align-two"
                  >
                    <path
                      d="M 12 9 Q 11 9 11 10"
                      stroke="gold"
                      stroke-width="0.06"
                      fill="none"
                    />
                  </svg>
                </div>
                <div>
                  {" "}
                  <div className="arrow-line show-in"></div>
                </div>
                <div>
                  <p className="total-number show-in">Total Number</p>
                  <p className="take-away show-in">How much is taken away</p>
                  <p className="ramains show-in">
                    How Much
                    <br />
                    remains
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="frame-container-left-option">
          {stepOne && (
            <div className="option-align">
              <div className="option-align-col slide-right">
                <Option
                  content={"6 children are playing."}
                  onClick={() => handleOptionOne(1)}
                />
                <Option
                  content={"6 children are sitting."}
                  onClick={() => handleOptionOne(2)}
                />
              </div>
              <div className="option-align-col slide-left">
                <Option
                  content={"6 children are sleeping."}
                  onClick={() => handleOptionOne(3)}
                />
                <Option
                  content={"6 children are studying."}
                  onClick={() => handleOptionOne(4)}
                />
              </div>
            </div>
          )}
          {stepTwo && (
            <div className="option-align">
              <div className="option-align-col slide-right">
                <Option
                  content={"2 children woke up."}
                  onClick={() => handleOptionTwo(1)}
                />
                <Option
                  content={"2 children left the game."}
                  onClick={() => handleOptionTwo(2)}
                />
              </div>
              <div className="option-align-col slide-left">
                <Option
                  content={"2 children ate the chocolates."}
                  onClick={() => handleOptionTwo(3)}
                />
                <Option
                  content={"2 children slept."}
                  onClick={() => handleOptionTwo(4)}
                />
              </div>
            </div>
          )}
          {stepThree && (
            <div className="option-align">
              <div className="option-align-col slide-left">
                <Option
                  content={"4 children remain."}
                  onClick={() => handleOptionThree(1)}
                />
                <Option
                  content={"4 children went away."}
                  onClick={() => handleOptionThree(2)}
                />
              </div>
              <div className="option-align-col slide-right">
                <Option
                  content={"4 children were in total."}
                  onClick={() => handleOptionThree(3)}
                />
                <Option
                  content={"4 children went to study."}
                  onClick={() => handleOptionThree(4)}
                />
              </div>
            </div>
          )}
          {stepFour && (
            <div className="slide-mid">
              <button
                className="frame-start-button"
                style={{
                  width: "18vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "8vh",
                  fontWeight: "900",
                }}
                onClick={handleStory}
              >
                MAKE A STORY
              </button>
            </div>
          )}
        </div>
        <div
          className="frame-container-left-navigation"
          style={{
            position: "relative",
          }}
        >
          {sideHeadingOne && (
            <h2 className="frame-footer-heading slide-right">Tap ▶ to continue.</h2>
          )}
          {stepOne && (
            <h2 className="frame-footer-heading slide-right">Tap the correct option.</h2>
          )}
          {stepTwo && (
            <h2 className="frame-footer-heading slide-right">Tap the correct option.</h2>
          )}
          {stepThree && (
            <h2 className="frame-footer-heading slide-right">Tap the correct option.</h2>
          )}
          {stepFour && (
            <h2 className="frame-footer-heading slide-right">Tap MAKE A STORY.</h2>
          )}
          {stepFive && (
            <h2 className="frame-footer-heading slide-left">Tap ▶ for next question.</h2>
          )}
          <div>
            {sideHeadingOne && (
              <button className="next-button slide-mid" onClick={handleStepOne}>
                ▶
              </button>
            )}
            {stepFive && (
              <button className="next-button slide-mid" onClick={handleNext}>
                ▶
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameOne;
