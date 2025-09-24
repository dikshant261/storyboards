import React, { lazy } from "react";
import "./apple.css";
import apple from "../assets/apple.png";
import orange from "../assets/orange.png";
const Orange = () => {
  return (
    <div className="marble-image">
      <div className="apple-container" style={{ flexDirection: "column" }}>
        <div className="apple-adjust" style={{ flexDirection: "row" }}>
          <div style={{ marginRight: "-6vw", marginBottom: "-8vw" }}>
            <img src={apple} className="apple" />
          </div>
          <div
            style={{ marginRight: "-6vw", zIndex: "3", marginBottom: "-10vw" }}
          >
            <img src={apple} className="apple" />
          </div>
          <div
            style={{ marginRight: "-4vw", zIndex: "3", marginBottom: "-10vw" }}
          >
            <img src={apple} className="apple" />
          </div>
        </div>
        <div className="apple-adjust" style={{ flexDirection: "row" }}>
          <div
            style={{ marginBottom: "0vw", zIndex: "3", marginRight: "-4vw" }}
          >
            <img src={apple} className="apple" />
          </div>
          <div style={{ zIndex: "3" }}>
            <img src={apple} className="apple" />
          </div>
        </div>
      </div>
      <div
        className="apple-container"
        style={{ flexDirection: "row", marginLeft: "2vw" }}
      >
        <div style={{ marginRight: "-5vw", zIndex: "3" }}>
          <img src={orange} className="apple" />
        </div>
        <div className="apple-adjust">
          <div style={{ marginBottom: "-7vw", zIndex: "2" }}>
            <img src={orange} className="apple" />
          </div>
          <div style={{ zIndex: "3" }}>
            <img src={orange} className="apple" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orange;
