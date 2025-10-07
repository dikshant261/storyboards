import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneTwelve = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-container">
      <div className="heading">
        <p>{t("sceneTwelve.howTobeSure")}</p>
      </div>
      <div
        className="main-container "
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "3vw",
        }}
      >
        <p className="para">{t("sceneTwelve.nextWillLearn")} </p>
        <table>
          <thead>
            <tr>
              <th className="para">{t("sceneTwelve.clueWords")}</th>
              <th className="para">{t("sceneTwelve.checkWords")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p className="para">{t("sceneTwelve.eachEvery")}</p>
              </td>
              <td>
                <p className="para">{t("sceneTwelve.inAllHow")}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="para">{t("sceneTwelve.whenBoth")}</p>
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

export default SceneTwelve;
