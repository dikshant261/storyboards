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
const Scene = () => {
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
        <div className="align-hand-image">
          <p className="shout-loud">{t("shoutLound")}</p>
          <img src={raisehandchild} className="boy-hand" />
        </div>
      </div>

      <div className="main">
        <div className="one">
          <Tap bottom={"0"} left={"19%"} width={"6vw"} />
          <div className="speaker-image-align">
            <img
              src={one}
              className="image-one"
              onClick={() => handleClick("one", playOne)}
            />
            <img
              src={speaker}
              className="speaker"
              onClick={() => handleClick("one", playOne)}
            />
          </div>
          <div className="speaker-image-align">
            <img
              src={two}
              className="image-two"
              onClick={() => handleClick("two", playTwo)}
            />
            <img
              src={speaker}
              className="speaker"
              onClick={() => handleClick("two", playTwo)}
            />
          </div>
          <div className="speaker-image-align">
            <img
              src={three}
              className="image-three"
              onClick={() => handleClick("three", playThree)}
            />
            <img
              src={speaker}
              className="speaker"
              onClick={() => handleClick("three", playThree)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene;
