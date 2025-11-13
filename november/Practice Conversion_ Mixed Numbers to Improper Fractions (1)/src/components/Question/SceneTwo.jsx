import React, { useEffect, useState } from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import Tap from "../Tap";
import { playClick } from "../PlayAudio";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import Option from "./Option";
import FractionAnimation from "./AnimationBoard";
import ReusableButton from "../ReusableButton";
import ProgressBar from "../ProgressBar";
const SceneTwo = ({ goNext, goPrev, questions,current }) => {
  const { t } = useTranslation();
  const [showDisabledButton, setShowDisabledButton] = useState(true);
  const [tapOption, setTapOption] = useState(true);
  const [showAnimationHeading, setShowAnimationHeading] = useState(false);
  const [next, setNext] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [showOption, setShowOption] = useState(true);
  const [showReplybutton, setShowReplybutton] = useState(false);
  const [showError, setShowError] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  const [optionValue, setOptionValue] = useState({
    num: null,
    den: null,
  });
  const [animationStarted, setAnimationStarted] = useState(false);
  useEffect(() => {
    setShowDisabledButton(true);
    setTapOption(true);
    setShowAnimationHeading(false);
    setNext(false);
    setAnimationPlayed(false);
    setShowOption(true);
    setShowReplybutton(false);
    setShowError(null);
    setOptionValue({
      num: null,
      den: null,
    });
    setAnimationStarted(false);
  }, [questions]);
  const handleAnimation = () => {
    setShowAnimationHeading(false);
    setShowDisabledButton(true);
    setAnimationPlayed(true);
  };
  const handleClick = () => {
    playClick();
    goNext();
  };
  console.log("Render SceneTwo:", showDisabledButton);
  return (
    <div className="scenetwo-container">
      <div className="heading">
        <p>
          <span>{t("sceneTwo.expressTheGiven")} </span>
        </p>
      </div>

      <div className="main">
        <div
          className="main-content"
          style={{
            color: "white",
            fontSize: "7vw",
            textAlign: "center",
            position: "relative",
            zIndex: 20,
          }}
        >
          {!animationPlayed && (
            <BlockMath
              math={`${questions.wholeNumber}\\frac{${questions.numerator}}{${questions.denominator}}`}
            />
          )}
          {animationPlayed && (
            <FractionAnimation
              key={animationKey} // ✅ ensures remount on each reply
              wholeNumber={questions.wholeNumber}
              numerator={questions.numerator}
              denominator={questions.denominator}
              setNext={() => setNext(true)}
              setShowDisabledButton={setShowDisabledButton}
              setShowReplybutton={() => setShowReplybutton(true)}
              setShowOption={() => setShowOption(false)}
              showAniButton={animationStarted}
            />
          )}
        </div>

        <div className="keypad" style={{ padding: "2vh" }}>
          {showOption && (
            <Option
              setTapOption={setTapOption}
              setShowDisabledButton={setShowDisabledButton}
              setShowAnimationHeading={setShowAnimationHeading}
              setShowError={setShowError}
              setOptionValue={setOptionValue}
              question={questions}
            />
          )}
          {showReplybutton && (
            <ReusableButton
              label={t("buttons.replyButton")}
              padding={"1vh 1vw"}
              fontSize="2.5vw"
              onClick={() => {
                playClick();
                setAnimationKey((prev) => prev + 1); // ✅ increment key to remount
                setAnimationStarted(true);
              }}
            />
          )}
          {showError !== null && (
            <div>
              {showError === 1 ? (
                <p className="frame-success">{t("feedback.success")}</p>
              ) : showError === 3 ? (
                <p className="frame-error">
                  <span>
                    {t("feedback.opps")}
                    <InlineMath
                      math={`\\frac{${optionValue.num}}{${optionValue.den}}`}
                    />
                  </span>
                  <span>{t("feedback.isProper")}</span>
                </p>
              ) : showError === 2 ? (
                <p className="frame-error">
                  {t("feedback.opps")}
                  <span>
                    <InlineMath
                      math={`\\frac{${optionValue.num}}{${optionValue.den}}`}
                    />
                    <span>{t("feedback.is")}</span>
                    <span style={{ fontSize: "3vw" }}>
                      <InlineMath
                        math={`${parseInt(
                          optionValue.num / optionValue.den
                        )}\\frac{${optionValue.num % optionValue.den}}{${
                          optionValue.den
                        }}`}
                      />
                    </span>
                  </span>
                </p>
              ) : (
                <p></p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="footer-heading">
        {tapOption && <p>{t("navigation.tapCorrectOption")}</p>}
        {showAnimationHeading && <p>{t("navigation.tapShowAnimation")}</p>}
        {next && <p>{t("navigation.tapNext")}</p>}
      </div>

      <div className="footer">
        <button
          onClick={() => {
            playClick();
            goPrev();
          }}
        >
          {t("buttons.previous")}
        </button>
        <ProgressBar total={6} current={current} />
        {showDisabledButton && (
          <button className="disabled">{t("buttons.next")}</button>
        )}
        {showAnimationHeading && (
          <div>
            <button onClick={handleAnimation}>{t("buttons.next")}</button>
            <Tap onClick={handleClick} bottom={0} />
          </div>
        )}
        {next && (
          <div>
            <button onClick={handleClick}>{t("buttons.next")}</button>
            <Tap onClick={handleClick} bottom={0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneTwo;
