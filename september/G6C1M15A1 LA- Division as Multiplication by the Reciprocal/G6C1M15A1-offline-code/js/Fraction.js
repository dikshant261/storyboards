const Fraction = ({
  numerator,
  denominator
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "2vw"
  }
}, /*#__PURE__*/React.createElement("span", null, numerator), /*#__PURE__*/React.createElement("span", {
  style: {
    borderTop: "0.2vw solid white",
    width: "100%",
    display: "block"
  }
}), /*#__PURE__*/React.createElement("span", null, denominator));
window.Fraction=Fraction;