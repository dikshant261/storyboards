import React from "react";
import "./ballon.css";
import redballoon from "../assets/redballoon.png";
import blueballoon from "../assets/blueballoon.png";
const Balloon = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "balloon-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ballon-align"
  }, /*#__PURE__*/React.createElement("img", {
    src: redballoon,
    className: "red-balloon"
  }), /*#__PURE__*/React.createElement("img", {
    src: redballoon,
    className: "red-balloon"
  }), /*#__PURE__*/React.createElement("img", {
    src: redballoon,
    className: "red-balloon"
  }), /*#__PURE__*/React.createElement("img", {
    src: redballoon,
    className: "red-balloon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ballon-align"
  }, /*#__PURE__*/React.createElement("img", {
    src: blueballoon,
    className: "blue-balloon"
  }), /*#__PURE__*/React.createElement("img", {
    src: blueballoon,
    className: "blue-balloon"
  }), /*#__PURE__*/React.createElement("img", {
    src: blueballoon,
    className: "blue-balloon"
  })));
};
export default Balloon;