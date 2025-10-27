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
import {
  playClick,
  playFive,
  playFour,
  playOne,
  playThree,
  playTwo,
} from "./PlayAudio";
import Tap from "./Tap";
import ReusableButton from "./ReusableButton";
const question = [
  { image: "assets/one.png", audio: playOne, number: "one" },
  { image: "assets/two.png", audio: playTwo, number: "two" },
  { image: "assets/three.png", audio: playThree, number: "three" },
  { image: "assets/four.png", audio: playFour, number: "four" },
  { image: "assets/five.png", audio: playFive, number: "five" },
];

const Scene = () => {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (key, playFn) => {
    playFn();
    setDisabled(false);
  };
  const handleNext = () => {
    playClick();

    if (currentIndex === question.length - 1) {
      window.location.reload();
    } else {
      setDisabled(true);
      setCurrentIndex((prev) => prev + 1);
    }
  };
  // If all three are clicked at least once, button becomes enabled
  const allClicked =
    clicked.one && clicked.two && clicked.three && clicked.four && clicked.five;

  return (
    <div className="scene-container">
      <div className="top">
        <div className="top-heading">{t("count")}</div>
        <div className="align-hand-image">
          <p className="shout-loud">{t("shout")}</p>
          <img src={raisehandchild} className="boy-hand" />
        </div>
      </div>

      <div className="main">
        <div className="girl-container">
          <div className="box">
            {t("tap")}
            <div className="align-triangle">▼</div>
          </div>
          <img src={Mindy_Pointing_Up_Mid} className="girl-image" />
        </div>
        <div className="one">
          <Tap top={"74%"} left={"32%"} width={"6vw"} />
          <div className="align-next">
            <ReusableButton
              label={t("buttons.Next")}
              padding="2vh"
              fontSize="3vw"
              showTap={false}
              showActive={false}
              onClick={() => {
                handleNext();
              }}
              disabled={disabled} // Enable when all images are clicked
            />
          </div>
          <div className="align-row">
            <div className="align-num-col">
              <img
                src={question[currentIndex].image}
                className="image-one"
                onClick={() => handleClick("one", question[currentIndex].audio)}
              />
              <p>{t(question[currentIndex].number)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene;
