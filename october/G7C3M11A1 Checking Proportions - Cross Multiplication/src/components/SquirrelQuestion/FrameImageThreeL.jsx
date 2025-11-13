import React, { useEffect, useRef } from "react";
import red from "../../assets/red_three.png";
import blue from "../../assets/blue_three.png";
import purple from "../../assets/purple_three.png"; // ✅ NEW purple image
import "./FrameImageTwo.css";
import anime from "animejs";
import { useTranslation } from "react-i18next";

const FrameImagThreeL = ({
  width = "8vw",
  redml,
  blueml,
  style,
  opacity,
  overlap,
}) => {
  const { t } = useTranslation();

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

      {/* PURPLE BOTTLE — hidden initially */}
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

export default FrameImagThreeL;
