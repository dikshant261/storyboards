import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
const SceneEleven = ({ onNext }) => {
  const { t } = useTranslation();
  const [line, setLine] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disBtn, setDisBtn] = useState(true);
  const [startHeading, setStartHeding] = useState(true);
  const [correctOption, setCorrectOption] = useState(false);
  const [next, SetNext] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [btnCss, setBtnCss] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [tapContinue, setTapContinue] = useState(false);
  const handleLine = () => {
    playClick();
    setDisBtn(false);
    setStartHeding(false);
    setLine(true);
    SetNext(true);
  };
  const handleNextOption = () => {
    playClick();
    SetNext(false);
    setDisabled(false);
    setCorrectOption(true);
    setDisBtn(true);
  };
  const handleCheck = (str) => {
    if (str === "no") {
      playCorrect();
      setShowBox(true);
      setErrorShow(true);
      setDisabled(true);
      setBtnCss("no");
      setTapContinue(true);
      setCorrectOption(false);
      setDisBtn(false);
    } else {
      playWrong();
      setShowBox(true);
      setErrorShow(true);
      setBtnCss("yes");
    }
  };
  const handleNext = () => {
    playClick();
    onNext();
  };
  return (
    <div className="scene-conatiner-three">
      <div className="left">
        <div className="text-box">
          <p>{t("sceneEleven.nowTime")}</p>
          <div className="triangle">▶</div>
        </div>
        <img
          src={images.rightman}
          style={{ width: "21vw", objectFit: "contain" }}
          loading="lazy"
        />
      </div>
      <div className="right">
        <div className="right-align">
          <div className="main-container">
            <img
              src={images.cakeone}
              style={{ width: "37vw", objectFit: "contain" }}
            />
            <div
              className={`${line ? "cut-line-two" : "line-three"}`}
              onClick={handleLine}
            ></div>
            {showBox && (
              <div>
                <div className="half-cake-two"></div>
                <div className="half-cake-right-two"></div>
              </div>
            )}
          </div>

          <div className="cutter-box">
            <div className="yes-align">
              <button
                className="yes-button"
                disabled={disabled}
                onClick={() => handleCheck("yes")}
                style={{
                  backgroundColor: btnCss === "yes" ? "salmon" : "",
                }}
              >
                {t("buttons.yes")}
              </button>
              <button
                className="yes-button"
                disabled={disabled}
                onClick={() => handleCheck("no")}
                style={{
                  backgroundColor: btnCss === "no" ? "lightgreen" : "",
                }}
              >
                {t("buttons.no")}
              </button>
            </div>
            {errorShow && (
              <div>
                {btnCss === "no" ? (
                  <div className="success">{t("sceneEleven.success")}</div>
                ) : (
                  <div className="error">{t("sceneEleven.error")}</div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <button className="disabled">{t("buttons.previous")}</button>
          {startHeading && <p>{t("sceneEleven.tapLine")}</p>}
          {next && <p>{t("sceneEleven.tapContinue")}</p>}
          {correctOption && <p>{t("sceneEleven.tapCorrect")}</p>}
          {tapContinue && <p>{t("sceneEleven.tapContinue")}</p>}
          {disBtn && <button className="disabled">{t("buttons.next")}</button>}
          {next && (
            <div>
              <button onClick={handleNextOption}>{t("buttons.next")}</button>
              <Tap bottom={0} />
            </div>
          )}
          {tapContinue && (
            <div>
              <button onClick={handleNext}>{t("buttons.next")}</button>
              <Tap bottom={0} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SceneEleven;
