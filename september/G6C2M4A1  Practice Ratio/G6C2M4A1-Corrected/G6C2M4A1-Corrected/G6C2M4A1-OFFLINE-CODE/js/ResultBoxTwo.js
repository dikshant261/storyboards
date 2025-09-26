function ResultBoxTwo({
  beat,
  beatOne,
  stepOne,
  stepTwo,
  boxResultOne,
  boxOneHeading,
  boxTwoHeading,
  boxOneCss,
  boxResultTwo,
  boxTwoCss,
}) {
  // Helper to render fraction if value is in a/b form
  const renderFraction = (value) => {
    if (typeof value === "string" && value.includes("/")) {
      const [num, denom] = value.split("/");
      if (!isNaN(num) && !isNaN(denom)) {
        return React.createElement(
          "span",
          { className: "fraction-align" },
          React.createElement("span", null, num),
          React.createElement("span", { className: "fraction-line-box" }),
          React.createElement("span", null, denom)
        );
      }
    }
    return value;
  };

  return React.createElement(
    "div",
    { className: "result-box" },

    // Box 1
    React.createElement(
      "div",
      { className: `result-box-container ${beat ? "active" : ""}` },
      React.createElement(
        "div",
        { className: `box ${boxOneCss}` },
        renderFraction(boxResultOne)
      ),
      React.createElement("div", { className: "box-title" }, t(boxOneHeading))
    ),

    // Box 2
    React.createElement(
      "div",
      { className: `result-box-container ${beatOne ? "active" : ""}` },
      React.createElement(
        "div",
        { className: `box ${boxTwoCss}` },
        renderFraction(boxResultTwo)
      ),
      React.createElement("div", { className: "box-title" }, t(boxTwoHeading))
    )
  );
}
window.ResultBoxTwo=ResultBoxTwo;