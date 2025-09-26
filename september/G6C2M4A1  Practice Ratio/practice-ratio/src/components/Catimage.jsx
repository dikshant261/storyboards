import React from "react";
import cat from "../assets/cat.png";
import dog from "../assets/dog.png";
import "./catimage.css";
const Catimage = () => {
  return (
    <div className="cat-image-container">
      <img src={cat} alt="Cat" className="cat-image" />
      <img src={cat} alt="Cat" className="cat-image" />
      <img src={cat} alt="Cat" className="cat-image" />
      <img src={dog} alt="Dog" className="cat-image" />
      <img src={dog} alt="Dog" className="cat-image" />
    </div>
  );
};

export default Catimage;
