(function () {
  const InlineMath = ({ math }) => {
    const ref = React.useRef();

    React.useEffect(() => {
      if (window.katex && ref.current) {
        window.katex.render(math, ref.current, {
          throwOnError: false,
        });
      }
    }, [math]);

    return React.createElement("span", { ref });
  };

  const BlockMath = ({ math }) => {
    const ref = React.useRef();

    React.useEffect(() => {
      if (window.katex && ref.current) {
        window.katex.render(math, ref.current, {
          displayMode: true,
          throwOnError: false,
        });
      }
    }, [math]);

    return React.createElement("div", { ref, style: { textAlign: "center" } });
  };

  // Expose globally
  window.InlineMath = InlineMath;
  window.BlockMath = BlockMath;
})();
