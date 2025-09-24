const apple ="assets/apple.png";
const greenapple = "assets/greenapple.png";
const AppleImage = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "apple-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginRight: "-5vw",
      zIndex: "3"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: greenapple,
    className: "apple"
  })), /*#__PURE__*/React.createElement("div", {
    className: "apple-adjust"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "-7vw",
      zIndex: "2"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: apple,
    className: "apple"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      zIndex: "3"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: apple,
    className: "apple"
  }))));
};
window.AppleImage=AppleImage;