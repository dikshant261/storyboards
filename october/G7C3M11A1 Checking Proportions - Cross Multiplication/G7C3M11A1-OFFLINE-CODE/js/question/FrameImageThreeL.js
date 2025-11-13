const FrameImagThreeL = ({
  width = "8vw",
  redml,
  blueml,
  style,
  opacity,
  overlap,
}) => {
  const red = "assets/red_three.png";
  const blue = "assets/blue_three.png";
  const purple = "assets/purple_three.png"; // ✅ NEW purple image

  const redRef = useRef(null);
  const blueRef = useRef(null);
  const purpleRef = useRef(null);
  useEffect(() => {
    if (overlap) {
      // ✅ Move both bottles toward center
      anime({
        targets: redRef.current,
        translateX: "+=8.5vw",
        easing: "easeInOutQuad",
        duration: 1400,
      });
      anime({
        targets: blueRef.current,
        translateX: "-=8.5vw",
        easing: "easeInOutQuad",
        duration: 1400,
      });

      // ✅ Fade out red & blue after movement
      anime({
        targets: [redRef.current, blueRef.current],
        opacity: 0,
        duration: 300,
        easing: "easeOutQuad",
        delay: 1400,
        complete: () => {
          // ✅ Show purple and fade in
          purpleRef.current.style.display = "flex";
          anime({
            targets: purpleRef.current,
            opacity: [0, 1],
            duration: 500,
            easing: "easeOutQuad",
          });
        },
      });
    } else {
      // ✅ Reset animation when overlap is false
      purpleRef.current.style.display = "none";
      anime({
        targets: [redRef.current, blueRef.current],
        translateX: "0vw",
        opacity: 1,
        duration: 600,
        easing: "easeOutQuad",
      });
    }
  }, [overlap]);
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "frame-two-container",
      style: {
        ...style,
      },
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "ml-align",
        ref: redRef,
      },
      /*#__PURE__*/ React.createElement("img", {
        src: red,
        style: {
          width,
        },
      }),
      /*#__PURE__*/ React.createElement("p", null, redml, " ", t("l"))
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "ml-align",
        ref: blueRef,
      },
      /*#__PURE__*/ React.createElement("img", {
        src: blue,
        style: {
          width,
        },
      }),
      /*#__PURE__*/ React.createElement("p", null, blueml, " ", t("l"))
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "ml-align",
        ref: purpleRef,
        style: {
          opacity: 0,
          display: "none",
          position: "absolute",
          top: "0%",
        },
      },
      /*#__PURE__*/ React.createElement("img", {
        src: purple,
        style: {
          width,
          opacity,
        },
      })
    )
  );
};
window.FrameImagThreeL = FrameImagThreeL;
