import React, { useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Question from "./Question";
import tap from "../assets/tap.gif";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import Boxes from "./Boxes";
import Slider from "./Slider";
import BoxTwo from "./BoxTwo";
import ErrorMessage from "./ErrorMessage";
import ProgressBar from "./ProgressBar";
const SceneThree = ({ onNext, onPrev }) => {
  const [value, setValue] = useState(null);
  const [showNormalBox, setShowNormalBox] = useState(true);
  const [showSpiltBox, setShowSplitBox] = useState(false);
  const [errorShow, setShowError] = useState(false);
  const [showSlider,setShowSlider]=useState(true);
  const [showNext,setShowNext]=useState(false);
  const { t } = useTranslation();

  const handleNext = () => {
    playClick();
    onNext();
  };

  const handlePrvious = () => {
    playClick();
    onPrev();
  };

  const handleValue = (num) => {
    setShowSplitBox(false);
    setShowError(false);
    setShowNormalBox(true);
    setValue(num);
  };
  const handleCheck = () => {
    if (value === "3") {
      playCorrect();
      setShowError(true);
      setShowNormalBox(false);
      setShowSplitBox(true);
      setShowSlider(false);
      setShowNext(true);
    } else {
      playWrong();
      setShowError(true);
      setShowNormalBox(false);
      setShowSplitBox(true);
    }
  };
  console.log(value, "value");
  return (
    <div className="scene-conatainer">
      <div className="scene-conatainer-heading">
        <p>{t("sceneThree.nowLetSplit")}</p>
      </div>
      <div
        className="scene-conatainer-main"
        style={{ justifyContent: "flex-start" }}
      >
        <div className="question-align">
          <Question
            divisor={2}
            dividend={3}
            style={{
              fontSize: "6vw",
              gap: "1vw",
              border: "0.3vw solid white",
              backgroundColor: "#23496ebf",
              borderRadius: "1vw",
              padding: "1vh 1vw",
            }}
          />
        </div>

        {showNormalBox && (
          <div className="box-align">
            <Boxes
              number={1}
              style={{
                backgroundColor: "#ff9c6a",
              }}
            />
            <Boxes
              number={2}
              style={{
                backgroundColor: "#0097a7",
              }}
            />
          </div>
        )}
        {showSpiltBox && (
          <div className="box-align">
            <BoxTwo
              number={1}
              divisor={value}
              style={{ backgroundColor: "#ff9c6a" }}
            />
            <BoxTwo
              number={2}
              divisor={value}
              style={{ backgroundColor: "#0097a7" }}
            />
          </div>
        )}
        <Slider divisorValue={handleValue} onCheck={handleCheck} showSlider={showSlider}/>
        {errorShow && <ErrorMessage divisor={3} value={value} />}
      </div>
      <div className="scene-conatainer-footer-heading">
        {showSlider && <p>{t("navigation.slider")}</p>}
        {showNext && <p>{t("navigation.tapNext")}</p>}
      </div>
      <div className="scene-conatainer-footer-buttons">
        <button onClick={handlePrvious}>{t("buttons.previous")}</button>
        <ProgressBar current={3}/>
        {showSlider && <button style={{
            backgroundColor:"gray",
            borderColor:"gray",
        }}>{t("buttons.next")}</button>}
        {showNext && <div style={{ position: "relative" }}>
          <button onClick={handleNext}>{t("buttons.next")}</button>
          <img src={tap} className="tap" />
        </div>}
      </div>
    </div>
  );
};

export default SceneThree;
