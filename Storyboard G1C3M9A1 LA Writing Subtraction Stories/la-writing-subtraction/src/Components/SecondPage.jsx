import React from "react";
import click from "../assets/click.mp3";
import "./FirstPage.css";
import imagetwo from "../assets/imagetwo.png";
import { useTranslation } from "react-i18next";
import tap from '../assets/tap.gif'
const SecondPage = ({ onClose }) => {
  const { t } = useTranslation();
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto"; // ensures it's loaded early

  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };

  const handleStart = () => {
    clickHandle();
    onClose();
  };

  return (
    <div className="contianer">
      <div className="container-left">
        <p className="slide-right">{t("thePicture")}</p>
        <p className="slide-left">{t("writeStory")}</p>
      </div>
      <div className="container-right">
        <div className="contianer-img-item">
          <div className="image-container">
            <img src={imagetwo} alt="image" className="image scale-up" />
          </div>
          <div className="align-box">
            <div className="image-box slide-right">6</div>
            <div className="minus-line"></div>
            <div className="image-box slide-mid">4</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5vw",
              }}
            >
              <div className="minus-line"></div>
              <div className="minus-line"></div>
            </div>
            <div className="image-box slide-right">2</div>
          </div>
        </div>
        <div className="container-left-option ">
          <div className="slide-mid">
            <button
              className="start-button"
              onClick={() => {
                handleStart();
              }}
            >
              {t("start")}
            </button>
            <div className="tap-gif">
              <img src={tap} alt="tap" className="tap-gif-width" />
            </div>
          </div>
        </div>
        <div className="container-left-navigation">
          <h3 className="footer-heading">
            <h2 className="slide-left">{t("tapStart")}</h2>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
