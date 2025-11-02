const SceneEighteen = ({
  goNext,
  goPrev
}) => {
  const [beatOne, setBeatOne] = useState(true);
  const [beatTwo, setBeatTwo] = useState(false);
  const [boxOneValue, setBoxOneValue] = useState("");
  const [boxTwoValue, setBoxTwoValue] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [flag, setFlag] = useState(3);
  const [boxCss, setBoxCss] = useState("");
  const [success, setSuccess] = useState(false);
  const [next, setNext] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState(t("sceneFive.findProduct", {
    num1: "1.2",
    num2: "2.4"
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
    }
  };
  const handleCheck = () => {
    if (beatOne) {
      setErrorShow(true);
      if (boxOneValue === "2.88") {
        playCorrect();
        setBeatOne(false);
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
  }, /*#__PURE__*/React.createElement("p", null, t("sceneFive.letsDoCross"))), /*#__PURE__*/React.createElement("div", {
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
      bottom: "-9%",
      width: "30%",
      zIndex: "1",
      transform: "rotate(121deg)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 18L6 6M6 6V8M6 6H8",
    stroke: "white",
    strokeWidth: "0.4",
    fill: "none"
  })), /*#__PURE__*/React.createElement("div", {
    className: "image-1"
  }, /*#__PURE__*/React.createElement("p", null, t("paintA")), /*#__PURE__*/React.createElement(FrameImagTwoL, {
    width: "10vw",
    redml: "1.5",
    blueml: "2.4"
  }), /*#__PURE__*/React.createElement(LenghtBox, {
    boxOneValue: "1.5",
    boxTwoValue: "2.4",
    color: "rgba(2, 2, 63, 0.758)",
    success: true,
    value: 1,
    numberColor: "gray"
  })), /*#__PURE__*/React.createElement("div", {
    className: "image-2"
  }, /*#__PURE__*/React.createElement("p", null, t("paintB")), /*#__PURE__*/React.createElement(FrameImagTwoL, {
    width: "8vw",
    redml: "1.2",
    blueml: "1.8"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LenghtBox, {
    boxOneValue: "1.2",
    boxTwoValue: "1.8",
    color: "rgba(2, 2, 63, 0.758)",
    success: true,
    value: 2,
    numberColor: "gray"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "cross-box"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LenghtBoxTwo, {
    boxOneValue: "2.7",
    success: true,
    color: "rgba(2, 2, 63, 0.758)",
    num: 1
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LenghtBoxTwo, {
    beatOne: beatOne,
    boxOneValue: boxOneValue,
    success: success,
    boxCss: boxCss,
    num: 2
  })))), /*#__PURE__*/React.createElement("div", {
    className: "keypad"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Keypad, {
    onInput: handleKeypadInput,
    checkHandle: handleCheck,
    flag: flag,
    frame: "A",
    num1: "1.2",
    num2: "2.4",
    errorShow: errorShow,
    boxOneValue: boxOneValue,
    disabled: disabled,
    message: message,
    ans: "2.88"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), !next && /*#__PURE__*/React.createElement("p", null, t("navigation.enterEach")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapCheckRatio")), !next && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    onClick: handleClick,
    bottom: 0
  }))));
};
window.SceneEighteen=SceneEighteen;