const StartPage = ({
  goNext
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "intro-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, t("startPage.title")), /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-section"
  }, t("startPage.content"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "4vw"
    }
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    width: "12vw",
    height: "10vh",
    fontSize: "3vw",
    label: t("buttons.start"),
    onClick: () => {
      playClick();
      goNext();
    }
  })));
};
window.StartPage=StartPage;