import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const TableMessage = ({
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  correctOption,
  options,
  flag
}) => {
  const {
    t
  } = useTranslation();
  if (flag === 1) {
    return /*#__PURE__*/React.createElement("div", null, stepOne && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[0] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("great"), " ", correctOption[0], " ", t("success", {
      word: "symbol"
    })) : boxResultOne === options[5] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("yellowMarble")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("dogErrorone", {
      word: "symbol :"
    }))), stepTwo && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[1] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("great"), " ", correctOption[1], " ", t("success", {
      word: "word"
    })) : boxResultOne === options[2] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("yellowMarble")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("dogErrorone", {
      word: "word to"
    }))), stepThree && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[2] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("great"), " ", /*#__PURE__*/React.createElement("span", {
      className: "option-fraction-error"
    }, /*#__PURE__*/React.createElement("span", null, "9"), /*#__PURE__*/React.createElement("span", {
      className: "fraction-line-error"
    }), /*#__PURE__*/React.createElement("span", null, "7")), t("success", {
      word: "fraction"
    })) : boxResultOne === options[4] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("yellowMarbleFraction")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("dogErrorone", {
      word: "fraction form"
    }))));
  }
  if (flag === 2) {
    return /*#__PURE__*/React.createElement("div", null, stepOne && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[0] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("great"), " ", correctOption[0], " ", t("success", {
      word: "symbol"
    })) : boxResultOne === options[5] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("blueMarbles")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("dogErrorone", {
      word: "symbol :"
    }))), stepTwo && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[1] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("great"), " ", correctOption[1], " ", t("success", {
      word: "word"
    })) : boxResultOne === options[2] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("blueMarbles")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("dogErrorone", {
      word: "word to"
    }))), stepThree && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[2] ? /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, t("great"), " ", /*#__PURE__*/React.createElement("span", {
      className: "option-fraction-error"
    }, /*#__PURE__*/React.createElement("span", null, "7"), /*#__PURE__*/React.createElement("span", {
      className: "fraction-line-error"
    }), /*#__PURE__*/React.createElement("span", null, "9")), t("success", {
      word: "fraction"
    })) : boxResultOne === options[4] ? /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("blueMarblesFraction")) : /*#__PURE__*/React.createElement("p", {
      className: "error-message"
    }, t("dogErrorone", {
      word: "fraction form"
    }))));
  }
  return /*#__PURE__*/React.createElement("div", null, stepOne && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[0] ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("great"), " ", correctOption[0], " ", t("success", {
    word: "symbol"
  })) : boxResultOne === options[5] ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("tableErrorSymbol")) : /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("dogErrorone", {
    word: "symbol :"
  }))), stepTwo && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[1] ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("great"), " ", correctOption[1], " ", t("success", {
    word: "word"
  })) : boxResultOne === options[2] ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("tableErrorSymbol")) : /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("dogErrorone", {
    word: "word to"
  }))), stepThree && /*#__PURE__*/React.createElement("div", null, boxResultOne === correctOption[2] ? /*#__PURE__*/React.createElement("p", {
    className: "success-message"
  }, t("great"), " ", /*#__PURE__*/React.createElement("span", {
    className: "option-fraction-error"
  }, /*#__PURE__*/React.createElement("span", null, "6"), /*#__PURE__*/React.createElement("span", {
    className: "fraction-line-error"
  }), /*#__PURE__*/React.createElement("span", null, "2")), t("success", {
    word: "fraction"
  })) : boxResultOne === options[4] ? /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("tableErrorFraction")) : /*#__PURE__*/React.createElement("p", {
    className: "error-message"
  }, t("dogErrorone", {
    word: "fraction form"
  }))));
};
export default TableMessage;