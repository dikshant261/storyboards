const Option = ({
  optionNumber
}) => {
  const handleOption = num => {
    optionNumber(num);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "option-container"
  }, /*#__PURE__*/React.createElement("button", {
    className: "option",
    onClick: () => handleOption(1)
  }, /*#__PURE__*/React.createElement("span", null, "2"), /*#__PURE__*/React.createElement("span", null, "\xD7"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", null, 1), /*#__PURE__*/React.createElement("span", {
    style: {
      borderTop: "0.2vw solid white",
      width: "100%",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("span", null, "3"))), /*#__PURE__*/React.createElement("button", {
    className: "option",
    onClick: () => handleOption(2)
  }, /*#__PURE__*/React.createElement("span", null, "3"), /*#__PURE__*/React.createElement("span", null, "\xD7"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", null, 1), /*#__PURE__*/React.createElement("span", {
    style: {
      borderTop: "0.2vw solid white",
      width: "100%",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("span", null, "3"))), /*#__PURE__*/React.createElement("button", {
    className: "option",
    onClick: () => handleOption(3)
  }, /*#__PURE__*/React.createElement("span", null, "6"), /*#__PURE__*/React.createElement("span", null, "\xD7"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", null, 1), /*#__PURE__*/React.createElement("span", {
    style: {
      borderTop: "0.2vw solid white",
      width: "100%",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("span", null, "3"))));
};
window.Option=Option;