
const ErrorMessage = ({
  flag
}) => {
  return /*#__PURE__*/React.createElement("div", null, flag === 1 ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("error.goodJob")) : flag === 2 ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.notDivisibleByFive")) : flag === 3 ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.notDivide")) : flag === 4 ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("error.thatCorrect")) : flag === 5 ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.notYet")) : "");
};
window.ErrorMessage=ErrorMessage;