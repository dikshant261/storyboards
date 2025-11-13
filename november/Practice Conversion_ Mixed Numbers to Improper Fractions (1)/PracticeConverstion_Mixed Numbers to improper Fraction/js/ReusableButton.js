// ReusableButton.jsx
const ReusableButton = ({
  label,
  onClick,
  width,
  height,
  padding = "1vh",
  fontSize = "2vw",
  showTap = true,
  tapClass = "tap-gif-width",
  showActive = true,
  backgroundColor = "var(--secondary-color)",
  disabled = false,
}) => {
  const tap = "assets/tap.gif";
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "button-container",
    },
    /*#__PURE__*/ React.createElement(
      "button",
      {
        className: `start-button ${showActive ? "pulse-active" : ""}`,
        style: {
          width,
          height,
          fontSize,
          backgroundColor,
          padding,
          position: "relative",
        },
        onClick: onClick,
        disabled: disabled,
      },
      label
    ),
    showTap &&
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "tap-gif",
        },
        /*#__PURE__*/ React.createElement("img", {
          src: tap,
          alt: "tap",
          className: tapClass,
        })
      )
  );
};
window.ReusableButton = ReusableButton;
