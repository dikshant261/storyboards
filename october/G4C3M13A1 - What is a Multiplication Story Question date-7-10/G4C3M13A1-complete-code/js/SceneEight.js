const SceneEight = ({
  goNext,
  goPrev
}) => {
  
return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2.9vw"
    }
  }, t("sceneSeven.goodJob"))), /*#__PURE__*/React.createElement("div", {
    className: "main-container ",
    style: {
      flexDirection: "column",
      justifyContent: "flex-start",
      gap: "13vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      textAlign: "left",
      marginTop: "2vw",
      lineHeight: "2"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Q."), t("sceneSeven.jakaBought"), " ", /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("button", {
    className: "line-button",
    style: {
      background: "none",
      border: "0.2vw solid white",
      opacity: "0.6",
      color: "white"
    }
  }, t("sceneSeven.threeBasketOfApple"), " .")), " ", /*#__PURE__*/React.createElement("span", null, t("sceneSeven.if")), " ", /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("button", {
    className: "line-button",
    style: {
      background: "none",
      border: "0.2vw solid white",
      opacity: "0.6",
      color: "white"
    }
  }, t("sceneSeven.eachBasket")), " "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("button", {
    className: "line-button",
    style: {
      background: "none",
      border: "0.2vw solid white",
      opacity: "0.6",
      color: "white"
    }
  }, t("sceneSeven.howManyApples"))), " ", /*#__PURE__*/React.createElement("span", null, t("sceneSeven.didHeBuy"))), /*#__PURE__*/React.createElement("div", {
    className: "box-align",
    style: {
      flexDirection: "column",
      gap: "0.5vw",
      marginBottom: "0vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "box-align",
    style: {
      gap: "1vw",
      marginBottom: "0vw",
      textAlign: "center",
      fontSize:"2vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "line-button",
    style: {
      width: "26vw",
      
    }
  }, t("sceneSeven.howManyApples")), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, "="), /*#__PURE__*/React.createElement("div", {
    className: "line-button",
    style: {
      width: "26vw"
    }
  }, t("sceneSeven.threeBasketOfApple"), " "), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, "\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "line-button",
    style: {
      width: "30vw"
    }
  }, t("sceneSeven.itemInEachGroup"))), /*#__PURE__*/React.createElement("div", {
    className: "box-align",
    style: {
      display: "grid",
      gridAutoFlow: "column",
      gridAutoColumns: "20vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      fontSize: "1,9vw",
      color: "#00b045",
      fontSize:"1.9vw"
    }
  }, t("sceneSeven.totalItems")), /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      fontSize: "1.9vw",
      color: "#00b045",
    }
  }, t("sceneSeven.noOfGroups")), /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      fontSize: "1.9vw",
      color: "#00b045"
    }
  }, t("sceneSeven.itemInEachGroup"))))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", null, t("navigation.tapNext")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "next-btn",
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  }))));
};
window.SceneEight=SceneEight;