const SentanceBox = ({
  numOne,
  numTwo,
  result,
  boxCss,
  beat
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "box-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sent-box",
    style: {
      border: "none"
    }
  }, numOne), /*#__PURE__*/React.createElement("div", {
    className: "minus-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sent-box",
    style: {
      border: "none"
    }
  }, numTwo), /*#__PURE__*/React.createElement("div", {
    className: "equal-to"
  }, /*#__PURE__*/React.createElement("div", {
    className: "minus-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "minus-line"
  })), /*#__PURE__*/React.createElement("div", {
    className: `sent-box ${beat ? "active" : ""} ${boxCss}`
  }, result));
};
window.SentanceBox=SentanceBox;