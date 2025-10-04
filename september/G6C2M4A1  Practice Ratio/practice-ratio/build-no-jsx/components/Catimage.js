import React from "react";
import cat from "../assets/cat.png";
import dog from "../assets/dog.png";
import "./catimage.css";
const Catimage = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "cat-image-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: cat,
    alt: "Cat",
    className: "cat-image"
  }), /*#__PURE__*/React.createElement("img", {
    src: cat,
    alt: "Cat",
    className: "cat-image"
  }), /*#__PURE__*/React.createElement("img", {
    src: cat,
    alt: "Cat",
    className: "cat-image"
  }), /*#__PURE__*/React.createElement("img", {
    src: dog,
    alt: "Dog",
    className: "cat-image"
  }), /*#__PURE__*/React.createElement("img", {
    src: dog,
    alt: "Dog",
    className: "cat-image"
  }));
};
export default Catimage;