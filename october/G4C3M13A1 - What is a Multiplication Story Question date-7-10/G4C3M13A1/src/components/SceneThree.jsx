import React, { useEffect, useState } from "react";
import "./scene.css";
import Tap from "./Tap";
import { useSSR, useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneThree = ({goNext,goPrev}) => {
  const { t } = useTranslation();
  const [additionStory, setAdditionStory] = useState(true);
  const [subtractionStory, setSubtractionStory] = useState(false);
  const [multiplicationStory, setMultiplicationStory] = useState(false);
  const [buttonIds, setButtonIds] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [next, setNext] = useState(false);
  useEffect(() => {
    if (buttonIds.length >= 2) {
      setNext(true);
    }
  }, [buttonIds]);
  const handleButtonClick = (storyType, id) => {
    if (storyType === "addition") {
      playClick();
      setCurrentId(id);
      setAdditionStory(true);
      setSubtractionStory(false);
      setMultiplicationStory(false);
    } else if (storyType === "subtraction") {
      playClick();
      setCurrentId(id);
      setSubtractionStory(true);
      setAdditionStory(false);
      setMultiplicationStory(false);
    } else if (storyType === "multiplication") {
      playClick();
      setCurrentId(id);
      setMultiplicationStory(true);
      setAdditionStory(false);
      setSubtractionStory(false);
    }
    setButtonIds((prevIds) => [...prevIds, id]);
  };
  return (
    <div className="scene-container">
      <div className="heading">
        <p>{t("sceneThree.typesOfQuestion")}</p>
      </div>
      <div className="main-container">
        <div className="story-container">
          <div className="left-buttons">
            <button
              className={`btn ${
                currentId === 1 || additionStory ? "addition" : "multiplication"
              }`}
              onClick={() => handleButtonClick("addition", 1)}
            >
              {t("sceneThree.additionStoryQuestion")}
            </button>
            <button
              className={`btn ${
                currentId === 2 ? "addition" : "multiplication"
              }`}
              onClick={() => handleButtonClick("subtraction", 2)}
            >
              {t("sceneThree.subtractionStoryQuestion")}
            </button>
            <button
              className={`btn ${
                currentId === 3 ? "addition" : "multiplication"
              }`}
              onClick={() => handleButtonClick("multiplication", 3)}
            >
              {t("sceneThree.multiplicationStoryQuestion")}
            </button>
          </div>

          {additionStory && (
            <div className="right-box">
              <p className="description">
                {t("sceneThree.storyQuestionDescription")}
              </p>

              <h4 className="example-title">{t("sceneThree.example")}</h4>

              <p className="example-text">{t("sceneThree.exampleText")}</p>

              <p className="answer">
                {t("sceneThree.answerLabel")}:{" "}
                <span className="answer-value">
                  {t("sceneThree.exampleAnswer")}
                </span>
              </p>
            </div>
          )}
          {subtractionStory && (
            <div className="right-box">
              <p className="description">
                {t("sceneThree.subtractionGivesYou")}
              </p>

              <h4 className="example-title">{t("sceneThree.example")}</h4>

              <p className="example-text">
                {t("sceneThree.mrRehmadSubtractionText")}
              </p>

              <p className="answer">
                {t("sceneThree.answerLabel")}:{" "}
                <span className="answer-value">
                  {t("sceneThree.subtractAnswer")}
                </span>
              </p>
            </div>
          )}
          {multiplicationStory && (
            <div
              className="right-box"
              style={{ justifyContent: "space-between" }}
            >
              <p className="description">
                {t("sceneThree.multiplicationGivesYOu")}
              </p>

              <p className="example-text">
                <u>{t("sceneThree.weWillLearn")}</u>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="footer">
        <button onClick={()=>
            {
                playClick();
                goPrev();
            }
        }>{t("buttons.previous")}</button>
        <p>{t("navigation.tapEachWord")}</p>
        {!next && <button className="disabled">{t("buttons.next")}</button>}
        {next && (
          <div>
            <button  onClick={()=>
            {
                playClick();
                goNext();
            }
        }>{t("buttons.next")}</button>
            <Tap bottom={0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneThree;
