// Import all your images
const studentImg = "assets/student.png";
const teacher = "assets/teacher.png";
const pizza = "assets/pizza.png";
const comic = "assets/comic.png";
const sleep = "assets/sleep.png";
const orangeapple = "assets/orangeapple.png";
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
    return /*#__PURE__*/ React.createElement(
      "span",
      null,
      "\u26A0 Image not found"
    );
  }
  return /*#__PURE__*/ React.createElement("img", {
    src: imageSrc,
    alt: alt,
    style: {
      width,
      height,
    },
  });
};
window.ImageRenderer = ImageRenderer;
