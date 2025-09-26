function ResultBox({
  beat,
  beatOne,
  beatTwo,
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  boxOneCss,
  boxResultTwo,
  boxTwoCss,
  boxResultThree,
  boxThreeCss,
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
      React.createElement("div", { className: "box-title" }, t("symbol"))
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
      React.createElement("div", { className: "box-title" }, t("word"))
    ),

    // Box 3
    React.createElement(
      "div",
      { className: `result-box-container ${beatTwo ? "active" : ""}` },
      React.createElement(
        "div",
        { className: `box ${boxThreeCss}` },
        renderFraction(boxResultThree)
      ),
      React.createElement("div", { className: "box-title" }, t("fraction"))
    )
  );
}
window.ResultBox=ResultBox;