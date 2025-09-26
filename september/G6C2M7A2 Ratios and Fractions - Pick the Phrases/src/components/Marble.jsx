import React, { lazy } from "react";
import "./apple.css";
import bluemarble from "../assets/bluemarble.png";
import orangemarble from "../assets/orangemarble.png";
const Marble = () => {
  return (
    <div className="marble-image">
      <div className="apple-container">
        <div style={{ marginRight: "-5vw", zIndex: "3" }}>
          <img src={orangemarble} className="apple" />
        </div>
        <div className="apple-adjust">
          <div style={{ marginBottom: "-7vw", zIndex: "2" }}>
            <img src={orangemarble} className="apple" />
          </div>
          <div style={{ zIndex: "3" }}>
            <img src={orangemarble} className="apple" />
          </div>
        </div>
      </div>
      <div className="apple-container">
        <div className="apple-adjust">
          <div style={{ marginRight: "-5vw", marginBottom: "-7vw" }}>
            <img src={bluemarble} className="apple" />
          </div>
          <div style={{ marginRight: "-5vw", zIndex: "3" }}>
            <img src={bluemarble} className="apple" />
          </div>
        </div>
        <div className="apple-adjust">
          <div style={{ marginBottom: "-7vw", zIndex: "2" }}>
            <img src={bluemarble} className="apple" />
          </div>
          <div style={{ zIndex: "3" }}>
            <img src={bluemarble} className="apple" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marble;
