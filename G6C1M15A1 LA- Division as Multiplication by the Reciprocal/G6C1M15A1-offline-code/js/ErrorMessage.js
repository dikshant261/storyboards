const ErrorMessage = ({
  divisor,
  value,
  flag
}) => {
  if (flag === 1) {
    return /*#__PURE__*/React.createElement("div", null, value === 1 ? /*#__PURE__*/React.createElement("p", {
      className: "success-messaage"
    }, t("sceneFour.success")) : value === 2 ? /*#__PURE__*/React.createElement("p", {
      className: "error-messaage"
    }, t("sceneFour.erorrOne")) : /*#__PURE__*/React.createElement("p", {
      className: "error-messaage"
    }, t("sceneFour.erorrTwo")));
  }
  return /*#__PURE__*/React.createElement("div", null, divisor == value ? /*#__PURE__*/React.createElement("p", {
    className: "success-messaage"
  }, t("sceneThreeError.success")) : value < divisor ? /*#__PURE__*/React.createElement("p", {
    className: "error-messaage"
  }, t("sceneThreeError.errorIncrease")) : /*#__PURE__*/React.createElement("p", {
    className: "error-messaage"
  }, t("sceneThreeError.errorDecrease")));
};
window.ErrorMessage=ErrorMessage;