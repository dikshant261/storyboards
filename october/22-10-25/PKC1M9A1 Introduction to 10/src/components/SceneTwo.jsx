import React, { useEffect, useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import Mindy_Pointing_Up_Mid from "../assets/Mindy_Pointing_Up_Mid.png";
import { useTranslation } from "react-i18next";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import { playClick, playOne, playThree, playTwo } from "./PlayAudio";
import Tap from "./Tap";
import speaker from "../assets/speaker.png";
import Onefinger from "../assets/Onefinger.png";
import ReusableButton from "./ReusableButton";
import WhitePointer from "./WhitePointer";
const SceneTwo = ({ goPrev, goNext }) => {
  const { t } = useTranslation();
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
  });
  useEffect(() => {
    setTimeout(() => {
      playOne();
    }, 1000);
  }, []);
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
          <WhitePointer top={"13%"} right={"25.8%"} />
          <img src={one} className="image-one" />
          <img
            src={Onefinger}
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
          className="align-Next"
          onClick={() => {
            goNext();
            playClick();
          }}
        >
          {t("buttons.Next")}
        </div>
      </div>
    </div>
  );
};

export default SceneTwo;
