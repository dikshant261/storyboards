const Design = () => {
  return React.createElement(
    "div",
    { className: "design-container" },

    // Lines
    React.createElement("div", { className: "line-one" }),
    React.createElement("div", { className: "line-two" }),

    // Left Section
    React.createElement(
      "div",
      { className: "left" },
      React.createElement(
        "div",
        null,
        React.createElement("div", { className: "big-circle" }),
        React.createElement("br"),
        React.createElement("p", null, t("figureName.total"))
      )
    ),

    // Right Section
    React.createElement(
      "div",
      { className: "right" },

      // Blue Part
      React.createElement(
        "div",
        null,
        React.createElement("div", { className: "blue-circle" }),
        React.createElement(
          "p",
          { style: { fontSize: "2vw" } },
          t("figureName.part")
        )
      ),

      // Pink Part
      React.createElement(
        "div",
        null,
        React.createElement("div", { className: "pink-circle" }),
        React.createElement(
          "p",
          { style: { fontSize: "2vw" } },
          t("figureName.part")
        )
      )
    )
  );
};
window.Design=Design;