
const ActivityCompleted = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "startpage-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "startpage-heading"
  }, t("startPage.simplestForm")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("greatJob")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "8vw"
    }
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.startOver"),
    width: "25vw",
    height: "13vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  })));
};
window.ActivityCompleted=ActivityCompleted;