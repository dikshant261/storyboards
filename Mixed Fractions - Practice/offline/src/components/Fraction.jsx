import React from "react";
import "./Fraction.css";
const Fraction = ({ numerator, denominator, startAnimation }) => {
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    if (!startAnimation) return;
    const source = wrapperRef.current;
    const target = document.getElementById("division-line-target");
    if (!source || !target) return;

    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const deltaX = targetRect.left - sourceRect.left;
    const deltaY = targetRect.top - sourceRect.top;

    // Set CSS variables so keyframes can use precise travel
    source.style.setProperty("--fly-x-60", `${deltaX * 0.6}px`);
    source.style.setProperty("--fly-y-60", `${deltaY * 0.6}px`);
    source.style.setProperty("--fly-x-100", `${deltaX}px`);
    source.style.setProperty("--fly-y-100", `${deltaY}px`);

    // Optional: set duration
    source.style.setProperty("--fly-duration", `900ms`);
  }, [startAnimation]);

  return (
    <div className="fraction-container">
      <div className="right-fraction">
        <div>{numerator}</div>
        <div className="line-wrapper" ref={wrapperRef}>
          {startAnimation && <div className="fraction-line fly-object"></div>}
          <div className="fraction-line"></div>
        </div>
        <div>{denominator}</div>
      </div>
    </div>
  );
};

export default Fraction;
