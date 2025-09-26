import React from 'react';
import './box.css';
const Box = ({
  content,
  boxCss
}) => {
  console.log(boxCss);
  return /*#__PURE__*/React.createElement("div", {
    className: "alignment"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginBottom: "10vw"
    }
  }, "="), /*#__PURE__*/React.createElement("div", {
    className: `box ${boxCss}`
  }, content));
};
export default Box;