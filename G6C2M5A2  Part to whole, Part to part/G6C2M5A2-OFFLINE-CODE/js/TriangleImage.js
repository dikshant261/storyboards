const TriangleImage = () => {
  const triangle="assets/triangle.png";
  const square="assets/square.png";  
  return React.createElement(
    "div",
    { className: "triangle-container" },

    React.createElement("img", { src: square, alt: t("Triangle"), className: "square" }),
    React.createElement("img", { src: square, alt: t("Triangle"), className: "square" }),
    React.createElement("img", { src: triangle, alt: t("Pentagon"), className: "triangle" }),
    React.createElement("img", { src: square, alt: t("Pentagon"), className: "square" }),
    React.createElement("img", { src: triangle, alt: t("Triangle"), className: "triangle" }),
    React.createElement("img", { src: square, alt: t("Triangle"), className: "square" }),
    React.createElement("img", { src: triangle, alt: t("Triangle"), className: "triangle" }),
    React.createElement("img", { src: triangle, alt: t("Pentagon"), className: "triangle" }),
    React.createElement("img", { src: triangle, alt: t("Triangle"), className: "triangle" }),
    React.createElement("img", { src: triangle, alt: t("Triangle"), className: "triangle" })
  );
};

window.TriangleImage = TriangleImage;
