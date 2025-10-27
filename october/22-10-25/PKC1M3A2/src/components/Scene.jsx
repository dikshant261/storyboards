import React, { useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import Mindy_Pointing_Up_Mid from "../assets/Mindy_Pointing_Up_Mid.png";
import { useTranslation } from "react-i18next";
import Onefinger from "../assets/Onefinger.png";
import Threefinger from "../assets/Threefinger.png";
import Twofinger from "../assets/Twofinger.png";
import fourfinger from "../assets/fourfinger.png";
import Fivefinger from "../assets/Fivefinger.png";
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

const Scene = () => {
  const { t } = useTranslation();
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });

  const handleClick = (key, playFn) => {
    playFn();
    setClicked((prev) => {
      const updated = { ...prev, [key]: true };
      return updated;
    });
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
        <div className="one">
          <img
            src={Onefinger}
            style={{ width: "19vw", cursor: "pointer" }}
            onClick={() => {
              handleClick("one", playOne);
            }}
          />
          <img
            src={Twofinger}
            style={{ width: "19vw", cursor: "pointer" }}
            onClick={() => {
              handleClick("two", playTwo);
            }}
          />
          <img
            src={Threefinger}
            style={{ width: "19vw", cursor: "pointer" }}
            onClick={() => {
              handleClick("three", playThree);
            }}
          />
          <img
            src={fourfinger}
            style={{ width: "19vw", cursor: "pointer" }}
            onClick={() => {
              handleClick("four", playFour);
            }}
          />
          <img
            src={Fivefinger}
            style={{ width: "19vw", cursor: "pointer" }}
            onClick={() => {
              handleClick("five", playFive);
            }}
          />
        </div>
      </div>
      <div className="footer">
        <p>{t("tap")}</p>
        <ReusableButton
          label={t("buttons.next")}
          padding={"1vh"}
          fontSize="3vw"
          showTap={false}
          showActive={false}
          onClick={() => {
            playClick();
            window.location.reload();
          }}
          disabled={!allClicked} // Enable when all images are clicked
        />
      </div>
    </div>
  );
};

export default Scene;
