import React, { useEffect, useState } from "react";
import "./scene.css";
import { playClick, playCorrect } from "./PlayAudio";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import Tap from "./Tap";
import AppleImage from "./AppleImage";
import Marble from "./Marble";
const MarbleExample = ({ onNext, onPrev }) => {
  const { t } = useTranslation();
  const [appleShow, setShowApple] = useState(true);
  const [next, setNext] = useState(false);
  useEffect(() => {
    const result = sessionStorage.getItem("marbleExample");
    if (result) {
      const parsed = JSON.parse(result);
      setShowApple(parsed.showApple);
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
  const handleClick = () => {
    playCorrect();
    setShowApple(false);
    setNext(true);
    sessionStorage.setItem(
      "marbleExample",
      JSON.stringify({
        showApple: false,
        next: true,
      })
    );
  };
  return (
    <div className="scene-constainer">
      <div className="scene-heading">
        <p>{t("appleAndQuestion.threeRedMArble")}</p>
      </div>
      <div className="scene-main">
        <div className="scene-main-first">
          {!appleShow && (
            <div>
              <p>{t("appleAndQuestion.forEvery")}</p>
              <Marble />
            </div>
          )}
          <div>
            <ReusableButton
              label={t("buttons.ratio")}
              showTap={false}
              width="15vw"
              height="8vh"
              fontSize="3vw"
              backgroundColor={appleShow ? "#cfe2f3" : "#93c47d"}
              disabled={!appleShow}
              showActive={appleShow}
              onClick={handleClick}
            />
            {appleShow && <Tap bottom={"0%"} />}
          </div>
        </div>
        <div className="scene-main-second">
          <div>
            <p>{t("appleAndQuestion.onThirdAppleGreen")}</p>
            <AppleImage />
          </div>

          <ReusableButton
            label={t("buttons.fraction")}
            width="15vw"
            height="8vh"
            fontSize="3vw"
            showTap={false}
            showActive={false}
            disabled={true}
            backgroundColor="#93c47d"
            onClick={handleClick}
          />
        </div>
      </div>
      <div className="scene-footer">
        <button onClick={handlePrev}>{t("buttons.previous")}</button>
        {appleShow && <p>{t("navigation.tapRatio")}</p>}
        {next && <p>{t("navigation.tapNext")}</p>}
        {appleShow && (
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

export default MarbleExample;
