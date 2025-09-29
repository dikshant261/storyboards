import React, { useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import AnimatedResultTwo from "./AnimatedResultTwo";
import Tap from "./Tap";
import { playClick } from "./PlayAudio";
const SceneTwo = ({ onNext }) => {
  const { t } = useTranslation();
  const [next, setNext] = useState(false);
  const [heading, setHeading] = useState(true);
  const [fadeOpacity, setFadeOpcity] = useState(false);
  const [startOver, setStartOver] = useState(false);
  const [paraOne, setParaOne] = useState(true);
  const [paraTwo, setParaTwo] = useState(false);
  const [shwoNext,setShowNext]=useState(true);
  const handleNext = () => {
    setHeading(false);
    setNext(true);
  };
  const handleOpacity = () => {
    playClick();
    setShowNext(false);
    setNext(false);
    setFadeOpcity(true);
    setParaOne(false);
    setParaTwo(true);
    setStartOver(true);
  };
  const handlestartOver = () => {
    playClick();
    onNext();
  };
  return (
    <div className="scene-constainer">
      <div className="scene-main-first" style={{ width: "98vw" }}>
        <AnimatedResultTwo
          setNext={handleNext}
          fadeOpacity={fadeOpacity}
          paraOne={paraOne}
          paraTwo={paraTwo}
          next={next}
        />
      </div>
      <div className="scene-footer">
        <button className="disabled">{t("buttons.previous")}</button>
        {heading && <p>{t("navigation.tapNextPart")}</p>}
        {startOver && <p>{t("navigation.tapStartOver")}</p>}
        {heading && <button className="disabled">{t("buttons.next")}</button>}
        {next && shwoNext && (
          <div>
            <button onClick={handleOpacity}>{t("buttons.next")}</button>
            <Tap bottom={0} />
          </div>
        )}
        {startOver && (
          <div>
            <button onClick={handlestartOver}>{t("buttons.next")}</button>
            <Tap bottom={0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneTwo;
