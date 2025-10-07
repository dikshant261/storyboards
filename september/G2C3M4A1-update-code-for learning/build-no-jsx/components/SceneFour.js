import React, { useState } from "react";
import "./scenethree.css";
import { useTranslation } from "react-i18next";
import Tap from "./Tap";
import images from "../assets";
import { playClick, playCorrect } from "./PlayAudio";
const SceneFour = ({
  onNext
}) => {
  const {
    t
  } = useTranslation();
  const [cut, setCut] = useState(false);
  const [beforeCut, setBeforeCut] = useState(true);
  const [pulse, setPulse] = useState(false);
  const [cakePiece, setCakePiece] = useState(false);
  const [afterCut, setAfterCut] = useState(false);
  const [cutting, setCutting] = useState(false);
  const [blackLine, setBalckLine] = useState(false);
  const [disabledOne, setDisabledOne] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleLine = () => {
    playClick();
    setCut(true);
    setPulse(true);
    setDisabledOne(true);
    setDisabled(false);
  };
  const handleCutter = () => {
    playCorrect();
    setCutting(true);
    setPulse(false);

    // ⏱ After 60% of 3s animation → around 1.8s
    setTimeout(() => {
      setCakePiece(true);
      setBeforeCut(false);
      setAfterCut(true);
      setBalckLine(true);
    }, 1800); // <-- trigger at 60%

    // ⏱ After full animation (3s), reset cutter animation
    setTimeout(() => {
      setDisabledOne(false);
      setCutting(false);
      setOpacity(true);
    }, 3000);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-conatiner-three"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-box"
  }, beforeCut && /*#__PURE__*/React.createElement("p", null, t("sceneFour.offCourse")), afterCut && /*#__PURE__*/React.createElement("p", null, t("sceneFour.happyBirthday")), /*#__PURE__*/React.createElement("div", {
    className: "triangle"
  }, "\u25B6")), beforeCut && /*#__PURE__*/React.createElement("img", {
    src: images.rightman,
    style: {
      width: "25vw",
      objectFit: "contain"
    },
    loading: "lazy"
  }), afterCut && /*#__PURE__*/React.createElement("img", {
    src: images.manhand,
    style: {
      width: "21.3vw",
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
    src: images.caketwo,
    style: {
      width: "29vw",
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${cut ? "cut-line" : "line"}`,
    style: {
      border: blackLine ? "0.4vw solid black" : "",
      cursor: disabled ? "not-allowed" : "pointer",
      // 👈 feedback
      pointerEvents: disabled ? "none" : "auto"
    },
    onClick: handleLine
  }), cakePiece && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "half-cake"
  }), /*#__PURE__*/React.createElement("div", {
    className: "half-cake-right"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cutter-box"
  }, /*#__PURE__*/React.createElement("img", {
    src: images.cutter,
    style: {
      width: "10vw",
      objectFit: "contain",
      cursor: disabledOne ? "pointer" : "not-allowed",
      // 👈 feedback
      pointerEvents: disabledOne ? "auto" : "none",
      opacity: opacity ? "0.5" : "1"
    },
    onClick: handleCutter,
    className: `${pulse ? "cutter-pulse" : ""} ${cutting ? "cutting-animate" : ""}`
  }))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), beforeCut && /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1vw"
    }
  }, t("sceneFour.tapCut"), " ", /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("img", {
    src: images.cutter,
    style: {
      width: "4vw"
    }
  }))), afterCut && /*#__PURE__*/React.createElement("p", null, t("sceneFour.tapMoveStory")), beforeCut && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), afterCut && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })))));
};
export default SceneFour;