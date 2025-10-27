import React, { useEffect, useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import Mindy_Pointing_Up_Mid from "../assets/Mindy_Pointing_Up_Mid.png";
import { useTranslation } from "react-i18next";
import one from "../assets/one.png";
import two from "../assets/two.png";
import five from "../assets/five.png";
import { playClick, playFive, playOne, playThree, playTwo } from "./PlayAudio";
import Tap from "./Tap";
import speaker from "../assets/speaker.png";
import fivefinger from "../assets/fivefinger.png";
import ReusableButton from "./ReusableButton";
import WhitePointer from "./WhitePointer";
const SceneEleven = ({ goPrev, goNext }) => {
  const { t } = useTranslation();
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
  });

  const handleClick = (key, playFn) => {
    playFn();
    setClicked((prev) => {
      const updated = { ...prev, [key]: true };
      return updated;
    });
  };

  // If all three are clicked at least once, button becomes enabled
  const allClicked = clicked.one && clicked.two && clicked.three;

  return (
    <div className="scene-container">
      <div
        className="top"
        style={{
          justifyContent: "center",
        }}
      >
        <p
          className="top-heading"
          style={{
            textAlign: "center",
            fontSize: "6vw",
          }}
        >
          {t("afterNine")}
        </p>
      </div>

      <div className="main">
        <div className="one">
          <WhitePointer top={"17%"} right={"18.8%"} width="5vw" height="8vh" />
          <WhitePointer top={"12%"} right={"25%"} width="5vw" height="8vh" />
          <WhitePointer top={"17%"} right={"31.8%"} width="5vw" height="8vh" />
          <WhitePointer top={"26%"} right={"35.8%"} width="5vw" height="8vh" />
          <WhitePointer top={"44%"} right={"14.8%"} width="5vw" height="8vh" />

          {/* right */}

          <WhitePointer top={"17%"} left={"18.8%"} width="5vw" height="8vh" />
          <WhitePointer top={"12%"} left={"25%"} width="5vw" height="8vh" />
          <WhitePointer top={"17%"} left={"30.8%"} width="5vw" height="8vh" />
          <WhitePointer top={"26%"} left={"35.8%"} width="5vw" height="8vh" />
          <WhitePointer top={"44%"} left={"14.8%"} width="5vw" height="8vh" />
          <img
            src={fivefinger}
            className="image-two"
            style={{ width: "27vw", transform: "translateY(2.4vw) scaleX(-1)" }}
          />
          <img
            src={fivefinger}
            style={{ width: "27vw", transform: "translateY(2.4vw)" }}
          />
        </div>
        <button
          className="align-previous"
          onClick={() => {
            playClick();
            goPrev();
          }}
        >
          {t("buttons.previous")}
        </button>
        <div
          style={{
            position: "absolute",
            bottom: "1%",
            right: "-4%",
            border: "0.3vw solid orange",
            borderRadius: "1.3vw",
          }}
        >
          <ReusableButton
            onClick={() => {
              playClick();
              window.location.reload();
            }}
            label={t("buttons.startOver")}
            padding={"1vh"}
            fontSize="3vw"
            showActive={false}
            showTap={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SceneEleven;
