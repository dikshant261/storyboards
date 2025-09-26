
const AnimatedResult = ({
  question,
  animationShow,
  setNext,
  setHeading,
  animationSet
}) => {
  const [stepOne, setStepOne] = React.useState(false);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [stepThree, setStepThree] = React.useState(false);
  const [stepFour, setStepFour] = React.useState(false);
  useEffect(() => {
    if (animationShow) {
      setStepOne(false);
      setStepTwo(false);
      setStepThree(false);
      setStepFour(false);
    } else {
      animationSet();
      setNext(false);
    }
  }, [animationShow]);
  React.useEffect(() => {
    setStepOne(true);
    setTimeout(() => {
      setStepTwo(true);
    }, 1500);
    setTimeout(() => {
      setStepThree(true);
    }, 2500);
    setTimeout(() => {
      setStepFour(true);
      setNext(true);
    }, 3000);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "result-container"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 25",
    style: {
      width: "15vw",
      height: "22vh",
      position: "fixed",
      top: "36%",
      left: "18%",
      opacity: stepTwo ? "" : "0"
    },
    className: `${stepTwo ? "animate-result" : ""}`
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      fill: "white"
    },
    d: "m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
  })), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 25 25",
    style: {
      width: "12vw",
      height: "18vh",
      position: "fixed",
      top: "32%",
      left: "26%",
      opacity: stepThree ? "" : "0"
    },
    className: `${stepThree ? "animate-result" : ""}`
  }, /*#__PURE__*/React.createElement("path", {
    style: {
      fill: "white"
    },
    d: "m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      position: "fixed",
      top: "36%",
      left: "33%",
      color: "rgb(67, 213, 122)",
      fontSize: "2vw",
      opacity: stepFour ? "" : "0"
    },
    className: `${stepFour ? "animate-result" : ""}`
  }, t("reciprocal", {
    count: question[1]
  }))), /*#__PURE__*/React.createElement("div", {
    className: "equal-align"
  }, /*#__PURE__*/React.createElement("span", {
    className: `${stepOne ? "animate-result" : ""}`,
    style: {
      fontSize: "4vw"
    }
  }, "="), /*#__PURE__*/React.createElement("span", {
    className: `${stepOne ? "animate-result" : ""}`
  }, question[0])), /*#__PURE__*/React.createElement("span", {
    className: `${stepTwo ? "animate-result" : ""}`,
    style: {
      opacity: stepTwo ? "" : "0",
      color: "#11affc"
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("span", {
    className: `${stepThree ? "animate-result" : ""} result`,
    style: {
      opacity: stepThree ? "" : "0",
      color: "#43d57a"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, "1"), /*#__PURE__*/React.createElement("span", {
    className: "bar"
  }), /*#__PURE__*/React.createElement("span", {
    className: "den"
  }, question[1])));
};
window.AnimatedResult=AnimatedResult;