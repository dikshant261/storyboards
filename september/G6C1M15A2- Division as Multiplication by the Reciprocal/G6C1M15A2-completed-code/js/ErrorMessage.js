
const ErrorMessage = ({
  wrongId,
  correctId
}) => {
  return /*#__PURE__*/React.createElement("div", null, correctId === "D" ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("error.success")) : wrongId === "A" ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.errorOne")) : wrongId === "C" ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.errorThree")) : /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.errorTwo")));
};
window.ErrorMessage=ErrorMessage;