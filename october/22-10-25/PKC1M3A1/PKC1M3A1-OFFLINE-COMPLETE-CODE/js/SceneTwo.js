const SceneTwo = ({ goPrev, goNext }) => {
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
  });
  const fingerRef = useRef(null); // 👈 ref for the finger image
  // Animation when component mounts
  useEffect(() => {
    if (window.anime && fingerRef.current) {
      window.anime({
        targets: fingerRef.current,
        scale: [0, 1],
        // rotate: [-15, 0],
        // opacity: [0, 1],
        duration: 1000,
        easing: "easeOutElastic(1, .8)",
      });
    }
  }, []);
  const handleClick = (key, playFn) => {
    playFn();
    setClicked((prev) => {
      const updated = {
        ...prev,
        [key]: true,
      };
      return updated;
    });
  };

  // If all three are clicked at least once, button becomes enabled
  const allClicked = clicked.one && clicked.two && clicked.three;
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "scene-container",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "top",
      },
      /*#__PURE__*/ React.createElement(
        "p",
        {
          className: "top-heading",
        },
        t("count")
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "align-hand-image",
        },
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "shout-loud",
          },
          t("shout")
        ),
        /*#__PURE__*/ React.createElement("img", {
          src: raisehandchild,
          className: "boy-hand",
        })
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "main",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "one",
        },
        // /*#__PURE__*/ React.createElement(WhitePointer, {
        //   top: "13%",
        //   right: "25.8%",
        // }),
        /*#__PURE__*/ React.createElement("img", {
          src: one,
          className: "image-one",
        }),
        /*#__PURE__*/ React.createElement("img", {
          ref: fingerRef,
          src: Onefinger,
          style: {
            width: "27vw",
            transform: "translateY(2.4vw)",
          },
        })
      ),
      /*#__PURE__*/ React.createElement(
        "button",
        {
          className: "align-previous",
          onClick: () => {
            playClick();
            goPrev();
          },
        },
        t("buttons.previous")
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "align-Next",
          onClick: () => {
            playClick();
            goNext();
          },
        },
        t("buttons.Next")
      )
    )
  );
};
window.SceneTwo = SceneTwo;
