import React, { useEffect, useState } from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import ClueWordsSection from "./ClueWordSection";
const SceneThirteen = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  const [next, setNext] = useState(false);
  return (
    <div className="scene-container">
      <div className="heading">
        <p>{t("sceneThree.typesOfQuestion")}</p>
      </div>
      <div className="main-container">
        <ClueWordsSection setNext={() => setNext(true)} />
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
        <p>{t("navigation.tapEachWord")}</p>
        {!next && <button className="disabled">{t("buttons.next")}</button>}
        {next && (
          <div>
            <button
              onClick={() => {
                playClick();
                goNext();
              }}
            >
              {t("buttons.next")}
            </button>
            <Tap bottom={0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneThirteen;
