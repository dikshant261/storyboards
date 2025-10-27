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
  const [showAnimate, setShowAnimate] = useState(false);
  const [showNextOne, setShowNextOne] = useState(false);
  const [next, setNext] = useState(false);
  const [heading, setHeading] = useState(true);
  const [freezeButton, setFreezeButton] = useState(false);
  const [freezeAnimation, setFreezeAnimation] = useState(false);
  useEffect(() => {
    const result = sessionStorage.getItem(`marbleExample${question[3]}`);
    if (result) {
      const parsed = JSON.parse(result);
      setIsCorrect(parsed.isCorrect);
      setShowBox(parsed.show);
      setShowAnimate(parsed.showAnimate);
      setShowNextOne(parsed.showNextOne);
      setHeading(parsed.heading);
      setNext(parsed.next);
      setFreezeButton(parsed.freeze);
      setFreezeAnimation(parsed.freezeAnimation);
    }
  }, []);
  React.useEffect(() => {
    if (isCorrect) {
      setHeading(false);
      setShowNextOne(true);
    } else {
    }
  }, [isCorrect]);
  const handleNextOne = () => {
    playClick();
    setShowBox(false);
    setShowAnimate(true);
    setShowNextOne(false);
  };
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  const handleNext = () => {
    playClick();
    sessionStorage.setItem(
      `marbleExample${question[3]}`,
      JSON.stringify({
        show: false,
        isCorrect: false,
        showAnimate: true,
        showNextOne: false,
        heading: false,
        next: true,
        freeze: true,
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
            mixed={question[2]}
            fontSize="5vw"
            color="white"
            gap={"3vw"}
          />
          {showBox && <Box content={selectedLabel} boxCss={boxCss} />}
          {showAnimate && (
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
            setBoxCss={setBoxCss}
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
