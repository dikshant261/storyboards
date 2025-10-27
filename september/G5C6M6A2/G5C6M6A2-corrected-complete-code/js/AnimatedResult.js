const AnimatedResult = ({
  step,
  stepIndex,
  showResultAnimation,
  setShowResultAnimation,
  isLastStep
}) => {
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  console.log("isLastStep :", isLastStep);
  // Animate steps
  useEffect(() => {
    const timers = [setTimeout(() => setStepOne(true), 1000), setTimeout(() => setStepTwo(true), 2000), setTimeout(() => setStepThree(true), 3000), setTimeout(() => setShowResultAnimation(true), 3500) // Fly animation starts after step 3
    ];
    return () => timers.forEach(clearTimeout);
  }, [stepIndex]);
  return /*#__PURE__*/React.createElement("div", {
    className: "result-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "result"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Fraction, {
    numerator: step.originalNum,
    denominator: step.originalDen,
    fontSize: "4vw",
    lineHeight: "0.7vh",
    lineWidth: "5vw"
  })), /*#__PURE__*/React.createElement("p", null, "="), /*#__PURE__*/React.createElement("div", {
    className: "divide-fraction",
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      opacity: stepOne ? "1" : "0",
      fontSize:"4vw"
    }
  }, step.originalNum, " \xF7 ", step.divisor), /*#__PURE__*/React.createElement("div", {
    className: "line",
    style: {
      opacity: stepTwo ? "1" : "0"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      opacity: stepTwo ? "1" : "0",
      fontSize:"4vw"
    }
  }, step.originalDen, " \xF7 ", step.divisor)), /*#__PURE__*/React.createElement("p", {
    style: {
      opacity: stepThree ? "1" : "0",
    }
  }, "="), /*#__PURE__*/React.createElement("div", {
    className: `result-fraction`,
    style: {
      opacity: stepThree ? "1" : "0"
    }
  }, /*#__PURE__*/React.createElement(Fraction, {
    numerator: step.newNum,
    denominator: step.newDen,
    fontSize: "4vw",
    lineHeight: "0.7vh",
    lineWidth: "5vw"
  }))));
};
window.AnimatedResult=AnimatedResult;