const OptionFour = ({ question, response, answer }) => {
  const [disabledOptions, setDisabledOptions] = React.useState([]); // wrong clicked ones
  const [correctSelected, setCorrectSelected] = React.useState(false); // when correct is clicked
  const [wrongOption, setWrongOption] = React.useState(null); // temporary wrong highlight

  // Create a unique key for each option
  const makeKey = (num, deno) => `${num}-${deno}`;

  const isCorrectOption = (num, deno) =>
    num === question[2] * question[0] && deno === question[1];

  const handleClick = (num, deno) => {
    const key = makeKey(num, deno);

    if (correctSelected || disabledOptions.includes(key) || wrongOption) return;

    response(num, deno);

    if (isCorrectOption(num, deno)) {
      setCorrectSelected(true); // correct chosen → lock all
    } else {
      setWrongOption(key); // highlight wrong temporarily
      setTimeout(() => {
        setDisabledOptions((prev) => [...prev, key]); // turn wrong into gray
        setWrongOption(null);
      }, 1000); // 1s salmon before gray
    }
  };

  const getStyle = (num, deno) => {
    const key = makeKey(num, deno);

    if (correctSelected) {
      if (isCorrectOption(num, deno)) {
        return {
          backgroundColor: "lightgreen",
          color: "white",
          pointerEvents: "none",
          border: "0.3vw solid darkgreen",
        };
      }
      return {
        backgroundColor: "#e0e0e0", // gray
        color: "#777",
        pointerEvents: "none",
        border: "0.3vw solid #777",
      };
    }

    if (wrongOption === key) {
      return {
        backgroundColor: "salmon",
        color: "white",
        pointerEvents: "none",
        border: "0.3vw solid darksalmon",
      };
    }

    if (disabledOptions.includes(key)) {
      return {
        backgroundColor: "#e0e0e0", // gray after wrong
        color: "#777",
        pointerEvents: "none",
        border: "0.3vw solid #777",
      };
    }

    return {};
  };

  return React.createElement(
    "div",
    { className: "option-container" },

    // ✅ Option 1
    question[0] === 4 && question[1] === 5
      ? React.createElement(
          "div",
          {
            className: "option-button-multiply",
            style: getStyle(question[1] + 2, question[1]),
            onClick: () => handleClick(question[1] + 2, question[1]),
          },
          React.createElement(FractionOption, {
            numerator: question[1] + 2,
            denominator: question[1],
          })
        )
      : React.createElement(
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

    // ✅ Option 2 (Correct one)
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
    question[0] === 1 && question[1] === 3
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
      : question[0] === 1 && question[1] === 6
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
window.OptionFour = OptionFour;
