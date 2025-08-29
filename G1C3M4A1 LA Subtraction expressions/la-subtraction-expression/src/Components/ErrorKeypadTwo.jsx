import React from "react";
import "./ErrorMessage.css";
const ErrorKeypadTwo = ({ count }) => {
  if (count === 6) {
    return null;
  }
  return (
    <div>
      {count < 6 && (
        <p className="error-2">
          Oops! You have
          <br /> entered a<br /> smaller
          <br /> number…
          <br />
          Count and Try
          <br /> again…
        </p>
      )}
      {count > 6 && (
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

export default ErrorKeypadTwo;
