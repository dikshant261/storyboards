const StartPage = ({
  goNext
}) => {
  
  return /*#__PURE__*/React.createElement("div", {
    className: "startpage-fraction-container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "title"
  }, t("startPage.mixedNumbersAndImproperFractions")), /*#__PURE__*/React.createElement("p", {
    className: "startpage-content"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--secondary-color)"
    }
  }, t("startPage.mixedNumbers")), /*#__PURE__*/React.createElement("span", null, " ", t("startPage.and")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--secondary-color)"
    }
  }, t("startPage.improperFractions")), /*#__PURE__*/React.createElement("span", null, t("startPage.areUsed")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--secondary-color)"
    }
  }, t("startPage.greaterThan")), /*#__PURE__*/React.createElement("span", null, t("startPage.itsVeryUsefull"))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: "8vh"
    }
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.start"),
    width: "13vw",
    height: "9vh",
    fontSize: "3vw",
    onClick: () => {
      playClick();
      goNext();
    }
  })));
};
window.StartPage=StartPage;