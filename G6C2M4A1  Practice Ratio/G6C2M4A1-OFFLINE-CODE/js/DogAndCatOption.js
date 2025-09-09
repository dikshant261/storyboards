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
}) {
  const handleOptionClick = (option) => {
    playClick();
    boxResultSet(option);
  };

  const isDisabled = !(stepOne || stepTwo || stepThree);

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
          ((stepOne && boxResultOne === correctOption[0]) ||
          (stepTwo && boxResultTwo === correctOption[1]) ||
          (stepThree && boxResultThree === correctOption[2])
            ? "correct"
            : (stepOne && boxResultOne !== "") ||
              (stepTwo && boxResultTwo !== "") ||
              (stepThree && boxResultThree !== "")
            ? "wrong"
            : ""),
      },
      showErrorOne &&
        stepOne &&
        React.createElement(ErrorMessage, {
          stepOne,
          stepTwo,
          stepThree,
          boxResultOne,
          correctOption,
          options,
        }),
      showErrorTwo &&
        stepTwo &&
        React.createElement(ErrorMessage, {
          stepOne,
          stepTwo,
          stepThree,
          boxResultOne: boxResultTwo,
          correctOption,
          options,
        }),
      showErrorThree &&
        stepThree &&
        React.createElement(ErrorMessage, {
          stepOne,
          stepTwo,
          stepThree,
          boxResultOne: boxResultThree,
          correctOption,
          options,
        })
    ),

    // option-grid
    React.createElement(
      "div",
      { className: "option-grid" },

      // Option 1
      React.createElement(
        "button",
        {
          className:
            "option-button" +
            (boxResultOne === correctOption[0]
              ? " option-correct-disabled"
              : ""),
          onClick: () => handleOptionClick(correctOption[0]),
          disabled: isDisabled || boxResultOne === correctOption[0],
        },
        renderOption(options[0])
      ),

      // Option 2
      React.createElement(
        "button",
        {
          className:
            "option-button" +
            (boxResultTwo === correctOption[1]
              ? " option-correct-disabled"
              : ""),
          onClick: () => handleOptionClick(correctOption[1]),
          disabled: isDisabled || boxResultTwo === correctOption[1],
        },
        renderOption(options[1])
      ),

      // Option 3
      React.createElement(
        "button",
        {
          className: "option-button",
          onClick: () => handleOptionClick(options[2]),
          disabled: isDisabled,
        },
        renderOption(options[2])
      ),

      // Option 4
      React.createElement(
        "button",
        {
          className:
            "option-button" +
            (boxResultThree === correctOption[2]
              ? " option-correct-disabled"
              : ""),
          onClick: () => handleOptionClick(correctOption[2]),
          disabled: isDisabled || boxResultThree === correctOption[2],
        },
        renderOption(options[3])
      ),

      // Option 5
      React.createElement(
        "button",
        {
          className: "option-button",
          onClick: () => handleOptionClick(options[4]),
          disabled: isDisabled,
        },
        renderOption(options[4])
      ),

      // Option 6
      React.createElement(
        "button",
        {
          className: "option-button",
          onClick: () => handleOptionClick(options[5]),
          disabled: isDisabled,
        },
        renderOption(options[5])
      )
    )
  );
}
window.DogAndCatOption=DogAndCatOption;