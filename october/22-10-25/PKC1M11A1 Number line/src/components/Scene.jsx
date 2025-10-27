import React, { useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import Mindy_Pointing_Up_Mid from "../assets/Mindy_Pointing_Up_Mid.png";
import { useTranslation } from "react-i18next";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import four from "../assets/four.png";
import five from "../assets/five.png";
import six from "../assets/six.png";
import seven from "../assets/seven.png";
import eight from "../assets/eight.png";
import nine from "../assets/nine.png";
import ten from "../assets/ten.png";
import {
  playClick,
  playOne,
  playTwo,
  playThree,
  playFour,
  playFive,
  playSix,
  playSeven,
  playEight,
  playNine,
  playTen,
  playWrong,
} from "./PlayAudio";
import speaker from "../assets/speaker.png";
import ReusableButton from "./ReusableButton";
import numberline from "../assets/numberline.png";
import Tap from "./Tap";
const playSound = [
  playOne,
  playTwo,
  playThree,
  playFour,
  playFive,
  playSix,
  playSeven,
  playEight,
  playNine,
  playTen,
];
const Scene = () => {
  const { t } = useTranslation();
  const [boxVisible, setBoxVisible] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [imageShow, setImageShow] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [next, setNext] = useState(false);
  const handleClick = (id) => {
    if (id !== currentNumber) {
      playWrong();
      return;
    } else {
      if (id === 8) {
        setDisabled(true);
        setNext(true);
      }
      console.log("currentNumber", currentNumber);
      playSound[currentNumber + 1]();
      setCurrentNumber((prev) => prev + 1);
      setImageShow((prev) => prev.map((item, i) => (i === id ? true : item)));
      setBoxVisible((prev) =>
        prev.map((_, i) => {
          if (i === id) return false; // make current false
          if (i === id + 1) return true; // make next true
          return prev[i]; // keep others unchanged
        })
      );
    }
  };
  return (
    <div className="scene-container">
      <div className="top">
        <div className="top-heading">{t("tapNumbers")}</div>
        {/* <div className="align-hand-image">
          <p className="shout-loud">{t("shoutLound")}</p>
          <img src={raisehandchild} className="boy-hand" />
        </div> */}
      </div>

      <div className="main">
        <div className="girl-container">
          <div className="box">
            {<p>{t("tapSpeaker")}</p>}
            <div className="align-triangle">▼</div>
          </div>
          <img src={Mindy_Pointing_Up_Mid} className="girl-image" />
        </div>

        <div className="one">
          <div
            style={{
              position: "fixed",
              top: "28%",
              left: "40%",
            }}
          >
            <img
              src={one}
              style={{
                width: "4vw",
              }}
            />
          </div>
          <div
            className={`${boxVisible[0] ? "image-box active" : ""}`}
            style={{
              left: "46%",
            }}
          >
            {imageShow[0] && (
              <img
                src={two}
                style={{
                  position: "fixed",
                  width: "3.6vw",
                  left: "46%",
                  top: "28%",
                }}
              />
            )}
          </div>
          <div
            className={`${boxVisible[1] ? "image-box active" : ""}`}
            style={{
              left: "51%",
            }}
          >
            {imageShow[1] && (
              <img
                src={three}
                style={{
                  position: "fixed",
                  width: "3.6vw",
                  left: "51%",
                  top: "28%",
                }}
              />
            )}
          </div>
          <div
            className={`${boxVisible[2] ? "image-box active" : ""}`}
            style={{
              left: "56%",
            }}
          >
            {imageShow[2] && (
              <img
                src={four}
                style={{
                  position: "fixed",
                  width: "4vw",
                  left: "56%",
                  top: "28%",
                }}
              />
            )}
          </div>
          <div
            className={`${boxVisible[3] ? "image-box active" : ""}`}
            style={{
              left: "61%",
            }}
          >
            {imageShow[3] && (
              <img
                src={five}
                style={{
                  position: "fixed",
                  width: "3.6vw",
                  left: "61%",
                  top: "28%",
                }}
              />
            )}
          </div>
          <div
            className={`${boxVisible[4] ? "image-box active" : ""}`}
            style={{
              left: "66%",
            }}
          >
            {imageShow[4] && (
              <img
                src={six}
                style={{
                  position: "fixed",
                  width: "7vw",
                  left: "65%",
                  top: "27%",
                }}
              />
            )}
          </div>
          <div
            className={`${boxVisible[5] ? "image-box active" : ""}`}
            style={{
              left: "71%",
            }}
          >
            {imageShow[5] && (
              <img
                src={seven}
                style={{
                  position: "fixed",
                  width: "6vw",
                  left: "70.5%",
                  top: "27.5%",
                }}
              />
            )}
          </div>
          <div
            className={`${boxVisible[6] ? "image-box active" : ""}`}
            style={{
              left: "76%",
            }}
          >
            {imageShow[6] && (
              <img
                src={eight}
                style={{
                  position: "fixed",
                  width: "6vw",
                  left: "75.5%",
                  top: "27.5%",
                }}
              />
            )}
          </div>
          <div
            className={`${boxVisible[7] ? "image-box active" : ""}`}
            style={{
              left: "82%",
            }}
          >
            {imageShow[7] && (
              <img
                src={nine}
                style={{
                  position: "fixed",
                  width: "6vw",
                  left: "80.5%",
                  top: "27.5%",
                }}
              />
            )}
          </div>
          <div
            className={`${boxVisible[8] ? "image-box active" : ""}`}
            style={{
              left: "87%",
            }}
          >
            {imageShow[8] && (
              <img
                src={ten}
                style={{
                  position: "fixed",
                  width: "6.5vw",
                  left: "86.5%",
                  top: "27.5%",
                }}
              />
            )}
          </div>
          <img src={numberline} className="numberline" />
          <div className="align-row">
            <img
              src={nine}
              style={{
                width: "12vw",
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? "0.6" : "1",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              onClick={() => handleClick(7)}
            />
            <img
              src={two}
              style={{
                width: "7vw",
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? "0.6" : "1",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              onClick={() => handleClick(0)}
            />
            <img
              src={five}
              style={{
                width: "7vw",
                marginLeft: "3vw",
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? "0.6" : "1",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              onClick={() => handleClick(3)}
            />
            <img
              src={eight}
              style={{
                width: "13vw",
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? "0.6" : "1",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              onClick={() => handleClick(6)}
            />
            <img
              src={four}
              style={{
                width: "8vw",
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? "0.6" : "1",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              onClick={() => handleClick(2)}
            />
          </div>
          <div className="align-row">
            <img
              src={six}
              style={{
                width: "12vw",
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? "0.6" : "1",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              onClick={() => handleClick(4)}
            />
            <img
              src={three}
              style={{
                width: "7vw",
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? "0.6" : "1",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              onClick={() => handleClick(1)}
            />
            <img
              src={seven}
              style={{
                width: "12vw",
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? "0.6" : "1",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              onClick={() => handleClick(5)}
            />
            <img
              src={ten}
              style={{
                width: "12vw",
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? "0.6" : "1",
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              onClick={() => handleClick(8)}
            />
          </div>
        </div>
      </div>
      {next && (
        <div
          style={{
            position: "fixed",
            bottom: "1%",
            right: "1%",
          }}
        >
          <ReusableButton
            label={t("buttons.startOver")}
            padding={"1vh 2vw"}
            fontSize="3vw"
            showTap={false}
            onClick={() => {
              playClick();
              window.location.reload();
            }}
          />
          <Tap bottom={"0%"} />
        </div>
      )}
    </div>
  );
};

export default Scene;
