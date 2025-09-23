const ActivityCompleted = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "activity-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header"
  }, /*#__PURE__*/React.createElement("h2", null, t("activityCompleted.activity"))), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, t("activityCompleted.description")), /*#__PURE__*/React.createElement("div", {
    className: "equation-box"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("activityCompleted.numberOne")), " ", "\xF7", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("activityCompleted.numberTwo"))), /*#__PURE__*/React.createElement("p", null, "=", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("activityCompleted.numberOne")), " ", "\xD7 ", t("activityCompleted.reciprocalOf"), /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("activityCompleted.numberTwo"))), /*#__PURE__*/React.createElement("p", null, "=", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, t("activityCompleted.numberOne")), " ", "\xD7", " ", /*#__PURE__*/React.createElement("span", {
    className: "fraction"
  }, /*#__PURE__*/React.createElement("span", null, "1"), /*#__PURE__*/React.createElement("span", {
    className: "deno"
  }, t("activityCompleted.numberOne"))))), /*#__PURE__*/React.createElement("p", {
    className: "restart-text"
  }, t("activityCompleted.startOver")), 
  React.createElement(
    "div",{
      style:{
        marginTop:"1vw"
      }
    },
  /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.startOver"),
    width: "20vw",
    height: "11vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  })));
};
window.ActivityCompleted=ActivityCompleted;