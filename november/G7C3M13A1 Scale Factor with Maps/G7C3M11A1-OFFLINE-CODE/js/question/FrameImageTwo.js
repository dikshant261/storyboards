const FrameImagTwo = ({ width = "8vw", redml, blueml }) => {
  const red = "assets/red.png";
  const blue = "assets/blue.png";
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "frame-two-container",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "ml-align",
      },
      /*#__PURE__*/ React.createElement("img", {
        src: red,
        style: {
          width: width,
        },
      }),
      /*#__PURE__*/ React.createElement("p", null, redml, " ", t("ml"))
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "ml-align",
      },
      /*#__PURE__*/ React.createElement("img", {
        src: blue,
        style: {
          width: width,
        },
      }),
      /*#__PURE__*/ React.createElement("p", null, blueml, " ", t("ml"))
    )
  );
};
window.FrameImagTwo=FrameImagTwo;
