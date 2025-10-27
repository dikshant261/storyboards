const ErrorMessage = ({ wrongId, correctId }) => {
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    correctId === "D"
      ? /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "success-message",
            style: {
              color: "black",
              fontSize: "2.5vw",
            },
          },
          t("error.success")
        )
      : wrongId === "A"
      ? /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "error-message",
            style: {
              color: "black",
              fontSize: "2.5vw",
            },
          },
          t("error.errorOne")
        )
      : wrongId === "C"
      ? /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "error-message",
            style: {
              color: "black",
              fontSize: "2.5vw",
            },
          },
          t("error.errorThree")
        )
      : /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "error-message",
            style: {
              color: "black",
              fontSize: "2.5vw",
            },
          },
          t("error.errorTwo")
        )
  );
};
window.ErrorMessage = ErrorMessage;
