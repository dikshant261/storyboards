const OptionThree = ({ question, response, answer }) => {
  const [disabledOptions, setDisabledOptions] = React.useState([]); // wrong clicked ones
  const [correctSelected, setCorrectSelected] = React.useState(false); // when correct is clicked

  // Create a unique key for each option
  const makeKey = (num, count, pluse) => `${num}-${count}-${pluse}`;

  const handleClick = (num, count, pluse) => {
    const key = makeKey(num, count, pluse);

    if (correctSelected || disabledOptions.includes(key)) return;

    response(num, count, pluse);

    if (num === question[2] & count === question[0] && pluse === "x") {
      setCorrectSelected(true); // correct chosen → lock all
    } else {
      setDisabledOptions((prev) => [...prev, key]); // wrong chosen → disable only that one
    }
  };

  const getStyle = (num, count, pluse) => {
    const key = makeKey(num, count, pluse);

    if (correctSelected && num === question[2] & count === question[0] && pluse === "x") {
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
        style: getStyle(question[2], question[2], "x"),
        onClick: () => handleClick(question[2], question[2], "x"),
      },
      React.createElement(FractionMultiply, {
        numerator: question[2],
        denominator: question[1],
        count: question[2],
      })
    ),

    // ✅ Option 2
    React.createElement(
      "div",
      {
        className: "option-button-multiply",
        style: getStyle(question[2], question[0], "x"),
        onClick: () => handleClick(question[2], question[0], "x"),
      },
      React.createElement(FractionMultiply, {
        numerator: question[2],
        denominator: question[1],
        count: question[0],
      })
    ),

    // ✅ Option 3
    React.createElement(
      "div",
      {
        className: "option-button-multiply",
        style: getStyle(question[2], question[0], "+"),
        onClick: () => handleClick(question[2], question[0], "+"),
      },
      React.createElement(FractionMultiply, {
        numerator: question[2],
        denominator: question[1],
        count: question[0],
        pluse: true,
      })
    )
  );
};
window.OptionThree=OptionThree;