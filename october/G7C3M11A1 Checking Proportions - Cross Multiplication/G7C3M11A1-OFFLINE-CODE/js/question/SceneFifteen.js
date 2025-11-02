const SceneFifteen = ({
  goNext,
  goPrev
}) => {
  const [beatOne, setBeatOne] = useState(true);
  const [beatTwo, setBeatTwo] = useState(false);
  const [boxOneValue, setBoxOneValue] = useState("");
  const [boxTwoValue, setBoxTwoValue] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [flag, setFlag] = useState(1);
  const [boxCss, setBoxCss] = useState("");
  const [success, setSuccess] = useState(false);
  const [next, setNext] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState(t("sceneThree.termA", {
    paint: "A"
  }));
  const handleKeypadInput = value => {
    playClick();
    setErrorShow(false);
    setBoxCss("");
    if (beatOne) {
      if (value === "*") {
        // Remove the last character (backspace)
        setBoxOneValue(prev => prev.slice(0, -1));
      } else if (boxOneValue.length < 4) {
        // Append the value if length is less than 2
        setBoxOneValue(prev => prev + value);
      }
    } else if (beatTwo) {
      if (value === "*") {
        // Remove the last character (backspace)
        setBoxTwoValue(prev => prev.slice(0, -1));
      } else if (value === "x") {
        // Clear the current result
        setBoxTwoValue("");
      } else if (boxTwoValue.length < 3) {
        // Append the value if length is less than 2
        setBoxTwoValue(prev => prev + value);
      }
    }
  };
  const handleCheck = () => {
    if (beatOne) {
      setErrorShow(true);
      if (boxOneValue === "1.5") {
        playCorrect();
        setBeatOne(false);
        setBeatTwo(true);
        setMessage(t("sceneThree.termB", {
          paint: "A"
        }));
        setFlag(2);
        setErrorShow(false);
      } else {
        playWrong();
        setBoxCss("wrong");
      }
    } else if (beatTwo) {
      setErrorShow(true);
      if (boxTwoValue === "2.4") {
        playCorrect();
        setBeatTwo(false);
        setSuccess(true);
        setDisabled(false);
        setNext(true);
      } else {
        playWrong();
        setBoxCss("wrong");
      }
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
  }, /*#__PURE__*/React.createElement("p", null, t("sceneThree.expressThe"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("sceneThree.lengthRatio")), " ", /*#__PURE__*/React.createElement("span", null, t("sceneThree.frameA", {
    paint: "A"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "align-col"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-1"
  }, /*#__PURE__*/React.createElement("p", null, t("paintA")), /*#__PURE__*/React.createElement(FrameImagTwoL, {
    width: "10vw",
    redml: "1.5",
    blueml: "2.4"
  }), /*#__PURE__*/React.createElement(LenghtBox, {
    beatOne: beatOne,
    beatTwo: beatTwo,
    boxOneValue: boxOneValue,
    boxTwoValue: boxTwoValue,
    boxCss: boxCss,
    success: success,
    value: 1
  })), /*#__PURE__*/React.createElement("div", {
    className: "image-2 opacity"
  }, /*#__PURE__*/React.createElement("p", null, t("paintB")), /*#__PURE__*/React.createElement(FrameImagTwoL, {
    width: "8vw",
    redml: "1.2",
    blueml: "1.8"
  }), /*#__PURE__*/React.createElement("div", {
    className: "opacity"
  }, /*#__PURE__*/React.createElement(LenghtBox, {
    value: 1
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cross-box opacity"
  }, /*#__PURE__*/React.createElement("div", {
    className: "opacity"
  }, /*#__PURE__*/React.createElement(LenghtBoxTwo, {
    num: 1
  })), /*#__PURE__*/React.createElement("div", {
    className: "opacity"
  }, /*#__PURE__*/React.createElement(LenghtBoxTwo, {
    num: 2
  })))), /*#__PURE__*/React.createElement("div", {
    className: "keypad"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Keypad, {
    onInput: handleKeypadInput,
    checkHandle: handleCheck,
    flag: flag,
    frame: "A",
    num1: "1.5",
    num2: "2.4",
    errorShow: errorShow,
    boxOneValue: boxOneValue,
    boxTwoValue: boxTwoValue,
    disabled: disabled,
    message: message
  })))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), !next && /*#__PURE__*/React.createElement("p", null, t("navigation.enterEach")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapRatioPaintB", {
    paint: "B"
  })), !next && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    onClick: handleClick,
    bottom: 0
  }))));
};
window.SceneFifteen=SceneFifteen;