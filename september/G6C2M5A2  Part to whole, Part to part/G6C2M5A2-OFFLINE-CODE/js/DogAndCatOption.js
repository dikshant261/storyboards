function DogAndCatOption({
  options,
  correctOption,
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
  flag
}) {
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
    playClick();
    boxResultSet(option);
  };

  // Button state logic
  const getButtonProps = (index) => {
    if (currentStep > 0) {
      const isCorrect = options[index] === correct;
      const isAnswered = boxResult !== "";
      const isThisClicked = boxResult === options[index];

      if (isAnswered && boxResult === correct) {
        return {
          className: "option-button option-correct-disabled",
          disabled: true,
        };
      }
      if (isAnswered && isThisClicked && !isCorrect) {
        return {
          className: "option-button option-wrong-disabled",
          disabled: true,
        };
      }
      return {
        className: "option-button",
        disabled: false,
        onClick: () => handleOptionClick(options[index]),
      };
    }

    return {
      className: "option-button",
      disabled: false,
      onClick: () => handleOptionClick(options[index]),
    };
  };

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

    // feedback-box
    React.createElement(
      "div",
      {
        className:
          "feedback-box " +
          (currentStep > 0 && boxResult !== ""
            ? boxResult === correct
              ? "correct"
              : "wrong"
            : ""),
      },
      (showErrorOne && stepOne &&
        React.createElement(ErrorMessage, {
          stepOne,
          stepTwo,
          stepThree,
          boxResultOne,
          correctOption,
          options,
          flag,
        })) ||
        (showErrorTwo && stepTwo &&
          React.createElement(ErrorMessage, {
            stepOne,
            stepTwo,
            stepThree,
            boxResultOne: boxResultTwo,
            correctOption,
            options,
            flag,
          })) ||
        (showErrorThree && stepThree &&
          React.createElement(ErrorMessage, {
            stepOne,
            stepTwo,
            stepThree,
            boxResultOne: boxResultThree,
            correctOption,
            options,
            flag,
          }))
    ),

    // option-grid
    React.createElement(
      "div",
      { className: "option-grid" },
      options.map((opt, idx) =>
        React.createElement(
          "button",
          { key: idx, ...getButtonProps(idx) },
          renderOption(opt)
        )
      )
    )
  );
}
window.DogAndCatOption=DogAndCatOption;