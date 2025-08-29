import React from "react";
import "./ErrorAndSuccess.css";
const ErrorAndSuccess = ({ optionData, error }) => {
  let rem = optionData.numerator % optionData.denominator;
  let quo = Math.floor(optionData.numerator / optionData.denominator);
  return (
    <div className="error-align ">
      {error === "success" ? (
        <p className="success-message">Success! The answer is correct.</p>
      ) : optionData.numerator < optionData.denominator ? (
        <p className="error-message" style={{
          fontSize:"1.6vw"
        }}>
          Opps!{" "}
          <span className="align-message">
            <span>{optionData.numerator}</span>
            <span className="align-line"></span>
            <span>{optionData.denominator}</span>
          </span>
         <span>is a proper fraction.</span>
          
        </p>
      ) : (
        <p className="error-message ">
          Oops!
          <br />
          <span className="error-message-align">
            <span className="align-message">
              <span>{optionData.numerator}</span>
              <span className="align-line"></span>
              <span>{optionData.denominator}</span>
            </span>{" "}
            is{" "}
            <span className="align-message-2">
              <span>{quo}</span>
              <span className="align-message">
                <span>{rem}</span>
                <span className="align-line"></span>
                <span>{optionData.denominator}</span>
              </span>
            </span>
          </span>
        </p>
      )}
    </div>
  );
};

export default ErrorAndSuccess;
