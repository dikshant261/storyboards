const FractionOption = ({ numerator, denominator, fontSize }) => {
  return React.createElement(
    "div",
    {
      className: "fraction-option",
      style: { fontSize: "3vw" },
    },
    React.createElement("p", { style: { fontSize: fontSize } }, numerator),
    React.createElement("p", { className: "fraction-line" }),
    React.createElement("p", { style: { fontSize: fontSize } }, denominator)
  );
};
window.FractionOption = FractionOption;
