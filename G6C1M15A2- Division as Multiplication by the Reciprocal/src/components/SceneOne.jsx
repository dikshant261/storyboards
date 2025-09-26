import React, { useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import Division from "./Division";
import Box from "./Box";
import OptionsPanel from "./OptionsPanel";
import AnimatedResult from "./AnimatedResult";
import Tap from "./Tap";
const SceneOne = ({ onPrev, onNext, question, setHintSlide }) => {
  const { t } = useTranslation();
  const [selectedLabel, setSelectedLabel] = React.useState(null);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [showBox, setShowBox] = React.useState(true);
  const [boxCss, setBoxCss] = React.useState("");
  const [buttonReset, setButtonReset] = useState(false);
  const [animationShow, setAnimationShow] = useState(false);
  const [heading, setHeading] = useState(true);
  const [next, setNext] = useState(false);
  console.log("next",next)
  React.useEffect(() => {
    if (isCorrect) {
      setShowBox(false);
    } else {
      setBoxCss("wrong");
    }
  }, [isCorrect]);

  const handlePrev = () => {
    playClick();
    setButtonReset(true);
    setAnimationShow(true);
    setSelectedLabel(null);
    setIsCorrect(false);
    setNext(false);
    setHeading(true);
    setShowBox(true);
    setBoxCss("");
    onPrev();
  };
  const handleNext = () => {
    playClick();
    setButtonReset(true);
    setAnimationShow(true);
    setSelectedLabel(null);
    setIsCorrect(false);
    setNext(false);
    setHeading(true);
    setShowBox(true);
    setBoxCss("");
    onNext();
  };
  return (
    <div className="scene-constainer">
      <div className="scene-heading">
        <p>{t("mainHeading")}</p>
      </div>
      <div className="scene-main">
        <div className="scene-main-first">
          <Division
            numerator={question[0]}
            denominator={question[1]}
            fontSize="7vw"
            color="white"
            gap={"3vw"}
          />
          {showBox && <Box content={selectedLabel} boxCss={boxCss} />}
          {isCorrect && (
            <AnimatedResult
              question={question}
              animationShow={animationShow}
              setNext={() => setNext(true)}
              setHeading={() => setHeading(false)}
              animationSet={()=>setAnimationShow(false)}
            />
          )}
        </div>
        <div className="scene-main-second">
          <OptionsPanel
            question={question}
            onSelect={({ selectedLabel, isCorrect }) => {
              setSelectedLabel(selectedLabel);
              setIsCorrect(isCorrect);
            }}
            setHintSlide={setHintSlide}
            buttonReset={buttonReset}
            buttonSet={() => setButtonReset(false)}
          />
        </div>
      </div>
      <div className="scene-footer">
        <button onClick={handlePrev}>{t("buttons.previous")}</button>
        {!isCorrect && <p>{t("navigation.tapOption")}</p>}
        {next && <p>{t("navigation.tapNext")}</p>}
        {!isCorrect && (
          <button className="disabled">{t("buttons.next")}</button>
        )}
        {next && (
          <div>
            <button onClick={handleNext}>{t("buttons.next")}</button>
            <Tap bottom={"0%"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneOne;
