import React, { useState } from "react";
import "./SceneTwo.css";
import { useTranslation } from "react-i18next";
import FrameImage from "./FrameImage";
import Tap from "../Tap";
import { playClick, playCorrect, playWrong } from "../PlayAudio";
import FrameImag from "./FrameImage";
import Box from "../Box";
import Fraction from "../Fraction";
import FrameImageSlide from "./FrameImageSlide";
const SceneTwelve = ({
  goNext,
  goPrev
}) => {
  const {
    t
  } = useTranslation();
  const [next, setNext] = useState(false);
  const handleClick = () => {
    playClick();
    goNext();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scenetwo-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2.6vw"
    }
  }, /*#__PURE__*/React.createElement("span", null, t("sceneTwelve.letsFind"), " "))), /*#__PURE__*/React.createElement("div", {
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
      background: "none",
      color: "white"
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
      background: "none",
      color: "white"
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
      fontSize: "2.5vw"
    }),
    style: {
      height: "13vh",
      background: "none",
      color: "white",
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
  }, /*#__PURE__*/React.createElement("div", {
    className: "cross-line-top"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cross-line-bottom"
  }), /*#__PURE__*/React.createElement(Box, {
    value: "12 × 10",
    style: {
      height: "7vh",
      fontSize: "2vw",
      border: "none",
      background: "none",
      color: "white"
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
      border: "none",
      background: "none",
      color: "white"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "="), /*#__PURE__*/React.createElement(Box, {
    value: /*#__PURE__*/React.createElement(Fraction, {
      numerator: 12,
      denominator: 8,
      fontSize: "2.5vw"
    }),
    style: {
      height: "13vh",
      border: "none",
      background: "none",
      color: "white",
      width: "6vw"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-row",
    style: {
      gridTemplateColumns: "minmax(18vw, 1fr) 2.5vw 10.2vw 3vw 10vw 1.5vw 5vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, t("sceneTen.simplestForm")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "="), /*#__PURE__*/React.createElement("div", {
    className: "fraction-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fraction-row"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "12 \xF7"), /*#__PURE__*/React.createElement(Box, {
    value: 4,
    style: {
      border: "none",
      background: "none",
      color: "white",
      width: "4vw"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "fraction-divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fraction-row"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "8 \xF7"), /*#__PURE__*/React.createElement(Box, {
    value: 4,
    style: {
      border: "none",
      background: "none",
      color: "white",
      width: "4vw"
    }
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "="), /*#__PURE__*/React.createElement(Box, {
    value: /*#__PURE__*/React.createElement(Fraction, {
      numerator: 3,
      denominator: 2,
      fontSize: "2.5vw"
    }),
    style: {
      height: "13vh",
      width: "7vw",
      border: "none",
      background: "none",
      color: "white"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-row",
    style: {
      gridTemplateColumns: "minmax(18vw, 1fr) 2.5vw 9.2vw 0vw 6vw 1.5vw 5vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, t("sceneEleven.lengthWidth")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "="), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, "3 : 2")), next && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      width: "60vw",
      height: "76vh",
      background: "rgba(0, 0, 0, 0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "1.3vw",
      top: "0%",
      left: "0%"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "3vw",
      textAlign: "center"
    }
  }, t("sceneTwelve.theSmallerFrame")))), /*#__PURE__*/React.createElement("div", {
    className: "keypad"
  }, /*#__PURE__*/React.createElement(FrameImageSlide, {
    setNext: setNext
  }))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), !next && /*#__PURE__*/React.createElement("p", null, t("navigation.slideToMove")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapContinue")), !next && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    onClick: handleClick,
    bottom: 0
  }))));
};
export default SceneTwelve;