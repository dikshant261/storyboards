function ReusableButton({
  label,
  onClick,
  width = "8vw",
  height = "6vh",
  fontSize = "2vw",
  showTap = true,
  tapClass = "tap-gif-width",
}) {
  const tap="assets/tap.gif";  
  return React.createElement(
    "div",
    { className: "button-container" },
    React.createElement(
      "button",
      {
        className: "start-button",
        style: {
          width,
          height,
          fontSize,
          position: "relative",
        },
        onClick: onClick,
      },
      label
    ),
    showTap &&
      React.createElement(
        "div",
        { className: "tap-gif" },
        React.createElement("img", {
          src: tap,
          alt: "tap",
          className: tapClass,
        })
      )
  );
}
window.ReusableButton=ReusableButton;