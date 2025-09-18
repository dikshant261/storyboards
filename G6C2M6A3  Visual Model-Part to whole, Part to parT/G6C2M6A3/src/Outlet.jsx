import React, { useState } from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import { useTranslation } from "react-i18next";
import Main from "./components/Main";
import ActivityComplete from "./components/ActivityComplete";
const Outlet = () => {
  const { t } = useTranslation();
  const [start, setStart] = useState(true);
  const [sceneOne, setSceneOne] = useState(false);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [end, setEnd] = useState(false);
  const handleNext = () => {
    setStart(false);
    setSceneOne(true);
  };
  const handlePrev = () => {
    setSceneOne(false);
    setStart(true);
  };
  const handleNextOne = () => {
    setSceneOne(false);
    setSceneTwo(true);
  };
  const handleNextTwo = () => {
    setSceneTwo(false);
    setSceneThree(true);
  };
  const handlePrevTwo = () => {
    setSceneTwo(false);
    setSceneOne(true);
  };
  const handleNextThree = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handlePrevThree = () => {
    setSceneThree(false);
    setSceneTwo(true);
  };
  const handleNextFour = () => {
    setSceneFour(false);
    setEnd(true);
  };
  const handlePrevFour = () => {
    setSceneFour(false);
    setSceneThree(true);
  };
  return (
    <div className="outlet">
      {start && <StartPage onClose={handleNext} />}
      {sceneOne && (
        <Main
          option={["12:7", "12:19", "7:12", "7:19"]}
          correctOption={"7:12"}
          question={t("questionOne.question")}
          flag={0}
          onClose={handlePrev}
          onNext={handleNextOne}
        />
      )}
      {sceneTwo && (
        <Main
          option={["17:7", "17:12", "7:17", "12:17"]}
          correctOption={"17:7"}
          question={t("questionTwo.question")}
          flag={1}
          onClose={handlePrevTwo}
          onNext={handleNextTwo}
        />
      )}
      {sceneThree && (
        <Main
          option={["7:36", "17:26", "12:36", "17:36"]}
          correctOption={"17:36"}
          question={t("questionThree.question")}
          flag={2}
          onClose={handlePrevThree}
          onNext={handleNextThree}
        />
      )}
      {sceneFour && (
        <Main
          option={["12:36", "36:12", "17:36", "36:7"]}
          correctOption={"12:36"}
          question={t("questionFour.question")}
          flag={3}
          onClose={handlePrevFour}
          onNext={handleNextFour}
        />
      )}
      {
        end && <ActivityComplete/>
      }
    </div>
  );
};

export default Outlet;
