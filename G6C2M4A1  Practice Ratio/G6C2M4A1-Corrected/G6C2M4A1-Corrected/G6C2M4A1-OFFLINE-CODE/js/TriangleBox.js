const TriangleBox = ({
  beat,
  beatTwo,
  stepOne,
  stepTwo,
  boxResultOne,
  boxOneCss,
  boxResultTwo,
  boxTwoCss,
}) => {
  

  return React.createElement(
    "div",
    { className: "triangle-box-container" },

    // First box
    React.createElement(
      "div",
      { className: "triangle-inner" },
      React.createElement("p", null, t("ratio_of_triangles")),
      React.createElement(
        "div",
        {
          className: `triangle-box ${beat ? "active" : ""} ${boxOneCss}`,
        },
        boxResultOne
      )
    ),

    // Second box
    React.createElement(
      "div",
      { className: "triangle-inner" },
      React.createElement("p", null, t("ratio_of_pentagons")),
      React.createElement(
        "div",
        {
          className: `triangle-box ${beatTwo ? "active" : ""} ${boxTwoCss}`,
        },
        boxResultTwo
      )
    )
  );
};
window.TriangleBox=TriangleBox;