const PieChart = () => {
  return React.createElement(
    "div",
    { className: "pie-chart" },

    // line one
    React.createElement(
      "div",
      { className: "line-one" },
      React.createElement(
        "p",
        { className: "para" },
        null,
        t("chartHeading.car"),
        React.createElement("br"),
        "7"
      )
    ),

    // line two
    React.createElement(
      "div",
      { className: "line-two" },
      React.createElement(
        "p",
        { className: "para" },
        null,
        t("chartHeading.bus"),
        React.createElement("br"),
        "12"
      )
    ),

    // line three
    React.createElement(
      "div",
      { className: "line-three" },
      React.createElement(
        "p",
        { className: "para" },
        null,
        t("chartHeading.walk"),
        React.createElement("br"),
        "17"
      )
    )
  );
};
window.PieChart = PieChart;
