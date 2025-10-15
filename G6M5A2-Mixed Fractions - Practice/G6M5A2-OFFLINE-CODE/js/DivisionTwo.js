const DivisionTwo = ({
  anime,
  remainder,
  num,
  deno,
  question
}) => {
  const [showAnime, setShowAnime] = useState(false);
  const [multiply, setMultiply] = useState(null);
  const [quotientAnimation, setQuotientAnimation] = useState(false);
  const [correctOption, setCorrectOption] = useState(null);
  const [remainderOption, setRemainderOption] = useState(null);
  // Calculate multiplication only if quotient.option exists
  useEffect(() => {
    if (!question) return;
    const correctedItem = question.quotient.find(item => item.isCorrected);
    if (correctedItem) {
      setMultiply(deno * correctedItem.option);
      setCorrectOption(correctedItem.option);
    } else {
      setMultiply(null);
      setCorrectOption(null);
    }
  }, [question, deno]);
  console.log(correctOption);
  // Trigger quotient fly animation when correct
  useEffect(() => {
    setRemainderOption(remainder.option);
  }, [remainder]);
  useEffect(() => {
    if (remainder.isCorrected) {
      setQuotientAnimation(false); // reset animation
      setTimeout(() => setQuotientAnimation(true), 50); // re-trigger
    }
  }, [remainder.isCorrected]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "division-container"
  }, /*#__PURE__*/React.createElement(DivideSvg, null), /*#__PURE__*/React.createElement("div", {
    className: "column-adjust num"
  }, /*#__PURE__*/React.createElement("div", {
    className: "box",
    style: {
      color: "green"
    }
  }, correctOption)), /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, deno), /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, num), /*#__PURE__*/React.createElement("div", {
    className: "num column-adjust",
    style: {
      borderBottom: "0.6vh solid white",
      color: "green"
    }
  }, multiply), /*#__PURE__*/React.createElement("div", {
    className: "num column-adjust"
  }, remainderOption === null ? /*#__PURE__*/React.createElement("div", {
    className: "box-two"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "box-two",
    style: {
      background: remainder.isCorrected ? "transparent" : "salmon",
      color: remainder.isCorrected ? "orange" : "black"
    }
  }, remainderOption, /*#__PURE__*/React.createElement("p", {
    className: `quotient-fly-two ${quotientAnimation ? "fly-four" : ""}`,
    style: {
      color: "orange"
    }
  }, remainderOption)))));
};
window.DivisionTwo=DivisionTwo;