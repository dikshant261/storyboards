import React, { useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import Mindy_Pointing_Up_Mid from "../assets/Mindy_Pointing_Up_Mid.png";
import { useTranslation } from "react-i18next";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import { playClick, playOne, playTwo, playThree } from "./PlayAudio";
import speaker from "../assets/speaker.png";
import ReusableButton from "./ReusableButton";
import Tap from "./Tap";

const Scene = () => {
  const { t } = useTranslation();
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
  });
  const [start, setStart] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false); // prevent multiple plays

  const handleClick = (key, playFn) => {
    playFn();
    setClicked((prev) => ({ ...prev, [key]: true }));
  };

  const allClicked = clicked.one && clicked.two && clicked.three;

  const handleSpeakerClick = () => {
    if (isPlaying) return; // stop if already playing

    const randomFn = [playOne, playTwo, playThree][
      Math.floor(Math.random() * 3)
    ];

    setIsPlaying(true);
    setStart(false);

    // Play chosen sound
    randomFn();

    // Assume each audio ~1.5s — adjust to your actual duration
    setTimeout(() => {
      setIsPlaying(false);
    }, 1500);
  };

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
            {start && <p>{t("tapSpeaker")}</p>}
            {!start && <p>{t("tapTheNumbers")}</p>}
            <div className="align-triangle">▼</div>
          </div>
          <img src={Mindy_Pointing_Up_Mid} className="girl-image" />
        </div>

        <div className="one">
          <div className="speaker-align">
            <img
              src={speaker}
              className={`speaker ${isPlaying ? "disabled-speaker" : ""}`}
              onClick={handleSpeakerClick}
              style={{ cursor: isPlaying ? "not-allowed" : "pointer" }}
            />
            {start && <Tap bottom={"-23%"} left={"21%"} width={"6vw"} />}
          </div>

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
              disabled={!allClicked}
            />
          </div>

          <img
            src={one}
            className={`image-one ${start ? "opacity" : ""}`}
            onClick={() => handleClick("one", playOne)}
          />
          <img
            src={two}
            className={`image-two ${start ? "opacity" : ""}`}
            onClick={() => handleClick("two", playTwo)}
          />
          <img
            src={three}
            className={`image-three ${start ? "opacity" : ""}`}
            onClick={() => handleClick("three", playThree)}
          />
        </div>
      </div>
    </div>
  );
};

export default Scene;
