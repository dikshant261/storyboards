const StartPage = ({
  goNext
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "intro-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, t("startPage.title")), /*#__PURE__*/React.createElement("div", {
    className: "text-section"
  }, t("startPage.weHave")), /*#__PURE__*/React.createElement("div", {
    className: "text-section"
  }, t("startPage.nowIts")), /*#__PURE__*/React.createElement("div", {
    className: "text-section"
  }, t("startPage.tapStart")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.start"),
    width: "14vw",
    height: "9vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      goNext();
    }
  }));
};
window.StartPage=StartPage;