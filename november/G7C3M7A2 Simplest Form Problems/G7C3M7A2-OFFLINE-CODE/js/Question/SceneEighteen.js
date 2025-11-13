const SceneEighteen = ({
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
      setShowFeedback(t("sceneEighteen.success"));
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
      setShowFeedback(t("sceneEighteen.error"));

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
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, t("sceneSixteen.letSimplifyRatio"), " "))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-content",
    style: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: "3vh 3vw",
      gap: "4vh"
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
      background: "none",
      color: "white"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-row",
    style: {
      gridTemplateColumns: "minmax(30.3vw, 1fr) 8.5vw 1.2vw 3vw 10vw 1.5vw 5vw",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cross-line-top",
    style: {
      right: "27%",
      top: "47%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "cross-line-bottom",
    style: {
      bottom: "8%",
      right: "44%"
    }
  }), /*#__PURE__*/React.createElement("p", {
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
      color: "white",
      fontSize: "2.5"
    }),
    style: {
      width: "8vw",
      height: "14vh",
      border: 'none',
      background: 'none',
      color: 'white'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white",
      fontSize: "3vw"
    }
  }, " : "), /*#__PURE__*/React.createElement(Box, {
    value: /*#__PURE__*/React.createElement(Fraction, {
      numerator: 42,
      denominator: 10,
      color: "white",
      fontSize: "2.5"
    }),
    style: {
      width: "8vw",
      height: "14vh",
      border: 'none',
      background: 'none',
      color: 'white'
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
    value: "28 : 42",
    style: {
      width: "12vw",
      height: "8vh",
      border: 'none',
      background: 'none',
      color: 'white'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "align-row",
    style: {
      gridTemplateColumns: "minmax(16.3vw, 1fr) 1.5vw 34.2vw 3vw 10vw 1.5vw 5vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "white"
    }
  }, t("sceneEighteen.simplestForm")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2vw",
      color: "white"
    }
  }, "="), /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      gap: "1vh"
    }
  }, "(28 \xF7", " ", /*#__PURE__*/React.createElement(Box, {
    boxCss: boxCss,
    value: optionValue,
    beat: beat,
    style: {
      width: "8vw",
      height: "7vh"
    }
  }), "):(42 \xF7", " ", /*#__PURE__*/React.createElement(Box, {
    boxCss: boxCss,
    value: optionValue,
    beat: beat,
    style: {
      width: "8vw",
      height: "7vh"
    }
  }), ")"))), /*#__PURE__*/React.createElement("div", {
    className: "keypad"
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneEighteen.whatIs")), /*#__PURE__*/React.createElement("div", {
    className: "align-buttons"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: btnClass(2),
    onClick: () => {
      setOptionValue("7");
      handleOption(2);
    },
    disabled: isBtnDisabled(2)
  }, "7"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: btnClass(1),
    onClick: () => {
      setOptionValue("14");
      handleOption(1);
    },
    disabled: isBtnDisabled(1)
  }, "14")), showFeedback !== "" && /*#__PURE__*/React.createElement("p", {
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
window.SceneEighteen=SceneEighteen;