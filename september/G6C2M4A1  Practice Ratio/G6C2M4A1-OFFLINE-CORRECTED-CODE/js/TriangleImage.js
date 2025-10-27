const TriangleImage = () => {
    const triangle='assets/triangle.png';
    const pentagon='assets/pentagon.png';
  return React.createElement(
    "div",
    { className: "triangle-container" },
    React.createElement("img", { src: triangle, alt: "Triangle", className: "triangle" }),
    React.createElement("img", { src: triangle, alt: "Triangle", className: "triangle" }),
    React.createElement("img", { src: pentagon, alt: "Pentagon", className: "pentagon" }),
    React.createElement("img", { src: pentagon, alt: "Pentagon", className: "pentagon" }),
    React.createElement("img", { src: triangle, alt: "Triangle", className: "triangle" }),
    React.createElement("img", { src: triangle, alt: "Triangle", className: "triangle" }),
    React.createElement("img", { src: triangle, alt: "Triangle", className: "triangle" }),
    React.createElement("img", { src: pentagon, alt: "Pentagon", className: "pentagon" }),
    React.createElement("img", { src: triangle, alt: "Triangle", className: "triangle" }),
    React.createElement("img", { src: triangle, alt: "Triangle", className: "triangle" })
  );
};
window.TriangleImage=TriangleImage;