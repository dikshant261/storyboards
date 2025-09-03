import React from "react";
import click from "../assets/click.mp3";
import "./FirstPage.css";
import imagethree from "../assets/imagethree.png";
import { useTranslation } from "react-i18next";
const ThirdPage = ({ onClose }) => {
  const {t}=useTranslation();
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
        <p className="slide-right">
          {t("thePicture")}
        </p>
        <p className="slide-left">
          {t("writeStory")}
        </p>
      </div>
      <div className="container-right">
        <div className="contianer-img-item">
          <div className="image-container">
            <img src={imagethree} alt="image" className="image scale-up" />
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

export default ThirdPage;
