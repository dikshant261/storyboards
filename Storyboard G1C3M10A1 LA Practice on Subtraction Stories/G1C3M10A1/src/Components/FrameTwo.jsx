import React, { useEffect, useState } from "react";

import "./FrameOne.css";
import imagetwo from "../assets/imagetwo.png";
import click from "../assets/click.mp3";
import Option from "./Option";
import wrong from "../assets/wrong.mp3";
import right from "../assets/correct.mp3";
const FrameTwo = ({ onNext }) => {
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
    if (num === 3) {
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
          <div>
            <p
              className="slide-left"
              style={{
                fontWeight: 900,
                marginBottom:"2vw"
              }}
            >
              Write the <br />
              subtraction story
              <br /> first.
            </p>
            <p>
              A subtraction story
              <br /> tells the total
              <br /> number, how much
              <br /> part is taken away
              <br /> and how much
              <br /> remain.
            </p>
          </div>
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
                6 children were total.
                <br />
                4 children are wearing blue shirt, then
                <br /> Remaining 2 are wearing white shirt.
              </p>
            </div>
          )}
          <div className="frame-image-container">
            <img src={imagetwo} alt="image" className="frame-image scale-up" />
          </div>
          {/*  */}
        </div>
        <div className="frame-container-left-option">
          {stepOne && (
            <div className="option-align">
              <div className="option-align-col slide-right">
                <Option
                  content={"There are 6 children in total."}
                  onClick={() => handleOptionOne(1)}
                />
                <Option
                  content={"There are 6 children eating."}
                  onClick={() => handleOptionOne(2)}
                />
              </div>
              <div className="option-align-col slide-left">
                <Option
                  content={"There are 6 children sleeping."}
                  onClick={() => handleOptionOne(3)}
                />
                <Option
                  content={"There are 6 children studying."}
                  onClick={() => handleOptionOne(4)}
                />
              </div>
            </div>
          )}
          {stepTwo && (
            <div className="option-align" style={{
                gap:"4vw"
            }}>
              <div className="option-align-col slide-right">
                <Option
                  content={"4 children are wearing Red shirt"}
                  onClick={() => handleOptionTwo(1)}
                  style={{
                    width:"31vw"
                  }}
                />
                <Option
                  content={"4 children are wearing Blue shirt"}
                  onClick={() => handleOptionTwo(2)}
                   style={{
                    width:"31vw"
                  }}
                />
              </div>
              <div className="option-align-col slide-left">
                <Option
                  content={"4 children are wearing White shirt"}
                  onClick={() => handleOptionTwo(3)}
                   style={{
                    width:"31vw"
                  }}
                />
                <Option
                  content={"4 children are wearing Yellow shirt"}
                  onClick={() => handleOptionTwo(4)}
                   style={{
                    width:"31vw"
                  }}
                />
              </div>
            </div>
          )}
          {stepThree && (
            <div className="option-align" style={{
                gap:"1vw"
            }}>
              <div className="option-align-col slide-left">
                <Option
                  content={"Remaining 2 are wearing Blue shirt"}
                  onClick={() => handleOptionThree(1)}
                  style={{
                    width:"33vw"
                  }}
                />
                <Option
                  content={"Remaining 2 are wearing Red shirt"}
                  onClick={() => handleOptionThree(2)}
                  style={{
                    width:"33vw"
                  }}
                />
              </div>
              <div className="option-align-col slide-right">
                <Option
                  content={"Remaining 2 are wearing White shirt"}
                  onClick={() => handleOptionThree(3)}
                  style={{
                    width:"35vw"
                  }}
                />
                <Option
                  content={"Remaining 2 are wearing Red shirt"}
                  onClick={() => handleOptionThree(4)}
                  style={{
                    width:"35vw"
                  }}
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
            <h2 className="frame-footer-heading slide-right">
              Tap ▶ to continue.
            </h2>
          )}
          {stepOne && (
            <h2 className="frame-footer-heading slide-right">
              Tap the correct option.
            </h2>
          )}
          {stepTwo && (
            <h2 className="frame-footer-heading slide-right">
              Tap the correct option.
            </h2>
          )}
          {stepThree && (
            <h2 className="frame-footer-heading slide-right">
              Tap the correct option.
            </h2>
          )}
          {stepFour && (
            <h2 className="frame-footer-heading slide-right">
              Tap MAKE A STORY.
            </h2>
          )}
          {stepFive && (
            <h2 className="frame-footer-heading slide-left">
              Tap ▶ to Continue.
            </h2>
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

export default FrameTwo;
