const SceneOne = ({
  goNext,
  goPrev
}) => {
  const [activeBox, setActiveBox] = useState("boxOne"); // Tracks which box is active
  const [boxOneValue, setBoxOneValue] = useState(""); // State for first box
  const [boxTwoValue, setBoxTwoValue] = useState(""); // State for second box
  const [successTrue, setSuccessTrue] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [answer, setAnswer] = useState(true);
  const [wrongOne, setWrongOne] = useState(false);
  const [gap, setGap] = useState(false);
  const [wrongTwo, setWrongTwo] = useState(false);
  const [successTwo, setSuccessTwo] = useState(false);
  const [next, setNext] = useState(false);
  const [errorOne, setErrorOne] = useState(false);
  const [errorTwo, setErrorTwo] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleKeypadInput = value => {
    playClick();
    if (activeBox === "boxOne") {
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
    } else if (activeBox === "boxTwo") {
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
  const checkHandle = () => {
    if (boxOneValue === "2" && boxTwoValue === "15" && attempt === 0) {
      playCorrect();
      setAnswer(false);
      setDisabled(false);
      setSuccessTrue(true);
      setNext(true);
    } else if (boxOneValue === "2" && boxTwoValue === "15" && attempt > 0) {
      playCorrect();
      setAnswer(false);
      setDisabled(false);
      setSuccessTwo(true);
      setErrorTwo(false);
      setErrorOne(false);
      setNext(true);
    } else if (attempt === 0) {
      playWrong();
      setAttempt(1);
      setErrorTwo(false);
      setWrongOne(true);
      setErrorOne(true);
      setGap(true);
    } else if (attempt > 0) {
      playWrong();
      setErrorOne(false);
      setErrorTwo(true);
      setWrongOne(false);
      setWrongTwo(true);
    }
  };
  const coloredCells = {
    "0-0": {
      color: "cyan"
    },
    "0-1": {
      color: "cyan"
    },
    "1-0": {
      color: "cyan"
    },
    "1-1": {
      color: "cyan"
    },
    "2-0": {
      color: "green",
      text: "1"
    },
    "2-1": {
      color: "green",
      text: "2"
    },
    "2-2": {
      color: "orange"
    },
    "2-3": {
      color: "orange"
    },
    "2-4": {
      color: "orange"
    }
  };
  const coloredCellsTwo = {
    "0-0": {
      color: "cyan"
    },
    "0-1": {
      color: "cyan"
    },
    "1-0": {
      color: "cyan"
    },
    "1-1": {
      color: "cyan"
    },
    "2-0": {
      color: "green"
    },
    "2-1": {
      color: "green"
    },
    "2-2": {
      color: "orange"
    },
    "2-3": {
      color: "orange"
    },
    "2-4": {
      color: "orange"
    }
  };
  const tables = [{
    rows: 3,
    cols: 1,
    coloredCells: {
      "2-0": "orange",
      "2-1": "orange",
      "2-2": "orange"
    },
    style: {
      width: "16vw"
    }
  }, {
    rows: 1,
    cols: 5,
    coloredCells: {
      "0-0": "cyan",
      "1-0": "cyan",
      "2-0": "cyan",
      "0-1": "cyan",
      "1-1": "cyan",
      "2-1": "cyan"
    },
    style: {
      height: "16vh"
    }
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-conatiner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, t("sceneOne.heading")), /*#__PURE__*/React.createElement("div", {
    className: "main-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "question-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "question-align",
    style: {
      gap: gap ? "7vw" : ""
    }
  }, wrongTwo && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: "10%",
      width: "21vw",
      left: "14%"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.9 -0.85 15.2 0.95"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4 0 C 9 -1 14 -1 19 0",
    stroke: "orange",
    "stroke-width": "0.2",
    fill: "none"
  }))), wrongTwo && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: "36%",
      width: "20vw",
      left: "14.5%"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.9 -0.1 15.2 1.355"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 4 0 C 9 2 15 1 19 0",
    stroke: "orange",
    "stroke-width": "0.2",
    fill: "none"
  }))), /*#__PURE__*/React.createElement(Fraction, {
    num: 1,
    deno: 3,
    style: {
      color: successTrue ? "orange" : "",
      fontSize: "7vw"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "7vw"
    }
  }, "\u2715"), /*#__PURE__*/React.createElement(Fraction, {
    num: 2,
    deno: 5,
    fontSize: "7vw",
    style: {
      color: successTrue ? "cyan" : "",
      fontSize: "7vw"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "7vw"
    }
  }, "="), answer && /*#__PURE__*/React.createElement("div", {
    className: "box-align"
  }, /*#__PURE__*/React.createElement(Box, {
    beat: activeBox === "boxOne",
    value: boxOneValue,
    onClick: () => setActiveBox("boxOne")
  }), /*#__PURE__*/React.createElement("div", {
    className: "box-line"
  }), /*#__PURE__*/React.createElement(Box, {
    beat: activeBox === "boxTwo",
    value: boxTwoValue,
    onClick: () => setActiveBox("boxTwo")
  })), successTrue && /*#__PURE__*/React.createElement(Fraction, {
    num: 2,
    deno: 15,
    style: {
      fontSize: "7vw",
      background: "green",
      padding: "1vh 1vw",
      border: "0.2vw solid white",
      borderRadius: "1vw"
    }
  }), successTwo && /*#__PURE__*/React.createElement(Fraction, {
    num: 2,
    deno: 15,
    style: {
      fontSize: "7vw",
      color: "#1dbf1dd1"
    }
  })), successTrue && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(DynamicTable, {
    rows: 3,
    cols: 5,
    coloredCells: coloredCells
  }), /*#__PURE__*/React.createElement(Fraction, {
    num: 2,
    deno: 15,
    style: {
      fontSize: "2vw",
      color: "green",
      position: "absolute",
      bottom: "0%",
      left: "-14%"
    }
  }), /*#__PURE__*/React.createElement(Fraction, {
    num: 1,
    deno: 3,
    style: {
      fontSize: "2vw",
      color: "orange",
      position: "absolute",
      bottom: "0%",
      right: "-10%"
    }
  }), /*#__PURE__*/React.createElement(Fraction, {
    num: 2,
    deno: 5,
    style: {
      fontSize: "2vw",
      color: "cyan",
      position: "absolute",
      top: "-39%",
      left: "18%"
    }
  })), (wrongOne || wrongTwo) && /*#__PURE__*/React.createElement("div", {
    className: "box-align",
    style: {
      flexDirection: "row",
      gap: "8vw"
    }
  }, /*#__PURE__*/React.createElement(DynamicTableTwo, {
    tables: tables
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "4vw"
    }
  }, /*#__PURE__*/React.createElement(DynamicTable, {
    rows: 3,
    cols: 5,
    coloredCells: coloredCellsTwo,
    style: {
      width: "30px",
      height: "30px"
    }
  }))), successTrue && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2vw",
      textAlign: "center",
      position: "fixed",
      bottom: "16%",
      background: "green",
      padding: "0.5vh 1vw",
      borderRadius: "1vw"
    }
  }, t("sceneOne.success")), errorOne && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "4vw",
      textAlign: "center",
      position: "fixed",
      bottom: "20%",
      background: "#fa8072b5",
      padding: "0.5vh 1vw",
      borderRadius: "1vw"
    }
  }, t("sceneOne.error")), errorTwo && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2vw",
      textAlign: "center",
      position: "fixed",
      bottom: "20%",
      background: "#fa8072b5",
      padding: "0.5vh 1vw",
      borderRadius: "1vw"
    }
  }, t("sceneOne.errorTwo")), successTwo && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2vw",
      textAlign: "center",
      position: "fixed",
      bottom: "16%",
      background: "green",
      padding: "0.5vh 1vw",
      borderRadius: "1vw"
    }
  }, t("sceneOne.successTwo", {
    count: 2,
    counttwo: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "option-container"
  }, /*#__PURE__*/React.createElement(Keypad, {
    onInput: handleKeypadInput,
    checkHandle: checkHandle,
    disabled: disabled
  }))), !next && /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("navigation.tapNumpad")), next && /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("navigation.tapNext")), /*#__PURE__*/React.createElement("div", {
    className: "footer-button"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), !next && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0,
    onClick: () => {
      playClick();
      goNext();
    }
  }))));
};
window.SceneOne=SceneOne;