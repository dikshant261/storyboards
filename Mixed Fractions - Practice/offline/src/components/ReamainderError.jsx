import React from "react";
import "./ErrorMessage.css";
const RemainderError = ({ remainder, questionData }) => {
  return (
    <div>
      {remainder !== questionData.rightRemainder ? (
        <p className="error-message">
          Oops! Give it another try—subtract carefully!
        </p>
      ) : (
        <p className="success-message">
          Great! The correct remainder is {questionData.rightRemainder}.
        </p>
      )}
    </div>
  );
};

export default RemainderError;
