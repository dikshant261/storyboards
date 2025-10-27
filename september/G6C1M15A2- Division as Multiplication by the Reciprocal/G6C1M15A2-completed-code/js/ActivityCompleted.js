const ActivityCompleted = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "activity-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hint-title"
  }, t("activityComplete")), /*#__PURE__*/React.createElement("p", {
    className: "hint-description"
  }, t("hint.description")), /*#__PURE__*/React.createElement("div", {
    className: "hint-box"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "2vw",
      paddingLeft: "7.6vw"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "highlight-yellow"
  }, t("hint.numberOne")), " \xF7", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight-blue"
  }, t("hint.numberTwo"))), /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "2vw"
    }
  }, "=", " ", /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "2vw"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "highlight-yellow"
  }, t("hint.numberOne")), " \xD7", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight-blue"
  }, t("hint.reciprocal"), " ", t("hint.numberTwo")))), /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "2vw",
      paddingLeft: "4vw"
    }
  }, /*#__PURE__*/React.createElement("span", null, "="), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "2vw"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "highlight-yellow"
  }, t("hint.numberOne")), " \xD7", " ", /*#__PURE__*/React.createElement("span", {
    className: "fraction"
  }, /*#__PURE__*/React.createElement("span", {
    className: "numerator"
  }, "1"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "denominator"
  }, t("hint.numberOne")))))), /*#__PURE__*/React.createElement("p", {
    className: "hint-description"
  }, t("tapStartOver")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.startOver"),
    width: "22vw",
    height: "13vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  }));
};
window.ActivityCompleted=ActivityCompleted;