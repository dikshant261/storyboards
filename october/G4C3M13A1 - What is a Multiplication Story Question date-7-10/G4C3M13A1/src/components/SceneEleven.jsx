import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneEleven = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-container">
      <div className="heading">
        <p style={{ fontSize: "2.9vw" }}>{t("sceneSeven.goodJob")}</p>
      </div>
      <div
        className="main-container "
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "13vw",
        }}
      >
        <p
          className="para"
          style={{
            textAlign: "left",
            marginTop: "2vw",
            lineHeight: "2",
          }}
        >
          <span>Q.</span>
          {t("sceneTen.janaWant")}{" "}
          <span>
            <button
              className="line-button"
              style={{
                background: "none",
                border: "0.2vw solid white",
                opacity: "0.6",
                color: "white",
              }}
            >
              {t("sceneTen.twoCupCake")} .
            </button>
          </span>{" "}
          <span>{t("sceneTen.toHerBestFriend")}</span>{" "}
          <span>
            <button
              className="line-button"
              style={{
                background: "none",
                border: "0.2vw solid white",
                opacity: "0.6",
                color: "white",
              }}
            >
              {t("sceneTen.threeBest")}
            </button>{" "}
          </span>
          <span>
            <button
              className="line-button"
              style={{
                background: "none",
                border: "0.2vw solid white",
                opacity: "0.6",
                color: "white",
              }}
            >
              {t("sceneTen.howManyCupCakes")}
            </button>
          </span>{" "}
          <span>{t("sceneTen.sheMustBuy")}</span>
        </p>
        <div
          className="box-align"
          style={{ flexDirection: "column", gap: "0.5vw", marginBottom: "0vw" }}
        >
          <div
            className="box-align"
            style={{ gap: "1vw", textAlign: "center", marginBottom: "0vw" }}
          >
            <div className="line-button" style={{ width: "26vw" }}>
              {t("sceneTen.howManyCupCakes")}{" "}
            </div>
            <p className="para">=</p>
            <div className="line-button" style={{ width: "26vw" }}>
              {t("sceneTen.threeBest")}{" "}
            </div>
            <p className="para">×</p>
            <div className="line-button" style={{ width: "26vw" }}>
              {t("sceneTen.twoCupCake")}
            </div>
          </div>
          <div
            className="box-align"
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: "20vw",
            }}
          >
            <p className="para" style={{ fontSize: "2vw", color: "#00b045" }}>
              {t("sceneSeven.totalItems")}
            </p>
            <p className="para" style={{ fontSize: "2vw", color: "#00b045" }}>
              {t("sceneSeven.noOfGroups")}
            </p>
            <p className="para" style={{ fontSize: "2vw", color: "#00b045" }}>
              {t("sceneSeven.itemInEachGroup")}
            </p>
          </div>
        </div>
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
        <p>{t("navigation.tapNext")}</p>
        <div>
          <button
            className="next-btn"
            onClick={() => {
              playClick();
              goNext();
            }}
          >
            {t("buttons.next")}
          </button>
          <Tap bottom={0} />
        </div>
      </div>
    </div>
  );
};

export default SceneEleven;
