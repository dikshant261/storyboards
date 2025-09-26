const Catimage = () => {
  const cat = "assets/cat.png";
  const dog = "assets/dog.png";  
  return React.createElement(
    "div",
    { className: "cat-image-container" },
    React.createElement("img", { src: cat, alt: "Cat", className: "cat-image" }),
    React.createElement("img", { src: cat, alt: "Cat", className: "cat-image" }),
    React.createElement("img", { src: cat, alt: "Cat", className: "cat-image" }),
    React.createElement("img", { src: dog, alt: "Dog", className: "cat-image" }),
    React.createElement("img", { src: dog, alt: "Dog", className: "cat-image" })
  );
};
window.Catimage=Catimage;