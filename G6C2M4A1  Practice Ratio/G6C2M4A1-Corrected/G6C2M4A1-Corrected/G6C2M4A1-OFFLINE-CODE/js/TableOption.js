const TableOption = ({
  options,
  correctOption,
  flag,
  boxResultSet,
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  boxResultTwo,
  boxResultThree,
  showErrorOne,
  showErrorTwo,
  showErrorThree,
}) => {
  // Determine current step and result
  let currentStep = 0;
  let boxResult = "";
  let correct = "";
  if (stepOne) {
    currentStep = 1;
    boxResult = boxResultOne;
    correct = correctOption[0];
  } else if (stepTwo) {
    currentStep = 2;
    boxResult = boxResultTwo;
    correct = correctOption[1];
  } else if (stepThree) {
    currentStep = 3;
    boxResult = boxResultThree;
    correct = correctOption[2];
  }

  const handleOptionClick = (option) => {
    boxResultSet(option);
  };

  // Button state logic: disables and colors wrong/correct as required
  const getButtonProps = (index) => {
    if (currentStep > 0) {
      const isCorrect = options[index] === correct;
      const isAnswered = boxResult !== "";
      const isThisClicked = boxResult === options[index];
      // If correct answer chosen, disable all
      if (isAnswered && boxResult === correct) {
        return {
          className: "option-button option-correct-disabled",
          disabled: true,
          onClick: undefined,
        };
      }
      // If wrong answer chosen, disable only that button and color salmon
      if (isAnswered && isThisClicked && !isCorrect) {
        return {
          className: "option-button option-wrong-disabled",
          disabled: true,
          onClick: undefined,
        };
      }
      // If wrong answer chosen, other buttons remain enabled
      return {
        className: "option-button",
        disabled: false,
        onClick: () => handleOptionClick(options[index]),
      };
    }
    // No step active: all normal
    return {
      className: "option-button",
      disabled: false,
      onClick: () => handleOptionClick(options[index]),
    };
  };

  // Helper to render fraction if value is in a/b form
  const renderOption = (value) => {
    if (typeof value === "string" && value.match(/^\d+\/\d+$/)) {
      const [num, denom] = value.split("/");
      return React.createElement(
        "span",
        { className: "option-fraction" },
        num,
        React.createElement("span", { className: "fraction-line" }),
        denom
      );
    }
    return value;
  };

  return React.createElement(
    "div",
    { className: "option-container" },

    // Feedback box
    React.createElement(
      "div",
      {
        className:
          "feedback-box " +
          (currentStep > 0 && boxResult !== ""
            ? (boxResult === correct ? "correct" : "wrong")
            : ""),
      },
      (showErrorOne && stepOne &&
        React.createElement(TableMessage, {
          stepOne,
          stepTwo,
          stepThree,
          boxResultOne,
          correctOption,
          options,
          flag,
        })) ||
        (showErrorTwo && stepTwo &&
          React.createElement(TableMessage, {
            stepOne,
            stepTwo,
            stepThree,
            boxResultOne: boxResultTwo,
            correctOption,
            options,
            flag,
          })) ||
        (showErrorThree && stepThree &&
          React.createElement(TableMessage, {
            stepOne,
            stepTwo,
            stepThree,
            boxResultOne: boxResultThree,
            correctOption,
            options,
            flag,
          }))
    ),

    // Option buttons grid
    React.createElement(
      "div",
      { className: "option-grid" },
      ...options.map((opt, idx) =>
        React.createElement(
          "button",
          getButtonProps(idx),
          renderOption(opt)
        )
      )
    )
  );
};
window.TableOption=TableOption;