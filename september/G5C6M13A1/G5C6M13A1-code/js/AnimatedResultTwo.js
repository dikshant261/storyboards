const AnimatedResultTwo = ({
  next,
  setNext,
  fadeOpacity,
  paraTwo,
  paraOne
}) => {
  const [visibleRows, setVisibleRows] = useState(0);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const result = sessionStorage.getItem("fractionsData");
  const parsed = result ? JSON.parse(result) : [];
  // Show each row one by one
  useEffect(() => {
    if (parsed.length === 0) return;
    let i = 0;
    const interval = setInterval(() => {
      setVisibleRows(prev => prev + 1);
      i++;
      if (i >= parsed.length) {
        clearInterval(interval);
      }
    }, 1500); // 1.5 sec delay per row
    setInterval(() => {
      setStepOne(true);
    }, 5500);
    setInterval(() => {
      setStepTwo(true);
    }, 6500);
    setInterval(() => {
      setStepThree(true);
      if (!next) {
        setNext();
      }
    }, 7200);
    return () => clearInterval(interval);
  }, [parsed, next]);
  return /*#__PURE__*/React.createElement("div", {
    className: "conatiner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gridAutoFlow: "dense",
      gap: "1vh",
      justifyContent: "center"
    }
  }, parsed.slice(0, visibleRows).map((item, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    style: {
      display: "grid",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "2vw",
      gridAutoFlow: "column",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "6vw",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      opacity: fadeOpacity ? "0.4" : "1"
    }
  }, /*#__PURE__*/React.createElement(Fraction, {
    numerator: item.step.originalNum,
    denominator: item.step.originalDen,
    fontSize: "4vw",
    lineHeight: "1vh",
    lineWidth: "100%"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      opacity: fadeOpacity ? "0.4" : "1"
    }
  }, "="), /*#__PURE__*/React.createElement("div", {
    className: "division-align",
    style: {}
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "2vh"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: fadeOpacity ? "0.4" : "1"
    }
  }, " ", item.step.originalNum), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: fadeOpacity ? "0.4" : "1"
    }
  }, " \xF7 "), /*#__PURE__*/React.createElement("span", {
    className: `${stepOne ? "divisor" : ""}`
  }, item.step.divisor)), /*#__PURE__*/React.createElement("div", {
    className: "line-two",
    style: {
      opacity: fadeOpacity ? "0.4" : "1"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "2vh"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: fadeOpacity ? "0.4" : "1"
    }
  }, item.step.originalDen), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: fadeOpacity ? "0.4" : "1"
    }
  }, " \xF7 "), /*#__PURE__*/React.createElement("span", {
    className: `${stepOne ? "divisor" : ""}`
  }, item.step.divisor))), /*#__PURE__*/React.createElement("p", {
    style: {
      opacity: fadeOpacity ? "0.4" : "1"
    }
  }, "="), /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: fadeOpacity ? "0.4" : "1"
    }
  }, /*#__PURE__*/React.createElement(Fraction, {
    numerator: item.fraction.num,
    denominator: item.fraction.den,
    fontSize: "4vw",
    lineHeight: "1vh",
    lineWidth: "100%"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "bracket",
    style: {
      opacity: fadeOpacity ? "0.4" : stepTwo ? "1" : "0"
    }
  }, "}"), paraOne && /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: stepThree ? "1" : "0"
    }
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: fadeOpacity ? "0.4" : "1"
    }
  }, t("divideBy")), ",", /*#__PURE__*/React.createElement("span", {
    className: "divisor"
  }, "2"), ",", /*#__PURE__*/React.createElement("span", {
    className: "divisor"
  }, "2"), ",", /*#__PURE__*/React.createElement("span", {
    className: "divisor"
  }, "3"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: fadeOpacity ? "0.7" : "1"
    }
  }, t("andToget"))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      opacity: fadeOpacity ? "0.4" : "1"
    }
  }, /*#__PURE__*/React.createElement("span", null, "12"), /*#__PURE__*/React.createElement("span", {
    style: {
      backgroundColor: "white",
      width: "3vw",
      height: "0.3vh"
    }
  }), /*#__PURE__*/React.createElement("span", null, "24")))), paraTwo && /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    className: "divisor"
  }, "2"), ",", /*#__PURE__*/React.createElement("span", {
    className: "divisor"
  }, "2"), " ", t("and"), " ", /*#__PURE__*/React.createElement("span", {
    className: "divisor"
  }, "3"), " ", t("commonFactor")));
};
window.AnimatedResultTwo=AnimatedResultTwo;