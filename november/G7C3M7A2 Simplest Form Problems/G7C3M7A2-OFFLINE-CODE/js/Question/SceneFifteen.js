const SceneFifteen = ({
  goNext,
  goPrev
}) => {
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
      setShowFeedback(t("sceneFourteen.success"));
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
      setShowFeedback(t("sceneFifteen.error"));

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
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, t("sceneFourteen.convertEach"), " "))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-content",
    style: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: "3vh 3vw",
      gap: '4vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "align-row",
    style: {
      gridTemplateColumns: "minmax(26vw, 1fr) 3.5vw 10.2vw 3vw 10vw 1.5vw 5vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, t("sceneThirteen.ratioOfMangoesOranges")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white",
      fontSize: "3vw"
    }
  }, "="), /*#__PURE__*/React.createElement(Box, {
    value: "2.8 : 4.2",
    style: {
      width: "12vw",
      height: "10vh",
      border: "none",
      background: "#ffffffbd"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-row",
    style: {
      gridTemplateColumns: "minmax(30.3vw, 1fr) 8.5vw 1.2vw 3vw 10vw 1.5vw 5vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white",
      fontSize: "3vw",
      paddingRight: "3vh",
      textAlign: "right"
    }
  }, "=", " "), /*#__PURE__*/React.createElement(Box, {
    value: /*#__PURE__*/React.createElement(Fraction, {
      numerator: 28,
      denominator: 10,
      color: "black",
      fontSize: "2.5"
    }),
    style: {
      width: "8vw",
      height: "14vh",
      border: "none",
      background: "#ffffffbd"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white",
      fontSize: "3vw"
    }
  }, " : "), /*#__PURE__*/React.createElement(Box, {
    value: optionValue,
    beat: beat,
    boxCss: boxCss,
    style: {
      width: "8vw",
      height: "14vh"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "keypad"
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneFifteen.whatIsWidth")), /*#__PURE__*/React.createElement("div", {
    className: "align-buttons"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: btnClass(1),
    onClick: () => {
      setOptionValue(/*#__PURE__*/React.createElement(Fraction, {
        numerator: 42,
        denominator: 10,
        color: "black",
        fontSize: "2.5"
      }));
      handleOption(1);
    },
    style: {
      height: "12vh"
    },
    disabled: isBtnDisabled(1)
  }, /*#__PURE__*/React.createElement(Fraction, {
    numerator: 42,
    denominator: 10,
    color: "black",
    fontSize: "2.5"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: btnClass(2),
    onClick: () => {
      setOptionValue(/*#__PURE__*/React.createElement(Fraction, {
        numerator: 42,
        denominator: 100,
        color: "black",
        fontSize: "2.5"
      }));
      handleOption(2);
    },
    style: {
      height: "12vh"
    },
    disabled: isBtnDisabled(2)
  }, /*#__PURE__*/React.createElement(Fraction, {
    numerator: 42,
    denominator: 100,
    color: "black",
    fontSize: "2.5"
  }))), showFeedback !== "" && /*#__PURE__*/React.createElement("p", {
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
window.SceneFifteen=SceneFifteen;