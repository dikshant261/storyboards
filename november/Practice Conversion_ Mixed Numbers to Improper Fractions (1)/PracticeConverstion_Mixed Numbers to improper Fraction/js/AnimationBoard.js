const FractionAnimation = ({
  showAniButton,
  wholeNumber,
  numerator,
  denominator,
  setNext,
  setShowDisabledButton,
  setShowReplybutton,
  setShowOption
}) => {
  const [showStep0, setShowStep0] = React.useState(false);
  const [showStep1, setShowStep1] = React.useState(false);
  const [showStep2, setShowStep2] = React.useState(false);
  const [showStep3, setShowStep3] = React.useState(false);
  const [showFormulaOne, setShowFormulaOne] = React.useState(true);
  const [showFormulaTwo, setShowFormulaTwo] = React.useState(false);
  const [showStep4, setShowStep4] = React.useState(false);
  const [showStep5, setShowStep5] = React.useState(false);
  const [showStep6, setShowStep6] = React.useState(false);
  const [showArrow, setShowArrow] = useState(false);
  console.log("Render FractionAnimation:", showAniButton);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStep0(true);
    }, 2000);
    const timer2 = setTimeout(() => {
      setShowStep1(true);
    }, 4000);
    const timer6 = setTimeout(() => {
      setShowStep6(true);
    }, 6000);
    const timer7 = setTimeout(() => {
      setShowStep2(true);
    }, 8000);
    const timer3 = setTimeout(() => {
      setShowArrow(true);
      setShowStep3(true);
    }, 10000);
    const timer4 = setTimeout(() => {
      setShowArrow(false);
      setShowFormulaOne(false);
      setShowFormulaTwo(true);
      setShowStep4(true);
    }, 12000);
    const timer5 = setTimeout(() => {
      setShowFormulaTwo(false);
      setShowStep5(true);
      setNext();
      setShowDisabledButton(false);
      setShowOption(false);
      setShowReplybutton(true);
    }, 14000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [showAniButton]);
  return /*#__PURE__*/React.createElement("div", {
    className: "fraction-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mixed-fraction instruction-align fade-in"
  }, showStep6 && /*#__PURE__*/React.createElement("div", {
    className: "fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    class: "x-icon",
    style: {
      color: "#ffab40"
    }
  }, "+"), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.9 2.9 1.2 1.2",
    style: {
      position: "absolute",
      width: "5vw",
      top: "3vh",
      left: "1vw"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5 3 A 1 1 0 0 0 4 4",
    stroke: "#ffab40",
    "stroke-width": "0.04",
    fill: "none"
  }))), showStep0 && /*#__PURE__*/React.createElement("div", {
    className: "fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    class: "plus-icon",
    style: {
      color: "#ffab40",
      fontSize: "2vw"
    }
  }, "X"), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "3.9 2.9 1.2 1.2",
    style: {
      position: "absolute",
      width: "5vw",
      bottom: "10%",
      left: "1vw",
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 5 3 A 1 1 0 0 0 4 4",
    stroke: "#ffab40",
    "stroke-width": "0.04",
    fill: "none"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "whole-number"
  }, wholeNumber), /*#__PURE__*/React.createElement("span", {
    className: "fraction"
  }, /*#__PURE__*/React.createElement("span", {
    className: "numerator"
  }, numerator), /*#__PURE__*/React.createElement("span", {
    className: "denominator"
  }, denominator))), /*#__PURE__*/React.createElement("span", {
    className: "equals",
    style: {
      opacity: showStep1 ? "1" : 0
    }
  }, "="), /*#__PURE__*/React.createElement("div", {
    className: "improper-fraction"
  }, /*#__PURE__*/React.createElement("span", {
    className: "formula"
  }, showStep1 && showFormulaOne && /*#__PURE__*/React.createElement("span", {
    className: "part fade-in"
  }, /*#__PURE__*/React.createElement("span", {
    className: "multiplier"
  }, wholeNumber), " \xD7", " ", /*#__PURE__*/React.createElement("span", {
    className: "denom"
  }, denominator), " ", showStep2 && /*#__PURE__*/React.createElement("span", {
    className: "fade-in"
  }, "+ ", numerator)), showStep4 && showFormulaTwo && /*#__PURE__*/React.createElement("span", {
    className: "part fade-in"
  }, /*#__PURE__*/React.createElement("span", null, wholeNumber * denominator), /*#__PURE__*/React.createElement("span", {
    className: "denom"
  }, "+ ", numerator)), showStep5 && /*#__PURE__*/React.createElement("span", {
    className: "part fade-in"
  }, /*#__PURE__*/React.createElement("span", null, wholeNumber * denominator + numerator)), showStep3 && /*#__PURE__*/React.createElement("span", {
    className: "divider"
  }), showStep3 && /*#__PURE__*/React.createElement("div", {
    className: "fade-in",
    style: {
      position: "relative"
    }
  }, showArrow && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "-1vh",
      right: "4vw",
      height: "5vh",
      width: "15vw"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "6.9 10.9 12.2 2.2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 7 12 H 19 M 19 12 L 18 11 M 19 12 L 18 13",
    stroke: "#ffab40",
    strokeWidth: "0.1",
    fill: "#fff"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "denominator"
  }, denominator)))));
};
window.FractionAnimation=FractionAnimation;