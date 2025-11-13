import React, { useState } from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImage from "./FrameImage";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import FrameImag from "./FrameImage";
import Box from "../Box";
import Fraction from "../Fraction";
const SceneEight = ({
  goNext,
  goPrev
}) => {
  const {
    t
  } = useTranslation();
  const [beat, setBeat] = useState(true);
  const [showFeedback, setShowFeedback] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [boxCss, setBoxCss] = useState("");
  const [allDisabled, setAllDisabled] = useState(false); // disables all buttons after correct
  const [disabledButtons, setDisabledButtons] = useState([]); // individually disabled wrong buttons
  const [correctId, setCorrectId] = useState(null);
  const [wrongIds, setWrongIds] = useState([]); // track wrong buttons to permanently style them
  const [next, setNext] = useState(false);
  const handleOption = id => {
    // if correct
    if (id === 1) {
      playCorrect();
      setBoxCss("correct");
      setBeat(false);
      setShowFeedback(t("sceneEight.success"));
      setNext(true);
      setCorrectId(1);
      // mark every other button as wrong
      const otherWrong = [2, 3].filter(i => i !== 1);
      setWrongIds(otherWrong);
      // disable all buttons
      setAllDisabled(true);
      // also disable individual ones to be safe
      setDisabledButtons([1, 2, 3]);
    } else {
      // wrong click
      playWrong();
      setBoxCss("wrong");
      setShowFeedback(t("sceneEight.error"));

      // permanently mark this button wrong
      setWrongIds(prev => prev.includes(id) ? prev : [...prev, id]);
      // disable only this button so user can try other options
      setDisabledButtons(prev => prev.includes(id) ? prev : [...prev, id]);
    }
  };
  const handleClick = () => {
    playClick();
    goNext();
  };
  const isBtnDisabled = id => {
    return allDisabled || disabledButtons.includes(id);
  };
  const btnClass = id => {
    if (correctId === id) return "correct";
    if (wrongIds.includes(id)) return "wrong";
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scenetwo-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2.6vw"
    }
  }, /*#__PURE__*/React.createElement("span", null, t("sceneEight.letsFind"), " "))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-content",
    style: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: "1vh 1vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, t("sceneThree.given")), /*#__PURE__*/React.createElement("div", {
    className: "align-row"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, t("sceneThree.lengthOfFrame")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "="), /*#__PURE__*/React.createElement(Box, {
    value: "120 cm",
    style: {
      border: "none",
      background: "#ffffffbd"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-row"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, t("sceneThree.widthOfFrame")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "="), /*#__PURE__*/React.createElement(Box, {
    value: "80 cm",
    style: {
      border: "none",
      background: "#ffffffbd"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-row"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white",
      textAlign: "left"
    }
  }, t("sceneFive.ratioOfLengthWidth")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "="), /*#__PURE__*/React.createElement(Box, {
    value: /*#__PURE__*/React.createElement(Fraction, {
      numerator: 120,
      denominator: 80,
      fontSize: "2.5vw",
      color: "black"
    }),
    style: {
      height: "13vh",
      background: "#ffffffbd",
      border: "none"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "="), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: "0.5vh",
      position: "relative"
    }
  }, allDisabled && /*#__PURE__*/React.createElement("div", {
    className: "cross-line-top"
  }), allDisabled && /*#__PURE__*/React.createElement("div", {
    className: "cross-line-bottom"
  }), /*#__PURE__*/React.createElement(Box, {
    value: "12 × 10",
    style: {
      height: "7vh",
      fontSize: "2vw",
      background: "#ffffffbd",
      border: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "8vw",
      height: "0.5vh",
      background: "white"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Box, {
    value: "8 × 10",
    style: {
      height: "7vh",
      fontSize: "2vw",
      background: "#ffffffbd",
      border: "none"
    }
  }))), allDisabled && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "="), allDisabled && /*#__PURE__*/React.createElement(Box, {
    value: /*#__PURE__*/React.createElement(Fraction, {
      numerator: 12,
      denominator: 8,
      fontSize: "2.5vw",
      color: "black"
    }),
    style: {
      height: "13vh",
      width: "5vw",
      background: "#ffffffbd",
      border: "none"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "keypad"
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneEight.whatIsWidth")), /*#__PURE__*/React.createElement("div", {
    className: "align-buttons"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: btnClass(1),
    onClick: () => {
      setOptionValue("");
      handleOption(1);
    },
    disabled: isBtnDisabled(1),
    style: {
      height: "9vh",
      width: "13vw"
    }
  }, t("buttons.yes")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: btnClass(2),
    onClick: () => {
      setOptionValue("");
      handleOption(2);
    },
    style: {
      height: "9vh",
      width: "13vw"
    },
    disabled: isBtnDisabled(2)
  }, t("buttons.no"))), showFeedback !== "" && /*#__PURE__*/React.createElement("p", {
    className: `${allDisabled ? "frame-success" : "frame-error"}`
  }, showFeedback))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), !next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapCorrectOption")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapProceed")), !next && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    onClick: handleClick,
    bottom: 0
  }))));
};
export default SceneEight;