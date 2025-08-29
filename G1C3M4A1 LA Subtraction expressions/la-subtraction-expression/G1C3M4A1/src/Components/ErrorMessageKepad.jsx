import React from "react";
import "./ErrorMessage.css";
const ErrorMessageKeypad = ({ count }) => {
  if (count === 4) {
    return null;
  }
  return (
    <div>
      {count < 4 && (
        <p className="error-2">
          Oops! You have
          <br /> entered a<br /> smaller
          <br /> number…
          <br />
          Count and Try
          <br /> again…
        </p>
      )}
      {count > 4 && (
        <p className="error-2">
          Oops! You have
          <br /> entered a bigger
          <br /> number…
          <br />
          Count and Try
          <br /> again…
        </p>
      )}
    </div>
  );
};

export default ErrorMessageKeypad;
