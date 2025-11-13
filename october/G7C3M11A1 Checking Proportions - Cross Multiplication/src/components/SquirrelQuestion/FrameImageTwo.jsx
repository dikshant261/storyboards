import React, { useEffect, useRef } from "react";
import red from "../../assets/red.png";
import blue from "../../assets/blue.png";
import purple from "../../assets/purple.png";
import "./FrameImageTwo.css";
import anime from "animejs";
import { useTranslation } from "react-i18next";

const FrameImagTwo = ({
  width = "8vw",
  redml,
  blueml,
  overlap = false,
  style,
  opacity,
}) => {
  const { t } = useTranslation();
  const redRef = useRef(null);
  const blueRef = useRef(null);
  const purpleRef = useRef(null);

  useEffect(() => {
    if (overlap) {
      // Step 1: move red & blue towards each other
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
        opacity:'0.6',
        duration: 1400,
      });

      // Step 2: fade out both (after movement)
      anime({
        targets: [redRef.current, blueRef.current],
        opacity: 0,
        duration: 300,
        easing: "easeOutQuad",
        delay: 1400, // ⬅️ start fading after movement finishes
        complete: () => {
          // Step 3: fade in purple image
          purpleRef.current.style.display = "flex"; // show purple container

          anime({
            targets: purpleRef.current,
            opacity: [0, 1],
            duration: 500,
            easing: "easeOutQuad",
          });
        },
      });
    } else {
      // reset animation
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
      {/* RED */}
      <div className="ml-align" ref={redRef}>
        <img src={red} style={{ width }} />
        <p>
          {redml} {t("ml")}
        </p>
      </div>

      {/* BLUE */}
      <div className="ml-align" ref={blueRef}>
        <img src={blue} style={{ width }} />
        <p>
          {blueml} {t("ml")}
        </p>
      </div>

      {/* PURPLE (hidden initially) */}
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

export default FrameImagTwo;
