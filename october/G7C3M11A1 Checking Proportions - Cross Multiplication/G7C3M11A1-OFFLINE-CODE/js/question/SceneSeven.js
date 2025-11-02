
const SceneSeven = ({
  goNext,
  goPrev
}) => {
  const purple="assets/purple.png";
  const [beatOne, setBeatOne] = useState(true);
  const [beatTwo, setBeatTwo] = useState(false);
  const [boxOneValue, setBoxOneValue] = useState("");
  const [boxTwoValue, setBoxTwoValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [flag, setFlag] = useState(3);
  const [boxCss, setBoxCss] = useState("");
  const [success, setSuccess] = useState(false);
  const [next, setNext] = useState(false);
  const [buttonId, setButtonId] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showPurple, setShowPurple] = useState(false);
  const [message, setMessage] = useState(t("sceneFive.findProduct", {
    num1: 50,
    num2: 15
  }));
  const handleResult = id => {
    if (id === 1) {
      playCorrect();
      setErrorMessage(t("feedBack.yesSuccess"));
      setShowPurple(true);
      setButtonId(id);
      setNext(true);
      setDisabled(true);
    } else {
      playWrong();
      setErrorMessage(t("feedBack.yesError"));
      setButtonId(id);
      setShowPurple(true);
    }
  };
  const handleClick = () => {
    playClick();
    goNext();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scenethree-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2.6vw"
    }
  }, t("sceneSeven.expressThe"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("sceneSeven.lengthRatio")), /*#__PURE__*/React.createElement("span", null, t("sceneSeven.frameA")))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "align-col"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1vw",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "5.9 5.9 12.2 12.2",
    style: {
      position: "absolute",
      bottom: "-7%",
      width: "30%",
      zIndex: "1",
      transform: "rotate(-30deg)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 18L6 6M6 6V8M6 6H8",
    stroke: "gray",
    strokeWidth: "0.4",
    fill: "none"
  })), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "5.9 5.9 12.2 12.2",
    style: {
      position: "absolute",
      bottom: "-8%",
      width: "30%",
      zIndex: "1",
      transform: "rotate(121deg)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 18L6 6M6 6V8M6 6H8",
    stroke: "gray",
    strokeWidth: "0.4",
    fill: "none"
  })), /*#__PURE__*/React.createElement("div", {
    className: "image-1",
    style: {
      gap: showPurple ? "4vh" : ""
    }
  }, /*#__PURE__*/React.createElement("p", null, t("paintA")), !showPurple && /*#__PURE__*/React.createElement(FrameImagTwo, {
    width: "8vw",
    redml: 25,
    blueml: 15
  }), showPurple && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      width: "34vw",
      height: "20vh"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: purple,
    style: {
      width: "8vw"
    }
  })), /*#__PURE__*/React.createElement(LenghtBox, {
    boxOneValue: 25,
    boxTwoValue: 15,
    color: "rgba(2, 2, 63, 0.758)",
    success: true,
    numberColor: "gray",
    allGray: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "image-2",
    style: {
      gap: showPurple ? "4vh" : ""
    }
  }, /*#__PURE__*/React.createElement("p", null, t("paintB")), !showPurple && /*#__PURE__*/React.createElement(FrameImagTwo, {
    width: "10vw",
    redml: 50,
    blueml: 20
  }), showPurple && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      width: "34vw",
      height: "20vh"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: purple,
    style: {
      width: "8vw",
      opacity: '0.7'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LenghtBox, {
    boxOneValue: 50,
    boxTwoValue: 20,
    color: "rgba(2, 2, 63, 0.758)",
    success: true,
    numberColor: "gray",
    allGray: true
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cross-box"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LenghtBoxTwo, {
    boxOneValue: 500,
    success: true,
    color: buttonId === null ? "rgba(2, 2, 63, 0.758)" : disabled ? "" : "#855250",
    num: 1
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LenghtBoxTwo, {
    boxOneValue: 750,
    success: true,
    color: buttonId === null ? "rgba(2, 2, 63, 0.758)" : disabled ? "" : "#855250",
    num: 2
  })))), /*#__PURE__*/React.createElement("div", {
    className: "keypad",
    style: {
      justifyContent: "flex-start",
      gap: "3vh"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      fontSize: "2vw"
    }
  }, t("sceneSeven.sideKeypadHeading")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "4vw"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "yes-button",
    onClick: () => handleResult(2),
    style: {
      backgroundColor: buttonId === 2 ? "#855250" : "",
      cursor: buttonId === 2 || disabled ? "not-allowed" : "pointer"
    },
    disabled: buttonId === 2 || disabled
  }, t("buttons.yes")), /*#__PURE__*/React.createElement("button", {
    className: "yes-button",
    onClick: () => handleResult(1),
    style: {
      backgroundColor: disabled ? "#5a7f5e" : "",
      cursor: disabled ? "not-allowed" : "pointer"
    },
    disabled: disabled
  }, t("buttons.no"))), errorMessage !== "" && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2vw",
      color: "white",
      backgroundColor: disabled ? "#5a7f5e" : "#855250",
      border: disabled ? "0.3vw dashed darkgreen" : "0.3vw dashed darksalmon",
      width: "23vw",
      height: "38vh",
      borderRadius: "1.3vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      whiteSpace: "pre-line"
    }
  }, errorMessage))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), !next && /*#__PURE__*/React.createElement("p", null, t("navigation.obServeCross")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.nextQuestion")), !next && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    onClick: handleClick,
    bottom: 0
  }))));
};
window.SceneSeven=SceneSeven;