const FrameImag = ({ width = "70%" }) => {
  const redBlueCircle = "assets/redBlueCircle.png";
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "frame-container",
    },
    /*#__PURE__*/ React.createElement("img", {
      src: redBlueCircle,
      style: {
        width: "90%",
      },
    })
  );
};
window.FrameImag = FrameImag;
