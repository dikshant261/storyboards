const Option = ({ question, response, answer }) => {
  const correct = `${question[0]}/${question[1]}`;
  const isCorrect = answer === correct;

  const getOptionClass = (val) => {
    if (!answer) return "option-button";
    if (isCorrect) {
      if (val === correct) return "option-button option-correct";
      return "option-button option-disabled";
    }
    if (val === answer) return "option-button option-wrong option-disabled";
    return "option-button";
  };

  const [disabledOptions, setDisabledOptions] = React.useState([]);

  React.useEffect(() => {
    if (answer && answer !== correct && !disabledOptions.includes(answer)) {
      setDisabledOptions((prev) => [...prev, answer]);
    }
    if (!answer) setDisabledOptions([]);
  }, [answer, correct]);

  const isOptionDisabled = (val) => {
    if (isCorrect) return true;
    if (disabledOptions.includes(val)) return true;
    return false;
  };

  const handleClick = (num) => {
    if (!isOptionDisabled(num)) response(num);
  };

  return React.createElement(
    "div",
    { className: "option-container" },

    // ✅ Option 1
    React.createElement(
      "div",
      {
        className: getOptionClass(question[1]),
        onClick: () =>
          !isOptionDisabled(question[1]) && handleClick(question[1]),
        style: isOptionDisabled(question[1]) ? { pointerEvents: "none" } : {},
      },
      question[1]
    ),

    // ✅ Option 2 (fraction)
    React.createElement(
      "div",
      {
        className: getOptionClass(correct),
        onClick: () => !isOptionDisabled(correct) && handleClick(correct),
        style: isOptionDisabled(correct) ? { pointerEvents: "none" } : {},
      },
      React.createElement(
        "span",
        { className: "option-fraction" },
        React.createElement("span", null, question[0]),
        React.createElement("span", { className: "option-fraction-line" }),
        React.createElement("span", null, question[1])
      )
    ),

    // ✅ Option 3
    React.createElement(
      "div",
      {
        className: getOptionClass(question[2]),
        onClick: () =>
          !isOptionDisabled(question[2]) && handleClick(question[2]),
        style: isOptionDisabled(question[2]) ? { pointerEvents: "none" } : {},
      },
      question[2]
    )
  );
};
window.Option=Option;