import React, { useEffect, useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import Fraction from "./Fraction";
import DivideSvg from "./DivideSvg";
import Division from "./Division";
import { playClick } from "./PlayAudio";
import Tap from "./Tap";
const SceneOne = ({ goNext, goPrev,question }) => {
  const { t } = useTranslation();
  const [showAnime, setShowAnime] = useState(false);
  const [showDivision, setShowDivision] = useState(false);
  const [showNext, setShowNext] = useState();
  const handleDivide = () => {
    playClick();
    setShowAnime(true);
  };
  useEffect(() => {
    if (showAnime) {
      setTimeout(() => {
        setShowDivision(true);
        setShowNext(true);
      }, 2000);
    }
  }, [showAnime]);
  return (
    <div className="scene-container">
      <div className="heading">{t("sceneOne.heading")}</div>
      <div className="main">
        <div className="left">
          <p>{t("titles.imporoperFraction")}</p>
          <Fraction
            numerator={question.dividend}
            denominator={question.divisor}
            fontSize="9vw"
            lineHeight="0.8vh"
            lineWidth="9vw"
            showAnime={showAnime}
          />
        </div>
        <div className="mid">
          {showDivision && <p>{t("titles.division")}</p>}
          {showDivision && (
            <div style={{ position: "relative" }}>
              <Division question={question}/>
            </div>
          )}
        </div>
        <div className="right"></div>
      </div>
      <div className="option">
        {!showNext && (
          <ReusableButton
            label={t("buttons.divide")}
            height="10vh"
            fontSize="5vw"
            onClick={handleDivide}
          />
        )}
        {showNext && (
          <p>
            {t("sceneOne.tapFraction")}
            <span>
              <Fraction numerator={question.dividend} denominator={question.divisor} fontSize="3vw" />
            </span>
            <span>{t("sceneOne.means", { dividend: question.dividend, divisor: question.divisor })}</span>
          </p>
        )}
      </div>
      <div className="footer-two">
        <button className="disabled">{t("buttons.previous")}</button>
        {!showNext && <p>{t("instruction.tapNext")}</p>}
        {showNext && <p>{t("instruction.tapProceed")}</p>}
        {!showNext && <button className="disabled">{t("buttons.next")}</button>}
        {showNext && (
          <div>
            <button
              onClick={() => {
                playClick();
                goNext();
              }}
            >
              {t("buttons.next")}
            </button>
            <Tap bottom={0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneOne;
