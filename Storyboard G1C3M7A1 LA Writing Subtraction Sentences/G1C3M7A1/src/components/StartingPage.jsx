import React from "react";
import './StartingPage.css'
import { useTranslation } from "react-i18next";
import CarOne from "./Car";
import click from '../assets/click.mp3'
const StartingPage = ({question,onNext}) => {
  const { t } = useTranslation();
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto";
  const clickHandle = () => {
    clickAudio.currentTime = 0; 
    clickAudio.play();
  };

  const handleStart=()=>{
    clickHandle();
    onNext();
  }
  console.log(question)
  return (
    <div className="page-container">
      <div className="page-container-left">
        <p className="slide-left">{t("hey")}</p>
      </div>
      <div className="page-container-right">
        <div className="page-container-right-main">
          <div className="page-container-right-main-car">
            <div className="subtraction-align-box slide-right">
              <input type="text" className={`subtraction-image-box`} />
              <div className="subtraction-minus-line"></div>

              <input type="text" className={`subtraction-image-box`} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5vw",
                }}
              >
                <div className="subtraction-minus-line"></div>
                <div className="subtraction-minus-line"></div>
              </div>

              <input type="text" className={`subtraction-image-box`} />
            </div>
            <CarOne totalCars={parseInt(question[0])} crossCars={parseInt(question[1])}/>
          </div>
          <div className="page-container-right-main-keypad">
            <button className="start-button show-in" onClick={handleStart}>{t("start")}</button>
          </div>
        </div>
        <div className="page-container-right-footer"><h3>{t("begin")}</h3></div>
      </div>
    </div>
  );
};

export default StartingPage;
