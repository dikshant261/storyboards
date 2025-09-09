function AppleOption({
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
  flag
}) {
  const handleOptionClick = (option) => {
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
          (stepTwo && boxResultTwo === correctOption[1])
            ? "correct"
            : (stepOne && boxResultOne !== "") ||
              (stepTwo && boxResultTwo !== "")
            ? "wrong"
            : ""),
      },
      showErrorOne &&
        stepOne &&
        React.createElement(AppleMessage, {
          stepOne,
          stepTwo,
          boxResultOne,
          correctOption,
          options,
          flag,
        }),
      showErrorTwo &&
        stepTwo &&
        React.createElement(AppleMessage, {
          stepOne,
          stepTwo,
          boxResultOne: boxResultTwo,
          correctOption,
          options,
          flag,
        })
    ),

    // option-grid
    React.createElement(
      "div",
      { className: "option-grid" },

      // Button 1
      React.createElement(
        "button",
        {
          className:
            "option-button" +
            (boxResultTwo === correctOption[1]
              ? " option-correct-disabled"
              : ""),
          onClick: () => handleOptionClick(correctOption[1]),
          disabled: isDisabled || boxResultOne === correctOption[1],
        },
        renderOption(options[0])
      ),

      // Button 2
      React.createElement(
        "button",
        {
          className: "option-button",
          onClick: () => handleOptionClick(options[1]),
          disabled: isDisabled,
        },
        renderOption(options[1])
      ),

      // Button 3
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
        renderOption(options[2])
      ),

      // Button 4
      React.createElement(
        "button",
        {
          className: "option-button",
          onClick: () => handleOptionClick(options[3]),
          disabled: isDisabled,
        },
        renderOption(options[3])
      )
    )
  );
}
window.AppleOption=AppleOption;