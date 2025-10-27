import React, { useState } from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImageThree from "./FrameImageThree";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import LenghtBox from "../LenghtBox";
import ReusableButton from "../ReusableButton";

const SceneNine = ({ goNext }) => {
  const { t } = useTranslation();
  const [next, setNext] = useState(false);
  const [firstClick, setFirstClick] = useState(null);
  const [secondClick, setSecondClick] = useState(null);
  const [animateMove, setAnimateMove] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleClick = (frame, id) => {
    playClick();

    // If no first click yet
    if (!firstClick) {
      setFirstClick(frame);
      return;
    }

    // If clicking second frame (different from first)
    if (firstClick && !secondClick && firstClick !== frame) {
      setSecondClick(frame);
      setAnimateMove(true);
      if (id === firstClick) {
        playCorrect();
        setShowSuccess(true);
        setNext(true);
      } else {
        playWrong();
        setShowError(true);
      }
      // reset after animation
      // setTimeout(() => {
      //   setAnimateMove(false);
      //   setFirstClick(null);
      //   setSecondClick(null);
      // }, 1200);
    }
  };

  const handleNext = () => {
    goNext();
  };

  // ✅ RESET FUNCTION — resets all to initial state
  const handleReset = () => {
    playClick();
    setNext(false);
    setFirstClick(null);
    setSecondClick(null);
    setAnimateMove(false);
    setShowError(false);
  };

  // ✅ Utility: determine if this frame should beat
  const isBeating = (frame) => {
    if (animateMove) return false;
    if (firstClick === frame || secondClick === frame) return false;
    return true;
  };

  // ✅ Utility: determine animation class between any two frames
  const getMoveClass = (from, to) => {
    if (!animateMove) return "";
    if (firstClick === from && secondClick === to)
      return `move-${from.toLowerCase()}-${to.toLowerCase()}`;
    return "";
  };

  return (
    <div className="scenetwo-container">
      <div className="heading">
        <p>{t("sceneThree.whichTwo")}</p>
      </div>

      <div className="main">
        {/* Frame A */}
        <div className="image-1">
          <p>{t("frameA")}</p>
          <div>
            <FrameImageThree
              width="16vw"
              beat={isBeating("A")}
              onClick={() => handleClick("A", "A")}
            />
          </div>
          <div
            className={getMoveClass("A", "B") || getMoveClass("A", "C")}
            style={{
              position: "absolute",
              top: "4.5vw",
              opacity: "0",
              zIndex: "1",
            }}
          >
            <FrameImageThree
              width="16vw"
              onClick={() => handleClick("A", "A")}
            />
          </div>
          <LenghtBox
            success={true}
            value={1}
            boxOneValue={10}
            boxTwoValue={6}
            color={"rgba(2, 2, 63, 0.758)"}
          />
          <LenghtBox
            success={true}
            boxOneValue={5}
            boxTwoValue={3}
            color={"rgba(2, 2, 63, 0.758)"}
            value={2}
          />
        </div>

        {/* Frame B */}
        <div className="image-2">
          <p>{t("frameB")}</p>
          <div>
            <FrameImageThree
              width="19vw"
              height="33vh"
              beat={isBeating("B")}
              onClick={() => handleClick("B", "B")}
            />
          </div>
          <div
            className={getMoveClass("B", "A") || getMoveClass("B", "C")}
            style={{
              position: "absolute",
              top: "4.5vw",
              opacity: "0",
            }}
          >
            <FrameImageThree
              width="19vw"
              height="33vh"
              onClick={() => handleClick("B", "B")}
            />
          </div>
          <LenghtBox
            success={true}
            value={1}
            boxOneValue={10}
            boxTwoValue={8}
            color={"rgba(2, 2, 63, 0.758)"}
          />
          <LenghtBox
            success={true}
            value={2}
            boxOneValue={5}
            boxTwoValue={4}
            color={"rgba(2, 2, 63, 0.758)"}
          />
        </div>

        {/* Frame C */}
        <div className="image-3">
          <p>{t("frameC")}</p>
          <div>
            <FrameImageThree
              width="18vw"
              beat={isBeating("C")}
              onClick={() => handleClick("C", "A")}
            />
          </div>
          <div
            className={getMoveClass("C", "A") || getMoveClass("C", "B")}
            style={{
              position: "absolute",
              top: "4.5vw",
              opacity: "0",
            }}
          >
            <FrameImageThree
              width="18vw"
              onClick={() => handleClick("C", "A")}
            />
          </div>
          <LenghtBox
            success={true}
            value={1}
            boxOneValue={15}
            boxTwoValue={9}
            color={"rgba(2, 2, 63, 0.758)"}
          />
          <LenghtBox
            success={true}
            value={2}
            boxOneValue={5}
            boxTwoValue={3}
            color={"rgba(2, 2, 63, 0.758)"}
          />
        </div>

        <div className="keypad" style={{ position: "relative" }}>
          <p className="para">{t("sceneTwo.keypadHeading")}</p>
          {showError && (
            <div>
              <p className="frame-error">{t("sceneNine.error")}</p>
              <div className="try-again">
                <ReusableButton
                  label={t("buttons.tryAgain")}
                  onClick={handleReset}
                  width="12vw"
                  height="8vh"
                />
              </div>
            </div>
          )}
          {showSuccess && (
            <p className="frame-success">{t("sceneNine.success")}</p>
          )}
        </div>
      </div>

      <div className="footer">
        <button className="disabled">{t("buttons.previous")}</button>
        {!next && <p>{t("navigation.tapTwoFrame")}</p>}
        {next && <p>{t("navigation.tapForNextChallange")}</p>}

        {!next && <button className="disabled">{t("buttons.next")}</button>}
        {next && (
          <div>
            <button onClick={handleNext}>{t("buttons.next")}</button>
            <Tap onClick={handleNext} bottom={0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneNine;
