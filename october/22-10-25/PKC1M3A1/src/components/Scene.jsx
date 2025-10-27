import React, { useState } from "react";
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
import zerofinger from "../assets/zerofinger.png";
import ReusableButton from "./ReusableButton";
const Scene = ({ goNext }) => {
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
          <div className="align-next">
            <ReusableButton
              label={t("buttons.next")}
              padding="2vh"
              fontSize="3vw"
              onClick={() => {
                playClick();
                goNext();
              }}
            />
          </div>
          <img src={zerofinger} style={{ width: "30vw" }} />
        </div>
      </div>
    </div>
  );
};

export default Scene;
