// src/components/ImageRenderer.js
import React from "react";

// Import all your images
import studentImg from "../assets/student.png";
import teacher from "../assets/teacher.png";
import pizza from "../assets/pizza.png";
import comic from "../assets/comic.png";
import sleep from "../assets/sleep.png";
import orangeapple from "../assets/orangeapple.png";
// Map string names to imported images
const imageMap = {
  "student.png": studentImg,
  "teacher.png": teacher,
  "pizza.png": pizza,
  "comic.png": comic,
  "sleep.png": sleep,
  "orangeapple.png": orangeapple,
};

const ImageRenderer = ({ src, alt = "", width = "6vw", height = "auto" }) => {
  const imageSrc = imageMap[src];

  if (!imageSrc) {
    console.warn(`Image "${src}" not found in imageMap`);
    return <span>⚠ Image not found</span>;
  }

  return <img src={imageSrc} alt={alt} style={{ width, height }} />;
};

export default ImageRenderer;
