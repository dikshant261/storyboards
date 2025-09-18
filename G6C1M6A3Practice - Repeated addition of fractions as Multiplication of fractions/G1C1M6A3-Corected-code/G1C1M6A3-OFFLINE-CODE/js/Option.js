const Option = ({ question, response, answer }) => {
  const correct = `${question[0]}/${question[1]}`;
  const [disabledOptions, setDisabledOptions] = React.useState([]);
  const [permanentDisable, setPermanentDisable] = React.useState(false);
  const [wrongOption, setWrongOption] = React.useState(null);

  // Helper to determine if answer is correct
  const isCorrect = answer === correct;

  // Option coloring logic
  const getOptionClass = (val) => {
    if (!answer) return "option-button";

    if (isCorrect) {
      if (val === correct) return "option-button option-correct"; // green
      return "option-button option-disabled"; // gray
    }

    // Wrong answer case
    if (answer) {
      if (val === wrongOption) return "option-button option-wrong "; // salmon
      if (disabledOptions.includes(val)) return "option-button option-disabled"; // gray
    }
    return "option-button";
  };

  // Option disabling logic
  const isOptionDisabled = (val) => {
    if (isCorrect) return true;
    if (permanentDisable && val === wrongOption) return true;
    if (disabledOptions.includes(val)) return true;
    return false;
  };

  // Handle click logic
  const handleClick = (num) => {
    if (isOptionDisabled(num)) return;
    response(num);

    if (num !== correct) {
      setWrongOption(num);
      setPermanentDisable(true);

      // after short delay, turn wrong into gray
      setTimeout(() => {
        setDisabledOptions((prev) => [...prev, num]);
        setWrongOption(null); // clear wrong highlight
      }, 1000); // adjust delay if needed
    }
  };

  // Reset disables on new question
  React.useEffect(() => {
    setDisabledOptions([]);
    setPermanentDisable(false);
    setWrongOption(null);
  }, [question, correct]);

  return React.createElement(
    "div",
    { className: "option-container" },

    // Option 1
    React.createElement(
      "div",
      {
        className: getOptionClass(question[1]),
        onClick: () => handleClick(question[1]),
        style: isOptionDisabled(question[1]) ? { pointerEvents: "none" } : {},
      },
      question[1]
    ),

    // Option 2 (fraction)
    React.createElement(
      "div",
      {
        className: getOptionClass(correct),
        onClick: () => handleClick(correct),
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

    // Option 3
    React.createElement(
      "div",
      {
        className: getOptionClass(question[2]),
        onClick: () => handleClick(question[2]),
        style: isOptionDisabled(question[2]) ? { pointerEvents: "none" } : {},
      },
      question[2]
    )
  );
};
window.Option = Option;
