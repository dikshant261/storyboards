const playSound = [
  playOne,
  playTwo,
  playThree,
  playFour,
  playFive,
  playSix,
  playSeven,
  playEight,
  playNine,
  playTen,
];
const ImageGrid = ({ renderCount = 6, imageName = "image1.png", disabled }) => {
  const images = Array.from(
    {
      length: renderCount,
    },
    (_, i) => i + 1
  );
  const [counts, setCounts] = useState(Array(renderCount).fill(0));
  const [clickOrder, setClickOrder] = useState(0);

  // Reset both when renderCount changes
  useEffect(() => {
    setCounts(Array(renderCount).fill(0));
    setClickOrder(0);
  }, [renderCount]);
  const containerClass =
    renderCount < 5
      ? "image-grid-container center-row"
      : "image-grid-container";
  const handleImageClick = (index) => {
    if (playSound[clickOrder]) playSound[clickOrder]();
    setCounts((prev) => {
      if (prev[index] !== 0) return prev; // already clicked, do nothing

      const updated = [...prev];
      updated[index] = clickOrder + 1; // assign next click number

      // ✅ check if all images have been clicked after updating
      const allClicked = updated.every((val) => val > 0);
      if (allClicked && typeof disabled === "function") {
        disabled(); // call the callback only once all images are clicked
      }
      return updated;
    });

    // increment order count for next click
    setClickOrder((prev) => prev + 1);
  };
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: containerClass,
    },
    images.map((_, index) =>
      /*#__PURE__*/ React.createElement(
        "div",
        {
          key: index,
          className: "grid-image-wrapper",
          style: {
            position: "relative",
          },
        },
        /*#__PURE__*/ React.createElement("img", {
          src: imageName,
          alt: `Image ${index + 1}`,
          className: "grid-image",
          onClick: () => handleImageClick(index),
          style: {
            cursor: counts[index] ? "not-allowed" : "pointer",
            opacity: counts[index] ? "0.5" : "1",
            pointerEvents: counts[index] ? "none" : "auto",
          },
        }),
        counts[index] > 0 &&
          /*#__PURE__*/ React.createElement(
            "span",
            {
              className: "image-count-overlay",
            },
            counts[index]
          )
      )
    )
  );
};
window.ImageGrid = ImageGrid;
