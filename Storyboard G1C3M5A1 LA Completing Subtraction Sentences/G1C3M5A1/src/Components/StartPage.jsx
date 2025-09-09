import React from "react";
import "./StartPage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import Box from "./Box";
import CarOne from "./Car";
import click from "../assets/click.mp3";
const StartPage = ({ onClose, number }) => {
  const { t } = useTranslation();
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto"; // ensures it's loaded early
  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };
  return (
    <div className="container">
      <div className="container-left">
        <p>{t("Complete_the_subtraction_sentence")}</p>
      </div>
      <div className="container-right">
        <div className="container-right-main">
          <div className="container-right-car">
            <Box numberOne={number[0]} numberTwo={number[1]} />
            <CarOne totalCars={number[0]} crossCars={number[1]} />
          </div>
          <div className="container-right-keypad">
            <ReusableButton
              label={t("start")}
              width="10vw"
              height="9vh"
              fontSize="2.5vw"
              onClick={() => {
                clickHandle();
                onClose();
              }}
            />
          </div>
        </div>
        <div className="container-right-description-heading">
          <p>{t("tapBegin")}</p>
        </div>
        <div className="container-right-button"></div>
      </div>
    </div>
  );
};

export default StartPage;
