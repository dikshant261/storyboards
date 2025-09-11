const OptionFour = ({ question, response, answer }) => {
  const [disabledOptions, setDisabledOptions] = React.useState([]); // wrong clicked ones
  const [correctSelected, setCorrectSelected] = React.useState(false); // when correct is clicked

  // Create a unique key for each option
  const makeKey = (num, deno) => `${num}-${deno}`;

  const handleClick = (num, deno) => {
    const key = makeKey(num, deno);

    if (correctSelected || disabledOptions.includes(key)) return;

    response(num, deno);

    if (num === question[2] * question[0] && deno === question[1]) {
      setCorrectSelected(true); // correct chosen → lock all
    } else {
      setDisabledOptions((prev) => [...prev, key]); // wrong chosen → disable only that one
    }
  };

  const getStyle = (num, deno) => {
    const key = makeKey(num, deno);

    if (correctSelected && num === question[2] * question[0] && deno === question[1]) {
      return {
        backgroundColor: "lightgreen",
        color: "white",
        pointerEvents: "none",
        border: "0.3vw solid darkgreen",
      };
    }
    if (disabledOptions.includes(key)) {
      return {
        backgroundColor: "salmon",
        color: "white",
        pointerEvents: "none",
        border: "0.3vw solid darksalmon",
      };
    }
    if (correctSelected) {
      return { pointerEvents: "none", opacity: 0.6 };
    }
    return {};
  };

  return React.createElement(
    "div",
    { className: "option-container" },

    // ✅ Option 1
    React.createElement(
      "div",
      {
        className: "option-button-multiply",
        style: getStyle(question[1], question[1]),
        onClick: () => handleClick(question[1], question[1]),
      },
      React.createElement(FractionOption, {
        numerator: question[1],
        denominator: question[1],
      })
    ),

    // ✅ Option 2
    React.createElement(
      "div",
      {
        className: "option-button-multiply",
        style: getStyle(question[2] * question[0], question[1]),
        onClick: () => handleClick(question[2] * question[0], question[1]),
      },
      React.createElement(FractionOption, {
        numerator: question[2] * question[0],
        denominator: question[1],
      })
    ),

    // ✅ Conditional Option 3
    (question[0] === 1 && question[1] === 3)
      ? React.createElement(
          "div",
          {
            className: "option-button-multiply",
            style: getStyle(question[2] + 1, question[1]),
            onClick: () => handleClick(question[2] + 1, question[1]),
          },
          React.createElement(FractionOption, {
            numerator: question[2] + 1,
            denominator: question[1],
          })
        )
      : (question[0] === 1 && question[1] === 6)
      ? React.createElement(
          "div",
          {
            className: "option-button-multiply",
            style: getStyle(question[2] + 1, question[1]),
            onClick: () => handleClick(question[2] + 1, question[1]),
          },
          React.createElement(FractionOption, {
            numerator: question[2] + 1,
            denominator: question[1],
          })
        )
      : React.createElement(
          "div",
          {
            className: "option-button-multiply",
            style: getStyle(question[2], question[1]),
            onClick: () => handleClick(question[2], question[1]),
          },
          React.createElement(FractionOption, {
            numerator: question[2],
            denominator: question[1],
          })
        )
  );
};
window.OptionFour=OptionFour;