const AppleMessage = ({
  stepOne,
  stepTwo,
  boxResultOne,
  correctOption,
  options,
  flag
}) => {
  if (flag === 1) {
    return /*#__PURE__*/React.createElement("div", null, stepOne && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[0] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("successTwo", {
      count: correctOption[0]
    })) : boxResultOne === options[1] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("triangleErrorTwo")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("triangleErrorOne"))), stepTwo && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[1] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("successTwo", {
      count: correctOption[1]
    })) : boxResultOne === options[1] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("pentagonErrorTwo")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("pentagonErrorOne"))));
  }
  if (flag === 2) {
    return /*#__PURE__*/React.createElement("div", null, stepOne && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[0] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("great"), /*#__PURE__*/React.createElement("span", {
      className: "option-fraction-error"
    }, /*#__PURE__*/React.createElement("span", null, "9"), /*#__PURE__*/React.createElement("span", {
      className: "fraction-line-error"
    }), /*#__PURE__*/React.createElement("span", null, "14")), t("successThree")) : boxResultOne === options[1] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("boyFirstErrorTwo")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("boyFirstErrorOne"))), stepTwo && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[1] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("great"), /*#__PURE__*/React.createElement("span", {
      className: "option-fraction-error"
    }, /*#__PURE__*/React.createElement("span", null, "14"), /*#__PURE__*/React.createElement("span", {
      className: "fraction-line-error"
    }), /*#__PURE__*/React.createElement("span", null, "9")), t("successThree")) : boxResultOne === options[1] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("girlsFirstErrorTwo")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("girlsFirstErrorOne"))));
  }
  if (flag === 3) {
    return /*#__PURE__*/React.createElement("div", null, stepOne && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[0] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("successTwo", {
      count: correctOption[0]
    })) : boxResultOne === options[3] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("bananaFirstErrorTwo")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("bananaFirstErrorOne"))), stepTwo && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[1] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("successTwo", {
      count: correctOption[1]
    })) : boxResultOne === options[1] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("appleFirstErrorTwo")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("appleFirstErrorOne"))));
  }
  if (flag === 4) {
    return /*#__PURE__*/React.createElement("div", null, stepOne && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[0] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("successTwo", {
      count: correctOption[0]
    })) : boxResultOne === options[3] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("studentErrorTwo")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("studentErrorOne"))), stepTwo && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[1] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("successTwo", {
      count: correctOption[1]
    })) : boxResultOne === options[1] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("studentPalygroundTwo")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("studentPalygroundOne"))));
  }
  return /*#__PURE__*/React.createElement("div", null, stepOne && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[0] ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("successTwo", {
    count: correctOption[0]
  })) : boxResultOne === options[3] ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("appleErrorOne")) : /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("appleErrorTwo"))), stepTwo && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[1] ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("successTwo", {
    count: correctOption[1]
  })) : boxResultOne === options[1] ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("orangeErrorOne")) : /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("orangeErrorTwo"))));
};
window.AppleMessage=AppleMessage;