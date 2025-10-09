import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import ReusableButton from "./ReusableButton";
const SceneSixteen = ({
  goNext,
  goPrev
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }), /*#__PURE__*/React.createElement("div", {
    className: "main-container ",
    style: {
      flexDirection: "column",
      background: "none"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneSixteen.letSeeSome"), " "), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.startOver"),
    width: "20vw",
    height: "10vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  })));
};
export default SceneSixteen;