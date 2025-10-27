const ActivityCompleted = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "startpage-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "startpage-heading"
  }, t("startPage.simplestForm")), /*#__PURE__*/React.createElement("div", {
    className: "startpage-content"
  }, /*#__PURE__*/React.createElement("p", null, t("greatJob"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--secondary-color)"
    }
  }, t("sameNumber")), " ", /*#__PURE__*/React.createElement("span", null, t("weUsed")), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--secondary-color)"
    }
  }, t("commonPrime")), " ", /*#__PURE__*/React.createElement("span", null, t("toSimplify")))), /*#__PURE__*/React.createElement("div", {
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
Window.ActivityCompleted=ActivityCompleted;