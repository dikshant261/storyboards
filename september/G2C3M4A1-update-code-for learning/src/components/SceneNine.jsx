import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick, playCorrect } from "./PlayAudio";
const SceneNine = ({ onNext }) => {
  const { t } = useTranslation();
  const [cut, setCut] = useState(false);
  const [beforeCut, setBeforeCut] = useState(true);
  const [cakePiece, setCakePiece] = useState(false);
  const [afterCut, setAfterCut] = useState(false);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleLine = () => {
    playClick();
    setCut(true);
  };
  const handleCutter = () => {
    playCorrect();
    setCakePiece(true);
    setBeforeCut(false);
    setAfterCut(true);
  };
  return (
    <div className="scene-conatiner-three">
      <div className="left">
        <div className="text-box">
          {beforeCut && <p>{t("sceneFour.offCourse")}</p>}
          {afterCut && <p>{t("sceneFour.happyBirthday")}</p>}
          <div className="triangle">▶</div>
        </div>

        <img
          src={images.man}
          style={{ width: "21vw", objectFit: "contain" }}
          loading="lazy"
        />
      </div>
      <div className="right">
        <div className="right-align">
          <div className="main-container">
            <img
              src={images.cakethree}
              style={{ width: "37vw", objectFit: "contain" }}
            />
            {/* <div className={`cut-line-black`} onClick={handleLine}></div> */}

            <div>
              <div className="half-cake-rectangle">
                <div className={`cut-line-black-rectangle`}></div>
              </div>
            </div>
          </div>
          <div className="cutter-box">
            <img
              src={images.cakethree}
              className="cake-image-cut"
            />
            <img src={images.cakethree}
            className="cake-image-cut-two"
            />
          </div>
        </div>
        <div className="footer">
          <button className="disabled">{t("buttons.previous")}</button>
          {beforeCut && <p>{t("sceneNine.dragEachPart")}</p>}
          {afterCut && <p>{t("sceneFour.tapMoveStory")}</p>}
          {/* {beforeCut && (
            <button className="disabled">{t("buttons.next")}</button>
          )} */}
            <div>
              <button onClick={handleNext}>{t("buttons.next")}</button>
              <Tap bottom={0} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default SceneNine;
