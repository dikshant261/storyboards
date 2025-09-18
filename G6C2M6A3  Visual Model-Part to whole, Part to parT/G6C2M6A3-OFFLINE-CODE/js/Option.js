const Option = ({
  option,
  correctOption,
  response,
  result,
  errorShow,
  flag,
  boxCss,
  reset,
}) => {
  const correct = correctOption;
  const [clicked, setClicked] = React.useState(null);
  const [disabledButtons, setDisabledButtons] = React.useState([]);
  const [answered, setAnswered] = React.useState(false);

  // Reset state when reset prop changes to true
  React.useEffect(() => {
    if (reset) {
      setClicked(null);
      setDisabledButtons([]);
      setAnswered(false);
    }
  }, [reset]);

  const handleClick = (opt, index) => {
  // Reset state when reset prop changes to true
    response(opt);
    if (disabledButtons.includes(index) || answered) return;

    if (opt === correct) {
      setClicked(index);
      setDisabledButtons([0, 1, 2, 3]); // disable all
      setAnswered(true);
    } else {
      setDisabledButtons([...disabledButtons, index]); // disable only wrong one
    }
  };

  return React.createElement(
    "div",
    { className: "option-container" },

    // Options grid
    React.createElement(
      "div",
      { className: "option-grid" },
      option.map((opt, index) => {
        let btnClass = "";
        if (opt === correct && (clicked === index || answered)) {
          btnClass = "correct";
        } else if (disabledButtons.includes(index) && opt !== correct) {
          btnClass = "wrong";
        }

        return React.createElement(
          "button",
          {
            key: index,
            onClick: () => handleClick(opt, index),
            disabled: answered || disabledButtons.includes(index),
            className: btnClass,
          },
          opt
        );
      })
    ),

    // Feedback Box
    React.createElement(
      "div",
      { className: `feedback-box ${boxCss}` },
      errorShow
        ? React.createElement(ErrorMessage, {
            result,
            flag,
            correctOption,
          })
        : null
    )
  );
};
window.Option=Option;