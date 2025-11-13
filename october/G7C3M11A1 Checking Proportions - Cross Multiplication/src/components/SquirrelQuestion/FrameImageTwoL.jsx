import React, { useEffect, useRef } from "react";
import red from "../../assets/red_two.png";
import blue from "../../assets/blue_two.png";
import purple from "../../assets/purple_two.png"; // ✅ add purple image
import "./FrameImageTwo.css";
import anime from "animejs";
import { useTranslation } from "react-i18next";

const FrameImagTwoL = ({
  width = "8vw",
  redml,
  blueml,
  overlap,
  opacity,
  style,
}) => {
  const { t } = useTranslation();

  const redRef = useRef(null);
  const blueRef = useRef(null);
  const purpleRef = useRef(null);

  useEffect(() => {
    if (overlap) {
      // ✅ Step 1: move both towards each other
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

      // ✅ Step 2: fade out red & blue
      anime({
        targets: [redRef.current, blueRef.current],
        opacity: 0,
        duration: 300,
        easing: "easeOutQuad",
        delay: 1400,
        complete: () => {
          // ✅ Step 3: show purple and fade in
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
      // ✅ Reset animation (when overlap=false)
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

  return (
    <div className="frame-two-container" style={{ ...style }}>
      {/* RED BOTTLE */}
      <div className="ml-align" ref={redRef}>
        <img src={red} style={{ width }} />
        <p>
          {redml} {t("l")}
        </p>
      </div>

      {/* BLUE BOTTLE */}
      <div className="ml-align" ref={blueRef}>
        <img src={blue} style={{ width }} />
        <p>
          {blueml} {t("l")}
        </p>
      </div>

      {/* PURPLE BOTTLE (Initially hidden) */}
      <div
        className="ml-align"
        ref={purpleRef}
        style={{ opacity: 0, display: "none", position: "absolute", top: "0%" }}
      >
        <img src={purple} style={{ width, opacity }} />
      </div>
    </div>
  );
};

export default FrameImagTwoL;
