import React, { lazy } from "react";
import "./apple.css";
import apple from "../assets/apple.png";
import orange from "../assets/orange.png";
const Orange = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "marble-image"
  }, /*#__PURE__*/React.createElement("div", {
    className: "apple-container",
    style: {
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "apple-adjust",
    style: {
      flexDirection: "row"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginRight: "-6vw",
      marginBottom: "-8vw"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: apple,
    className: "apple"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginRight: "-6vw",
      zIndex: "3",
      marginBottom: "-10vw"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: apple,
    className: "apple"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginRight: "-4vw",
      zIndex: "3",
      marginBottom: "-10vw"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: apple,
    className: "apple"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "apple-adjust",
    style: {
      flexDirection: "row"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0vw",
      zIndex: "3",
      marginRight: "-4vw"
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
  })))), /*#__PURE__*/React.createElement("div", {
    className: "apple-container",
    style: {
      flexDirection: "row",
      marginLeft: "2vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginRight: "-5vw",
      zIndex: "3"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: orange,
    className: "apple"
  })), /*#__PURE__*/React.createElement("div", {
    className: "apple-adjust"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "-7vw",
      zIndex: "2"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: orange,
    className: "apple"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      zIndex: "3"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: orange,
    className: "apple"
  })))));
};
export default Orange;