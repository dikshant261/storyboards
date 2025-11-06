const Box = ({
  beat,
  value,
  boxCss,
  style
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: `box ${beat ? "active" : ""} ${boxCss}`,
    style: {
      ...style
    }
  }, value);
};
window.Box=Box;