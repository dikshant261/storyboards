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
  const handleOptionClick = (option) => {
    boxResultSet(option);
  };

  // Only enable buttons if stepOne, stepTwo, or stepThree is active
  const isDisabled = !(stepOne || stepTwo || stepThree);

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
        className: `feedback-box ${
          (stepOne && boxResultOne === correctOption[0]) ||
          (stepTwo && boxResultTwo === correctOption[1]) ||
          (stepThree && boxResultThree === correctOption[2])
            ? "correct"
            : (stepOne && boxResultOne !== "") ||
              (stepTwo && boxResultTwo !== "") ||
              (stepThree && boxResultThree !== "")
            ? "wrong"
            : ""
        }`,
      },
      showErrorOne &&
        stepOne &&
        React.createElement(TableMessage, {
          stepOne,
          stepTwo,
          stepThree,
          boxResultOne,
          correctOption,
          options,
          flag,
        }),
      showErrorTwo &&
        stepTwo &&
        React.createElement(TableMessage, {
          stepOne,
          stepTwo,
          stepThree,
          boxResultOne: boxResultTwo,
          correctOption,
          options,
          flag,
        }),
      showErrorThree &&
        stepThree &&
        React.createElement(TableMessage, {
          stepOne,
          stepTwo,
          stepThree,
          boxResultOne: boxResultThree,
          correctOption,
          options,
          flag,
        })
    ),

    // Option buttons grid
    React.createElement(
      "div",
      { className: "option-grid" },

      // Button 1
      React.createElement(
        "button",
        {
          className: `option-button${
            boxResultOne === correctOption[0] ? " option-correct-disabled" : ""
          }`,
          onClick: () => handleOptionClick(correctOption[0]),
          disabled: isDisabled || boxResultOne === correctOption[0],
        },
        renderOption(options[0])
      ),

      // Button 2
      React.createElement(
        "button",
        {
          className: `option-button${
            boxResultTwo === correctOption[1] ? " option-correct-disabled" : ""
          }`,
          onClick: () => handleOptionClick(correctOption[1]),
          disabled: isDisabled || boxResultTwo === correctOption[1],
        },
        renderOption(options[1])
      ),

      // Button 3
      React.createElement(
        "button",
        {
          className: "option-button",
          onClick: () => handleOptionClick(options[2]),
          disabled: isDisabled,
        },
        renderOption(options[2])
      ),

      // Button 4
      React.createElement(
        "button",
        {
          className: `option-button${
            boxResultThree === correctOption[2]
              ? " option-correct-disabled"
              : ""
          }`,
          onClick: () => handleOptionClick(correctOption[2]),
          disabled: isDisabled || boxResultThree === correctOption[2],
        },
        renderOption(options[3])
      ),

      // Button 5
      React.createElement(
        "button",
        {
          className: "option-button",
          onClick: () => handleOptionClick(options[4]),
          disabled: isDisabled,
        },
        renderOption(options[4])
      ),

      // Button 6
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
};
window.TableOption=TableOption;