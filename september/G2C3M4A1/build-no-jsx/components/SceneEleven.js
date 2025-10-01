import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
const SceneEleven = ({
  onNext
}) => {
  const {
    t
  } = useTranslation();
  const [line, setLine] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disBtn, setDisBtn] = useState(true);
  const [startHeading, setStartHeding] = useState(true);
  const [correctOption, setCorrectOption] = useState(false);
  const [next, SetNext] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [btnCss, setBtnCss] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [tapContinue, setTapContinue] = useState(false);
  const handleLine = () => {
    playClick();
    setDisBtn(false);
    setStartHeding(false);
    setLine(true);
    SetNext(true);
  };
  const handleNextOption = () => {
    playClick();
    SetNext(false);
    setDisabled(false);
    setCorrectOption(true);
    setDisBtn(true);
  };
  const handleCheck = str => {
    if (str === "no") {
      playCorrect();
      setShowBox(true);
      setErrorShow(true);
      setDisabled(true);
      setBtnCss("no");
      setTapContinue(true);
      setCorrectOption(false);
      setDisBtn(false);
    } else {
      playWrong();
      setShowBox(true);
      setErrorShow(true);
      setBtnCss("yes");
    }
  };
  const handleNext = () => {
    playClick();
    onNext();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-conatiner-three"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-box"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneEleven.nowTime")), /*#__PURE__*/React.createElement("div", {
    className: "triangle"
  }, "\u25B6")), /*#__PURE__*/React.createElement("img", {
    src: images.rightman,
    style: {
      width: "21vw",
      objectFit: "contain"
    },
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "right-align"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: images.cakeone,
    style: {
      width: "37vw",
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${line ? "cut-line-two" : "line-three"}`,
    onClick: handleLine
  }), showBox && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "half-cake-two"
  }), /*#__PURE__*/React.createElement("div", {
    className: "half-cake-right-two"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cutter-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "yes-align"
  }, /*#__PURE__*/React.createElement("button", {
    className: "yes-button",
    disabled: disabled,
    onClick: () => handleCheck("yes"),
    style: {
      backgroundColor: btnCss === "yes" ? "salmon" : ""
    }
  }, t("buttons.yes")), /*#__PURE__*/React.createElement("button", {
    className: "yes-button",
    disabled: disabled,
    onClick: () => handleCheck("no"),
    style: {
      backgroundColor: btnCss === "no" ? "lightgreen" : ""
    }
  }, t("buttons.no"))), errorShow && /*#__PURE__*/React.createElement("div", null, btnCss === "no" ? /*#__PURE__*/React.createElement("div", {
    className: "success"
  }, t("sceneEleven.success")) : /*#__PURE__*/React.createElement("div", {
    className: "error"
  }, t("sceneEleven.error"))))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), startHeading && /*#__PURE__*/React.createElement("p", null, t("sceneEleven.tapLine")), next && /*#__PURE__*/React.createElement("p", null, t("sceneEleven.tapContinue")), correctOption && /*#__PURE__*/React.createElement("p", null, t("sceneEleven.tapCorrect")), tapContinue && /*#__PURE__*/React.createElement("p", null, t("sceneEleven.tapContinue")), disBtn && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNextOption
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })), tapContinue && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })))));
};
export default SceneEleven;