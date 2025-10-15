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
import DivisionThree from "./DivisionTwo";
import DivisionTwo from "./DivisionTwo";
import OptionTwo from "./OptionTwo";
import MixedFractionTwo from "./MixedFractionTwo";
import { Questions } from "./qs";
const SceneThree = ({ goNext, goPrev,goNextQuestion,question }) => {
  const { t } = useTranslation();
  const [showAnime, setShowAnime] = useState(true);
  const [showFractionDelay, setShowFractionDelay] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [disbaled, setDisabled] = useState(true);
  const [heading, setHeading] = useState(false);
  const [nextOne, setNextOne] = useState(false);
  const [showOption, setShowOption] = useState(true);
  const [remainder, setRemainder] = useState({
    option: null,
    isCorrected: Boolean,
  });
  useEffect(() => {
    setShowAnime(true);
    setTimeout(() => {
      setShowFractionDelay(true);
    }, 1000);
  }, []);
  const handleClick = () => {
    setShowNext(false);
    setShowOption(false);
    setNextOne(true);
  };
  console.log("quoteient", remainder);
  return (
    <div className="scene-container">
      <div className="heading">
        {t("sceneTwo.divide", { dividend: question.dividend, divisor: question.divisor })}
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
            <DivisionTwo
              anime={showAnime}
              remainder={remainder}
              num={question.dividend}
              deno={question.divisor}
              question={question}
            />
          </div>
        </div>
        <div className="right">
          {showFractionDelay && (
            <MixedFractionTwo
              numerator={question.dividend}
              denominator={question.divisor}
              remainder={remainder}
              question={question}
            />
          )}
        </div>
      </div>
      <div className="option">
        {showOption && (
          <OptionTwo
            response={setRemainder}
            setNext={setShowNext}
            setHeading={setHeading}
            setDisabled={setDisabled}
            question={question}
          />
        )}
        {!showOption && (
          <p>
            {t("sceneTwo.mixedNumber")}
            <span>
              <Fraction
                numerator={question.dividend}
                denominator={question.divisor}
                fontSize="3vw"
              />
            </span>
          </p>
        )}
      </div>
      <div className="footer-two">
        <button className="disabled">{t("buttons.previous")}</button>
        {!heading && <p>{t("instruction.tapRemainder")}</p>}
        {heading && <p>{t("instruction.next")}</p>}
        {disbaled && <button className="disabled">{t("buttons.next")}</button>}
        {showNext && (
          <div>
            <button
              onClick={() => {
                playClick();
                handleClick();
              }}
            >
              {t("buttons.next")}
            </button>
            <Tap bottom={0} />
          </div>
        )}
        {nextOne && (
          <div>
            <button
              onClick={() => {
                playClick();
                goNextQuestion();
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

export default SceneThree;
