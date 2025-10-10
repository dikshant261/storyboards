import React, { useEffect, useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import cat from "../assets/cat.png";
import dog from "../assets/dog.png";
import apple from "../assets/apple.png";
import Keypad from "./Keypad";
import ImageGrid from "./ImageGrid";
import { Question } from "./qs";
import Tap from "./Tap";
import { playClick } from "./PlayAudio";
const Scene = () => {
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled] = useState(true);
  const [next, setNext] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reset, setReset] = useState(false);
  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);
  const handleNext = () => {
    playClick();
    if (currentIndex + 1 === Question.length) {
      window.location.reload();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setNext(false);
      setIsDisabled(true);
      setReset(true);
    }
  };
  return (
    <div className="scene-container">
      <div className="heading">
        <p>{t(Question[currentIndex].instructionText)}</p>
      </div>
      <div className="main-container">
        <div className="images">
          <ImageGrid
            renderCount={Question[currentIndex].imageCount}
            imageName={Question[currentIndex].image}
            disabled={() => setIsDisabled(false)}
          />
        </div>
        <div className="option">
          <Keypad
            Question={Question[currentIndex]}
            isDisabled={isDisabled}
            setNext={setNext}
            reset={reset}
          />
        </div>
      </div>
      <div className="footer">
        <button className="disabled">{t("buttons.previous")}</button>
        {!next && <p>{t("instruction.optionClick")}</p>}
        {next && <p>{t("instruction.tapNext")}</p>}
        {!next && <button className="disabled">{t("buttons.next")}</button>}
        {next && (
          <div>
            <button onClick={handleNext}>{t("buttons.next")}</button>
            <Tap bottom={0} onClick={handleNext} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Scene;
