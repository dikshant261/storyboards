const ActivityCompleted = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "startpage-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "startpage-heading"
  }, t("activityComplete")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("ratioDifferent")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, t("startOver")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.startOver"),
    width: "33vw",
    height: "13vh",
    fontSize: "4vw",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  }));
};
window.ActivityCompleted=ActivityCompleted;