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
import BoxThree from "./BoxThree";
import Option from "./Option";
import ReusableButton from "./TapButton";
import ProgressBar from "./ProgressBar";
const SceneFour = ({ onNext, onPrev }) => {
  const [value, setValue] = useState(null);
  const [showOption, setShowOption] = useState(true);
  const [showSummarise, setShowSummarise] = useState(false);
  const [errorShow, setShowError] = useState(false);
  const { t } = useTranslation();

  const handleNext = () => {
    playClick();
    onNext();
  };

  const handlePrvious = () => {
    playClick();
    onPrev();
  };
  const handleResponse = (num) => {
    setValue(num);
    if (num === 1) {
      playCorrect();
      setShowError(true);
      setShowOption(false);
      setShowSummarise(true);
    } else {
      playWrong();
      setShowError(true);
    }
  };
  console.log(value, "value");
  return (
    <div className="scene-conatainer">
      <div className="scene-conatainer-heading">
        <p>{t("sceneFourContent.topHeading")}</p>
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

        <div className="box-align">
          <BoxThree
            number={1}
            divisor={3}
            style={{ backgroundColor: "#ff9c6a" }}
          />
          <BoxThree
            number={2}
            divisor={3}
            style={{ backgroundColor: "#0097a7" }}
          />
        </div>
        {showOption && <Option optionNumber={handleResponse} value={value} />}
        {showSummarise && (
          <div style={{ marginTop: "1vw" }}>
            <ReusableButton
              label={t("buttons.summarise")}
              width="19vw"
              height="8vh"
              fontSize="3vw"
              onClick={handleNext}
            />
          </div>
        )}
        {errorShow && <ErrorMessage value={value} flag={1} />}
      </div>
      <div className="scene-conatainer-footer-heading">
        {showOption && <p>{t("navigation.chooseCorrectOption")}</p>}
        {showSummarise && <p>{t("navigation.tapSummarise")}</p>}
      </div>
      <div className="scene-conatainer-footer-buttons">
        <button onClick={handlePrvious}>{t("buttons.previous")}</button>
        <ProgressBar current={4}/>
        <div style={{ position: "relative" }}>
          <button style={{ backgroundColor: "gray", borderColor: "gray" }}>
            {t("buttons.next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SceneFour;
