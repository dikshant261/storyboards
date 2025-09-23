
const StartPage = ({
  onClose
}) =>{
  return /*#__PURE__*/React.createElement("div", {
    className: "startpage-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "startpage-heading"
  }, t("startPageContent.title")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("startPageContent.weLearned")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("startPageContent.nowLetLearn")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("startPageContent.tapStart")), /*#__PURE__*/React.createElement(ReusableButton, {
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