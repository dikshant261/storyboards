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
import ReusableButton from "./ReusableButton";

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
        <div className="top-heading">{t("tapNumbers")}</div>
        <div className="align-hand-image">
          <p className="shout-loud">{t("shoutLound")}</p>
          <img src={raisehandchild} className="boy-hand" />
        </div>
      </div>

      <div className="main">
        <div className="girl-container">
          <div className="box">
            {t("tapTheNumbers")}
            <div className="align-triangle">▼</div>
          </div>
          <img src={Mindy_Pointing_Up_Mid} className="girl-image" />
        </div>

        <div className="one">
          <Tap top={"38%"} left={"19%"} width={"9vw"} />
          <div className="align-next">
            <ReusableButton
              label={t("buttons.next")}
              width="13vw"
              height="10vh"
              fontSize="4vw"
              showTap={false}
              showActive={false}
              onClick={() => {
                playClick();
                window.location.reload();
              }}
              disabled={!allClicked} // Enable when all images are clicked
            />
          </div>

          <img
            src={one}
            className="image-one"
            onClick={() => handleClick("one", playOne)}
          />
          <img
            src={two}
            className="image-two"
            onClick={() => handleClick("two", playTwo)}
          />
          <img
            src={three}
            className="image-three"
            onClick={() => handleClick("three", playThree)}
          />
        </div>
      </div>
    </div>
  );
};

export default Scene;
