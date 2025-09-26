const BoxFour = ({
  divisor,
  style,
  number
}) => {
  const fraction = divisor === "3" ? /*#__PURE__*/React.createElement(Fraction, {
    numerator: 1,
    denominator: 3
  }) : "";
  const height = 30 / divisor + "vh";
  return /*#__PURE__*/React.createElement("div", {
    className: "box-container",
    style: {
      flexDirection: "column",
      gap: "0"
    }
  }, /*#__PURE__*/React.createElement("p", null, number), Array.from({
    length: divisor
  }).map((_, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "box",
    style: {
      height: height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "2vh",
      ...style
    }
  }, fraction)));
};
window.BoxFour=BoxFour;