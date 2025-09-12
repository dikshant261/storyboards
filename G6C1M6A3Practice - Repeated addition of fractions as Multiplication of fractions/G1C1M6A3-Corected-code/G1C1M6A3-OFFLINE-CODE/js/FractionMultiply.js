const FractionMultiply = ({ numerator, denominator, count, pluse = false, fontSize, add }) => {
  if (pluse) {
    return React.createElement(
      "div",
      { className: "multiply" },
      React.createElement("span", { className: "top" }, `${numerator} + ${count}`),
      React.createElement("span", { className: "line" }),
      React.createElement("span", { className: "bottom" }, denominator)
    );
  }

  if (add === "+") {
    return React.createElement(
      "div",
      { className: "multiply", style: { fontSize: fontSize } },
      React.createElement("span", { className: "top" }, `${numerator} + ${count}`),
      React.createElement("span", { className: "line" }),
      React.createElement("span", { className: "bottom" }, denominator)
    );
  }

  if (numerator===null && count ===null) {
    return React.createElement(
      "div",
      { className: "multiply", style: { fontSize: fontSize } },
      React.createElement("span", { className: "top" }, ""),
      React.createElement("span", { className: "line" }),
      React.createElement("span", { className: "bottom" }, "")
    );
  }
  return React.createElement(
    "div",
    { className: "multiply", style: { fontSize: fontSize } },
    React.createElement("span", { className: "top" }, `${numerator} x ${count}`),
    React.createElement("span", { className: "line" }),
    React.createElement("span", { className: "bottom" }, denominator)
  );
};
window.FractionMultiply=FractionMultiply;