const OptionTwo = ({ question, response }) => {
  const [disabledOptions, setDisabledOptions] = React.useState([]); // wrong clicked ones
  const [correctSelected, setCorrectSelected] = React.useState(false); // when correct is clicked
  const [wrongOption, setWrongOption] = React.useState(null); // track last wrong clicked

  const correctAnswer = question[2]; // ✅ correct answer is always question[2]

  const handleClick = (option) => {
    if (correctSelected || disabledOptions.includes(option) || wrongOption)
      return;

    response(option);

    if (option === correctAnswer) {
      setCorrectSelected(true); // correct chosen → lock all
    } else {
      setWrongOption(option); // highlight wrong temporarily
      setTimeout(() => {
        setDisabledOptions((prev) => [...prev, option]); // move it to gray disabled
        setWrongOption(null); // reset wrong highlight
      }, 1000); // 1s highlight before turning gray
    }
  };

  const getStyle = (option) => {
    if (correctSelected) {
      if (option === correctAnswer) {
        return {
          backgroundColor: "#4caf50",
          color: "white",
          pointerEvents: "none",
          border: "0.3vw solid darkgreen",
        };
      }
      return {
        backgroundColor: "rgb(184 184 184)", // gray
        color: "white",
        pointerEvents: "none",
      };
    }

    if (wrongOption === option) {
      return {
        backgroundColor: "salmon",
        color: "white",
        pointerEvents: "none",
        border: "0.3vw solid darksalmon",
      };
    }

    if (disabledOptions.includes(option)) {
      return {
        backgroundColor: "rgb(184 184 184)", // gray after wrong
        color: "white",
        pointerEvents: "none",
        border: "0.3vw solid #777",
      };
    }

    return {};
  };

  return React.createElement(
    "div",
    { className: "option-container" },
    question[0] === 3 && question[1] === 10
      ? React.createElement(
          "div",
          {
            className: "option-button",
            style: getStyle(question[0] + 10),
            onClick: () => handleClick(question[0] + 10),
          },
          question[0] + 10
        )
      : React.createElement(
          "div",
          {
            className: "option-button",
            style: getStyle(question[0]),
            onClick: () => handleClick(question[0]),
          },
          question[0]
        ),
    React.createElement(
      "div",
      {
        className: "option-button",
        style: getStyle(question[1]),
        onClick: () => handleClick(question[1]),
      },
      question[1]
    ),
    React.createElement(
      "div",
      {
        className: "option-button",
        style: getStyle(question[2]),
        onClick: () => handleClick(question[2]),
      },
      question[2]
    )
  );
};

window.OptionTwo = OptionTwo;
