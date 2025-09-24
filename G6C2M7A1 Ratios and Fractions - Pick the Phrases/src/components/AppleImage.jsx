import React, { lazy } from "react";
import "./apple.css";
import apple from "../assets/apple.png";
import greenapple from "../assets/greenapple.png";
const AppleImage = () => {
  return (
    <div className="apple-container">
      <div style={{marginRight:"-5vw",zIndex:"3"}}>  
      <img src={greenapple} className="apple" />
      </div>
      <div className="apple-adjust">
        <div style={{marginBottom:"-7vw",zIndex:"2"}}>
        <img src={apple} className="apple"/>
        </div>
        <div style={{zIndex:"3"}}>
        <img src={apple} className="apple"/>
        </div>
      </div>
    </div>
  );
};

export default AppleImage;
