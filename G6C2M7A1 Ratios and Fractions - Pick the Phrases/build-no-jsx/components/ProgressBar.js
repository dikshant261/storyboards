import React from "react";
import "./progressbar.css";
const ProgressBar = ({
  current
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "progress-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dot",
    style: {
      height: current === 1 ? "4vh" : "",
      backgroundColor: current === 1 ? "var(--secondary-color)" : "",
      width: current === 1 ? "3vw" : ""
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "dot",
    style: {
      height: current === 2 ? "4vh" : "",
      backgroundColor: current === 2 ? "var(--secondary-color)" : "",
      width: current === 2 ? "3vw" : ""
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "dot",
    style: {
      height: current === 3 ? "4vh" : "",
      backgroundColor: current === 3 ? "var(--secondary-color)" : "",
      width: current === 3 ? "3vw" : ""
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "dot",
    style: {
      height: current === 4 ? "4vh" : "",
      backgroundColor: current === 4 ? "var(--secondary-color)" : "",
      width: current === 4 ? "3vw" : ""
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "dot",
    style: {
      height: current === 5 ? "4vh" : "",
      backgroundColor: current === 5 ? "var(--secondary-color)" : "",
      width: current === 5 ? "3vw" : ""
    }
  }));
};
export default ProgressBar;