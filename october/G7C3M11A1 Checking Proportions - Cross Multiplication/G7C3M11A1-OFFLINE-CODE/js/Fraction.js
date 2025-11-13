const Fraction = ({
  numerator,
  denominator,
  fontSize = "2vw",
  color = "white",
  lineWidth = "100%",
  lineHeight = "0.4vh",
  style,
  value,
}) => {
  console.log("value : ", value);
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "question-fraction",
      style: {
        fontSize,
        color,
        ...style,
      },
    },
    /*#__PURE__*/ React.createElement(
      "span",
      {
        className: "numerator",
        style: {
          color: value === 1 ? "gray" : "",
        },
      },
      numerator
    ),
    /*#__PURE__*/ React.createElement("span", {
      className: "line",
      style: {
        width: lineWidth,
        height: lineHeight,
        backgroundColor: color,
      },
    }),
    /*#__PURE__*/ React.createElement(
      "span",
      {
        className: "denominator",
        style: {
          color: value === 2 ? "gray" : "",
        },
      },
      denominator
    )
  );
};
window.Fraction = Fraction;
