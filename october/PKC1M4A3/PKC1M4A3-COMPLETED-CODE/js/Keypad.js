const Keypad = ({
  Question,
  isDisabled,
  setNext,
  reset
}) => {
  const [feedback, setFeedback] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isCorrectSelected, setIsCorrectSelected] = useState(false);
  useEffect(() => {
    if (reset) {
      setFeedback("");
      setSelectedIndex(null);
      setIsCorrectSelected(false);
    }
  }, [reset]);
  // Dynamic layout for options
  const getGridStyle = () => {
    if (Question.options.length === 3) {
      return {
        display: "flex",
        justifyContent: "center",
        gap: "2vw"
      };
    } else if (Question.options.length === 4) {
      return {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "2vw"
      };
    } else {
      return {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5vh"
      };
    }
  };

  // Handle button click
  const onInput = (opt, idx) => {
    setFeedback(opt.feedback || "");
    setSelectedIndex(idx);
    if (opt.isCorrect) {
      setIsCorrectSelected(true);
      playCorrect();
      setNext(true);
    } else {
      playWrong();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "keypad-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "keypad-instruction"
  }, /*#__PURE__*/React.createElement("p", null, t(Question.questionText))), /*#__PURE__*/React.createElement("div", {
    className: "keypad-options",
    style: getGridStyle()
  }, Question.options.map((opt, index) => {
    let btnClass = "option-btn";
    if (selectedIndex === index) {
      if (opt.isCorrect) btnClass += " correct";else btnClass += " incorrect";
    }
    const disabled = isCorrectSelected && !opt.isCorrect || selectedIndex === index && !opt.isCorrect || isCorrectSelected && opt.isCorrect;
    return /*#__PURE__*/React.createElement("button", {
      key: index,
      onClick: () => onInput(opt, index),
      className: btnClass,
      disabled: isDisabled || isCorrectSelected ? true : selectedIndex === index && !opt.isCorrect ? true : false,
      style: {
        opacity: isDisabled || isCorrectSelected ? "0.6" : "1",
        cursor: isDisabled || isCorrectSelected ? "not-allowed" : "pointer"
      }
    }, opt.text);
  })), feedback !== "" && /*#__PURE__*/React.createElement("div", {
    className: "keypad-feedback",
    style: {
      background: isCorrectSelected ? "green" : "#fa8072c9",
      borderColor: isCorrectSelected ? "darkgreen" : "darksalmon"
    }
  }, /*#__PURE__*/React.createElement("p", null, t(feedback))));
};
window.Keypad=Keypad;