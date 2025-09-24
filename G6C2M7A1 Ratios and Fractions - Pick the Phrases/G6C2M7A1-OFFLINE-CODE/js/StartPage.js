
const StartPage = ({
  onClose
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "startpage-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "startpage-heading"
  }, t("title")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("startPage.ratiosAndFraction")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("startPage.fromTheIdentify")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("startPage.tip")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.start"),
    width: "15vw",
    height: "11vh",
    fontSize: "4vw",
    onClick: () => {
      playClick();
      onClose();
    }
  }));
};
window.StartPage=StartPage;