// ReusableButton.jsx
const ReusableButton = ({
  label,
  onClick,
  fontSize = "2vw",
  showTap = true,
  padding = "0",
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
          fontSize,
          backgroundColor,
          padding,
          position: "relative",
          opacity: disabled ? "0.6" : "1",
          cursor: disabled ? "not-allowed" : "pointer",
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
