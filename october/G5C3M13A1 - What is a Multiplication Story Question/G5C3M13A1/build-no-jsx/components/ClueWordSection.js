import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ClueWordSection.css";
import clue from "../assets/clue.png";
import search from "../assets/search.png";
import { playClick } from "./PlayAudio";
const ClueWordsSection = ({
  setNext
}) => {
  const {
    t
  } = useTranslation();
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
    setButtonIds(prevIds => [...prevIds, id]);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "clue-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "align-images"
  }, /*#__PURE__*/React.createElement("img", {
    src: search,
    style: {
      width: "7vw"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: clue,
    style: {
      width: "12vw"
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "info-text"
  }, t("sceneThirteen.clueWordsDescription"))), /*#__PURE__*/React.createElement("div", {
    className: "clue-buttons"
  }, /*#__PURE__*/React.createElement("button", {
    className: `btn ${currentId === 1 || treeStory ? "yellow" : "orange"}`,
    onClick: () => handleButtonClick("tree", 1)
  }, t("sceneThirteen.each")), /*#__PURE__*/React.createElement("button", {
    className: `btn ${currentId === 2 ? "yellow" : "orange"}`,
    onClick: () => handleButtonClick("every", 2)
  }, t("sceneThirteen.every")), /*#__PURE__*/React.createElement("button", {
    className: `btn ${currentId === 3 ? "yellow" : "orange"}`,
    onClick: () => handleButtonClick("per", 3)
  }, t("sceneThirteen.per")), /*#__PURE__*/React.createElement("button", {
    className: `btn ${currentId === 4 ? "yellow" : "orange"}`,
    onClick: () => handleButtonClick("groupsOf", 4)
  }, t("sceneThirteen.groupsOf")), /*#__PURE__*/React.createElement("button", {
    className: `btn ${currentId === 5 ? "yellow" : "orange"}`,
    onClick: () => handleButtonClick("shopKeeper", 5)
  }, t("sceneThirteen.setsOf"))), treeStory && /*#__PURE__*/React.createElement("div", {
    className: "example-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "example-text"
  }, t("sceneThirteen.animaTree")), /*#__PURE__*/React.createElement("p", {
    className: "example-meaning"
  }, t("sceneThirteen.treeGroup")), /*#__PURE__*/React.createElement("p", {
    className: "alternate-title"
  }, t("sceneThirteen.alternateWay")), /*#__PURE__*/React.createElement("p", {
    className: "alternate-text"
  }, t("sceneThirteen.treeAlternate"))), every && /*#__PURE__*/React.createElement("div", {
    className: "example-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "example-text"
  }, t("sceneThirteen.pencil")), /*#__PURE__*/React.createElement("p", {
    className: "example-meaning"
  }, t("sceneThirteen.pencilGroup")), /*#__PURE__*/React.createElement("p", {
    className: "alternate-title"
  }, t("sceneThirteen.alternateWay")), /*#__PURE__*/React.createElement("p", {
    className: "alternate-text"
  }, t("sceneThirteen.pencilAlternate"))), per && /*#__PURE__*/React.createElement("div", {
    className: "example-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "example-text"
  }, t("sceneThirteen.trainStory")), /*#__PURE__*/React.createElement("p", {
    className: "example-meaning"
  }, t("sceneThirteen.trainGroup")), /*#__PURE__*/React.createElement("p", {
    className: "alternate-title"
  }, t("sceneThirteen.alternateWay")), /*#__PURE__*/React.createElement("p", {
    className: "alternate-text"
  }, t("sceneThirteen.trainAlternate"))), groupsOf && /*#__PURE__*/React.createElement("div", {
    className: "example-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "example-text"
  }, t("sceneThirteen.studentStory")), /*#__PURE__*/React.createElement("p", {
    className: "example-meaning"
  }, t("sceneThirteen.studentGroup")), /*#__PURE__*/React.createElement("p", {
    className: "alternate-title"
  }, t("sceneThirteen.alternateWay")), /*#__PURE__*/React.createElement("p", {
    className: "alternate-text"
  }, t("sceneThirteen.studentAlternate"))), shopKeeper && /*#__PURE__*/React.createElement("div", {
    className: "example-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "example-text"
  }, t("sceneThirteen.exampleStory")), /*#__PURE__*/React.createElement("p", {
    className: "example-meaning"
  }, t("sceneThirteen.groupsItems")), /*#__PURE__*/React.createElement("p", {
    className: "alternate-title"
  }, t("sceneThirteen.alternateWay")), /*#__PURE__*/React.createElement("p", {
    className: "alternate-text"
  }, t("sceneThirteen.alternateExplanation"))));
};
export default ClueWordsSection;