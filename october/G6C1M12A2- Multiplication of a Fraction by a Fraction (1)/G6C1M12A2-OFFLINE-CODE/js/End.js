const End = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "intro-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, t("activity")), /*#__PURE__*/React.createElement(EndTwo, null), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.startOver"),
    width: "20vw",
    height: "11vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  }));
};
window.End=End;