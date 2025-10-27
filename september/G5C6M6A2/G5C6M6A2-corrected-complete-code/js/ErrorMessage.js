const ErrorMessage = ({
  flag,
  currentFraction
}) => {
  return /*#__PURE__*/React.createElement("div", null, flag === 1 ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("error.goodJob")) : flag === 2 ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.notDivisibleByFive", {
    num: currentFraction.num,
    den: currentFraction.den
  })) : flag === 3 ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.notDivide")) : flag === 4 ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("error.thatCorrect")) : flag === 5 ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.notYet")) : flag === 6 ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.notDivideTwo", {
    num: currentFraction.num,
    den: currentFraction.den
  })) : flag === 7 ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.notDivideThree", {
    num: currentFraction.num,
    den: currentFraction.den
  })) : "");
};
window.ErrorMessage=ErrorMessage;