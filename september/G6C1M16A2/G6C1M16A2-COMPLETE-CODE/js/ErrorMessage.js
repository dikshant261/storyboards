
const ErrorMessage = ({
  wrongId,
  correctId
}) => {
  return /*#__PURE__*/React.createElement("div", null, correctId === "D" ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("error.success")) : wrongId === "B" ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.errorTwo")) : wrongId === "A" ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.errorOne")) : /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("error.errorThree")));
};
window.ErrorMessage=ErrorMessage;