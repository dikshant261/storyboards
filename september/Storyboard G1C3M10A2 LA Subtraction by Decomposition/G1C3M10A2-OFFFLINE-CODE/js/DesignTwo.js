const DesignTwo = ({ option, beat, circleCss, total, number, red, blue, a, b }) => {
  return React.createElement(
    "div",
    { className: "design-container" },

    // Left vertical lines
    React.createElement("div", { className: "line-one" }),
    React.createElement("div", { className: "line-two" }),

    // Left Section
    React.createElement(
      "div",
      { className: "left" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            className: `big-circle ${beat ? "active" : ""} ${circleCss || ""}`,
          },
          option,
          " ",
          total
        ),
        React.createElement("br"),
        React.createElement("p", null, t("figureName.total"))
      )
    ),

    // Right Section
    React.createElement(
      "div",
      { className: "right" },

      // First Circle (Blue)
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "blue-circle" },
          number?.[0] ?? "",
          red
        ),
        React.createElement(
          "p",
          { style: { fontSize: "2vw" } },
          t("figureName.part"),
          " ",
          a
        )
      ),

      // Second Circle (Pink)
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "pink-circle" },
          number?.[1] ?? "",
          blue
        ),
        React.createElement(
          "p",
          { style: { fontSize: "2vw" } },
          t("figureName.part"),
          " ",
          b
        )
      )
    )
  );
};
window.DesignTwo=DesignTwo;