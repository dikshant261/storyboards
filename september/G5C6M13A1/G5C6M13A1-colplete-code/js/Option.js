const Option = ({
  response,
  setShowError,
  allDisabled
}) => {
  const handleResponse = id => {
    setShowError(false);
    response(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "option-container"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleResponse(2),
    disabled: allDisabled
  }, /*#__PURE__*/React.createElement("span", null, "\xF7"), " ", /*#__PURE__*/React.createElement("span", null, "2")), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleResponse(3),
    disabled: allDisabled
  }, /*#__PURE__*/React.createElement("span", null, "\xF7"), " ", /*#__PURE__*/React.createElement("span", null, "3")), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleResponse(5),
    disabled: allDisabled
  }, /*#__PURE__*/React.createElement("span", null, "\xF7"), " ", /*#__PURE__*/React.createElement("span", null, "5")), /*#__PURE__*/React.createElement("button", {
    style: {
      fontSize: "2.2vw"
    },
    onClick: () => handleResponse(4),
    disabled: allDisabled
  }, t("buttons.cannotDivide")));
};
window.Option=Option;