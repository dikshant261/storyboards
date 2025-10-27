const SceneEight = ({
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
  const handleKeypadInput = value => {
    playClick();
    setErrorShow(false);
    setBoxCss("");
    if (beatOne) {
      if (value === "*") {
        // Remove the last character (backspace)
        setBoxOneValue(prev => prev.slice(0, -1));
      } else if (value === "x") {
        // Clear the current result
        setBoxOneValue("");
      } else if (boxOneValue.length < 2) {
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
      } else if (boxTwoValue.length < 2) {
        // Append the value if length is less than 2
        setBoxTwoValue(prev => prev + value);
      }
    }
  };
  const handleCheck = () => {
    if (beatOne) {
      setErrorShow(true);
      if (boxOneValue === "5") {
        playCorrect();
        setBeatOne(false);
        setBeatTwo(true);
        setFlag(4);
        setErrorShow(false);
      } else {
        playWrong();
        setBoxCss("wrong");
      }
    } else if (beatTwo) {
      setErrorShow(true);
      if (boxTwoValue === "3") {
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
    className: "scenetwo-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneThree.whatIs"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("sceneThree.lengthRatio")), " ", /*#__PURE__*/React.createElement("span", null, t("sceneThree.frameA", {
    frame: "C"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-1 opacity"
  }, /*#__PURE__*/React.createElement("p", null, t("frameA")), /*#__PURE__*/React.createElement(FrameImagTwo, {
    width: "18vw",
    length: 10,
    breadth: 6
  }), /*#__PURE__*/React.createElement("div", {
    className: "opacity"
  }, /*#__PURE__*/React.createElement(LenghtBox, {
    success: true,
    value: 1,
    boxOneValue: 10,
    boxTwoValue: 6,
    color: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "opacity"
  }, /*#__PURE__*/React.createElement(LenghtBox, {
    success: true,
    boxOneValue: 5,
    boxTwoValue: 3,
    color: "",
    value: 2
  }))), /*#__PURE__*/React.createElement("div", {
    className: "image-2 opacity"
  }, /*#__PURE__*/React.createElement("p", null, t("frameB")), /*#__PURE__*/React.createElement(FrameImagTwo, {
    width: "19vw",
    height: "33vh",
    length: 10,
    breadth: 8
  }), /*#__PURE__*/React.createElement("div", {
    className: "opacity"
  }, /*#__PURE__*/React.createElement(LenghtBox, {
    success: true,
    value: 1,
    boxOneValue: 10,
    boxTwoValue: 8,
    color: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "opacity"
  }, /*#__PURE__*/React.createElement(LenghtBox, {
    success: true,
    value: 2,
    boxOneValue: 5,
    boxTwoValue: 4,
    color: ""
  }))), /*#__PURE__*/React.createElement("div", {
    className: "image-3"
  }, /*#__PURE__*/React.createElement("p", null, t("frameC")), /*#__PURE__*/React.createElement(FrameImagTwo, {
    width: "21vw",
    length: 15,
    breadth: 9
  }), /*#__PURE__*/React.createElement("div", {
    className: "opacity"
  }, /*#__PURE__*/React.createElement(LenghtBox, {
    success: true,
    value: 1,
    boxOneValue: 15,
    boxTwoValue: 9,
    color: ""
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LenghtBox, {
    beatOne: beatOne,
    beatTwo: beatTwo,
    boxOneValue: boxOneValue,
    boxTwoValue: boxTwoValue,
    boxCss: boxCss,
    success: success,
    value: 2
  }))), /*#__PURE__*/React.createElement("div", {
    className: "keypad"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Keypad, {
    onInput: handleKeypadInput,
    checkHandle: handleCheck,
    flag: flag,
    frame: "C",
    num1: "5",
    num2: "3",
    errorShow: errorShow,
    boxOneValue: boxOneValue,
    boxTwoValue: boxTwoValue,
    disabled: disabled,
    ratio: [15, 9]
  })))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), !next && /*#__PURE__*/React.createElement("p", null, t("navigation.enterEach")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapFindProportion")), !next && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    onClick: handleClick,
    bottom: 0
  }))));
};
window.SceneEight=SceneEight;