import React, { useEffect, useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import Fraction from "./Fraction";
import DivideSvg from "./DivideSvg";
import Division from "./Division";
import { playClick } from "./PlayAudio";
import Tap from "./Tap";
import MixedFraction from "./MixedFraction";
import Option from "./Option";
import DivisionOne from "./DivisionOne";
const SceneTwo = ({ goNext, goPrev, question }) => {
  const { t } = useTranslation();
  const [showAnime, setShowAnime] = useState(true);
  const [showFractionDelay, setShowFractionDelay] = useState(false);
  const [showNext, setShowNext] = useState();
  const [quotient, setQuotient] = useState({
    option: null,
    isCorrected: Boolean,
  });
  useEffect(() => {
    setShowAnime(true);
    setTimeout(() => {
      setShowFractionDelay(true);
    }, 1000);
  }, []);
  console.log("quoteient", quotient);
  return (
    <div className="scene-container">
      <div className="heading">
        {t("sceneTwo.divide", {
          dividend: question.dividend,
          divisor: question.divisor,
        })}
      </div>
      <div className="main">
        <div className="left">
          <p>{t("titles.imporoperFraction")}</p>
          <Fraction
            numerator={question.dividend}
            denominator={question.divisor}
            fontSize="9vw"
            lineHeight="0.8vh"
            lineWidth="9vw"
          />
        </div>
        <div className="mid">
          <p>{t("titles.division")}</p>

          <div style={{ position: "relative" }}>
            <DivisionOne
              anime={showAnime}
              quotient={quotient}
              num={question.dividend}
              deno={question.divisor}
            />
          </div>
        </div>
        <div className="right">
          {showFractionDelay && (
            <MixedFraction
              numerator={question.dividend}
              denominator={question.divisor}
              quotient={quotient}
            />
          )}
        </div>
      </div>
      <div className="option">
        <Option
          response={setQuotient}
          setNext={setShowNext}
          question={question}
        />
      </div>
      <div className="footer-two">
        <button className="disabled">{t("buttons.previous")}</button>
        {!showNext && <p>{t("instruction.tapQuotient")}</p>}
        {showNext && <p>{t("instruction.next")}</p>}
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

export default SceneTwo;
