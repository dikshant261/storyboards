import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ClueWordSection.css";
import clue from "../assets/clue.png";
import search from "../assets/search.png";
import { playClick } from "./PlayAudio";
const ClueWordsSection = ({ setNext }) => {
  const { t } = useTranslation();
  const [treeStory, setTreeStory] = useState(true);
  const [shopKeeper, setShopKeeperStory] = useState(false);
  const [every, setEvery] = useState(false);
  const [per, setPer] = useState(false);
  const [groupsOf, setGroupsOf] = useState(false);
  const [setsOf, setSetsOf] = useState(false);
  const [buttonIds, setButtonIds] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    if (buttonIds.length >= 4) {
      setNext(true);
    }
  }, [buttonIds]);
  const handleButtonClick = (storyType, id) => {
    playClick();
    setCurrentId(id);
    if (storyType === "tree") {
      setTreeStory(true);
      setShopKeeperStory(false);
      setEvery(false);
      setPer(false);
      setGroupsOf(false);
    } else if (storyType === "shopKeeper") {
      setShopKeeperStory(true);
      setTreeStory(false);
      setEvery(false);
      setPer(false);
      setGroupsOf(false);
    } else if (storyType === "every") {
      setEvery(true);
      setTreeStory(false);
      setShopKeeperStory(false);
      setPer(false);
      setGroupsOf(false);
    } else if (storyType === "per") {
      setPer(true);
      setTreeStory(false);
      setShopKeeperStory(false);
      setEvery(false);
      setGroupsOf(false);
    } else if (storyType === "groupsOf") {
      setGroupsOf(true);
      setTreeStory(false);
      setShopKeeperStory(false);
      setEvery(false);
      setPer(false);
    }
    setButtonIds((prevIds) => [...prevIds, id]);
  };
  return (
    <div className="clue-container">
      {/* Left Info Box */}
      <div className="info-box">
        <div className="align-images">
          <img src={search} style={{ width: "7vw" }} />
          <img src={clue} style={{ width: "12vw" }} />
        </div>
        <p className="info-text">{t("sceneThirteen.clueWordsDescription")}</p>
      </div>

      {/* Middle Buttons */}
      <div className="clue-buttons">
        <button
          className={`btn ${
            currentId === 1 || treeStory ? "yellow" : "orange"
          }`}
          onClick={() => handleButtonClick("tree", 1)}
        >
          {t("sceneThirteen.each")}
        </button>
        <button
          className={`btn ${currentId === 2 ? "yellow" : "orange"}`}
          onClick={() => handleButtonClick("every", 2)}
        >
          {t("sceneThirteen.every")}
        </button>
        <button
          className={`btn ${currentId === 3 ? "yellow" : "orange"}`}
          onClick={() => handleButtonClick("per", 3)}
        >
          {t("sceneThirteen.per")}
        </button>
        <button
          className={`btn ${currentId === 4 ? "yellow" : "orange"}`}
          onClick={() => handleButtonClick("groupsOf", 4)}
        >
          {t("sceneThirteen.groupsOf")}
        </button>
        <button
          className={`btn ${currentId === 5 ? "yellow" : "orange"}`}
          onClick={() => handleButtonClick("shopKeeper", 5)}
        >
          {t("sceneThirteen.setsOf")}
        </button>
      </div>

      {/* Right Example Box */}
      {treeStory && (
        <div className="example-box">
          <p className="example-text">{t("sceneThirteen.animaTree")}</p>
          <p className="example-meaning">{t("sceneThirteen.treeGroup")}</p>
          <p className="alternate-title">{t("sceneThirteen.alternateWay")}</p>
          <p className="alternate-text">{t("sceneThirteen.treeAlternate")}</p>
        </div>
      )}
      {every && (
        <div className="example-box">
          <p className="example-text">{t("sceneThirteen.pencil")}</p>
          <p className="example-meaning">{t("sceneThirteen.pencilGroup")}</p>
          <p className="alternate-title">{t("sceneThirteen.alternateWay")}</p>
          <p className="alternate-text">{t("sceneThirteen.pencilAlternate")}</p>
        </div>
      )}
      {per && (
        <div className="example-box">
          <p className="example-text">{t("sceneThirteen.trainStory")}</p>
          <p className="example-meaning">{t("sceneThirteen.trainGroup")}</p>
          <p className="alternate-title">{t("sceneThirteen.alternateWay")}</p>
          <p className="alternate-text">{t("sceneThirteen.trainAlternate")}</p>
        </div>
      )}
      {groupsOf && (
        <div className="example-box">
          <p className="example-text">{t("sceneThirteen.studentStory")}</p>
          <p className="example-meaning">{t("sceneThirteen.studentGroup")}</p>
          <p className="alternate-title">{t("sceneThirteen.alternateWay")}</p>
          <p className="alternate-text">
            {t("sceneThirteen.studentAlternate")}
          </p>
        </div>
      )}
      {shopKeeper && (
        <div className="example-box">
          <p className="example-text">{t("sceneThirteen.exampleStory")}</p>
          <p className="example-meaning">{t("sceneThirteen.groupsItems")}</p>
          <p className="alternate-title">{t("sceneThirteen.alternateWay")}</p>
          <p className="alternate-text">
            {t("sceneThirteen.alternateExplanation")}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClueWordsSection;
