const LenghtBox = ({
  beatOne,
  beatTwo,
  boxOneValue,
  boxTwoValue,
  boxCss,
  success,
  value,
  color,
  numberColor,
  allGray
}) => {
  return /*#__PURE__*/React.createElement("div", null, !success && /*#__PURE__*/React.createElement("div", {
    className: "box-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "1%",
      left: "7%",
      fontSize: "1vw",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontSize: "1.5vw",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("span", null, t("red")), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "100%",
      backgroundColor: "white",
      height: "0.2vh"
    }
  }), /*#__PURE__*/React.createElement("span", null, t("blue")))), /*#__PURE__*/React.createElement("div", {
    className: `box ${beatOne ? "active" : ""} ${beatOne ? boxCss : ""}`
  }, boxOneValue), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "11vw",
      backgroundColor: "white",
      height: "1vh"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `box ${beatTwo ? "active" : ""} ${beatTwo ? boxCss : ""}`
  }, boxTwoValue)), success && /*#__PURE__*/React.createElement("div", {
    className: "box-container",
    style: {
      background: color || "#5a7f5e",
      color: allGray ? "gray" : "white",
      fontSize: "5vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "1%",
      left: "7%",
      fontSize: "1vw",
      color: "white"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontSize: "1.5vw",
      color: allGray ? "gray" : "white"
    }
  }, /*#__PURE__*/React.createElement("span", null, t("red")), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "100%",
      backgroundColor: allGray ? "gray" : "white",
      height: "0.2vh"
    }
  }), /*#__PURE__*/React.createElement("span", null, t("blue")))), /*#__PURE__*/React.createElement("div", {
    style: {
      color: value === 1 ? numberColor : ""
    }
  }, boxOneValue), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "11vw",
      backgroundColor: allGray ? "gray" : "white",
      height: "1vh"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: value === 2 ? numberColor : ""
    }
  }, boxTwoValue)));
};
window.LenghtBox=LenghtBox;