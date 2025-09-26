import React, { useEffect, useState } from "react";
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
  const [showAnimation, setShowAnimation] = React.useState(false);
  const [showNextOne, setShowNextOne] = useState(false);
  const [heading, setHeading] = useState(true);
  const [next, setNext] = useState(false);
  const [freezeButton, setFreezeButton] = useState(false);
  const [freezeAnimation, setFreezeAnimation] = useState(false);
  console.log("next", next);
  useEffect(() => {
    const result = sessionStorage.getItem(`reciprocal${question[2]}`);
    if (result) {
      const parsed = JSON.parse(result);
      setIsCorrect(parsed.isCorrect);
      setShowBox(parsed.show);
      setShowAnimation(parsed.showAnimate);
      setShowNextOne(parsed.showNextOne);
      setHeading(parsed.heading);
      setNext(parsed.next);
      setFreezeButton(parsed.freezeButton);
      setFreezeAnimation(parsed.freezeAnimation);
    }
  }, []);
  React.useEffect(() => {
    if (isCorrect) {
      setHeading(false);
      setShowNextOne(true);
    } else {
      setBoxCss("wrong");
    }
  }, [isCorrect]);
  const handleNextOne = () => {
    playClick();
    setShowBox(false);
    setShowAnimation(true);
    setShowNextOne(false);
  };
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  const handleNext = () => {
    playClick();
    sessionStorage.setItem(
      `reciprocal${question[2]}`,
      JSON.stringify({
        show: false,
        isCorrect: false,
        showAnimate: true,
        showNextOne: false,
        heading: false,
        next: true,
        freezeButton: true,
        freezeAnimation: true,
      })
    );
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
          {showAnimation && (
            <AnimatedResult
              question={question}
              setNext={() => setNext(true)}
              freezeAnimation={freezeAnimation}
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
            freezeButton={freezeButton}
          />
        </div>
      </div>
      <div className="scene-footer">
        <button onClick={handlePrev}>{t("buttons.previous")}</button>
        {heading && <p>{t("navigation.tapOption")}</p>}
        {showNextOne && <p>{t("navigation.tapContinue")}</p>}
        {next && <p>{t("navigation.tapNext")}</p>}
        {heading && <button className="disabled">{t("buttons.next")}</button>}
        {showNextOne && (
          <div>
            <button onClick={handleNextOne}>{t("buttons.next")}</button>
            <Tap bottom={"0%"} />
          </div>
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
