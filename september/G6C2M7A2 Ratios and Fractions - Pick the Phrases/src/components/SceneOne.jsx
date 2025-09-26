import React, { useEffect, useState } from "react";
import "./scene.css";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import Tap from "./Tap";
import ImageRenderer from "./ImageRenderer";
import Orange from "./Orange";
const SceneOne = ({ onNext, onPrev, questions }) => {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState([]);
  const [show, setShow] = useState(false);
  const [navHeading, setNavHeading] = useState(true);
  const [next, setNext] = useState(false);
  useEffect(() => {
    const result = sessionStorage.getItem(`marbleExample${questions.one}`);
    if (result) {
      const parsed = JSON.parse(result);
      setShow(parsed.show);
      setNavHeading(parsed.nav);
      setDisabled(parsed.disabled);
      setNext(parsed.next);
    }
  }, []);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  const handleClick = (ans, num) => {
    if (ans === questions.for) {
      playCorrect();
      setShow(true);
      setNavHeading(false);
      setNext(true);
      setDisabled([1, 2]);
      sessionStorage.setItem(
      `marbleExample${questions.one}`,
      JSON.stringify({
        show: true,
        nav: false,
        disabled: [1, 2],
        next: true,
      })
    );
    } else {
      playWrong();
      setDisabled((prev) => (prev.includes(num) ? prev : [...prev, num]));
    }
  };
  return (
    <div className="scene-constainer">
      <div className="scene-heading">
        <p>{t(questions.question)}</p>
      </div>
      <div className="scene-main">
        <div className="scene-main-first">
          {show && questions.for === "ratio" && (
            <div style={{ textAlign: "center" }}>
              <p>{t(questions.heading)}</p>

              <ImageRenderer src={questions.image} width={questions.width} />
            </div>
          )}
          <div>
            <ReusableButton
              label={t("buttons.ratio")}
              showTap={false}
              width="15vw"
              height="8vh"
              fontSize="3vw"
              backgroundColor={
                disabled.includes(1) && questions.for === "ratio"
                  ? "#93c47d"
                  : disabled.includes(1) && questions.for !== "ratio"
                  ? "salmon"
                  : "#cfe2f3"
              }
              disabled={disabled.includes(1)}
              showActive={false}
              onClick={() => handleClick("ratio", 1)}
            />
          </div>
        </div>
        <div className="scene-main-second">
          {show && questions.for === "fraction" && (
            <div>
              <p>{t(questions.heading)}</p>
              <ImageRenderer src={questions.image} width={questions.width} />
            </div>
          )}
          <ReusableButton
            label={t("buttons.fraction")}
            width="15vw"
            height="8vh"
            fontSize="3vw"
            showTap={false}
            showActive={false}
            backgroundColor={
              disabled.includes(2) && questions.for === "fraction"
                ? "#93c47d"
                : disabled.includes(2) && questions.for !== "fraction"
                ? "salmon"
                : "#cfe2f3"
            }
            disabled={disabled.includes(2)}
            onClick={() => handleClick("fraction", 2)}
          />
        </div>
      </div>
      <div className="scene-footer">
        <button onClick={handlePrev}>{t("buttons.previous")}</button>
        {navHeading && <p>{t("navigation.correctRepresentation")}</p>}
        {next && <p>{t("navigation.tapContinue")}</p>}
        {navHeading && (
          <button style={{ backgroundColor: "gray", borderColor: "gray" }}>
            {t("buttons.next")}
          </button>
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
