const Box = ({
  beat,
  value,
  onClick,
  fontSize = "5vw"
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `box-container ${beat ? "pulsate" : ""}`,
    style: {
      fontSize
    },
    onClick: onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "box-value"
  }, value));
};
window.Box=Box;