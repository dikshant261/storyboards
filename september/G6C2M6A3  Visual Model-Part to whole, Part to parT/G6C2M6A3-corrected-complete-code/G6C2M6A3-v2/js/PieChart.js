const PieChart = () => {
  const carCount = 7;
  const busCount = 12;
  const walkCount = 17;

  return React.createElement(
    "div",
    { className: "pie-container" },
    
    React.createElement(
      "div",
      { className: "pie-chart" },

      // Car segment
      React.createElement(
        "div",
        { className: "line-one" },
        React.createElement(
          "p",
          { className: "para" },
          null,
          t("chartHeading.car"),
          React.createElement("br"),
          carCount
        )
      ),

      // Bus segment
      React.createElement(
        "div",
        { className: "line-two" },
        React.createElement(
          "p",
          { className: "para" },
          null,
          t("chartHeading.bus"),
          React.createElement("br"),
          busCount
        )
      ),

      // Walk segment
      React.createElement(
        "div",
        { className: "line-three" },
        React.createElement(
          "p",
          { className: "para" },
          null,
          t("chartHeading.walk"),
          React.createElement("br"),
          walkCount
        )
      )
    )
  );
};
window.PieChart = PieChart;
