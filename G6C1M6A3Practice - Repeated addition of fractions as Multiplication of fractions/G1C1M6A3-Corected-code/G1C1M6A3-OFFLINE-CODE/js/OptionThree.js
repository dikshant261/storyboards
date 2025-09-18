const OptionThree = ({ question, response, answer }) => {
  const [disabledOptions, setDisabledOptions] = React.useState([]); // wrong clicked ones
  const [correctSelected, setCorrectSelected] = React.useState(false); // when correct is clicked
  const [wrongOption, setWrongOption] = React.useState(null); // temporary wrong highlight

  // Create a unique key for each option
  const makeKey = (num, count, pluse) => `${num}-${count}-${pluse}`;

  const isCorrectOption = (num, count, pluse) =>
    num === question[2] && count === question[0] && pluse === "x";

  const handleClick = (num, count, pluse) => {
    const key = makeKey(num, count, pluse);

    if (correctSelected || disabledOptions.includes(key) || wrongOption) return;

    response(num, count, pluse);

    if (isCorrectOption(num, count, pluse)) {
      setCorrectSelected(true); // correct chosen → lock all
    } else {
      setWrongOption(key); // highlight wrong temporarily
      setTimeout(() => {
        setDisabledOptions((prev) => [...prev, key]); // turn wrong into gray
        setWrongOption(null);
      }, 1000); // 1s salmon before gray
    }
  };

  const getStyle = (num, count, pluse) => {
    const key = makeKey(num, count, pluse);

    if (correctSelected) {
      if (isCorrectOption(num, count, pluse)) {
        return {
          backgroundColor: "lightgreen",
          color: "white",
          pointerEvents: "none",
          border: "0.3vw solid darkgreen",
        };
      }
      return {
        backgroundColor: "#e0e0e0",
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
    question[0] === 3 && question[1] === 10
      ? React.createElement(
          "div",
          {
            className: "option-button-multiply",
            style: getStyle(question[2], question[2], "÷"),
            onClick: () => handleClick(question[2], question[2], "÷"),
          },
          React.createElement(FractionMultiply, {
            numerator: question[2],
            denominator: question[1],
            count: question[2],
            sign: "÷",
          })
        )
      : React.createElement(
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

    // ✅ Option 2 (Correct one in your logic)
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
window.OptionThree = OptionThree;
