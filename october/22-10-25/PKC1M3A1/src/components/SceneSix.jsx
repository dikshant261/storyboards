import React, { useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import Mindy_Pointing_Up_Mid from "../assets/Mindy_Pointing_Up_Mid.png";
import { useTranslation } from "react-i18next";
import one from "../assets/one.png";
import two from "../assets/two.png";
import five from "../assets/five.png";
import { playClick, playOne, playThree, playTwo } from "./PlayAudio";
import Tap from "./Tap";
import speaker from "../assets/speaker.png";
import Fivefinger from "../assets/Fivefinger.png";
import ReusableButton from "./ReusableButton";
import WhitePointer from "./WhitePointer";
const SceneSix = ({ goPrev, goNext }) => {
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
      <div className="top">
        <p className="top-heading">{t("count")}</p>
        <div className="align-hand-image">
          <p className="shout-loud">{t("shout")}</p>
          <img src={raisehandchild} className="boy-hand" />
        </div>
      </div>

      <div className="main">
        <div className="one">
          <WhitePointer top={"17%"} right={"23.8%"} width="5vw" height="8vh" />
          <WhitePointer top={"12%"} right={"30%"} width="5vw" height="8vh" />
          <WhitePointer top={"17%"} right={"35.8%"} width="5vw" height="8vh" />
          <WhitePointer top={"26%"} right={"40.8%"} width="5vw" height="8vh" />
          <WhitePointer top={"44%"} right={"18.8%"} width="5vw" height="8vh" />
          <img src={five} className="image-two" style={{width:"19vw"}} />
          <img
            src={Fivefinger}
            style={{ width: "27vw", transform: "translateY(2.4vw)" }}
          />
          <div className="align-next" style={{ right: "-1%", top: "34%" }}>
            <ReusableButton
              label={t("buttons.startOver")}
              padding="2vh"
              fontSize="3vw"
              showActive={false}
              showTap={false}
              onClick={() => {
                playClick();
                window.location.reload();
              }}
            />
          </div>
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
      </div>
    </div>
  );
};

export default SceneSix;
